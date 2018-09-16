#!/bin/bash
docker build -t gmassonfr/reportify-api .
docker push gmassonfr/reportify-api

ssh deploy@$DEPLOY_SERVER << EOF
docker pull gmassonfr/reportify-api
docker stop reportify-api || true
docker rm reportify-api || true
docker rmi gmassonfr/reportify-api:current || true
docker tag gmassonfr/reportify-api:latest gmassonfr/reportify-api:current
docker run -d --restart always --name reportify-api -p 3000:3000 gmassonfr/reportify-api:current
EOF
