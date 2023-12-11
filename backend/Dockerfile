# Use uma imagem Node.js como imagem base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

CMD ["sh", "-c", "sleep 10 && npm run server"]

ENV MONGODB_URI="mongodb+srv://${dbUser}:${dbPassword}@cluster0.yaxtfon.mongodb.net/?retryWrites=true&w=majority"
# Copie todo o código-fonte para o contêiner
COPY . .

# Exponha a porta que o servidor Node.js está ouvindo (se for a porta 3000)
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "run", "server"]