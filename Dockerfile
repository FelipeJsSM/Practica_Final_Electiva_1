FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p /app/public/images

ENV NODE_ENV=production
EXPOSE 8200

CMD ["node", "app.js"]