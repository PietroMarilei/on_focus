# Usa l'immagine base di Python
FROM python:3.12-slim

# Imposta la directory di lavoro nel container
WORKDIR /app

# Installa le dipendenze di sistema necessarie
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev-compat \
    libmariadb-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y default-mysql-client


# Copia il file requirements.txt nel container
COPY requirements.txt .

# Installa le dipendenze Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia lo script wait-for-it.sh nel container
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copia lo script migrate_after_docker nel container
COPY migrate_and_run.sh /migrate_and_run.sh
RUN chmod +x /migrate_and_run.sh

# Copia il resto del codice dell'applicazione nel container
COPY . .

# Espone la porta 8000 per il server Django
EXPOSE 8000

# Comando per avviare il server Django
CMD ["/migrate_and_run.sh"]

