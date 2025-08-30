#!/bin/sh

# Script de inicialização para o container serverless
echo "Iniciando container serverless..."

# Verificar se o serverless está instalado
if ! command -v serverless &> /dev/null; then
    echo "ERRO: serverless não encontrado. Tentando instalar..."
    npm install -g serverless
fi

# Verificar novamente se o serverless está disponível
if ! command -v serverless &> /dev/null; then
    echo "ERRO: Falha ao instalar serverless. Tentando com npx..."
    npx serverless offline start --host 0.0.0.0
else
    echo "Serverless encontrado. Iniciando servidor..."
    serverless offline start --host 0.0.0.0
fi