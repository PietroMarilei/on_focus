# Usa l'immagine base di Python
FROM python:3.12-slim

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia il file requirements.txt nel container
COPY requirements.txt .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Copia il resto del codice dell'applicazione nel container
COPY . .

# Espone la porta 8000 per il server Django
EXPOSE 8000

# Comando per avviare il server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
