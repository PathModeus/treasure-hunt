FROM node
USER node
COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

ENTRYPOINT [ "node", "server.js" ]
