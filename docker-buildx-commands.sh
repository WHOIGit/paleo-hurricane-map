#!/bin/sh
docker buildx build -f paleo_hurricane_api/compose/production/django/Dockerfile -t ghcr.io/whoigit/paleohurdat-api:stable --platform linux/amd64 --push .

docker buildx build -f paleo-hurricane-map/Dockerfile -t ghcr.io/whoigit/paleohurdat-react-map:stable --platform linux/amd64 --push .