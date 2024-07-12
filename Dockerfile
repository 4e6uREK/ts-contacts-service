FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

COPY --from=builder /app/build /app
COPY --from=builder /app/package*.json /app

WORKDIR /app

RUN npm install --production

EXPOSE 5858

CMD ["node", "index.js"]
