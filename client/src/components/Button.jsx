/**
 * Componente Button - Botón reutilizable
 * Proporciona un botón con estados de carga, estilos consistentes y accesibilidad
 * @param {React.ReactNode} children - Contenido del botón
 * @param {string} type - Tipo de botón (button, submit, reset)
 * @param {string} className - Clases CSS adicionales
 * @param {boolean} isLoading - Estado de carga del botón
 * @param {Object} props - Propiedades adicionales del botón
 */
function Button({ children, type = "button", className = "", isLoading, ...props }) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`
        w-full bg-blue-600 text-white py-2 px-4 rounded-md
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
        ${className}
      `}
      {...props}
    >
      {/* Muestra texto de carga o contenido normal */}
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}

export default Button; 