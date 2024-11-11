# Usa una imagen base oficial de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto en el que se ejecutará el servicio
EXPOSE 3001

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
