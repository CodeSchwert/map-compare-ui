FROM node:10

WORKDIR /opt/map-compare-ui

COPY . .
COPY ./dist ./public

RUN npm install

EXPOSE 8081

CMD ["npm", "run", "http"]
