## Resumo
Esse foi um projeto simples para cobrar os caloteiros que nao pagam assinaturas "familia".
Usei para aprimorar tecnicas de DDD, SQL e Clean Architecture.

## Techs
- **WAHA + Venom -** Automação whatsapp, expõe endpoints para envio de mensagens, autenticação e afins.
- **Serverless/AWS Lambda -** Configuração de cron jobs facilitada.
- **PostgreSQL -** Banco.
- **PNPM -** Gerenciador de pacotes.
- **Axios -** Conexão com apis externas.
- **Zod -** Validação de entrada de dados.
- **Docker -** Composer e Image para criar ambiente completo com WhatsApp API e Serverless.


## O que a parada faz?
- [x] Cadastra a chave pix - foi
- [X] Cadastra dono da assinatura
- [X] Cadastra cobrancas
- [X] Adiciona time(envolvidos) na cobranca
- [X] Envia mensagem de cobranca para os caloteiros na data determinada
- [X] Listagem de charges do administrador
- [ ] Testes unitarios
  - [ ] Entidades/models
  - [ ] Usecases
- [ ] Adicionar "taxa do agiota" no calculo de cobranca
- [ ] Cria fila para envio de mensagens
- [ ] Frontend pra quem nao sabe usar postman
- [ ] Adicionar autenticacao e validar em todas rotas que tem owner_id no usecase
- [ ] Historico de disparos


## Endpoints
### Admin
- /admin/register - Primeiro passo de todos, criar um usuario.
### Charges - Precisa de um administrador
- /charge/register - Um administrador cria uma cobranca
- /charge/{chargeId}/add-team - Um administrador adiciona um time a cobranca
- /charge/{chargeId}/call - Dispara envio de mensagens para os caloteiros 
- /charge/list - Lista todos agendamentos de cobranca

## Como usar

### Opção 1: Docker Compose (Recomendado)
Você precisa apenas do Docker instalado na sua máquina.
- Clone o repositório
- (Opcional) Crie um arquivo `.env` baseado no arquivo `.env.example` - valores padrão são fornecidos
- Execute o comando `docker-compose up -d` para iniciar todos os serviços
- Aguarde todos os serviços iniciarem (pode levar alguns segundos)
- A API Serverless estará disponível em `http://localhost:4000`
- O WhatsApp HTTP API estará disponível em `http://localhost:4040`
- PostgreSQL estará disponível em `localhost:5432` (usuário: caloteiros, senha: caloteiros123)

#### Verificar se tudo está funcionando:
- Acesse `http://localhost:4000/health` para verificar o status da API e conexão com banco de dados

#### Comandos úteis do Docker:
- `npm run docker:up` - Inicia todos os containers
- `npm run docker:down` - Para todos os containers
- `npm run docker:build` - Reconstrói as imagens
- `npm run docker:logs` - Visualiza os logs dos containers

### Opção 2: Desenvolvimento Local
Você precisa de Docker e Node previamente instalado na sua máquina.
- Clone o repositório
- Mantenha o Docker Desktop aberto.
- Instale as dependências utilizando o comando `pnpm install` ou `npm install`
- Instale o framework serverless `npm install -g serverless`
- Crie um arquivo `.env` baseado no arquivo `.env.example`
- Rode o comando `pnpm dev` ou `npm run dev`
