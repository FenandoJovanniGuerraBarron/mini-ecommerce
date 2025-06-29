const jwt = require("jsonwebtoken");
const { User } = require("../database/models");
const { comparePassword } = require("../utils/bcrypt");
const config = require("../config").api;

// Login de usuario
const loginUser = async (username, password) => {
  try {
    // Buscar usuario por username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    // Verificar contraseña
    const isPasswordValid = comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    // Generar token JWT
    const token = generateToken(user.id);

    // Retornar datos del usuario (sin contraseña) y token
    return {
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token,
    };
  } catch (error) {
    throw new Error("Error en login: " + error.message);
  }
};

// Generar token JWT
const generateToken = (userId) => {
  try {
    const payload = {
      userId,
      iat: Math.floor(Date.now() / 1000), // Issued at
    };

    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: "24h",
    });
  } catch (error) {
    throw new Error("Error al generar token: " + error.message);
  }
};

// Verificar token JWT
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Token inválido");
    } else {
      throw new Error("Error al verificar token: " + error.message);
    }
  }
};

// Obtener usuario del token
const getUserFromToken = async (token) => {
  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "username", "created_at", "updated_at"],
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw new Error("Error al obtener usuario del token: " + error.message);
  }
};

// Verificar si un token es válido (para middleware)
const isTokenValid = (token) => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  loginUser,
  generateToken,
  verifyToken,
  getUserFromToken,
  isTokenValid,
};
