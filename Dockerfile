FROM node:24-alpine AS builder
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY *.env ./
RUN npm install --only=production
CMD [ "npm", "run", "start" ]