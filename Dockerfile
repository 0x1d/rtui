FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app
COPY package.json /usr/src/app/
COPY dist /usr/src/app/dist
COPY config /usr/src/app/config
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "app" ]
