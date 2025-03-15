/**
 * Controller para transformação de imagens
 */
const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
// Removendo a dependência do sharp
// const sharp = require('sharp');
const config = require('../config');

// Configuração da API OpenAI
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY
});

// Função para transformar uma imagem em cartoon
exports.transformImage = (req, res) => {
  // Verificar se a imagem foi enviada
  if (!req.body.imageData) {
    return res.status(400).json({
      success: false,
      message: 'Nenhuma imagem foi enviada'
    });
  }

  // Aqui seria implementada a lógica real de transformação da imagem
  // Por enquanto, apenas simulamos o processamento com um timeout
  
  setTimeout(() => {
    // Criar uma nova imagem usando o modelo
    const newImage = Image.create(
      'Cartoon ' + new Date().toLocaleString('pt-BR'),
      'https://exemplo.com/imagens/transformada.jpg'
    );
    
    res.json({
      success: true,
      message: 'Imagem transformada com sucesso!',
      image: newImage.toJSON()
    });
  }, 1500); // Simula um atraso de processamento
};

// Função para listar imagens da galeria
exports.getGallery = (req, res) => {
  // Obter a galeria de imagens do modelo
  const galleryImages = Image.getGallery();
  
  res.json({
    success: true,
    images: galleryImages
  });
};

// Função para receber imagens compactadas do frontend
exports.uploadImage = (req, res) => {
  console.log('🖼️ [API] Requisição de upload de imagem recebida!');
  
  // Verificar se a imagem foi enviada
  if (!req.body.imageData) {
    console.log('❌ [API] ERRO: Nenhuma imagem foi enviada na requisição');
    return res.status(400).json({
      success: false,
      message: 'Nenhuma imagem foi enviada'
    });
  }

  try {
    // Log do tamanho da imagem recebida
    console.log(`📊 [API] Tamanho da imagem recebida: ${(req.body.imageData.length / 1024).toFixed(2)} KB`);
    
    // Extrair a string base64 (removendo o prefixo "data:image/jpeg;base64,")
    const base64Data = req.body.imageData.replace(/^data:image\/\w+;base64,/, '');
    
    // Criar um buffer a partir dos dados base64
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Criar novo registro de imagem no modelo - gerando o ID primeiro
    const newImage = Image.create(
      'Imagem ' + new Date().toLocaleString('pt-BR'),
      '' // URL será atualizada depois
    );
    
    // Usar o ID gerado para o nome do arquivo
    const fileName = `image_${newImage.id}.jpg`;
    
    // Caminho para salvar o arquivo
    const filePath = path.join(__dirname, '../uploads', fileName);
    
    // Salvar a imagem no servidor
    fs.writeFileSync(filePath, buffer);
    
    // Log do tamanho do arquivo salvo
    const stats = fs.statSync(filePath);
    console.log(`💾 [API] Imagem salva com sucesso! Tamanho do arquivo: ${(stats.size / 1024).toFixed(2)} KB`);
    
    // URL pública para acessar a imagem e atualizar no modelo
    const imageUrl = `/uploads/${fileName}`;
    console.log(`🔗 [API] URL da imagem: ${imageUrl}`);
    newImage.url = imageUrl;
    
    // Responder com sucesso
    console.log(`✅ [API] Imagem processada com sucesso! ID: ${newImage.id}`);
    res.json({
      success: true,
      message: 'Imagem enviada e salva com sucesso!',
      imageId: newImage.id,
      image: newImage.toJSON()
    });
  } catch (error) {
    console.error('❌ [API] ERRO ao processar imagem:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar a imagem',
      error: error.message
    });
  }
};

// Função para obter a imagem cartoon
exports.getCartoonImage = async (req, res) => {
  console.log('🎨 [API] Requisição para obter imagem cartoon recebida!');
  
  // Verificar se o ID da imagem foi enviado
  if (!req.body.imageId) {
    console.log('❌ [API] ERRO: ID da imagem não foi enviado na requisição');
    return res.status(400).json({
      success: false,
      message: 'ID da imagem não foi enviado'
    });
  }

  try {
    const imageId = req.body.imageId;
    console.log(`🔍 [API] Buscando imagem com ID: ${imageId}`);
    
    // Verificar se a imagem original existe
    const originalImagePath = path.join(__dirname, '..', 'uploads', `image_${imageId}.jpg`);
    
    if (fs.existsSync(originalImagePath)) {
      // Implementação real da transformação em cartoon
      console.log('🔄 [API] Iniciando processo de transformação em cartoon...');
      
      // Etapa 1: Converter a imagem para base64 para enviar à API OpenAI
      const imageBuffer = fs.readFileSync(originalImagePath);
      const imageBase64 = imageBuffer.toString('base64');
      
      // Etapa 2: Usar a API GPT para identificar o elemento principal na imagem
      // Atualizando o modelo de gpt-4-vision-preview para gpt-4o que tem capacidade de visão
      console.log('🧠 [API] Analisando elementos principais da imagem com GPT...');
      const analysisResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an assistant specialized in image analysis. Identify the main element in the image, describing it in detail: what it is, its predominant colors, shape, distinctive features, and type (object, animal, person, etc.). Be concise and precise, avoiding the description of details that are not essential for identifying the main element, such as the background, etc."
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Identify and describe in detail the main element in this image." },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 300
      });
      
      const imageDescription = analysisResponse.choices[0].message.content;
      console.log(`📝 [API] Descrição da imagem: ${imageDescription}`);
      
      // Etapa 3: Gerar uma imagem cartoon baseada na descrição
      console.log('🎭 [API] Gerando imagem cartoon com DALL-E...');
      
      // Criar prompt personalizado para a imagem cartoon
      const cartoonPrompt = `Create a classic and fun cartoon version of the following element: ${imageDescription}. 
      The cartoon should have a classic style with small arms and white gloves, rounded shoes, and large expressive eyes, 
      similar to the animated cartoons from the Golden Age of animation. 
      Important 1: The background should be pure white to highlight the main character. 
      Important 2: Keep only one main element in the image.`;
      
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: cartoonPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json"
      });
      
      // Obter a imagem em base64
      const cartoonBase64 = imageResponse.data[0].b64_json;
      
      // Salvar a imagem gerada
      const cartoonImagePath = path.join(__dirname, '..', 'uploads', `cartoon_${imageId}.jpg`);
      const cartoonBuffer = Buffer.from(cartoonBase64, 'base64');
      fs.writeFileSync(cartoonImagePath, cartoonBuffer);
      
      console.log(`✅ [API] Imagem cartoon gerada e salva com sucesso!`);
      
      // Retornar a imagem em base64
      return res.json({
        success: true,
        message: 'Imagem cartoon gerada com sucesso!',
        cartoonImageBase64: `data:image/jpeg;base64,${cartoonBase64}`
      });
    } else {
      console.log(`❌ [API] ERRO: Imagem original não encontrada`);
      return res.status(404).json({
        success: false,
        message: 'Imagem original não encontrada'
      });
    }
  } catch (error) {
    console.error('❌ [API] ERRO ao processar imagem cartoon:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar a imagem cartoon',
      error: error.message
    });
  }
}; 