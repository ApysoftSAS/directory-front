import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const { siteConfig } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  if (!siteConfig.whatsappNumber) return null;

  const handleClick = () => {
    const message = encodeURIComponent('Hola, me gustaría obtener más información sobre el directorio.');
    window.open(
      `https://wa.me/${siteConfig.whatsappNumber.replace(/\s+/g, '')}?text=${message}`,
      '_blank'
    );
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="relative">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
            >
              <p className="text-sm">¿Necesitas ayuda?</p>
              <p className="text-xs text-gray-600">Escríbenos por WhatsApp</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="bg-[#25D366] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>

        <motion.div
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          1
        </motion.div>
      </div>
    </motion.div>
  );
};
