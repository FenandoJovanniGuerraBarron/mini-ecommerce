import { useCart } from '../context/useCart.js';
import { logout } from '../services/auth-service.js';
import { useAuth } from '../hooks/useAuth.js';
import Button from './Button.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente Header - Barra de navegación principal
 * Muestra el logo, controles de autenticación y carrito
 * Adapta su contenido según el estado de autenticación y la ruta actual
 */
function Header() {
  // Hooks para funcionalidad del carrito y autenticación
  const { openCart } = useCart();
  const { authenticated, logout: logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtiene información del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  /**
   * Maneja el proceso de cierre de sesión
   * Ejecuta tanto el logout del servicio como del hook de autenticación
   */
  const handleLogout = () => {
    logout();
    logoutUser();
  };

  // Variables para determinar la página actual
  const isOnProductsPage = location.pathname !== "/";
  const isOnRegisterPage = location.pathname === "/auth/register";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow z-50">
      {/* Logo de la aplicación */}
      <div className="font-bold text-lg">Mini Ecommerce</div>
      
      {/* Controles para usuarios autenticados */}
      {authenticated && (
        <div className="flex items-center gap-4">
          {/* Nombre del usuario */}
          {user && (
            <span className="text-sm text-gray-300">{user.username}</span>
          )}
          
          {/* Botón del carrito */}
          <Button
            onClick={openCart}
            className="relative hover:bg-blue-700 rounded-full p-2 transition-colors"
            aria-label="Abrir carrito"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.6 9.015m-.394-3.743h13.262c.885 0 1.542.86 1.334 1.711l-1.347 5.385a1.25 1.25 0 01-1.212.954H7.013m9.884 0a3.001 3.001 0 11-5.784 0"
              />
            </svg>
          </Button>
          
          {/* Botón de logout */}
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold transition-colors"
          >
            Logout
          </Button>
        </div>
      )}
      
      {/* Botón de login para usuarios no autenticados */}
      {/* Se muestra cuando no está autenticado y no está en la página de registro */}
      {(!authenticated && isOnProductsPage) || (!authenticated && !isOnRegisterPage) && (
        <div>
          <Button
            onClick={() => navigate("/auth/login")}
            className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-sm font-semibold transition-colors"
            aria-label="Iniciar Sesión"
          >
            Iniciar Sesión
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header; 