import { useForm } from 'react-hook-form';
import { login } from '../services/auth-service.js';
import FormField from '../components/FormField.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { Link } from 'react-router-dom';
import AuthSwitchLink from '../components/AuthSwitchLink.jsx';
import AuthTitle from '../components/AuthTitle.jsx';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Componente Login - Página de inicio de sesión
 * Maneja el formulario de autenticación y el proceso de login
 * Utiliza react-hook-form para validación y manejo del formulario
 */
function Login() {
  // Hook de autenticación para manejar el estado de login
  const { login: loginUser } = useAuth();
  
  // Configuración de react-hook-form para el formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  /**
   * Efecto para actualizar el título de la página
   * Se ejecuta una vez al montar el componente
   */
  useEffect(() => {
    document.title = 'Login | Mini Ecommerce';
  }, []);

  /**
   * Maneja el envío del formulario de login
   * Procesa la autenticación y actualiza el estado global
   * @param {Object} data - Datos del formulario (username, password)
   */
  const onSubmit = async (data) => {
    try {
      // Llama al servicio de autenticación
      const response = await login(data);
      
      // Guarda la información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Actualiza el estado de autenticación global
      loginUser(response.data.token);
      
      // Muestra mensaje de éxito
      alert('Login exitoso!');
    } catch (error) {
      // Maneja errores de autenticación
      alert('Error en el login: ' + error.message);
    }
  };

  return (
    <Card>
      {/* Título de la página */}
      <AuthTitle>Login</AuthTitle>
      
      {/* Formulario de login */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo de username */}
        <FormField
          label="Username"
          id="username"
          register={register}
          validation={{
            required: 'El username es requerido'
          }}
          error={errors.username}
        />
        
        {/* Campo de contraseña */}
        <FormField
          label="Contraseña"
          type="password"
          id="password"
          register={register}
          validation={{
            required: 'La contraseña es requerida'
          }}
          error={errors.password}
        />
        
        {/* Botón de envío */}
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Iniciar Sesión
        </Button>
        
        {/* Enlace para cambiar a registro */}
        <AuthSwitchLink
          question="¿No tienes cuenta?"
          linkText="Regístrate"
          to="/auth/register"
        />
      </form>
    </Card>
  );
}

export default Login; 