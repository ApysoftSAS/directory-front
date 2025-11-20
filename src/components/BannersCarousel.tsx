import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PromotionalBanner } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'motion/react';

interface BannersCarouselProps {
  banners: PromotionalBanner[];
  autoPlayInterval?: number;
}

export const BannersCarousel: React.FC<BannersCarouselProps> = ({
  banners,
  autoPlayInterval = 5000,
}) => {
  const { siteConfig } = useApp();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Activos + ordenados
  const activeBanners = banners
    .filter((banner) => {
      const now = new Date();
      const start = new Date(banner.startDate);
      const end = new Date(banner.endDate);
      return banner.active && now >= start && now <= end;
    })
    .sort((a, b) => a.priority - b.priority);

  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [activeBanners.length, autoPlayInterval, isPaused]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleBannerClick = () => {
    if (!currentBanner.link) return;

    // Si es un negocio -> /negocio/:id
    if (currentBanner.link.startsWith('/negocio/')) {
      return navigate(currentBanner.link);
    }

    // Si es una landing promocional -> /promo/:slug
    if (currentBanner.link.startsWith('/promo/')) {
      return navigate(currentBanner.link);
    }

    // Si es una URL completa -> abre afuera
    if (currentBanner.link.startsWith('http')) {
      return window.open(currentBanner.link, "_blank");
    }

    // Otros enlaces internos
    navigate(currentBanner.link);
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative"
          >
            <Card
              className="overflow-hidden cursor-pointer group aspect-[21/9]"
              onClick={handleBannerClick}
            >
              {/* Imagen del banner */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={currentBanner.image}
                  alt={currentBanner.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge
                    className="mb-2 sm:mb-3 animate-pulse"
                    style={{ backgroundColor: siteConfig.secondaryColor }}
                  >
                    {currentBanner.businessName}
                  </Badge>
                  
                  <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white mb-2 sm:mb-3 drop-shadow-lg">
                    {currentBanner.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-3 sm:mb-4 max-w-2xl line-clamp-2 drop-shadow">
                    {currentBanner.description}
                  </p>

                  {currentBanner.link && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="group/btn"
                        style={{ backgroundColor: siteConfig.primaryColor }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBannerClick();
                        }}
                      >
                        Ver Más
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* NAVEGACIÓN IZQ/DER */}
        {activeBanners.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* DOTS */}
      {activeBanners.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {activeBanners.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8' : 'w-2 opacity-50 hover:opacity-75'
              }`}
              style={{
                backgroundColor:
                  index === currentIndex ? siteConfig.primaryColor : '#9ca3af',
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
