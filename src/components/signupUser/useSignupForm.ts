import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { allCountries } from '../../services/countriesService'
import { Subscriber } from '../../types'
import { registerCustomer, City } from '../../services/customerService';
import { useData } from "../../context/DataContext";

type UseSignupFormReturn = {
  formData: {
    name: string;
    email: string;
    phone: string;
    acceptedTerms: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      acceptedTerms: boolean;
    }>
  >;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  availableCities: City[];
  selectedCities: City[];
  setSelectedCities: React.Dispatch<React.SetStateAction<City[]>>;
  newCity: string | null;
  setNewCity: React.Dispatch<React.SetStateAction<string | null>>;
  submitted: boolean;
  isLoading: boolean;
  handleAddCity: () => void;
  handleRemoveCity: (cityId: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  countriess: { country_id: string; name: string; cities?: City[] }[];
};

export default function useSignupForm(
  subscribers: Subscriber[],
  setSubscribers: (next: Subscriber[]) => void
): UseSignupFormReturn {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    acceptedTerms: false,
  });

  const [countriess, setCountriess] = useState<{ country_id: string; name: string; cities?: City[] }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [newCity, setNewCity] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { countries, loading, error } = useData();
  // 🔹 Cargar países del backend

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setCountriess(countries);
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
      toast.error("Hubo un error al cargar las categorías.");
    }
  }, [countries, loading, error]);

  // 🔹 Cuando se selecciona un país, actualizar sus ciudades disponibles
  useEffect(() => {
    if (selectedCountry) {
      const country = countriess.find(c => c.country_id === selectedCountry);
      if (country?.cities) {
        setAvailableCities(country.cities.map(c => ({
          id: c.city_id, // dependiendo de tu backend
          name: c.name
        })));
      } else {
        setAvailableCities([]);
      }
      setSelectedCities([]);
    } else {
      setAvailableCities([]);
      setSelectedCities([]);
    }
  }, [selectedCountry, countriess]);

  const handleAddCity = () => {
    if (!newCity) return;

    const cityToAdd = availableCities.find(c => c.id === newCity);
    if (cityToAdd && !selectedCities.some(c => c.id === newCity)) {
      setSelectedCities(prev => [...prev, cityToAdd]);
    }

    setNewCity(null);
  };

  const handleRemoveCity = (id: string) => {
    setSelectedCities(prev => prev.filter(c => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (!formData.acceptedTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    if (selectedCities.length === 0) {
      toast.error('Selecciona al menos una ciudad de interés');
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        country: selectedCountry,
        cities: selectedCities.map(c => ({ id: c.id, name: c.name })),
      };

      const result = await registerCustomer(payload);

      setSubscribers([...subscribers, result]);
      setSubmitted(true);
      toast.success('¡Te has registrado exitosamente!');
    } catch (err: any) {
      const backendError = err?.data;

      if (backendError?.errors) {
        const firstError = Object.values(backendError.errors)[0][0];
        toast.error(firstError);
        return;
      }

      if (backendError?.message) {
        toast.error(backendError.message);
        return;
      }

      toast.error("Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    selectedCountry,
    setSelectedCountry,
    availableCities,
    selectedCities,
    setSelectedCities,
    newCity,
    setNewCity,
    submitted,
    isLoading,
    handleAddCity,
    handleRemoveCity,
    handleSubmit,
    countriess,
  };
}
