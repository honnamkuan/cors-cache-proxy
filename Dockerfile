FROM node:lts-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY . /app

RUN chown -R appuser:appgroup /app

USER appuser

WORKDIR /app

RUN npm install

ENTRYPOINT [ "node", "server.js" ]