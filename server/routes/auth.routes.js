const router = require("express").Router();

const authController = require("../controllers/auth.controller");

// POST /api/login - Autenticación de usuario
router.post("/login", authController.login);

module.exports = router;
