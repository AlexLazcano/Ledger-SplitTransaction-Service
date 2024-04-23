
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

# COPY . .
COPY config /app/config
COPY controllers/splitTransactions* /app/controllers/
COPY routers/splitTransactions* /app/routers/
COPY services/splitTransaction* /app/services/
COPY models/SplitTransaction* /app/models/
COPY models/User* /app/models/
COPY .env /app/
COPY app.js /app/

RUN ls -la /app

EXPOSE 3000

CMD ["npm", "start"]
