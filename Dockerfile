# build fe
FROM node:20-alpine 
WORKDIR /nestjs-microservice
COPY . .
RUN npm run i-prod 
CMD [ "npm", "start" ]
