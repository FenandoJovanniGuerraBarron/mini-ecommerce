import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

/**
 * Componente de protección de rutas
 * Redirige a usuarios autenticados a la página principal
 * Permite acceso solo a usuarios no autenticados (login/register)
 * @param {React.ReactNode} children - Componentes hijos a renderizar si no está autenticado
 * @returns {React.ReactNode} Componente de redirección o children
 */
function RedirectIfAuthenticated({ children }) {
  const { authenticated } = useAuth();
  
  // Si está autenticado, redirige a la página principal
  if (authenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Si no está autenticado, muestra los componentes hijos
  return children;
}

export default RedirectIfAuthenticated; 