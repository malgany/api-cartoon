const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const path = require('path');

// Inicializa o app Express
const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: config.FILE_SIZE_LIMIT }));
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração das rotas
app.use('/', routes);

// Middleware de tratamento de erros
app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em http://localhost:${PORT}`);
  console.log(`Ambiente: ${config.NODE_ENV}`);
}); 