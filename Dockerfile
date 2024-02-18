# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 20 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 

FROM node:20-alpine as builder

# Set default values for environment variables
ENV API_PORT=3001

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# Bundle app source
COPY . .

# Bind port
EXPOSE 3000

# Start server
CMD ["npm", "start"]


