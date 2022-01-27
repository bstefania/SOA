FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/fed-auth
WORKDIR /var/www/fed-auth
ADD . /var/www/fed-auth
RUN npm install
CMD npm run build && npm start
