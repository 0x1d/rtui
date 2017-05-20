FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
RUN mkdir -p /usr/src/app/config
RUN mkdir -p /usr/src/app/dist
RUN mkdir -p /usr/src/app/dist/app
WORKDIR /usr/src/app
VOLUME /config

# Install app
COPY src /usr/src/app/src
COPY package.json /usr/src/app/
COPY webpack.config.js /usr/src/app/
RUN npm install
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "app" ]
