#!/bin/bash

# Funzione per gestire gli errori
handle_error() {
    echo "Errore: $1"
    exit 1
}

# Ferma e rimuovi tutti i container in esecuzione
echo "Fermando e rimuovendo tutti i container..."
docker stop $(docker ps -aq) || handle_error "Impossibile fermare i container"
docker rm $(docker ps -aq) || handle_error "Impossibile rimuovere i container"

# Rimuovi le reti non utilizzate
echo "Rimuovendo le reti non utilizzate..."
docker network prune -f || handle_error "Impossibile rimuovere le reti non utilizzate"

# Avvia il database e il backend con docker-compose
echo "Avviando il database e il backend..."
docker-compose up -d db backend || handle_error "Impossibile avviare db e backend"

# Attendi che il backend sia pronto (puoi aumentare il tempo se necessario)
echo "Attendendo che il backend sia pronto..."
sleep 10

# Avvia il frontend
echo "Avviando il frontend..."
docker run -it --rm -p 4200:4200 -v $(pwd)/frontend:/app --network on_focus_mynetwork frontend-image ng serve --host 0.0.0.0 --port 4200 || handle_error "Impossibile avviare il frontend"
