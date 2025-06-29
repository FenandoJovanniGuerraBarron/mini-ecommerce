const router = require("express").Router();
const userController = require("../controllers/user.controller");

// POST /api/users - Crear un nuevo usuario
router.post("/", userController.createUser);

module.exports = router;
