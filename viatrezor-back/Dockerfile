FROM node:18.6.0-alpine3.16
USER node
WORKDIR /home/node
COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY ./ ./

ENTRYPOINT [ "node", "server.js" ]
