FROM node:16.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY src/ src/

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
