FROM node:18

WORKDIR /app

COPY package.json ./
COPY producer.js ./
COPY consumer.js ./

RUN npm install

RUN mkdir /shared-data 

VOLUME /shared-data 