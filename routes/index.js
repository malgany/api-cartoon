const express = require('express');
const router = express.Router();
const transformController = require('../controllers/transformController');

// Rota raiz
router.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API do SnapToon!',
    status: 'online',
    version: '1.0.0'
  });
});

// Rotas para transformação de imagens
router.post('/transform', transformController.transformImage);

// Rotas para galeria
router.get('/gallery', transformController.getGallery);

// Nova rota para upload de imagens compactadas
router.post('/upload-image', transformController.uploadImage);

// Rota para obter a imagem cartoon
router.post('/get-cartoon', (req, res, next) => {
  console.log('📝 [API] Rota /get-cartoon acessada');
  console.log('📝 [API] Corpo da requisição:', req.body);
  next();
}, transformController.getCartoonImage);

module.exports = router; 