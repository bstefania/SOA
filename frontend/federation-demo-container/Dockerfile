FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/fed-container
WORKDIR /var/www/fed-container
ADD . /var/www/fed-container
RUN npm install
CMD npm run build && npm start
