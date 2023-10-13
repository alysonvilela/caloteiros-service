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
- **Docker -** Composer e Image para criar ambiente.


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
Você precisa de Docker e Node previamente instalado na sua máquina.
- Clone o repositório
- Mantenha o Docker Desktop aberto.
- Instale as dependências utilizando o comando `pnpm install` ou `npm install`
- Instale o framework serverless `npm install -g serverless`
- Crie um arquivo `.env` baseado no arquivo `.env.example`
- Rode o comando `pnpm dev` ou `npm run dev`
