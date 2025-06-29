const { User } = require("../database/models");
const { hashPassword } = require("../utils/bcrypt");

// Obtener todos los usuarios
// const findAllUsers = async () => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'username', 'created_at', 'updated_at']
//     });
//     return users;
//   } catch (error) {
//     throw new Error('Error al obtener usuarios: ' + error.message);
//   }
// };

// Obtener un usuario por ID
// const findUserById = async (id) => {
//   try {
//     const user = await User.findByPk(id, {
//       attributes: ['id', 'username', 'created_at', 'updated_at']
//     });

//     if (!user) {
//       throw new Error('Usuario no encontrado');
//     }

//     return user;
//   } catch (error) {
//     throw new Error('Error al obtener usuario: ' + error.message);
//   }
// };

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    const { username, password } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("El nombre de usuario ya existe");
    }

    const passwordHash = hashPassword(password);

    // Crear el usuario
    const user = await User.create({
      username,
      passwordHash,
    });

    // Retornar sin la contraseña
    return {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  } catch (error) {
    throw new Error("Error al crear usuario: " + error.message);
  }
};

// Actualizar un usuario
// const updateUser = async (id, userData) => {
//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       throw new Error('Usuario no encontrado');
//     }

//     // Si se va a actualizar la contraseña, hacer hash
//     if (userData.password) {
//       const saltRounds = 10;
//       userData.passwordHash = await bcrypt.hash(userData.password, saltRounds);
//       delete userData.password;
//     }

//     // Actualizar el usuario
//     await user.update(userData);

//     return {
//       id: user.id,
//       username: user.username,
//       created_at: user.created_at,
//       updated_at: user.updated_at
//     };
//   } catch (error) {
//     throw new Error('Error al actualizar usuario: ' + error.message);
//   }
// };

// Eliminar un usuario
// const deleteUser = async (id) => {
//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       throw new Error('Usuario no encontrado');
//     }

//     await user.destroy();
//     return { message: 'Usuario eliminado exitosamente' };
//   } catch (error) {
//     throw new Error('Error al eliminar usuario: ' + error.message);
//   }
// };

// Verificar si un usuario existe
// const userExists = async (id) => {
//   try {
//     const user = await User.findByPk(id);
//     return !!user;
//   } catch (error) {
//     return false;
//   }
// };

// Buscar usuario por username
// const findUserByUsername = async (username) => {
//   try {
//     const user = await User.findOne({ where: { username } });
//     return user;
//   } catch (error) {
//     throw new Error('Error al buscar usuario por username: ' + error.message);
//   }
// };

module.exports = {
  createUser,
};
