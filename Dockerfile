# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm ci --omit=dev

# Copia el código
COPY . .

# Asegura carpeta de imágenes (por si no existe en el contenedor)
RUN mkdir -p /app/public/images

ENV NODE_ENV=production
# usa el mismo puerto que tu app (app.js escucha 8200)
EXPOSE 8200

CMD ["node", "app.js"]