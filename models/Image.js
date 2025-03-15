/**
 * Modelo para representar uma imagem transformada
 * Em uma implementação real, isso seria um esquema de banco de dados
 */

class Image {
  constructor(id, name, url, createdAt = new Date().toISOString()) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.createdAt = createdAt;
  }

  // Método para converter para JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      createdAt: this.createdAt
    };
  }

  // Método estático para criar uma nova imagem
  static create(name, url) {
    const id = Date.now(); // Simples geração de ID baseada em timestamp
    return new Image(id, name, url);
  }

  // Método estático para simular uma galeria de imagens
  static getGallery() {
    return [
      new Image(1, 'Cartoon 1', 'https://exemplo.com/imagens/cartoon1.jpg', '2023-03-15T10:30:00Z'),
      new Image(2, 'Cartoon 2', 'https://exemplo.com/imagens/cartoon2.jpg', '2023-03-14T15:45:00Z')
    ];
  }
}

module.exports = Image; 