FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/fed-about
WORKDIR /var/www/fed-about
ADD . /var/www/fed-about
RUN npm install
CMD npm run build && npm start
