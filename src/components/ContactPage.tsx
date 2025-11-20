import React, { useState } from 'react';
import { Send, Building2, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { SEOHead } from './SEOHead';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner@2.0.3';

export const ContactPage: React.FC = () => {
  const { siteConfig } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.businessName || !formData.phone || !formData.email) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Simular envío
    toast.success('¡Solicitud enviada! Nos pondremos en contacto contigo pronto.');
    
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      <SEOHead
        title="Registra tu Negocio"
        description="Únete a nuestro directorio y aumenta tu visibilidad. Miles de personas buscan servicios como el tuyo cada día."
        keywords={['registrar negocio', 'publicar negocio', 'directorio empresas', 'promocionar negocio']}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">¿Tienes un Negocio?</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Únete a nuestro directorio y aumenta tu visibilidad. Miles de personas buscan
            servicios como el tuyo cada día.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card className="p-4 sm:p-6 text-center">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.primaryColor}20` }}
            >
              <User className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.primaryColor }} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl mb-2">Visibilidad</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Llega a miles de clientes potenciales que buscan tus servicios
            </p>
          </Card>

          <Card className="p-4 sm:p-6 text-center">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.secondaryColor}20` }}
            >
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.secondaryColor }} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl mb-2">Fácil y Rápido</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Proceso simple de registro y publicación de tu negocio
            </p>
          </Card>

          <Card className="p-4 sm:p-6 text-center">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.accentColor}20` }}
            >
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.accentColor }} />
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl mb-2">Soporte</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Te ayudamos en todo el proceso de registro y configuración
            </p>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-center">Solicita tu Registro</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            Completa el formulario y nos pondremos en contacto contigo en las próximas 24
            horas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Tu Nombre <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessName" className="text-sm sm:text-base">
                  Nombre del Negocio <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Mi Negocio SA"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base">
                  Teléfono <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="+52 55 1234 5678"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Correo Electrónico <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm sm:text-base">Cuéntanos sobre tu negocio (Opcional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe brevemente tu negocio, servicios, ubicación, etc..."
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base"
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Enviar Solicitud
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center">
            <p className="text-sm sm:text-base text-gray-600 mb-4">¿Prefieres contactarnos directamente?</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber?.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A] border-0"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
              <a href="mailto:contacto@Local Points.com" className="w-full sm:w-auto">
                <Button type="button" variant="outline" className="w-full sm:w-auto">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};