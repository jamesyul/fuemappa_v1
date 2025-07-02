import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // No necesitas 'Link' aquí si no lo usas en el JSX
import { useAuthStore } from '../store/auth.store';
import { signupUser } from '../services/auth.service';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  invitationCode: string;
}

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>();
  const navigate = useNavigate();
  const { login: loginToStore } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      setApiError(null);
      const response = await signupUser(data);
      loginToStore(response.user, response.token);

      // --- LÓGICA DE REDIRECCIÓN INTELIGENTE ---
      // Como es un registro, es la primera vez sí o sí, así que lo enviamos al selector.
      localStorage.setItem('hasSeenAppSelector', 'true');
      navigate('/select-app');
      // -----------------------------------------

    } catch (error: any) {
      const message = error.response?.data?.message || 'Error durante el registro.';
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
            <img src="/logo.png" alt="FUEM Logo" className="mx-auto h-12 w-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Crear una Cuenta</h2>
            <p className="text-sm text-gray-500 mt-2">Introduce el código de invitación que te ha proporcionado tu jefe de departamento o el administrador.</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Tu nombre es obligatorio' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'El email es obligatorio' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-700">Código de Invitación</label>
            <input
              type="text"
              id="invitationCode"
              {...register('invitationCode', { required: 'El código es obligatorio' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.invitationCode && <p className="text-red-500 text-sm mt-1">{errors.invitationCode.message}</p>}
          </div>
          
          {apiError && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">{apiError}</p>}
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
            {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
            <p>¿Eres Administrador? <a href="mailto:admin@fuem.es" className="font-medium text-indigo-600 hover:text-indigo-500">Contacta para tus credenciales</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;