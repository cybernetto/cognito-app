# Usar a imagem do Node.js como base
FROM node:20

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do aplicativo
COPY . .

# Expor a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]

