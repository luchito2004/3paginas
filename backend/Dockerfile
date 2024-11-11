# Usa la imagen base de Node.js
FROM node:14

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de tu aplicación
COPY . .

# Expone el puerto que usará tu servidor (3000 en este caso)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["node", "server.js"] 
