const { Product } = require('../database/models');

// Almacenamiento en memoria para el carrito (sesión)
const cartSessions = new Map();

// Agregar producto al carrito
const addToCart = async (userId, productId, quantity = 1) => {
  try {
    // Convertir quantity a número
    const numericQuantity = parseInt(quantity);
    
    // Verificar que el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Obtener o crear carrito del usuario
    let userCart = cartSessions.get(userId) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = userCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      // Actualizar cantidad si ya existe (suma numérica)
      userCart[existingItemIndex].quantity += numericQuantity;
    } else {
      // Agregar nuevo item
      userCart.push({
        productId: productId,
        quantity: numericQuantity,
        price: product.price,
        name: product.name
      });
    }

    // Guardar carrito actualizado
    cartSessions.set(userId, userCart);
    
    return userCart;
  } catch (error) {
    throw new Error('Error al agregar producto al carrito: ' + error.message);
  }
};

// Eliminar producto del carrito
const removeFromCart = async (userId, productId, quantity = null) => {
  try {
    // Verificar que el producto existe
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Obtener carrito del usuario
    let userCart = cartSessions.get(userId) || [];
    
    // Buscar el producto en el carrito
    const existingItemIndex = userCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    const existingItem = userCart[existingItemIndex];

    // Si no se especifica cantidad, eliminar todo el producto
    if (quantity === null) {
      userCart.splice(existingItemIndex, 1);
    } else {
      // Convertir quantity a número
      const numericQuantity = parseInt(quantity);
      
      if (numericQuantity <= 0) {
        throw new Error('La cantidad debe ser mayor a 0');
      }
      
      if (numericQuantity >= existingItem.quantity) {
        // Si la cantidad a eliminar es mayor o igual, eliminar todo el producto
        userCart.splice(existingItemIndex, 1);
      } else {
        // Reducir la cantidad del producto
        existingItem.quantity -= numericQuantity;
      }
    }

    // Guardar carrito actualizado
    cartSessions.set(userId, userCart);
    
    return userCart;
  } catch (error) {
    throw new Error('Error al eliminar producto del carrito: ' + error.message);
  }
};

// Obtener carrito del usuario
const getCart = (userId) => {
  try {
    const userCart = cartSessions.get(userId) || [];
    
    return {
      items: userCart,
      totalItems: userCart.reduce((total, item) => total + item.quantity, 0),
      totalPrice: userCart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
  } catch (error) {
    throw new Error('Error al obtener carrito: ' + error.message);
  }
};

// Limpiar carrito del usuario
const clearCart = (userId) => {
  try {
    cartSessions.delete(userId);
    return true;
  } catch (error) {
    throw new Error('Error al limpiar carrito: ' + error.message);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart
}; 