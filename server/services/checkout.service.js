const { Order, OrderItem, Product } = require("../database/models");
const cartService = require("./cart.service");

// Procesar checkout del carrito
const processCheckout = async (userId) => {
  try {
    // Obtener el carrito del usuario
    const cartData = cartService.getCart(userId);

    // Verificar que el carrito no esté vacío
    if (cartData.items.length === 0) {
      throw new Error("El carrito está vacío");
    }

    // Verificar stock de todos los productos
    for (const item of cartData.items) {
      const product = await Product.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para el producto: ${product.name}`);
      }
    }

    // Crear la orden
    const order = await Order.create({
      userId: userId,
      totalAmount: cartData.totalPrice,
      status: "pending",
    });

    // Crear los items de la orden
    const orderItems = [];
    for (const item of cartData.items) {
      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.price,
      });

      // Actualizar stock del producto
      const product = await Product.findOne({ where: { id: item.productId } });
      await product.update({
        stock: product.stock - item.quantity,
      });

      orderItems.push(orderItem);
    }

    // Limpiar el carrito después del checkout exitoso
    cartService.clearCart(userId);

    return {
      order: order,
      items: orderItems,
      total: cartData.totalPrice,
    };
  } catch (error) {
    throw new Error("Error al procesar checkout: " + error.message);
  }
};

// Obtener órdenes del usuario
const getUserOrders = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return orders;
  } catch (error) {
    throw new Error("Error al obtener órdenes: " + error.message);
  }
};

// Obtener una orden específica
const getOrderById = async (orderId, userId) => {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId,
      },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new Error("Orden no encontrada");
    }

    return order;
  } catch (error) {
    throw new Error("Error al obtener orden: " + error.message);
  }
};

module.exports = {
  processCheckout,
  getUserOrders,
  getOrderById,
};
