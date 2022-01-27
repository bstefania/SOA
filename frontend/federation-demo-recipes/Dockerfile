FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/fed-recipes
WORKDIR /var/www/fed-recipes
ADD . /var/www/fed-recipes
RUN npm install
CMD npm run build && npm start
