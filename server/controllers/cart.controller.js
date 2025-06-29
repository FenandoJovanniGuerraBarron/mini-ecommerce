const cartService = require('../services/cart.service');

// POST /api/cart/add - Agregar producto al carrito
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id; // Viene del middleware de autenticación
    
    // Validaciones básicas
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'productId es requerido'
      });
    }
    
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'La cantidad debe ser mayor a 0'
      });
    }
    
    // Agregar producto al carrito
    const result = await cartService.addToCart(userId, productId, quantity);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Producto agregado al carrito exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - agregar al carrito:', error);
    
    // Manejar errores específicos
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

// GET /api/cart - Obtener carrito del usuario
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Viene del middleware de autenticación
    
    // Obtener carrito del usuario
    const result = cartService.getCart(userId);
    
    res.status(200).json({
      success: true,
      data: result,
      message: 'Carrito obtenido exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener carrito:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// DELETE /api/cart - Limpiar carrito del usuario
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // Viene del middleware de autenticación
    
    // Limpiar carrito del usuario
    const result = cartService.clearCart(userId);
    
    res.status(200).json({
      success: true,
      message: 'Carrito limpiado exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - limpiar carrito:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// DELETE /api/cart/remove - Eliminar producto del carrito
const removeFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Viene del middleware de autenticación
    
    // Validaciones básicas
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'productId es requerido'
      });
    }
    
    // Eliminar producto del carrito
    const result = await cartService.removeFromCart(userId, productId, quantity);
    
    res.status(200).json({
      success: true,
      data: result,
      message: quantity ? `Producto removido del carrito exitosamente` : 'Producto eliminado del carrito exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - eliminar del carrito:', error);
    
    // Manejar errores específicos
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
  addToCart,
  getCart,
  clearCart,
  removeFromCart
}; 