const productService = require('../services/product.service');

// GET /api/products - Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts();
    
    res.status(200).json({
      success: true,
      data: products,
      message: 'Productos obtenidos exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// GET /api/products/:id - Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validación básica del ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido'
      });
    }
    
    const product = await productService.findProductById(id);
    
    res.status(200).json({
      success: true,
      data: product,
      message: 'Producto obtenido exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener producto por ID:', error);
    
    if (error.message.includes('no encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById
}; 