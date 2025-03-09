// src/components/forms/LoginForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '../../store/auth.store';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login } = useAuthStore();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (data.email === 'admin' && data.password === '12345') {
      login({ id: '1', name: 'Admin', role: 'admin' });
    } else if (data.email === 'jefe' && data.password === '12345') {
      login({ id: '2', name: 'Jefe Dept', role: 'jefe_departamento', departmentId: 'VD' });
    } else if (data.email === 'integrante' && data.password === '12345') {
      login({ id: '3', name: 'Integrante', role: 'integrante_departamento', departmentId: 'VD' });
    } else if (data.email === 'yul' && data.password === '12345') {
      login({ id: '4', name: 'yul', role: 'admin' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Tu formulario aquí */}
    </form>
  );
};

export default LoginForm;
export {}; // Añade esta línea al final