FROM node

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src

COPY public ./public

RUN npm run build

FROM nginxinc/nginx-unprivileged

COPY --from=0 build/ /usr/share/nginx/html


