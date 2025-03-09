// src/components/forms/SignupForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '../../store/auth.store';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
  const { login } = useAuthStore();

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    login({ id: '1', name: data.name, role: 'admin' }); // Simulación local
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Tu formulario aquí */}
    </form>
  );
};

export default SignupForm;
export {}; // Añade esta línea al final