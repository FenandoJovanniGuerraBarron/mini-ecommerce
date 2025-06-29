import { useForm } from 'react-hook-form';
import { login } from '../services/auth-service.js';
import FormField from '../components/FormField.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useNavigate, Link } from 'react-router-dom';
import AuthSwitchLink from '../components/AuthSwitchLink.jsx';
import AuthTitle from '../components/AuthTitle.jsx';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    document.title = 'Login | Mini Ecommerce';
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Login exitoso!');
      navigate('/products');
    } catch (error) {
      alert('Error en el login: ' + error.message);
    }
  };

  return (
    <Card>
      <AuthTitle>Login</AuthTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Username"
          id="username"
          register={register}
          validation={{
            required: 'El username es requerido'
          }}
          error={errors.username}
        />
        
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
        
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Iniciar Sesión
        </Button>
        <AuthSwitchLink
          question="¿No tienes cuenta?"
          linkText="Regístrate"
          to="/register"
        />
      </form>
    </Card>
  );
}

export default Login; 