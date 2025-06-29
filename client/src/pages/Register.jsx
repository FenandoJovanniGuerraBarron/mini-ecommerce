import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import { register as registerUser } from '../services/auth-service.js';
import AuthSwitchLink from '../components/AuthSwitchLink.jsx';
import AuthTitle from '../components/AuthTitle.jsx';
import { useEffect } from 'react';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    document.title = 'Registro | Mini Ecommerce';
  }, []);

  const onSubmit = async (data) => {
    try {
      const userData = {
        username: data.username,
        password: data.password
      };
      
      await registerUser(userData);
      alert('Registro exitoso! Redirigiendo al login...');
      navigate('/login');
    } catch (error) {
      alert('Error en el registro: ' + error.message);
    }
  };

  return (
    <Card>
      <AuthTitle>Registro</AuthTitle>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Registrarse
        </Button>
        <AuthSwitchLink
          question="¿Ya tienes cuenta?"
          linkText="Inicia sesión"
          to="/login"
        />
      </form>
    </Card>
  );
}

export default Register; 