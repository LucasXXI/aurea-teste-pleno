# 🚀 Teste Técnico - Desenvolvedor Backend

Este projeto é um teste técnico para a vaga de **Desenvolvedor Backend**. Ele consiste em um sistema backend desenvolvido com **NestJS**, utilizando **Prisma ORM** para comunicação com o banco de dados **PostgreSQL**, além de **RabbitMQ** para processamento assíncrono de mensagens.

## 📌 Arquitetura do Projeto
Este projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas para garantir separação de responsabilidades e facilitar a manutenção. A estrutura do projeto é dividida nas seguintes camadas:

### **1️⃣ Application**
Contém as regras de negócio da aplicação, incluindo **casos de uso**, **DTOs** e **mapeadores**. Essa camada orquestra a lógica central da aplicação.

### **2️⃣ Domain**
Responsável por definir **entidades**, **enums**, **exceções** e **interfaces** que representam o núcleo do domínio da aplicação. Esta camada é independente de frameworks e tecnologias externas.

### **3️⃣ Infrastructure**
Abrange toda a infraestrutura necessária para a aplicação funcionar, como **banco de dados**, **mensageria (RabbitMQ)** e **módulos auxiliares**. É onde ficam as implementações técnicas.

### **4️⃣ Presentation**
Contém os **controllers**, responsáveis por expor a API e interagir com a camada de aplicação. Esta camada lida com a comunicação externa (HTTP, WebSockets, etc.).

Abaixo está a estrutura do projeto seguindo essa arquitetura:

```
📂 src
├── 📂 application
│   ├── 📂 dtos
│   │   ├── 📂 requests
│   │   ├── 📂 responses
│   ├── 📂 mappers
│   ├── 📂 useCases
├── 📂 domain
│   ├── 📂 entities
│   ├── 📂 enums
│   ├── 📂 exceptions
│   ├── 📂 interfaces
├── 📂 infrastructure
│   ├── 📂 csv
│   ├── 📂 database
│   ├── 📂 messaging
│   ├── 📂 modules
├── 📂 presentation
│   ├── 📂 controllers
│   ├── 📂 modules
├── 📄 app.module.ts
├── 📄 main.ts
```

Essa organização garante **baixa acoplamento e alta coesão**, seguindo os princípios da Clean Architecture para facilitar escalabilidade e manutenção do código.


## 📌 Tecnologias Utilizadas
- **Node.js** - Ambiente de execução
- **NestJS** - Framework backend
- **PostgreSQL** - Banco de dados Relacional
- **Prisma ORM** - Conexão com o PostgreSQL e Manipulação de dados
- **RabbitMQ** - Mensageria para filas de processamento
- **json-2-csv** - Conversão de JSON para CSV
- **Swagger (NestJS OpenAPI)** - Documentação da API
- **Docker e Docker Compose** - Containerização da aplicação

---

## 📌 Como Rodar o Projeto com Docker

### **1️⃣ Pré-requisitos**
- **Docker** e **Docker Compose** instalados

### **2️⃣ Clonar o Repositório**
```sh
git clone https://github.com/LucasXXI/aurea-teste-pleno
cd aurea-teste-pleno
```
### **3️⃣ Subir os Contêineres**
```sh
docker-compose -f docker-compose.yml up --build -d
```
✅ **Isso irá iniciar:**
- O servidor **NestJS** na porta `3000`
- O banco de dados **PostgreSQL** na porta `5432`
- O serviço de filas **RabbitMQ** nas portas `5672` e `15672`

### **4️⃣ Verificar se os Contêineres Estão Rodando**
```sh
docker ps
```

### **5️⃣ Aplicar as Migrations do Prisma** 
```sh
docker-compose -f docker-compose.yml exec app npm run prisma:migrate
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

### **AITs (Autos de Infração de Trânsito)**

| Método | Rota               | Descrição |
|--------|-------------------|------------|
| **POST** | `/ait`            | Registra AITs |
| **GET**  | `/ait`            | Lista todas as AITs |
| **GET**  | `/ait/:id`        | Busca uma AIT específica pelo ID |
| **PATCH** | `/ait/:id`        | Atualiza uma AIT específica |
| **DELETE** | `/ait/:id`        | Remove uma AIT |
| **PUT** | `/ait/process/pendings` | Processa as AITs pendentes, gera um CSV e publica no RabbitMQ |

🔹 **Observações:**
- O **processamento de AITs** altera o status das AITs criadas com o status **"PENDENTE"** para **"PAGO"** e gera um CSV com as informações processadas.
- Só poderão ser atualizadas as AITs que possuírem o status **"PENDENTE"**.
- O conteúdo do CSV gerado é enviado ao **RabbitMQ** para consumo posterior.

## 📌 Como Acessar o RabbitMQ e Ver as Mensagens Publicadas
### **1️⃣ Acessar o Painel de Administração do RabbitMQ**
Abra o navegador e acesse:
```
http://localhost:15672
```

### **2️⃣ Login no RabbitMQ**
Use as credenciais padrão configuradas no `docker-compose.yml`:
- **Usuário:** `rabbitmq`
- **Senha:** `rabbitmq`

### **3️⃣ Acessar a Fila de Mensagens**
1. No menu superior, clique em **"Queues"** (Filas).
2. Localize a fila onde as mensagens são publicadas.
3. Clique no nome da fila para visualizar detalhes.
4. Para ver as mensagens publicadas, role até a seção **"Get messages"** e clique em **"Get Message(s)"**.

### **4️⃣ Testar o Processamento na Rota `/process/pendings`**
Para processar as mensagens e publicá-las no RabbitMQ, faça uma requisição para:
```sh
curl -X PUT http://localhost:3000/ait/process/pendings
```
Após rodar essa rota, as mensagens serão enviadas para o RabbitMQ e poderão ser visualizadas seguindo os passos acima.

🔹 **Observações:**
- O **processamento de AITs** é realizado **somente** caso hajam AITs com status **"PENDENTE"** no Banco de Dados e retorna o CSV incluindo todas as AITs já processadas. Assim, garanta 
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
- [`@json2csv/plainjs`](https://www.npmjs.com/package/@json2csv/plainjs) → Biblioteca para converter objetos JSON em arquivos CSV, usados no processamento das AITs

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

📌 **LinkedIn:** https://linkedin.com/in/lucasleal2001 
📌 **GitHub:** https://github.com/lucasxxi  
📌 **Email:** lucasleal2001@gmail.com 

---