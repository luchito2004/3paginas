# Usamos la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de autenticación al contenedor
COPY . .

# Exponer el puerto 3001
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "app.js"]
