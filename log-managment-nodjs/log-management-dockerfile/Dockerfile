FROM  node:18

WORKDIR /app

COPY package.json app.js ./

RUN npm install

RUN mkdir /logs

VOLUME /logs

CMD [ "npm","start" ]