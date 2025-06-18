import React from 'react';
import { Link } from 'react-router-dom';

// Imports para el carrusel Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Lista de imágenes para el carrusel
const carImages = [
  '/cars/car-1.png',
  '/cars/car-2.jpeg',
  '/cars/car-3.png',
  '/cars/car-4.png',
];

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      
      {/* --- HERO SECTION CON LAYOUT CORREGIDO --- */}
      {/* CAMBIO CLAVE: Ajustamos la altura para que no ocupe toda la pantalla */}
      <div className="relative w-full h-[85vh] min-h-[600px]">
        
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="absolute inset-0 w-full h-full z-10"
        >
          {carImages.map((src, index) => (
            <SwiperSlide key={index} className="h-full w-full">
              <img 
                src={src} 
                alt={`Coche de carreras ${index + 1}`} 
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-black bg-opacity-40 z-20"></div>

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            FUEM Racing Team: La Fórmula de la Victoria
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Construimos coches de Fórmula 1 desde cero, competimos con universidades globales y buscamos talento e innovación. ¡Acelera con nosotros!
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition-transform transform hover:scale-105"
            >
              Únete al equipo
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Contacta con nosotros
            </Link>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DE PATROCINADORES Y TESTIMONIO (AHORA VISIBLE) --- */}
      <div className="bg-gray-100 py-20 w-full">
        <div className="flex justify-center items-center space-x-8 mb-12 flex-wrap">
            <img src="/coca-cola-logo.png" alt="Coca-Cola" className="h-10 w-auto m-4"/>
            <img src="/flatfile-logo.png" alt="Flatfile" className="h-10 w-auto m-4"/>
            <img src="/modal-logo.png" alt="Modal" className="h-10 w-auto m-4"/>
            <img src="/usv-square-ventures-logo.png" alt="USV Square Ventures" className="h-10 w-auto m-4"/>
            <img src="/replicate-logo.png" alt="Replicate" className="h-10 w-auto m-4"/>
            <img src="/bravado-logo.png" alt="Bravado" className="h-10 w-auto m-4"/>
        </div>
        <div className="text-center max-w-2xl mx-auto px-4">
          <blockquote className="text-2xl font-medium text-gray-500 italic mb-4">
            “Cuando vi por primera vez a FUEM Racing Team, supe que estaban llevando la ingeniería y la competición al siguiente nivel.”
          </blockquote>
          <p className="text-lg font-semibold text-gray-700">
            Juan Pérez - Director de Innovación - Universidad Europea de Madrid
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;