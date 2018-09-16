# Reportify API

<!-- [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![npm version](https://badge.fury.io/js/express-rest-es2017-boilerplate.svg)](https://badge.fury.io/js/express-rest-es2017-boilerplate) [![Build Status](https://travis-ci.org/fsousa/express-rest-es2017-boilerplate.svg?branch=master)](https://travis-ci.org/fsousa/express-rest-es2017-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/fsousa/express-rest-es2017-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/fsousa/express-rest-es2017-boilerplate?branch=master)[![Greenkeeper badge](https://badges.greenkeeper.io/fsousa/express-rest-es2017-boilerplate.svg)](https://greenkeeper.io/) -->

The API of Reportify web app

## Requirements

- [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo and make it yours:

```bash
git clone https://github.com/gaetanmasson/reportify-api.git
cd reportify-api
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch

# open nyc test coverage reports
yarn coverage
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev
or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
yarn deploy
or
sh ./deploy.sh
```

## Based on

- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)

## License

[MIT License](README.md) - [Gaetan Masson](https://github.com/gaetanmasson)
