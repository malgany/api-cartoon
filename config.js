/**
 * Configurações da API
 */

// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

module.exports = {
  // Porta do servidor
  PORT: process.env.PORT || 9999,
  
  // Ambiente de execução
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Configurações de CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  
  // Limite para upload de arquivos
  FILE_SIZE_LIMIT: process.env.FILE_SIZE_LIMIT || '50mb',
  
  // Configurações de armazenamento de imagens
  STORAGE: {
    BASE_URL: process.env.STORAGE_BASE_URL || 'http://localhost:9999/uploads/',
    LOCAL_PATH: process.env.STORAGE_LOCAL_PATH || './uploads/'
  },

  // Configuração da API OpenAI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
}; 