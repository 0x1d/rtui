FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/config
RUN mkdir -p /usr/src/app/dist
WORKDIR /usr/src/app
VOLUME /config

# Install app
COPY package.json /usr/src/app/
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "app" ]
