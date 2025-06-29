const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Aplicar middleware de autenticación a todas las rutas del carrito
router.use(authenticateToken);

// POST /api/cart/add - Agregar producto al carrito
router.post("/add", cartController.addToCart);

// GET /api/cart - Obtener carrito del usuario
router.get("/", cartController.getCart);

// DELETE /api/cart/remove - Eliminar producto del carrito
router.delete("/remove", cartController.removeFromCart);

// PUT /api/cart/update - Actualizar cantidad de producto en el carrito
router.patch("/update", cartController.removeFromCart);

// DELETE /api/cart - Limpiar carrito del usuario
router.delete("/", cartController.clearCart);

module.exports = router; 