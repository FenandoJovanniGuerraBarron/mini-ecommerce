const router = require("express").Router();

const productsController = require("../controllers/product.controller");

// GET /api/products - Obtener todos los productos
router.get("/", productsController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get("/:id", productsController.getProductById);

module.exports = router;
