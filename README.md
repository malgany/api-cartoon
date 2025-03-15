# API do SnapToon

Uma API simples em Node.js para o aplicativo SnapToon, que permite transformar imagens em cartoons.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Navegue até a pasta da API:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

## Executando o servidor

Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática):
```bash
npm run dev
```

Para iniciar o servidor em modo de produção:
```bash
npm start
```

O servidor estará disponível em: http://localhost:9999

## Estrutura do Projeto

```
api/
├── config.js           # Configurações da aplicação
├── server.js           # Ponto de entrada da aplicação
├── controllers/        # Controladores da aplicação
│   └── transformController.js
├── models/             # Modelos de dados
│   └── Image.js
├── routes/             # Rotas da API
│   └── index.js
├── middlewares/        # Middlewares personalizados
│   └── errorHandler.js
└── uploads/            # Pasta para armazenamento de imagens
```

## Endpoints disponíveis

### GET /
Retorna informações básicas sobre a API.

**Resposta:**
```json
{
  "message": "Bem-vindo à API do SnapToon!",
  "status": "online",
  "version": "1.0.0"
}
```

### POST /transform
Transforma uma imagem em cartoon.

**Corpo da requisição:**
```json
{
  "imageData": "base64_encoded_image_data"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Imagem transformada com sucesso!",
  "image": {
    "id": 1678901234567,
    "name": "Cartoon 15/03/2023 10:30:45",
    "url": "https://exemplo.com/imagens/transformada.jpg",
    "createdAt": "2023-03-15T10:30:45.123Z"
  }
}
```

### GET /gallery
Retorna a lista de imagens transformadas na galeria.

**Resposta:**
```json
{
  "success": true,
  "images": [
    {
      "id": 1,
      "name": "Cartoon 1",
      "url": "https://exemplo.com/imagens/cartoon1.jpg",
      "createdAt": "2023-03-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Cartoon 2",
      "url": "https://exemplo.com/imagens/cartoon2.jpg",
      "createdAt": "2023-03-14T15:45:00Z"
    }
  ]
}
```

## Desenvolvimento

Esta API é um exemplo simples e não implementa a transformação real de imagens. Em uma implementação completa, você precisaria:

1. Integrar com uma biblioteca de processamento de imagens (como Sharp, Jimp ou uma API externa)
2. Implementar armazenamento de imagens (local ou em nuvem como AWS S3)
3. Adicionar autenticação e autorização
4. Implementar validação de entrada
5. Adicionar testes automatizados

## Variáveis de Ambiente

A API suporta as seguintes variáveis de ambiente:

- `PORT`: Porta em que o servidor será executado (padrão: 9999)
- `NODE_ENV`: Ambiente de execução (padrão: development)
- `CORS_ORIGIN`: Origem permitida para CORS (padrão: *)
- `FILE_SIZE_LIMIT`: Limite de tamanho para upload de arquivos (padrão: 50mb)
- `STORAGE_BASE_URL`: URL base para armazenamento de imagens
- `STORAGE_LOCAL_PATH`: Caminho local para armazenamento de imagens 