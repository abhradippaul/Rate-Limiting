FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

FROM node:24-alpine3.21 AS prod

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env ./

RUN npm install --only=production

ENV PORT=3000

CMD [ "npm", "start" ]