import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, ArrowLeft, ExternalLink, MessageCircle, Building2, Clock, Star, Reply } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useApp } from '../../context/AppContext';
import { SEOHead } from '../SEOHead';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Review } from '../../types';

interface BusinessDetailPageProps {
  businessId: string;
  onNavigate: (page: string) => void;
}

export const BusinessDetailPage: React.FC<BusinessDetailPageProps> = ({
  businessId,
  onNavigate,
}) => {
  const { businesses, siteConfig } = useApp();
  const business = businesses.find((b) => b.business_id === businessId);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Mock reviews data - solo aprobadas
  const mockReviews: Review[] = [
    {
      id: '1',
      businessId,
      userName: 'Carlos Martínez',
      rating: 5,
      comment: 'Excelente servicio, muy recomendado. El personal es muy atento y profesional.',
      verified: true,
      approved: true,
      createdAt: '2025-10-20',
      response: {
        text: '¡Gracias por tu comentario! Nos alegra que hayas tenido una excelente experiencia.',
        respondedAt: '2025-10-21',
      },
    },
    {
      id: '2',
      businessId,
      userName: 'Ana López',
      rating: 4,
      comment: 'Muy buena atención al cliente y productos de calidad.',
      verified: true,
      approved: true,
      createdAt: '2025-10-22',
    },
    {
      id: '5',
      businessId,
      userName: 'Luis Fernández',
      rating: 5,
      comment: 'Todo perfecto, volveré sin duda.',
      verified: true,
      approved: true,
      createdAt: '2025-10-25',
      response: {
        text: 'Gracias Luis! Te esperamos pronto.',
        respondedAt: '2025-10-26',
      },
    },
  ];

  const avgRating = mockReviews.length
    ? mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length
    : 0;

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Negocio no encontrado</h2>
          <Button onClick={() => onNavigate('negocios')}>
            Volver al listado
          </Button>
        </div>
      </div>
    );
  }

  const businessImages = business.images && business.images.length > 0 ? business.images : [
    'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzYxNjUzMzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm58ZW58MXx8fHwxNzYxNzE2NTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTY0NzIxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  const hasMultipleLocations = business.locations && business.locations.length > 0;
  const currentLocation = selectedLocation 
    ? business.locations?.find(loc => loc.id === selectedLocation)
    : null;

  const displayPhone = currentLocation?.phone || business.phone1;
  const displayWhatsapp = currentLocation?.whatsapp || business.whatsapp;
  const displayAddress = currentLocation?.address || business.address;
  const displayCity = currentLocation?.city || business.city;
  const displaySchedule = currentLocation?.schedule || business.schedule;

  const seoKeywords = business.seo?.keywords || [
    business.name,
    business.category,
    business.city,
    business.country,
    'directorio',
    'negocios locales'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      {business.premium ? (
        <SEOHead
          title={business.seo?.metaTitle || business.name}
          description={business.seo?.metaDescription || business.description}
          keywords={seoKeywords}
          ogImage={business.seo?.ogImage || business.logo || businessImages[0]}
          type="business.business"
          business={business}
        />
      ) : (
        <SEOHead
          title={business.name}
          description={business.description}
          keywords={[business.name, business.category, business.city]}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => onNavigate('negocios')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al listado
        </Button>

        <Card className="mb-8 overflow-hidden">
          <div
            className="h-48 flex items-center justify-center text-white relative"
            style={{
              background: `linear-gradient(135deg, ${siteConfig.primaryColor} 0%, ${siteConfig.secondaryColor} 100%)`,
            }}
          >
            {business.logo ? (
              <ImageWithFallback
                src={business.logo}
                alt={business.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white text-gray-800 flex items-center justify-center text-5xl">
                {business.name.charAt(0)}
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              {business.featured && (
                <Badge
                  className="bg-yellow-500 text-white"
                >
                  Destacado
                </Badge>
              )}
              {business.premium && (
                <Badge
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl mb-2">{business.name}</h1>
                <Badge variant="outline" className="text-base">
                  {business.category}
                </Badge>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6">{business.description}</p>

            {hasMultipleLocations && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5" style={{ color: siteConfig.primaryColor }} />
                  <h3 className="text-xl">Nuestras Sedes</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLocation(null)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      !selectedLocation 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium">Sede Principal</p>
                    <p className="text-sm text-gray-600">{business.city}</p>
                  </motion.button>
                  {business.locations?.map((location) => (
                    <motion.button
                      key={location.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        selectedLocation === location.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium">{location.name}</p>
                      <p className="text-sm text-gray-600">{location.city}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: siteConfig.primaryColor }} />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p>{displayAddress}</p>
                    <p className="text-gray-600">
                      {displayCity}, {business.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: siteConfig.primaryColor }} />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p>{displayPhone}</p>
                    {!currentLocation && business.phone2 && <p>{business.phone2}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: siteConfig.primaryColor }} />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href={`mailto:${business.email}`}
                      className="hover:underline text-blue-600"
                    >
                      {business.email}
                    </a>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: siteConfig.primaryColor }} />
                    <div>
                      <p className="font-medium">Sitio Web</p>
                      <a
                        href={`https://${business.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600 flex items-center gap-1"
                      >
                        {business.website}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {displaySchedule && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: siteConfig.primaryColor }} />
                    <div>
                      <p className="font-medium">Horario</p>
                      <p className="text-gray-700">{displaySchedule}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {displayWhatsapp && (
                  <Button
                    className="w-full mb-3 bg-[#25D366] text-white hover:bg-[#20BA5A]"
                    onClick={() => {
                      const locationName = currentLocation ? currentLocation.name : 'Sede Principal';
                      const message = encodeURIComponent(`Hola ${business.name} (${locationName}), me gustaría obtener más información.`);
                      window.open(
                        `https://wa.me/${displayWhatsapp?.replace(/\s+/g, '')}?text=${message}`,
                        '_blank'
                      );
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar por WhatsApp
                  </Button>
                )}
                <Button
                  className="w-full mb-3"
                  style={{ backgroundColor: siteConfig.primaryColor }}
                  onClick={() => window.open(`tel:${displayPhone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar ahora
                </Button>
                <Button
                  variant="outline"
                  className="w-full mb-3"
                  onClick={() => window.open(`mailto:${business.email}`)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar correo
                </Button>
                {business.website && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(`https://${business.website}`, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visitar sitio web
                  </Button>
                )}
              </div>
            </div>

            {business.socialMedia && (Object.keys(business.socialMedia).length > 0) && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg mb-3">Síguenos en Redes Sociales</h3>
                <div className="flex gap-3 flex-wrap">
                  {business.socialMedia.facebook && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(business.socialMedia?.facebook, '_blank')}
                    >
                      Facebook
                    </Button>
                  )}
                  {business.socialMedia.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(business.socialMedia?.instagram, '_blank')}
                    >
                      Instagram
                    </Button>
                  )}
                  {business.socialMedia.twitter && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(business.socialMedia?.twitter, '_blank')}
                    >
                      Twitter
                    </Button>
                  )}
                  {business.socialMedia.linkedin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(business.socialMedia?.linkedin, '_blank')}
                    >
                      LinkedIn
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl mb-4">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessImages.map((img, index) => (
              <motion.div 
                key={index} 
                className="aspect-video rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ImageWithFallback
                  src={img}
                  alt={business.seo?.altTexts?.[`image-${index}`] || `${business.name} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </motion.div>
            ))}
          </div>
        </Card>

        {mockReviews.length > 0 && (
          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl mb-2">Opiniones de Clientes</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= avgRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg">
                    {avgRating.toFixed(1)} ({mockReviews.length} {mockReviews.length === 1 ? 'opinión' : 'opiniones'})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {mockReviews.map((review, index) => (
                <motion.div 
                  key={review.id} 
                  className="border-b pb-6 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                      {review.userName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{review.userName}</p>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                ✓ Verificado
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      
                      {review.response && (
                        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r">
                          <div className="flex items-center gap-2 mb-2">
                            <Reply className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-600">Respuesta de {business.name}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{review.response.text}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(review.response.respondedAt).toLocaleDateString('es-MX', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h2 className="text-2xl mb-4">Ubicación</h2>
          
          {hasMultipleLocations ? (
            <Tabs defaultValue="main" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="main">Sede Principal</TabsTrigger>
                {business.locations?.map((location) => (
                  <TabsTrigger key={location.id} value={location.id}>
                    {location.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="main">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Mapa interactivo</p>
                    <p className="text-sm">{business.address}, {business.city}</p>
                  </div>
                </div>
              </TabsContent>
              
              {business.locations?.map((location) => (
                <TabsContent key={location.id} value={location.id}>
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Mapa interactivo</p>
                      <p className="text-sm">{location.address}, {location.city}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Mapa interactivo</p>
                <p className="text-sm">{business.address}, {business.city}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
