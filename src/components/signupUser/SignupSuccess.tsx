import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Bell, Gift, Star } from 'lucide-react';

type Props = {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  selectedCities: string[];
  siteConfig: any;
};

const SignupSuccess: React.FC<Props> = ({ formData, selectedCities, siteConfig }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${siteConfig.primaryColor} 0%, ${siteConfig.secondaryColor} 100%)`,
      }}
    >
      <div className="max-w-md w-full">
        <Card className="p-6 sm:p-8 text-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl mb-3 sm:mb-4">¡Registro Exitoso!</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Gracias por suscribirte, <strong>{formData.name}</strong>.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Recibirás promociones exclusivas de las ciudades en:
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8">
            {selectedCities.map((city) => (
              <Badge key={city.id} variant="outline" className="text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                {city.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-3 sm:space-y-4 text-left">
            <Feature icon={<Bell className="w-4 h-4" />} title="Notificaciones instantáneas" desc="Te avisaremos de nuevas promociones en tus ciudades" />
            <Feature icon={<Gift className="w-4 h-4" />} title="Ofertas exclusivas" desc="Descuentos especiales solo para suscriptores" />
            <Feature icon={<Star className="w-4 h-4" />} title="Contenido personalizado" desc="Solo promociones de tus ciudades seleccionadas" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const Feature: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm sm:text-base"><span className="font-medium">{title}</span></p>
      <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
    </div>
  </div>
);

export default SignupSuccess;
