
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

# COPY . .
COPY config /app/config
COPY controllers/users* /app/controllers/
COPY routers/users* /app/routers/
COPY services/users* /app/services/
COPY models/User* /app/models/
COPY .env /app/
COPY app.js /app/

RUN ls -la /app

EXPOSE 3000

CMD ["npm", "start"]
