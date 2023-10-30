# Use uma imagem Node.js como imagem base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Exponha a porta que o servidor Node.js está ouvindo (se for a porta 3000)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "config/db.js"]
