import React from 'react';

type Props = {
  businesses: any[];
  subscribers: any[];
  availableCities: string[];
};

const SignupStats: React.FC<Props> = ({ businesses, subscribers, availableCities }) => {
  return (
    <>
      {/* Desktop already shows stats inside SignupFeatures; this is mobile version */}
      <div className="lg:hidden grid grid-cols-3 gap-4 mt-8 text-white text-center">
        <div>
          <p className="text-2xl sm:text-3xl mb-1">{businesses.length}+</p>
          <p className="text-xs sm:text-sm text-white/90">Negocios</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl mb-1">{subscribers.length}+</p>
          <p className="text-xs sm:text-sm text-white/90">Usuarios</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl mb-1">{availableCities.length}+</p>
          <p className="text-xs sm:text-sm text-white/90">Ciudades</p>
        </div>
      </div>
    </>
  );
};

export default SignupStats;
