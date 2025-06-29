'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'iPhone 15 Pro',
        description: 'El iPhone más avanzado con chip A17 Pro, cámara de 48MP y diseño en titanio. Incluye USB-C y Dynamic Island.',
        price: 999.99,
        stock: 25,
        category: 'Electronics',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'MacBook Air M2',
        description: 'Laptop ultraligera con chip M2, 13.6 pulgadas, hasta 18 horas de batería. Perfecta para trabajo y estudio.',
        price: 1199.99,
        stock: 15,
        category: 'Electronics',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nike Air Max 270',
        description: 'Zapatillas deportivas con tecnología Air Max, máxima comodidad y estilo. Ideales para running y uso diario.',
        price: 129.99,
        stock: 50,
        category: 'Sports',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Samsung 4K Smart TV 55"',
        description: 'Televisor 4K Ultra HD con Smart TV, HDR, y control por voz. Experiencia de entretenimiento inmersiva.',
        price: 599.99,
        stock: 10,
        category: 'Electronics',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Adidas Originals T-Shirt',
        description: 'Camiseta clásica de Adidas Originals, 100% algodón, diseño atemporal. Disponible en varios colores.',
        price: 29.99,
        stock: 100,
        category: 'Clothing',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
