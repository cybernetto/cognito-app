#!/bin/bash

# Nome do arquivo criptografado
ENCRYPTED_FILE="env_criptografada"

# Nome do arquivo de saída
OUTPUT_FILE=".env"

# Solicitar senha ao usuário
echo "Digite a senha para descriptografar o arquivo:"
read -s PASSWORD

# Verificar se o arquivo criptografado existe
if [ ! -f "$ENCRYPTED_FILE" ]; then
  echo "Arquivo $ENCRYPTED_FILE não encontrado!"
  exit 1
fi

# Verificar se o arquivo .env já existe
if [ -f "$OUTPUT_FILE" ]; then
  echo "O arquivo $OUTPUT_FILE já existe. Descriptografia cancelada para evitar substituição."
  exit 1
fi

# Descriptografar o arquivo
openssl enc -aes-256-cbc -d -in "$ENCRYPTED_FILE" -out "$OUTPUT_FILE" -k "$PASSWORD"

# Verificar se o comando foi bem sucedido
if [ $? -eq 0 ]; then
  echo "Arquivo $ENCRYPTED_FILE descriptografado com sucesso e salvo como $OUTPUT_FILE."
else
  echo "Erro ao descriptografar o arquivo!"
  exit 1
fi

