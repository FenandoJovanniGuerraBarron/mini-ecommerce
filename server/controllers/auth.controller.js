const authService = require('../services/auth.service');

// POST /api/login - Autenticación de usuario
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validaciones básicas
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos'
      });
    }
    
    // Intentar login
    const result = await authService.loginUser(username, password);
    
    res.status(200).json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      },
      message: 'Login exitoso'
    });
  } catch (error) {
    console.error('Error en controlador - login:', error);
    
    // Manejar errores específicos de autenticación
    if (error.message.includes('incorrectos')) {
      return res.status(401).json({
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

// GET /api/auth/me - Obtener usuario actual (requiere token)
const getCurrentUser = async (req, res) => {
  try {
    // El middleware de autenticación ya verificó el token
    // y agregó el usuario a req.user
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: user,
      message: 'Usuario obtenido exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - obtener usuario actual:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// POST /api/auth/verify - Verificar token
const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token es requerido'
      });
    }
    
    const decoded = authService.verifyToken(token);
    const user = await authService.getUserFromToken(token);
    
    res.status(200).json({
      success: true,
      data: {
        valid: true,
        user: user
      },
      message: 'Token válido'
    });
  } catch (error) {
    console.error('Error en controlador - verificar token:', error);
    
    if (error.message.includes('expirado') || error.message.includes('inválido')) {
      return res.status(401).json({
        success: false,
        data: {
          valid: false
        },
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
  login,
  getCurrentUser,
  verifyToken
}; 