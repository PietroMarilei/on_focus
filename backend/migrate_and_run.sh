#!/bin/bash

# Attendi che il database sia pronto
./wait-for-it.sh db:3306 --timeout=60 --strict -- echo "Database è pronto!"

# Crea il database se non esiste
echo "CREATE DATABASE IF NOT EXISTS ${DB_NAME};" | mysql -h db -u root -p"${DB_PASSWORD}"

# Esegui le migrazioni solo se necessario
if [ "$DJANGO_MANAGEPY_MIGRATE" = 'on' ]; then
    echo "Applicazione delle migrazioni..."
    python manage.py migrate
fi

# Avvia il server Django
echo "Avvio del server Django..."
python manage.py runserver 0.0.0.0:8000
