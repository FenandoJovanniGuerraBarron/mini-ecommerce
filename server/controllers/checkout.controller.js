const checkoutService = require('../services/checkout.service');

// POST /api/checkout - Procesar checkout del carrito
const processCheckout = async (req, res) => {
  try {
    const userId = req.user.id; // Viene del middleware de autenticación
    
    // Procesar checkout
    const result = await checkoutService.processCheckout(userId);
    
    res.status(201).json({
      success: true,
      data: result,
      message: 'Orden creada exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - checkout:', error);
    
    // Manejar errores específicos
    if (error.message.includes('vacío')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    if (error.message.includes('Stock insuficiente')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
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

// GET /api/orders - Obtener órdenes del usuario
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const orders = await checkoutService.getUserOrders(userId);
    
    res.status(200).json({
      success: true,
      data: orders,
      message: 'Órdenes obtenidas exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener órdenes:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// GET /api/orders/:id - Obtener una orden específica
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const order = await checkoutService.getOrderById(id, userId);
    
    res.status(200).json({
      success: true,
      data: order,
      message: 'Orden obtenida exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener orden:', error);
    
    if (error.message.includes('no encontrada')) {
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
  processCheckout,
  getUserOrders,
  getOrderById
}; 