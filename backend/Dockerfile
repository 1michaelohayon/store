FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

RUN npm run test

RUN npm run tsc

CMD npm start