import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { environment } from '../../environments/environment';

interface StudySession {
  id: number;
  session_date: string;
  duration: number;
  started_at: string;
  ended_at: string;
}

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnInit {
  lastSession: StudySession = {} as StudySession;
  longestSession: StudySession = {} as StudySession;
  currentSession: StudySession | null = null;
  elapsedTime: number = 0;
  private intervalId: any;
  error: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.fetchLastSession();
    this.fetchLongestSession();
  }

  async fetchLastSession() {
    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Token non trovato');
      }

      const response = await axios.get<StudySession>(
        `${environment.apiDomain}/api/records/last-session/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      this.lastSession = response.data;
    } catch (error: any) {
      console.error(
        "Errore nel recupero dell'ultima sessione:",
        error.response?.data || error.message || error
      );
      this.handleError(error);
    }
  }

  async fetchLongestSession() {
    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Token non trovato');
      }

      const response = await axios.get<StudySession>(
        `${environment.apiDomain}/api/records/longest-session/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      this.longestSession = response.data;
    } catch (error: any) {
      console.error(
        'Errore nel recupero della sessione più lunga:',
        error.response?.data || error.message || error
      );
      this.handleError(error);
    }
  }

  async startSession() {
    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Token non trovato');
      }

      const response = await axios.post<StudySession>(
        `${environment.apiDomain}/api/records/start-session/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Start Session', response.data);

      this.currentSession = response.data;
    } catch (error: any) {
      console.error(
        "Errore nell'avvio della sessione:",
        error.response?.data || error.message || error
      );
      this.handleError(error);
    }
  }

  async stopSession(sessionId: number) {
    try {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Token non trovato');
      }

      const response = await axios.post<StudySession>(
        `${environment.apiDomain}/api/records/stop-session/${sessionId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Stop Session', response.data);

      this.currentSession = null;
      this.fetchLastSession();
      this.fetchLongestSession();
    } catch (error: any) {
      console.error(
        "Errore nell'arresto della sessione:",
        error.response?.data || error.message || error
      );
      this.handleError(error);
    }
  }

  startCounter() {
    this.intervalId = setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }

  stopCounter() {
    clearInterval(this.intervalId);
  }

  async toggleSession() {
    if (this.currentSession) {
      await this.stopSession(this.currentSession.id);
      this.stopCounter();
    } else {
      await this.startSession();
      this.elapsedTime = 0;
      this.startCounter();
    }
  }

  formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(
      seconds
    )}`;
  }

  padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  private handleError(error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      this.error = 'Sessione scaduta. Effettua nuovamente il login.';
      this.authService.clearToken();
      this.router.navigate(['/login']);
    } else {
      this.error = 'Si è verificato un errore. Riprova più tardi.';
    }
  }
}
