import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
        
        {/* Video de fondo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/background_videoV2.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        {/* Capa oscura encima para mejorar contraste */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Contenido sobre el video */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4 gap-16">
          <h1 
            className="text-5xl md:text-6xl font-extrabold mb-4"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Centro de Aplicaciones
          </h1>

          <div 
            className="text-2xl md:text-3xl text-gray-200 mb-10 max-w-4xl mx-auto"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            Bienvenido al Centro de Aplicaciones de Formula UEM. Aquí encontrarás una gran variedad de aplicaciones que te ayudarán en tu trabajo. Siéntete libre de proponer nuevas aplicaciones y mejoras.
          </div>

          <div className="space-x-4">
            <Link 
              to="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Necesitas ayuda / Tienes alguna sugerencia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
