import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (data: LoginFormData) => {
    // Simulación local para login con email/password (borra esto en producción)
    if (data.password === '12345') { // Usamos la misma contraseña para todos
      if (data.email === 'admin') {
        login({ id: '1', name: 'Admin', role: 'admin' });
        navigate('/');
        setErrorMessage(null);
      } else if (data.email === 'jefe') {
        login({ id: '2', name: 'Jefe Dept', role: 'jefe_departamento', departmentId: 'd1' }); // Asignamos departmentId: 'd1' (Vehicle Dynamics)
        navigate('/');
        setErrorMessage(null);
      } else if (data.email === 'integrante') {
        login({ id: '3', name: 'Integrante', role: 'integrante_departamento', departmentId: 'd1' }); // Asignamos departmentId: 'd1' (Vehicle Dynamics)
        navigate('/');
        setErrorMessage(null);
      } else if (data.email === 'yul') {
        login({ id: '4', name: 'yul', role: 'admin' }); // Mantén a yul como admin para pruebas
        navigate('/');
        setErrorMessage(null);
      } else {
        setErrorMessage('Usuario o contraseña incorrectos');
      }
    } else {
      setErrorMessage('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="email"
              {...register('email', { required: 'El usuario es requerido' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'La contraseña es requerida' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Iniciar Sesión
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
          )}
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              login({ id: '2', name: 'Usuario Google', role: 'integrante_departamento', departmentId: 'd1' });
              navigate('/');
              alert('Inicio de sesión con Google simulado exitoso');
            }}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.78h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.78c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Iniciar sesión con Google</span>
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;