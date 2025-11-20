import React from 'react';
import { useApp } from '../../context/AppContext';
import useSignupForm from './useSignupForm';
import SignupForm from './SignupForm';
import SignupSuccess from './SignupSuccess';
import SignupFeatures from './SignupFeatures';
import SignupStats from './SignupStats';
import { motion } from 'motion/react';

const UserSignupPage: React.FC = () => {
  const { siteConfig, businesses, subscribers, setSubscribers } = useApp();

  // Hook centraliza toda la lógica
  const {
    formData,
    setFormData,
    selectedCities,
    setSelectedCities,
    newCity,
    setNewCity,
    submitted,
    isLoading,
    handleAddCity,
    handleRemoveCity,
    handleSubmit,
     selectedCountry,     // <-- agregar
  setSelectedCountry,
    countriess, 
    availableCities,
  } = useSignupForm(subscribers, setSubscribers);

  // Ciudades disponibles únicas (igual que en tu código original)
  //const availableCities = Array.from(new Set(businesses.map((b) => b.city))).sort();

  if (submitted) {
    return (
      <SignupSuccess formData={formData} selectedCities={selectedCities} siteConfig={siteConfig} />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${siteConfig.primaryColor} 0%, ${siteConfig.secondaryColor} 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Features */}
          <SignupFeatures
            siteConfig={siteConfig}
            businesses={businesses}
            subscribers={subscribers}
            availableCities={availableCities}
          />

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <SignupForm
              siteConfig={siteConfig}
              formData={formData}
              setFormData={setFormData}
              availableCities={availableCities}
              selectedCities={selectedCities}
              newCity={newCity}
              setNewCity={setNewCity}
              handleAddCity={handleAddCity}
              handleRemoveCity={handleRemoveCity}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              countries={countriess}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </motion.div>
        </div>

        {/* Mobile stats */}
        <SignupStats
          businesses={businesses}
          subscribers={subscribers}
          availableCities={availableCities}
        />
      </div>
    </div>
  );
};

export default UserSignupPage;
