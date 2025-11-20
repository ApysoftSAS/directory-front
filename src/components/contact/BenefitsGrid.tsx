import { MessageSquare, User, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BenefitCard } from './BenefitCard';

export const BenefitsGrid = () => {
  const { siteConfig } = useApp();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">

      <BenefitCard
        icon={<User className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.primaryColor }} />}
        title="Visibilidad"
        text="Llega a miles de clientes potenciales que buscan tus servicios"
        bgColor={siteConfig.primaryColor}
      />

      <BenefitCard
        icon={<Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.secondaryColor }} />}
        title="Fácil y Rápido"
        text="Proceso simple de registro y publicación de tu negocio"
        bgColor={siteConfig.secondaryColor}
      />

      <BenefitCard
        icon={<MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.accentColor }} />}
        title="Soporte"
        text="Te ayudamos en todo el proceso de registro y configuración"
        bgColor={siteConfig.accentColor}
      />

    </div>
  );
};
