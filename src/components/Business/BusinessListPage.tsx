import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { BusinessCard } from './BusinessCard';
import { SEOHead } from '../SEOHead';
import { useApp } from '../../context/AppContext';
import { allBusiness } from "../../services/BusinessService";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

/* Skeleton card */
const BusinessCardSkeleton = () => (
  <div className="p-4 rounded-xl border shadow-sm bg-white animate-pulse">
    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-10 bg-gray-200 rounded"></div>
  </div>
);

/* Normalización */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/* Similitud */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  const w1 = s1.split(/\s+/);
  const w2 = s2.split(/\s+/);

  let match = 0;
  w1.forEach((word1) => {
    if (w2.some((word2) => word2.includes(word1) || word1.includes(word2))) {
      match++;
    }
  });

  return match / Math.max(w1.length, w2.length);
}

export const BusinessListPage = ({ onNavigate, filters }) => {
  const { siteConfig } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCategoryFromLocation =
    location.state?.selectedCategory || filters?.selectedCategory || "";

  const searchQueryFromLocation =
    location.state?.searchQuery || filters?.searchQuery || "";

  const selectedCityFromLocation =
    location.state?.selectedCity || filters?.selectedCity || "";

  const selectedCountryFromLocation =
    location.state?.selectedCountry || filters?.selectedCountry || "";
  /* Estados */
  const [countriess, setCountriess] = useState([]);
  const [categoriess, setCategoriess] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(selectedCountryFromLocation);
  const [selectedCity, setSelectedCity] = useState(selectedCityFromLocation);
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromLocation);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromLocation);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const [businessess, setBusinessess] = useState([]);
  const [pagination, setPagination] = useState(null);

  const { categories, countries, loading, error } = useData();

  console.log(selectedCategory,selectedCountry);
  // 🔥 Único loading
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Para evitar “No encontramos resultados” antes de tiempo
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  /* Cargar categorías y países */
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      return;
    }

    setCategoriess(categories);
    setCountriess(countries);

    if (error) {
      toast.error("Hubo un error al cargar las categorías.");
    }
  }, [loading, error, categories, countries]);

  /* Cargar Businesses */
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchBusinesses = async () => {
      try {
        setIsLoading(true);

        const response = await allBusiness(
          {
            page: currentPage,
            perPage: itemsPerPage,
            search: searchQuery,
            category: selectedCategory,
            country: selectedCountry,
            city: selectedCity,
          },
          signal
        );

        if (response?.data) {
          setBusinessess(response.data.data);
          setPagination(response.data);
          setHasFetchedOnce(true);
        } else {
          toast.error("No se pudo obtener la lista de negocios");
          setBusinessess([]);
        }
      } catch (error) {
        if (error.name === "AbortError") return;
        toast.error(error.message);
        setBusinessess([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
    return () => controller.abort();

  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    selectedCategory,
    selectedCountry,
    selectedCity
  ]);

  /* Ciudades según el país */
  const cities = useMemo(() => {
    if (!selectedCountry) return [];
    const country = countriess.find((c) => c.country_id === selectedCountry);
    return country?.cities || [];
  }, [selectedCountry, countriess]);

  /* Filtros locales */
  const filteredBusinesses = useMemo(() => {
    if (!Array.isArray(businessess)) return [];

    return businessess.filter((business) => {
      if (business.status !== 'approved') return false;

      let matchesSearch = true;

      if (searchQuery.trim()) {
        const q = normalizeText(searchQuery);

        const textsToCheck = [
          business.name || '',
          business.description || '',
          business.category_relation?.name || '',
          business.city?.name || '',
          business.country?.name || '',
          business.address || '',
        ];

        const textMatch = textsToCheck.some(
          (txt) =>
            normalizeText(txt).includes(q) ||
            calculateSimilarity(txt, q) > 0.6
        );

        const locationMatch =
          business.locations?.some((loc) => {
            const c = normalizeText(loc.city || '');
            const a = normalizeText(loc.address || '');
            const n = normalizeText(loc.name || '');
            return c.includes(q) || a.includes(q) || n.includes(q);
          }) || false;

        const keywordMatch =
          business.seo?.keywords?.some((kw) => normalizeText(kw).includes(q)) ||
          false;

        matchesSearch = textMatch || locationMatch || keywordMatch;
      }

      const matchesCategory =
        !selectedCategory ||
        business.category_relation?.category_id === selectedCategory;

      const matchesCountry =
        !selectedCountry ||
        business.country_id === selectedCountry ||
        business.country_relation?.country_id === selectedCountry;

      const matchesCity =
        !selectedCity ||
        business.city_id === selectedCity ||
        business.city_relation?.city_id === selectedCity ||
        business.locations?.some((loc) => loc.city_id === selectedCity);

      return matchesSearch && matchesCategory && matchesCountry && matchesCity;
    });
  }, [businessess, searchQuery, selectedCategory, selectedCity, selectedCountry]);

  /* Handlers */
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleCountryChange = (value) => {
    setSelectedCountry(value === "all" ? "" : value);
    setSelectedCity("");
  };

  const handleCityChange = (value) =>
    setSelectedCity(value === "all" ? "" : value);

  const handleCategoryChange = (value) =>
    setSelectedCategory(value === "all" ? "" : value);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCity("");
    setSelectedCountry("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const onViewDetails = (id: string) => navigate(`/negocio/${id}`);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: siteConfig.backgroundColor }}
    >
      <SEOHead
        title="Directorio de Negocios"
        description="Encuentra negocios locales filtrados por categoría, país y ciudad."
        keywords={['directorio', 'negocios', selectedCategory, selectedCity].filter(Boolean)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Directorio de Negocios</h1>

        {/* FILTROS */}
        <Card className="p-6 space-y-6 mb-8">

          {/* BUSCADOR */}
          <div>
            <label className="block text-sm font-medium mb-1">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Ej. restaurante, hotel..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* FILTROS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* CATEGORÍA */}
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categoriess.map(cat => (
                    <SelectItem key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PAÍS */}
            <div>
              <label className="block text-sm font-medium mb-1">País</label>
              <Select value={selectedCountry || "all"} onValueChange={handleCountryChange}>
                <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {countriess.map(country => (
                    <SelectItem key={country.country_id} value={country.country_id}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* CIUDAD */}
            <div>
              <label className="block text-sm font-medium mb-1">Ciudad</label>
              <Select
                value={selectedCity || "all"}
                onValueChange={handleCityChange}
                disabled={!selectedCountry}
              >
                <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city.city_id} value={city.city_id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* CHIPS */}
          {(searchQuery || selectedCategory || selectedCountry || selectedCity) && (
            <div className="pt-4 border-t flex flex-wrap gap-2">
              {searchQuery && <span className="px-3 py-1 bg-gray-200 rounded-full">Buscar: {searchQuery}</span>}
              {selectedCategory && <span className="px-3 py-1 bg-gray-200 rounded-full">Categoría: {categoriess.find(c => c.category_id === selectedCategory)?.name}</span>}
              {selectedCountry && <span className="px-3 py-1 bg-gray-200 rounded-full">País: {countriess.find(c => c.country_id === selectedCountry)?.name}</span>}
              {selectedCity && <span className="px-3 py-1 bg-gray-200 rounded-full">Ciudad: {cities.find(c => c.city_id === selectedCity)?.name}</span>}
              <Button size="sm" variant="outline" onClick={clearFilters}>Limpiar filtros</Button>
            </div>
          )}
        </Card>

        {/* MOSTRANDO / ITEMS-PER-PAGE */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Mostrando {businessess.length} de {pagination?.total || 0} resultados
          </p>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Ver:</span>
            <Select value={String(itemsPerPage)} onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-24"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[6, 9, 12, 15, 20].map(num => (
                  <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ===================== */}
        {/*   BLOQUE PRINCIPAL   */}
        {/* ===================== */}

        {/* ⏳ LOADING SKELETONS */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* ✔ HAY RESULTADOS */}
            {filteredBusinesses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {filteredBusinesses.map((b, index) => (
                    <BusinessCard
                      key={b.business_id}
                      business={b}
                      index={index}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>

                {/* PAGINACIÓN */}
                {pagination && pagination.last_page > 1 && (
                  <div className="flex items-center justify-center gap-4 mb-16 py-8">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      ← Anterior
                    </Button>

                    <span>Página {pagination.current_page} de {pagination.last_page}</span>

                    <Button
                      variant="outline"
                      disabled={currentPage === pagination.last_page}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Siguiente →
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* ❗SIN RESULTADOS (solo después de 1 fetch real) */
              hasFetchedOnce && (
                <div className="text-center py-20">
                  <p className="text-xl mb-3">No encontramos resultados.</p>
                  <p className="text-gray-500 mb-6">Prueba modificando los filtros.</p>
                  <Button onClick={clearFilters}>Restablecer filtros</Button>
                </div>
              )
            )}
          </>
        )}

      </div>
    </div>
  );
};
