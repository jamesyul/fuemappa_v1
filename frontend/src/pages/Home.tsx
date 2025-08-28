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
  './public/cars/car-1.png',
  './public/cars/car-2.jpeg',
  './public/cars/car-3.png',
  './public/cars/car-4.png',
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

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white p-4 gap-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>FUEM App Store Team</h1>

            <div className="text-2xl md:text-3xl text-gray-200 mb-10 max-w-4xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              Bienvenido a la App Store oficial de Formula UEM. Aquí encontrarás una gran variedad de aplicaciones que te ayudarán en tu trabajo. Sientete libre de proponer nuevas aplicaciones y mejoras.
            </div>

            <img src="/logo.png" alt="FUEM Logo" className="h-28 w-auto" />

          <div className="space-x-4">
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all">
              Necesitas ayuda  /  Tienes alguna sugerencia
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;