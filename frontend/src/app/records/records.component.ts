import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Importa AuthService
import { LoginComponent } from '../login/login.component';

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
  lastSession: StudySession | null = null;
  longestSession: StudySession | null = null;
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
        `http://localhost:8000/api/records/last-session/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      this.lastSession = response.data;
    } catch (error) {
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
        `http://localhost:8000/api/records/longest-session/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      this.longestSession = response.data;
    } catch (error) {
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
        `http://localhost:8000/api/records/start-session/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Start Session', response.data);

      this.currentSession = response.data;
    } catch (error) {
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
        `http://localhost:8000/api/records/stop-session/${sessionId}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Stop Session', response.data);

      this.currentSession = null; // Reset current session
      this.fetchLastSession();
      this.fetchLongestSession(); // Refresh last session data
    } catch (error) {
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        this.error = 'Sessione scaduta. Effettua nuovamente il login.';
        this.authService.clearToken();
        this.router.navigate(['/login']);
      } else if (error.response?.status === 404) {
        this.error = 'Sessione non trovata.';
      } else {
        this.error = 'Errore nel caricamento dei dati. Riprova più tardi.';
      }
    } else {
      this.error = 'Si è verificato un errore imprevisto.';
    }
  }
}
