FROM node:20-alpine as builder

# Set default values for environment variables
ENV API_PORT=4000
ENV API_PREFIX=/api/v1
ENV SWAGGER_ENABLE=1
ENV HOST=0.0.0.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon


# Bundle app source
COPY . .

RUN chmod 755 docker/run-application.sh

EXPOSE 4000