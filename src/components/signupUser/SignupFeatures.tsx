import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Gift, Bell } from 'lucide-react';

type Props = {
  siteConfig: any;
  businesses: any[];
  subscribers: any[];
  availableCities: string[];
};

const SignupFeatures: React.FC<Props> = ({ siteConfig, businesses, subscribers, availableCities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-white order-2 lg:order-1"
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6">
        ¡Recibe las Mejores Promociones!
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90">
        Suscríbete y recibe ofertas exclusivas de tus ciudades favoritas
      </p>

      <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl mb-1">Promociones Localizadas</h3>
            <p className="text-sm sm:text-base text-white/80">
              Elige las ciudades de tu interés y recibe solo promociones relevantes
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl mb-1">Ofertas Exclusivas</h3>
            <p className="text-sm sm:text-base text-white/80">Descuentos especiales solo para nuestros suscriptores</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl mb-1">Alertas Personalizadas</h3>
            <p className="text-sm sm:text-base text-white/80">Notificaciones solo de las ciudades que selecciones</p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex items-center gap-8 text-white/90">
        <div>
          <p className="text-3xl">{businesses.length}+</p>
          <p className="text-sm">Negocios registrados</p>
        </div>
        <div className="w-px h-12 bg-white/20"></div>
        <div>
          <p className="text-3xl">{subscribers.length}+</p>
          <p className="text-sm">Usuarios suscritos</p>
        </div>
        <div className="w-px h-12 bg-white/20"></div>
        <div>
          <p className="text-3xl">{availableCities.length}+</p>
          <p className="text-sm">Ciudades disponibles</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupFeatures;
