# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o conteúdo do diretório local para o diretório de trabalho do contêiner
COPY . .

# Construa o aplicativo React para produção
RUN npm run build

# Exponha a porta que o aplicativo React estará ouvindo
EXPOSE 8080

# Comando a ser executado quando o contêiner for iniciado
CMD ["npm", "start"]