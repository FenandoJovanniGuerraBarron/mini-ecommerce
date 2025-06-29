/**
 * Componente FormField - Campo de formulario reutilizable
 * Proporciona un campo de entrada con etiqueta, validación y manejo de errores
 * Integrado con react-hook-form para validación y manejo de estado
 * @param {string} label - Etiqueta del campo
 * @param {string} type - Tipo de input (text, password, email, etc.)
 * @param {string} id - Identificador único del campo
 * @param {Function} register - Función de registro de react-hook-form
 * @param {Object} validation - Reglas de validación del campo
 * @param {Object} error - Objeto de error de react-hook-form
 */
function FormField({ 
  label, 
  type = 'text', 
  id, 
  register, 
  validation, 
  error
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Etiqueta del campo */}
      <label htmlFor={id} className="text-base font-semibold text-gray-700 tracking-wide">
        {label}
      </label>
      
      {/* Campo de entrada */}
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        className={`
          w-full px-6 py-4 border-2 border-gray-200 rounded-2xl
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all duration-200 ease-in-out
          placeholder:text-gray-400
          bg-white shadow-sm
          text-lg
          ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
        `}
      />
      
      {/* Mensaje de error */}
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm font-medium">
          {/* Icono de error */}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {/* Mensaje de error */}
          {error.message}
        </div>
      )}
    </div>
  );
}

export default FormField; 