const authService = require("../services/auth.service");

// Middleware para verificar token JWT
const authenticateToken = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    // Verificar si existe el token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de acceso requerido",
      });
    }

    // Verificar y decodificar el token
    const decoded = authService.verifyToken(token);

    // Obtener el usuario de la base de datos
    const user = await authService.getUserFromToken(token);

    // Agregar el usuario al objeto request
    req.user = user;
    req.userId = user.id;

    // Continuar con la siguiente función
    next();
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);

    // Manejar errores específicos de JWT
    if (error.message.includes("expirado")) {
      return res.status(401).json({
        success: false,
        message: "Token expirado",
      });
    }

    if (error.message.includes("inválido")) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      });
    }

    if (error.message.includes("no encontrado")) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Error genérico
    return res.status(401).json({
      success: false,
      message: "No autorizado",
    });
  }
};

module.exports = {
  authenticateToken,
};
