# Correções para Deploy - Erro "serverless: not found"

## Problema Identificado
O container da API estava falhando com o erro `sh: serverless: not found` porque o framework Serverless não estava instalado no container.

## Correções Implementadas

### 1. Dockerfile Atualizado
- ✅ Adicionada instalação global do serverless: `RUN npm install -g serverless`
- ✅ Adicionado serverless como dependência de desenvolvimento no package.json
- ✅ Criado script de inicialização robusto (`start.sh`)
- ✅ Atualizado ENTRYPOINT para usar o script de inicialização

### 2. Script de Inicialização (`start.sh`)
- ✅ Verifica se o serverless está instalado
- ✅ Tenta instalar automaticamente se não encontrado
- ✅ Fallback para usar `npx serverless` se necessário
- ✅ Logs informativos para debug

### 3. Package.json Atualizado
- ✅ Adicionado `"serverless": "^3.40.0"` nas devDependencies

### 4. Docker Compose Atualizado
- ✅ Atualizado comando para usar o script de inicialização

## Como Testar

1. **Reconstruir a imagem:**
   ```bash
   docker-compose build serverless-api
   ```

2. **Iniciar os serviços:**
   ```bash
   docker-compose up -d
   ```

3. **Verificar logs:**
   ```bash
   docker-compose logs -f serverless-api
   ```

4. **Testar a API:**
   ```bash
   curl http://localhost:4000/health
   ```

## Estrutura de Arquivos Modificados

- `Dockerfile` - Instalação do serverless e script de inicialização
- `start.sh` - Script robusto de inicialização (novo)
- `package.json` - Adicionada dependência do serverless
- `docker-compose.override.yml` - Comando atualizado

## Próximos Passos

1. Testar o deploy em ambiente de desenvolvimento
2. Verificar se todas as funcionalidades estão funcionando
3. Considerar otimizações adicionais se necessário