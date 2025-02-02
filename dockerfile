# 1️⃣ Usa a versão 20 do Node.js como base para a build
FROM node:20-alpine AS builder

# 2️⃣ Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3️⃣ Copia os arquivos do projeto para dentro do contêiner
COPY package.json package-lock.json ./

# 4️⃣ Instala apenas as dependências de produção
RUN npm install --only=production

# 5️⃣ Copia o restante do código para o contêiner
COPY . .

# 6️⃣ Compila o código TypeScript para JavaScript
RUN npm run build

# 7️⃣ Usa a versão 20 do Node.js como base final do contêiner
FROM node:20-alpine AS runner

# 8️⃣ Define o diretório de trabalho no contêiner
WORKDIR /app

# 9️⃣ Copia as dependências instaladas e o código compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# 🔟 Expõe a porta da aplicação
EXPOSE 3000

# 1️⃣1️⃣ Executa `prisma migrate deploy` antes de iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]