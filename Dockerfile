FROM node:20-alpine as builder

# Set default values for environment variables
ENV API_PORT=3000
ENV API_PREFIX=/api/v1
ENV SWAGGER_ENABLE=1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon


# Bundle app source
COPY . .

RUN chmod 755 docker/run-application.sh

