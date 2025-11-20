import { SEOHead } from '../SEOHead';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { BenefitsGrid } from './BenefitsGrid';
import { ContactForm } from './ContactForm';
import { DirectContact } from './DirectContact';

export const ContactPage: React.FC = () => {
  const { siteConfig } = useApp();

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      <SEOHead
        title="Registra tu Negocio"
        description="Únete a nuestro directorio y aumenta tu visibilidad."
      />

      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        
        <HeroSection />

        <BenefitsGrid />

        <ContactForm />

        <DirectContact />

      </div>
    </div>
  );
};
