# 🚀 Teste Técnico - Desenvolvedor Backend Pleno | Aurea Phygital

Este projeto é um teste técnico para a vaga de **Desenvolvedor Backend Pleno** na **Aurea Phygital**. Ele consiste em um sistema backend desenvolvido com **NestJS**, utilizando **Prisma ORM** para comunicação com o banco de dados **PostgreSQL**, além de **RabbitMQ** para processamento assíncrono de mensagens.

---

## 📌 Tecnologias Utilizadas
- **Node.js 20** - Ambiente de execução
- **NestJS** - Framework backend
- **Prisma ORM** - Conexão com o PostgreSQL
- **PostgreSQL 17** - Banco de dados
- **RabbitMQ** - Mensageria para filas de processamento
- **json2csv** - Conversão de JSON para CSV
- **amqplib** - Conexão com o RabbitMQ
- **class-validator** - Validação de dados
- **Swagger (NestJS OpenAPI)** - Documentação da API
- **Docker e Docker Compose** - Containerização da aplicação

---

## 📌 Como Rodar o Projeto com Docker

### **1️⃣ Pré-requisitos**
- **Docker** e **Docker Compose** instalados

### **2️⃣ Clonar o Repositório**
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### **3️⃣ Criar o Arquivo `.env`**
```sh
touch .env
```
📌 **Adicione as variáveis de ambiente:**
```env
DATABASE_URL=postgresql://postgres:1234@postgres:5432/postgres?schema=public
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=rabbitmq
RABBITMQ_PASSWORD=rabbitmq
```

### **4️⃣ Subir os Contêineres**
```sh
docker-compose up -d --build
```
✅ **Isso irá iniciar:**
- O servidor **NestJS** na porta `3000`
- O banco de dados **PostgreSQL** na porta `5432`
- O serviço de filas **RabbitMQ** nas portas `5672` e `15672`

### **5️⃣ Verificar se os Contêineres Estão Rodando**
```sh
docker ps
```

### **6️⃣ Aplicar as Migrations do Prisma** (caso necessário)
```sh
docker-compose exec app npx prisma migrate deploy
```

---

## 📌 Acesso ao Swagger
A API possui documentação interativa via **Swagger**. Acesse:
```
http://localhost:3000/swagger
```
📌 **Principais funcionalidades do Swagger:**
- Visualizar todas as rotas da API
- Testar requisições diretamente no navegador
- Ver detalhes dos DTOs e modelos de entrada/saída

---

## 📌 Rotas da API

### **1️⃣ AITs (Autos de Infração de Trânsito)**

| Método | Rota               | Descrição |
|--------|-------------------|------------|
| **GET**  | `/ait`            | Lista todas as AITs |
| **GET**  | `/ait/:id`        | Busca uma AIT específica pelo ID |
| **PATCH** | `/ait/:id`        | Atualiza parcialmente uma AIT |
| **DELETE** | `/ait/:id`        | Remove uma AIT |
| **PUT** | `/ait/process/pendings` | Processa as AITs pendentes, gera um CSV e publica no RabbitMQ |

🔹 **Observações:**
- O **processamento de AITs** altera o status das pendentes para **"PAGO"** e gera um CSV com as informações processadas.
- O CSV é enviado ao **RabbitMQ** para consumo posterior.

---

## 📌 Bibliotecas Externas Utilizadas

### **1️⃣ Conexão com Banco de Dados**
- [`@prisma/client`](https://www.npmjs.com/package/@prisma/client) → Cliente do Prisma para acessar o banco de dados PostgreSQL
- [`pg`](https://www.npmjs.com/package/pg) → Driver do PostgreSQL para Node.js

### **2️⃣ Validação de Dados**
- [`class-validator`](https://www.npmjs.com/package/class-validator) → Biblioteca para validação de DTOs na API
- [`class-transformer`](https://www.npmjs.com/package/class-transformer) → Biblioteca para transformar objetos de entrada/saída

### **3️⃣ Mensageria (RabbitMQ)**
- [`amqplib`](https://www.npmjs.com/package/amqplib) → Biblioteca para conexão com o RabbitMQ e envio de mensagens assíncronas

### **4️⃣ Conversão de JSON para CSV**
- [`json2csv`](https://www.npmjs.com/package/json2csv) → Biblioteca para converter objetos JSON em arquivos CSV, usados no processamento das AITs

### **5️⃣ Documentação da API**
- [`@nestjs/swagger`](https://www.npmjs.com/package/@nestjs/swagger) → Biblioteca para documentar as rotas da API via Swagger

### **6️⃣ Execução no Docker**
- [`docker`](https://www.docker.com/) → Para rodar os serviços em containers
- [`docker-compose`](https://docs.docker.com/compose/) → Para orquestrar os serviços da aplicação

---

## 📌 Como Contribuir
1. Faça um **fork** do repositório.
2. Crie uma **branch** para a sua funcionalidade:
   ```sh
   git checkout -b minha-feature
   ```
3. Faça **commit** das suas alterações:
   ```sh
   git commit -m "Adicionando nova feature"
   ```
4. Envie para o repositório remoto:
   ```sh
   git push origin minha-feature
   ```
5. Crie um **Pull Request** no GitHub.

---

## 📌 Autor
Desenvolvido por **Lucas Leal** 🚀

📌 **LinkedIn:** [Seu Perfil](https://linkedin.com/in/lucasleal2001)  
📌 **GitHub:** [Seu GitHub](https://github.com/lucasxxi)  
📌 **Email:** lucasleal2001@gmail.com 

---

## 📌 Licença
Este projeto está sob a licença **MIT**. Sinta-se livre para usá-lo e modificá-lo. 😊

