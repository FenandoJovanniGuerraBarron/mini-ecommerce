const router = require("express").Router();
const checkoutController = require("../controllers/checkout.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

// Aplicar middleware de autenticación a todas las rutas
router.use(authenticateToken);

// POST /api/checkout - Procesar checkout del carrito
router.post("/", checkoutController.processCheckout);

// GET /api/orders - Obtener órdenes del usuario
router.get("/orders", checkoutController.getUserOrders);

// GET /api/orders/:id - Obtener una orden específica
router.get("/orders/:id", checkoutController.getOrderById);

module.exports = router; 