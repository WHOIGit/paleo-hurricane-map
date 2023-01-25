#!/bin/sh
docker buildx build -f compose/production/django/Dockerfile -t ghcr.io/whoigit/paleohurdat-api:stable --platform linux/amd64 --push .

docker buildx build -t ghcr.io/whoigit/paleohurdat-react-map:stable --platform linux/amd64 --push .