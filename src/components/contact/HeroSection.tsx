import { Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection = () => {
  const { siteConfig } = useApp();

  return (
    <div className="text-center mb-8 sm:mb-12">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: siteConfig.primaryColor }}
      >
        <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">¿Tienes un Negocio?</h1>

      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Únete a nuestro directorio y aumenta tu visibilidad. Miles de personas buscan servicios como el tuyo cada día.
      </p>
    </div>
  );
};
