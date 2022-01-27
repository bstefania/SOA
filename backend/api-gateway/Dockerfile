FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/api-gateway
WORKDIR /var/www/api-gateway
ADD . /var/www/api-gateway
RUN npm install
CMD npm run build && npm run start:prod
