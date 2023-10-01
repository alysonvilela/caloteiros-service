## Resumo
Esse foi um projeto simples para cobrar os caloteiros que nao pagam assinaturas "familia".
Usei para aprimorar tecnicas de DDD, SQL e Clean Architecture.

## Techs
- **WAHA + Venom -** Automacao whatsapp, expoe endpoints para envio de mensagens, autenticacao e afins.
- **Serverless/AWS Lambda -** Configuracao de cron jobs facilitada.
- **PostgreSQL -** Banco.
- **PNPM -** Gerenciador de pacotes.
- **Axios -** Conexao com apis externas.
- **Zod -** Validacao de entrada de dados.


## O que a parada faz?
- [x] Cadastra a chave pix - foi
- [X] Cadastra dono da assinatura
- [X] Cadastra cobrancas
- [X] Adiciona time(envolvidos) na cobranca
- [X] Envia mensagem de cobranca para os caloteiros na data determinada
- [ ] Adicionar "taxa do agiota" no calculo de cobranca
- [ ] Cria fila para envio de mensagens
- [ ] Frontend pra quem nao sabe usar postman
- [ ] Adicionar autenticacao e validar em todas rotas que tem owner_id no usecase
