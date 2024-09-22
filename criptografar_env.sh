#!/bin/bash

# Caminho para o arquivo .env
ENV_FILE=".env"

# Nome do arquivo criptografado de saída
OUTPUT_FILE="env_criptografada"

# Solicitar senha ao usuário
echo "Digite a senha para criptografar o arquivo:"
read -s PASSWORD

# Verificar se o arquivo .env existe
if [ ! -f "$ENV_FILE" ]; then
  echo "Arquivo $ENV_FILE não encontrado!"
  exit 1
fi

# Criptografar o arquivo .env
openssl enc -aes-256-cbc -salt -in "$ENV_FILE" -out "$OUTPUT_FILE" -k "$PASSWORD"

# Verificar se o comando foi bem sucedido
if [ $? -eq 0 ]; then
  echo "Arquivo $ENV_FILE criptografado com sucesso e salvo como $OUTPUT_FILE."
else
  echo "Erro ao criptografar o arquivo!"
  exit 1
fi

