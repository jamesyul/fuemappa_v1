import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { loginUser } from '../services/auth.service';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login: loginToStore } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);

  // --- FUNCIÓN onSubmit CON LA LÓGICA DE REDIRECCIÓN INTELIGENTE ---
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setApiError(null); // Limpiamos errores previos
      const response = await loginUser(data); // Llamamos a nuestro servicio
      loginToStore(response.user, response.token); // Guardamos el usuario y el token

      // --- LÓGICA DE REDIRECCIÓN ---
      // Después de un login exitoso, siempre redirigimos al selector de aplicaciones.
      navigate('/select-app', { replace: true });
      // -----------------------------------------
      // --- LÓGICA DE REDIRECCIÓN INTELIGENTE ---
      /*const hasSeenSelector = localStorage.getItem('hasSeenAppSelector');
      if (!hasSeenSelector) {
        // Si es la primera vez, lo marcamos como visto y lo enviamos al selector
        localStorage.setItem('hasSeenAppSelector', 'true');
        navigate('/select-app');
      } else {
        // Si no, lo enviamos directamente a las piezas
        navigate('/pieces');
      }*/
      // -----------------------------------------

    } catch (error: any) {
      // Si la API devuelve un error (ej: 401 Unauthorized), lo mostramos
      const message = error.response?.data?.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
            <img src="/logo.png" alt="FUEM Logo" className="mx-auto h-12 w-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Iniciar Sesión en FUEM</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'El email es obligatorio' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          {apiError && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;