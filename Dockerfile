FROM node:10

WORKDIR /opt/map-compare-ui

COPY . .

RUN npm install
RUN npm run build:prod

EXPOSE 8081

CMD ["npm", "run", "http", "./dist"]
