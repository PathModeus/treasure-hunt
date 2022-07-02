FROM node

COPY package.json package-lock.json ./

RUN npm install

COPY .env .env

COPY src ./src

COPY public ./public

RUN npm run build

FROM nginxinc/nginx-unprivileged
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 build/ /usr/share/nginx/html
