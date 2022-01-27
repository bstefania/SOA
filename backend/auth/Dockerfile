FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/auth
WORKDIR /var/www/auth
ADD . /var/www/auth
RUN npm install
CMD npm run build && npm run start:prod
