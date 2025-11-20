import React from 'react';
import { Mail, Phone, User, Bell, MapPin, X, Plus, Globe } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type SignupFormProps = {
  siteConfig: any;
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
  availableCities: { id: string; name: string }[];
  selectedCities: { id: string; name: string }[];
  newCity: string;
  setNewCity: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: string
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>
  handleAddCity: () => void;
  handleRemoveCity: (city: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  countries: { country_id: string; name: string }[];
};

const SignupForm: React.FC<SignupFormProps> = ({
  siteConfig,
  formData,
  setFormData,
  availableCities,
  selectedCities,
  selectedCountry,
  setSelectedCountry,
  newCity,
  setNewCity,
  handleAddCity,
  handleRemoveCity,
  handleSubmit,
  loading = false,
  countries = [],
}) => {
console.log("Rendering SignupForm with countries:", countries);
  return (
    <Card className="p-6 sm:p-8 lg:p-10 shadow-2xl">
      <div className="text-center mb-6 sm:mb-8">
        <div
          className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: siteConfig.primaryColor }}
        >
          <Bell className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2">Regístrate Gratis</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Completa el formulario y comienza a ahorrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Nombre */}
        <div>
          <Label htmlFor="name" className="text-sm sm:text-base">
            Nombre Completo *
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm sm:text-base">
            Correo Electrónico *
          </Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm sm:text-base">
            Número de Celular *
          </Label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="phone"
              type="tel"
              placeholder="+52 55 1234 5678"
              className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
        </div>
        {/* País */}
        <div>
          <Label>Selecciona tu país *</Label>
          <div className="flex gap-2 mt-2">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="flex-1 h-11">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                {countries?.length > 0 ? (
                  countries.map((c) => (
                    <SelectItem key={c.country_id} value={String(c.country_id)}>
                      {c.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="none">
                    Cargando países...
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Globe className="w-6 h-6 text-gray-400 self-center" />
          </div>
        </div>
        {/* Cities */}
        <div>
          <Label className="text-sm sm:text-base mb-2 block">Ciudades de Interés *</Label>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            Selecciona las ciudades de las que quieres recibir promociones
          </p>
          <div className="flex gap-2 mb-3">
            <Select value={newCity} onValueChange={setNewCity}>
              <SelectTrigger className="flex-1 h-11">
                <SelectValue placeholder="Selecciona una ciudad" />
              </SelectTrigger>
              <SelectContent>
                {availableCities
                  .filter((city) => !selectedCities.some((c) => c.id === city.id))
                  .map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleAddCity} disabled={!newCity} className="h-11">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-lg bg-gray-50">
            {selectedCities.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Agrega al menos una ciudad</p>
            ) : (
              selectedCities.map((city) => (
                <Badge key={city.id} variant="outline" className="pr-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveCity(city.id)}
                    className="ml-2 hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="terms"
            checked={formData.acceptedTerms}
            onCheckedChange={(checked) => setFormData({ ...formData, acceptedTerms: !!checked })}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            Acepto los{' '}
            <a href="#" className="underline hover:text-gray-900">
              términos y condiciones
            </a>{' '}
            y la{' '}
            <a href="#" className="underline hover:text-gray-900">
              política de privacidad
            </a>
            . Autorizo el envío de promociones de las ciudades seleccionadas.
          </label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 sm:h-12 text-base sm:text-lg"
          style={{ backgroundColor: siteConfig.primaryColor }}
          disabled={loading}
        >
          <Bell className="w-5 h-5 mr-2" />
          {loading ? 'Enviando...' : 'Suscribirme Ahora'}
        </Button>

        <p className="text-xs sm:text-sm text-center text-gray-500">
          🔒 Tus datos están seguros. Nunca compartiremos tu información.
        </p>
      </form>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.primaryColor}20` }}
            >
              <svg className="w-4 h-4 text-current">
                {/* placeholder check icon, lucide Check isn't needed here */}
              </svg>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">100% Gratis</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.primaryColor}20` }}
            >
              <svg className="w-4 h-4 text-current"></svg>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Sin spam</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${siteConfig.primaryColor}20` }}
            >
              <svg className="w-4 h-4 text-current"></svg>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Cancela cuando quieras</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SignupForm;
