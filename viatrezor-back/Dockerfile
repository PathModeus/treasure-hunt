FROM node
USER node
WORKDIR /home/node
COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY ./ ./

ENTRYPOINT [ "node", "server.js" ]
