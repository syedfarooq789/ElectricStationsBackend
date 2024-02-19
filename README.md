<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The Electric Station Application Back-End Platform is a robust and comprehensive server-side application developed with the Nest.js framework, integrated with Docker containerization to optimize deployment processes, improve scalability, and ensure long-term maintainability.

## Deployment

Project is deployed using AWS EC2 instance and you can access it using:

```bash
http://13.51.157.56:4000/docs#/company/CompanyController_create

```

## Running the app

```bash
$ Create an .env file using the following properties on the project level with following properties:

# API configuration
API_PORT=3000
API_PREFIX=/api/v1

# Swagger API documentation
SWAGGER_ENABLE=1

# Database ORM configuration
POSTGRES_PORT=5432
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres
POSTGRES_HOST = host.docker.internal
API_DEFAULT_HOST = 0.0.0.0
POSTGRES_USER=postgres
```

## Running the app

```bash

$ docker-compose rm -v

$ docker-compose up --build

```

## Test

```bash

Both e2e and unit tests are written for all the services and controllers used in the project.

when you run the the above docker commands it will automatically run all the test cases.

For example in station module:

For example in station:
spec folder contains the e2e tests for station module
services folder contain the unit tests for station service
controller folder contain the unit tests for company controller

spec folder contains the e2e tests for company module
services folder contain the unit tests for company service
controller folder contain the unit tests for company controller
```
