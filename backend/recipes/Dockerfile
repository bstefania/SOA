FROM node:16.13.1-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/recipes
WORKDIR /var/www/recipes
ADD . /var/www/recipes
RUN npm install
CMD npm run build && npm run start:prod
