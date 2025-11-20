import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Business } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';

interface BusinessCardProps {
  business: Business;
  feature: String;
  onViewDetails: (id: string) => void;
  index?: number;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onViewDetails,feature, index = 0 }) => {
  const { siteConfig } = useApp();
  console.log(business);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (business.whatsapp) {
      const message = encodeURIComponent(`Hola ${business.name}, me gustaría obtener más información.`);
      window.open(
        `https://wa.me/${business.whatsapp.replace(/\s+/g, '')}?text=${message}`,
        '_blank'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden group">
          {business.logo ? (
            <ImageWithFallback
              src={business.logo}
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="text-6xl text-white group-hover:scale-110 transition-transform duration-500">
              {business.name.charAt(0)}
            </div>
          )}
                    {feature && (

            <Badge
              className="absolute top-2 right-2 animate-pulse"
              style={{ backgroundColor: siteConfig.secondaryColor }}
            >
              ⭐ {feature}
            </Badge>
                      )}

        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl mb-1">{business.name}</h3>
            <Badge variant="outline">{business.category_relation.name}</Badge>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2 flex-1">{business.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {business.city.name}, {business.country.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{business.phone1}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{business.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {business.whatsapp && (
              <Button
                variant="outline"
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white hover:bg-[#20BA5A] border-0"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            )}
            <Button
              className={business.whatsapp ? '' : 'col-span-2'}
              onClick={() => onViewDetails(business.business_id)}
              style={{ backgroundColor: siteConfig.primaryColor }}
            >
              Ver detalles
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
