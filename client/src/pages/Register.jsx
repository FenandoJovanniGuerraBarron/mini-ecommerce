import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { register as registerUser } from '../services/auth-service.js';
import AuthSwitchLink from '../components/AuthSwitchLink.jsx';
import AuthTitle from '../components/AuthTitle.jsx';
import { useEffect } from 'react';

/**
 * Componente Register - Página de registro de usuarios
 * Maneja el formulario de registro con validaciones
 * Utiliza react-hook-form para validación y manejo del formulario
 */
function Register() {
  // Hook para navegación programática
  const navigate = useNavigate();
  
  // Configuración de react-hook-form para el formulario
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  // Observa el campo de contraseña para validación de confirmación
  const password = watch('password');

  /**
   * Efecto para actualizar el título de la página
   * Se ejecuta una vez al montar el componente
   */
  useEffect(() => {
    document.title = 'Registro | Mini Ecommerce';
  }, []);

  /**
   * Maneja el envío del formulario de registro
   * Procesa el registro del usuario y redirige al login
   * @param {Object} data - Datos del formulario (username, password, confirmPassword)
   */
  const onSubmit = async (data) => {
    try {
      // Prepara los datos del usuario para el registro
      const userData = {
        username: data.username,
        password: data.password
      };
      
      // Llama al servicio de registro
      await registerUser(userData);
      
      // Muestra mensaje de éxito y redirige
      alert('Registro exitoso! Redirigiendo al login...');
      navigate('/');
    } catch (error) {
      // Maneja errores de registro
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <Card>
      {/* Título de la página */}
      <AuthTitle>Registro</AuthTitle>
      
      {/* Formulario de registro */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de username con validación de longitud mínima */}
        <FormField
          label="Username"
          id="username"
          register={register}
          validation={{
            required: 'El username es requerido',
            minLength: { value: 3, message: 'El username debe tener al menos 3 caracteres' }
          }}
          error={errors.username}
        />
        
        {/* Campo de contraseña con validación de longitud mínima */}
        <FormField
          label="Contraseña"
          type="password"
          id="password"
          register={register}
          validation={{
            required: 'La contraseña es requerida',
            minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
          }}
          error={errors.password}
        />
        
        {/* Campo de confirmación de contraseña */}
        <FormField
          label="Confirmar Contraseña"
          type="password"
          id="confirmPassword"
          register={register}
          validation={{
            required: 'Debes confirmar la contraseña',
            validate: value => value === password || 'Las contraseñas no coinciden'
          }}
          error={errors.confirmPassword}
        />
        
        {/* Botón de envío */}
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Registrarse
        </Button>
        
        {/* Enlace para cambiar a login */}
        <AuthSwitchLink
          question="¿Ya tienes cuenta?"
          linkText="Inicia sesión"
          to="/auth/login"
        />
      </form>
    </Card>
  );
}

export default Register; 