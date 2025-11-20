import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { SEOHead } from './SEOHead';
import { BannersCarousel } from './BannersCarousel';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { BusinessCard } from './Business/BusinessCard';
import { Footer } from './footer/footer';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

/* Componente skeleton para mostrar tarjeta cargando */
const BusinessCardSkeleton = () => (
  <div className="p-4 rounded-lg border bg-gray-200 animate-pulse h-40 sm:h-44" />
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { businesses, siteConfig, popups, banners } = useApp();
  const { categories, countries, categoriesAndIterations, tags,
    loadTagBusinesses, businessesByTag
  } = useData();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [businessesByTagSelect, setBusinessesByTagSelect] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const hasInitializedTag = useRef(false);

  // Sincroniza la lista con businessesByTag
  useEffect(() => {
    if (Array.isArray(businessesByTag)) {
      setBusinessesByTagSelect(businessesByTag);
    } else {
      setBusinessesByTagSelect([]);
    }
    setIsLoading(false);
  }, [businessesByTag]);

  const activePopup = popups.find((p) => p.active);

  // Mostrar popup después de 2s si hay activo
  useEffect(() => {
    if (activePopup) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [activePopup]);

  // Inicializa el primer tag activo solo una vez
  useEffect(() => {
    if (!hasInitializedTag.current && tags && tags.length > 0) {
      const firstActiveTag = tags.find(tag => tag.status === true);
      if (firstActiveTag) {
        handleTagChange(firstActiveTag.tag_id);
      }
      hasInitializedTag.current = true;
    }
  }, [tags]);

  // Maneja búsqueda
  const handleSearch = () => {
    navigate('/negocios', {
      state: {
        searchQuery,
        selectedCountry,
        selectedCategory,
        selectedCity
      }
    });
  };

  // Maneja cambio de tag
  const handleTagChange = async (tagId: string) => {
    setSelectedTag(tagId);

    if (!tagId) {
      setBusinessesByTagSelect([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      await loadTagBusinesses(tagId);
      // businessesByTagSelect se actualiza vía useEffect anterior
    } catch (err) {
      console.error("Error al cargar negocios por tag", err);
      setBusinessesByTagSelect([]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const selectedTagObject = useMemo(() => tags.find(t => t.tag_id === selectedTag), [selectedTag, tags]);

  const cities = useMemo(() => {
    if (!selectedCountry) return [];
    const country = countries.find((c) => c.country_id === selectedCountry);
    return country?.cities || [];
  }, [selectedCountry, countries]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      <SEOHead
        title="Directorio de Negocios Locales"
        description="Encuentra los mejores negocios y servicios locales. Directorio completo de empresas, restaurantes, servicios y más en tu ciudad."
        keywords={['directorio', 'negocios locales', 'empresas', 'servicios', 'directorio comercial', ...categories.map(c => c.name)]}
      />

      {/* Hero y búsqueda */}
      <div
        className="py-12 sm:py-16 lg:py-20 px-4"
        style={{ background: `linear-gradient(135deg, ${siteConfig.primaryColor} 0%, ${siteConfig.secondaryColor} 100%)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">Encuentra los mejores negocios locales</h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">
            Directorio completo de empresas y servicios en tu ciudad
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input type="text" placeholder="¿Qué buscas?" className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
                </div>

                <select className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm sm:text-base" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>)}
                </select>

                <select className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm sm:text-base" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(''); }}>
                  <option value="">Todos los países</option>
                  {countries?.map((country) => <option key={country.country_id} value={country.country_id}>{country.name}</option>)}
                </select>

                <select className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm sm:text-base" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedCountry}>
                  <option value="">Todas las ciudades</option>
                  {cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.name}</option>)}
                </select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full h-10 sm:h-11 text-sm sm:text-base" onClick={handleSearch} style={{ backgroundColor: siteConfig.primaryColor }}>
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Buscar Negocios
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Ofertas Destacadas */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" style={{ color: siteConfig.secondaryColor }} />
            <h2 className="text-2xl sm:text-3xl">Ofertas Destacadas</h2>
          </div>
          <BannersCarousel banners={banners} onNavigate={onNavigate} />
        </motion.div>
      </div>

      {/* Categorías Populares */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl">Categorías Populares</h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => navigate('/categorias')} className="w-full sm:w-auto">Ver todas</Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {!Array.isArray(categoriesAndIterations?.data) || categoriesAndIterations.data.length === 0 ? (
            [...Array(8)].map((_, i) => <div key={i} className="h-32 sm:h-40 bg-gray-200 animate-pulse rounded-lg" />)
          ) : (
            categoriesAndIterations.data.sort((a, b) => b.count - a.count).slice(0, 8).map((item, index) => (
              <motion.div key={item.category.category_id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer text-center" onClick={() => navigate("/negocios", { state: { selectedCategory: item.category.category_id } })}>
                  <motion.div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl" style={{ backgroundColor: siteConfig.primaryColor }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    {item.category.name.charAt(0)}
                  </motion.div>
                  <h3 className="text-sm sm:text-base mb-1 sm:mb-2">{item.category.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.category.businesses_count} negocios</p>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Negocios Destacados por Tag */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: siteConfig.secondaryColor }} />
            <h2 className="text-2xl sm:text-3xl">Negocios Destacados</h2>
          </div>

          <select value={selectedTag} onChange={(e) => handleTagChange(e.target.value)} className="sm:w-64 p-2 border rounded bg-white">
            <option value="">Selecciona un tag</option>
            {tags.filter(tag => tag.status).map((tag) => <option key={tag.tag_id} value={tag.tag_id}>{tag.name}</option>)}
          </select>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[...Array(9)].map((_, i) => <BusinessCardSkeleton key={i} />)}
          </div>
        ) : (
          businessesByTagSelect.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {businessesByTagSelect.filter(b => b?.business_id && b?.name && b?.category_id).map((business, index) => (
                <BusinessCard key={business.business_id} business={business} feature={selectedTagObject?.name ?? ""} onViewDetails={(id) => onNavigate('negocio', { id })} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">No hay negocios destacados en este momento</div>
          )
        )}
      </div>

      {/* Popup */}
      {showPopup && activePopup && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', damping: 20 }}>
            <Card className="max-w-md w-full relative">
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => setShowPopup(false)} className="absolute top-2 right-2 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 z-10">×</motion.button>
              <div className="p-4 sm:p-6">
                <div className="mb-4">
                  <ImageWithFallback src={activePopup.image || 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg'} alt={activePopup.title} className="w-full h-48 sm:h-64 object-cover rounded-lg" />
                </div>
                <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{activePopup.title}</h3>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full" onClick={() => { setShowPopup(false); if (activePopup.link.startsWith('/negocio/')) { const id = activePopup.link.split('/').pop(); onNavigate('negocio', { id }); } }} style={{ backgroundColor: siteConfig.secondaryColor }}>Ver oferta</Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}

      <div className="py-2">
        <Footer />
      </div>
    </div>
  );
};
