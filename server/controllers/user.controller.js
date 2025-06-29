const userService = require('../services/user.service');

// POST /api/users - Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validaciones
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos'
      });
    }
    
    const user = await userService.createUser({ username, password });
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error('Error en controlador - crear usuario:', error);
    
    if (error.message.includes('ya existe')) {
      return res.status(409).json({
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
  createUser,
}; 