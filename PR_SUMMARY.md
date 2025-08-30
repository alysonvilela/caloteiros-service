# PR: Correção do Erro "serverless: not found" no Deploy

## 🐛 Problema
O container da API estava falhando com múltiplos erros `sh: serverless: not found` durante a inicialização, impedindo o deploy da aplicação.

## 🔧 Soluções Implementadas

### 1. **Dockerfile** - Instalação do Serverless Framework
```dockerfile
# Adicionado após instalação do pnpm
RUN npm install -g serverless
```

### 2. **Script de Inicialização Robusto** (`start.sh`)
- ✅ Verifica se o serverless está instalado
- ✅ Instala automaticamente se não encontrado
- ✅ Fallback para `npx serverless` se necessário
- ✅ Logs informativos para debug

### 3. **Package.json** - Dependência Adicionada
```json
"devDependencies": {
  "serverless": "^3.40.0",
  // ... outras dependências
}
```

### 4. **Docker Compose** - Comando Atualizado
- ✅ Atualizado para usar o script de inicialização
- ✅ Melhor tratamento de erros

## 📁 Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `Dockerfile` | Instalação global do serverless + script de inicialização |
| `start.sh` | **NOVO** - Script robusto de inicialização |
| `package.json` | Adicionada dependência do serverless |
| `docker-compose.override.yml` | Comando atualizado |
| `DEPLOY_FIX.md` | **NOVO** - Documentação das correções |

## 🧪 Como Testar

1. **Reconstruir a imagem:**
   ```bash
   docker compose build serverless-api
   ```

2. **Iniciar os serviços:**
   ```bash
   docker compose up -d
   ```

3. **Verificar logs:**
   ```bash
   docker compose logs -f serverless-api
   ```

4. **Testar endpoint de saúde:**
   ```bash
   curl http://localhost:4000/health
   ```

## ✅ Resultado Esperado

- ❌ **Antes:** `sh: serverless: not found` (múltiplos erros)
- ✅ **Depois:** Container inicia corretamente com serverless offline rodando

## 🔍 Logs Esperados

```
Iniciando container serverless...
Serverless encontrado. Iniciando servidor...
Starting Offline at stage dev (us-east-1)
Offline [http for lambda] listening on http://0.0.0.0:4000
```

## 🚀 Benefícios

1. **Robustez:** Script de inicialização com fallbacks
2. **Debug:** Logs informativos para troubleshooting
3. **Compatibilidade:** Funciona com diferentes versões do Docker
4. **Manutenibilidade:** Código mais limpo e documentado

## 📋 Checklist

- [x] Identificar causa raiz do problema
- [x] Implementar instalação do serverless no Dockerfile
- [x] Criar script de inicialização robusto
- [x] Adicionar dependência no package.json
- [x] Atualizar docker-compose
- [x] Documentar correções
- [x] Criar instruções de teste