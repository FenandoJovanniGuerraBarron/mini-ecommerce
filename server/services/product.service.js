const { Product } = require('../database/models');

// Obtener todos los productos
const findAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

// Obtener un producto por ID
const findProductById = async (id) => {
  try {
    const product = await Product.findOne({
      where: { id }
    });
    
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return product;
  } catch (error) {
    throw new Error('Error al obtener producto: ' + error.message);
  }
};

// Verificar si un producto existe
// const productExists = async (id) => {
//   try {
//     const product = await Product.findByPk(id);
//     return !!product;
//   } catch (error) {
//     return false;
//   }
// };

// Obtener productos por categoría
// const findProductsByCategory = async (category) => {
//   try {
//     const products = await Product.findAll({
//       where: { category },
//       attributes: ['id', 'name', 'description', 'price', 'stock', 'category', 'created_at']
//     });
//     return products;
//   } catch (error) {
//     throw new Error('Error al obtener productos por categoría: ' + error.message);
//   }
// };

module.exports = {
  findAllProducts,
  findProductById,
}; 