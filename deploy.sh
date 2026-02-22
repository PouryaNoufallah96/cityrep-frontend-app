echo "Stopping old container if exists..."
docker-compose down


echo "Starting container..."
#docker-compose up -d
docker-compose up -d --build

echo "Container status:"
docker-compose ps

#echo "List of all containers:"
#docker ps -a

#echo "Showing logs (press Ctrl+C to exit)..."
#docker-compose logs -f