FROM node:20.5.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# 5️⃣ Copia o restante do código para o contêiner
COPY . .

RUN npx prisma generate

# 6️⃣ Compila o código TypeScript para JavaScript
RUN npm run build

# 🔟 Expõe a porta da aplicação
EXPOSE 3000

# 1️⃣1️⃣ Executa `prisma migrate deploy` antes de iniciar a aplicação
CMD ["npm", "start", "start:prod"]