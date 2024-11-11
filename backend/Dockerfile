# Usa una imagen oficial de Node.js como base
FROM node:16

# Crea un directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la app corre (ajusta si usas otro puerto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
