FROM node:latest

WORKDIR /app/server

COPY ./server/package*.json ./
COPY ./server/tsconfig*.json ./

RUN npm install
COPY ./server .
ADD ./Shared ../Shared

ENV PORT=8080

EXPOSE 8080

CMD ["npm","run","build"]