FROM node:12-alpine as builder
WORKDIR /api
COPY package*.json ./
RUN npm install

COPY ./ ./
EXPOSE 5005

CMD ["npm", "start"]
