FROM node:21-alpine AS build

WORKDIR /usr/nestjs-microservice

COPY package*.json .

RUN npm run i-prod

COPY . .

EXPOSE 1111

CMD ["npm", "start"]

