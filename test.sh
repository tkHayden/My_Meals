echo "Running all tests..."
docker compose run --name test  node npm run test

echo "tear down container"
docker rm test