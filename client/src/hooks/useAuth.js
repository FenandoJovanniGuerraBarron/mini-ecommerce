import { useState, useEffect } from 'react';

/**
 * Verifica si el usuario está autenticado
 * Comprueba la existencia del token en localStorage
 * @returns {boolean} true si existe un token, false en caso contrario
 */
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

/**
 * Hook personalizado para manejar la autenticación
 * Proporciona estado de autenticación reactivo y funciones de login/logout
 * Sincroniza el estado entre pestañas del navegador
 * @returns {Object} Objeto con estado y funciones de autenticación
 */
export function useAuth() {
  // Estado reactivo de autenticación
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  /**
   * Efecto que configura listeners para cambios de autenticación
   * Escucha cambios en localStorage (otras pestañas) y eventos locales
   */
  useEffect(() => {
    // Escucha cambios en localStorage (otras pestañas)
    const onStorage = () => setAuthenticated(isAuthenticated());
    window.addEventListener('storage', onStorage);
    
    // Escucha cambios locales (login/logout)
    const onAuthChange = () => setAuthenticated(isAuthenticated());
    window.addEventListener('authChange', onAuthChange);
    
    // Cleanup: remueve los event listeners
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  /**
   * Función para iniciar sesión
   * Guarda el token en localStorage y actualiza el estado
   * Dispara evento para notificar cambios a otros componentes
   * @param {string} token - Token de autenticación
   */
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    window.dispatchEvent(new Event('authChange'));
  };

  /**
   * Función para cerrar sesión
   * Elimina el token de localStorage y actualiza el estado
   * Dispara evento para notificar cambios a otros componentes
   */
  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.dispatchEvent(new Event('authChange'));
  };

  return {
    authenticated,
    isAuthenticated,
    login,
    logout
  };
} 