FROM node
USER node
WORKDIR /home/node
COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

ENTRYPOINT [ "node", "server.js" ]
