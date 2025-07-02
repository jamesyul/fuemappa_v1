import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>();

  // Simulación de envío. En un caso real, aquí llamarías a un servicio
  // como EmailJS, SendGrid, o un endpoint de tu backend.
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una espera de red
    console.log("Mensaje enviado (simulación):", data);
  };

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Contacta con Nosotros</h1>
          <p className="text-gray-600 mt-2">
            ¿Tienes alguna pregunta, sugerencia o quieres patrocinarnos? ¡Nos encantaría saber de ti!
          </p>
        </div>

        {isSubmitSuccessful ? (
          <div className="text-center p-6 bg-green-100 text-green-800 rounded-md">
            <h3 className="text-xl font-semibold">¡Gracias por tu mensaje!</h3>
            <p>Nos pondremos en contacto contigo lo antes posible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tu Nombre</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Tu Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;