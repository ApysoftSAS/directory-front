import React from 'react';
import { motion } from 'motion/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center mt-8 text-sm text-gray-500"
    >
      <p>
        © {currentYear}{' '}
        <a 
          href="https://apysoft.com.co/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          APYSOFT S.A.S.
        </a>{''}
        Todos los derechos reservados.
      </p>
    </motion.div>
  );
};
