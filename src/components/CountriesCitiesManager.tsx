import React, { useState } from 'react';
import { Globe, Plus, Trash2, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface CountriesCitiesManagerProps {
  countries: string[];
  cities: { country: string; name: string }[];
  onCountriesChange: (countries: string[]) => void;
  onCitiesChange: (cities: { country: string; name: string }[]) => void;
}

export const CountriesCitiesManager: React.FC<CountriesCitiesManagerProps> = ({
  countries = [],
  cities = [],
  onCountriesChange,
  onCitiesChange,
}) => {
  const [newCountry, setNewCountry] = useState('');
  const [newCityName, setNewCityName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleAddCountry = () => {
    if (!newCountry.trim()) {
      toast.error('Por favor ingresa un nombre de país');
      return;
    }

    if (countries.includes(newCountry.trim())) {
      toast.error('Este país ya existe');
      return;
    }

    onCountriesChange([...countries, newCountry.trim()]);
    toast.success('País agregado exitosamente');
    setNewCountry('');
  };

  const handleDeleteCountry = (country: string) => {
    const citiesInCountry = cities.filter((c) => c.country === country);
    if (citiesInCountry.length > 0) {
      toast.error(
        `No se puede eliminar ${country} porque tiene ${citiesInCountry.length} ciudades asociadas`
      );
      return;
    }

    onCountriesChange(countries.filter((c) => c !== country));
    toast.success('País eliminado exitosamente');
  };

  const handleAddCity = () => {
    if (!newCityName.trim() || !selectedCountry) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (cities.some((c) => c.name === newCityName.trim() && c.country === selectedCountry)) {
      toast.error('Esta ciudad ya existe en el país seleccionado');
      return;
    }

    onCitiesChange([...cities, { country: selectedCountry, name: newCityName.trim() }]);
    toast.success('Ciudad agregada exitosamente');
    setNewCityName('');
  };

  const handleDeleteCity = (cityName: string, country: string) => {
    onCitiesChange(cities.filter((c) => !(c.name === cityName && c.country === country)));
    toast.success('Ciudad eliminada exitosamente');
  };

  const getCitiesByCountry = () => {
    const groupedCities: Record<string, string[]> = {};
    cities.forEach((city) => {
      if (!groupedCities[city.country]) {
        groupedCities[city.country] = [];
      }
      groupedCities[city.country].push(city.name);
    });
    return groupedCities;
  };

  const citiesByCountry = getCitiesByCountry();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl flex items-center gap-2 mb-2">
          <Globe className="w-6 h-6" />
          Gestión de Países y Ciudades
        </h2>
        <p className="text-gray-600">
          Define los países y ciudades donde los negocios pueden registrarse
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Países</CardTitle>
            <CardDescription>
              Agrega los países donde operará el directorio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                placeholder="Nombre del país"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCountry();
                  }
                }}
              />
              <Button onClick={handleAddCountry} className="flex-shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>

            <div className="space-y-2">
              {countries.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No hay países registrados
                </p>
              ) : (
                countries.map((country) => (
                  <div
                    key={country}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{country}</span>
                      <Badge variant="outline">
                        {citiesByCountry[country]?.length || 0} ciudades
                      </Badge>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar país?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Se eliminará "{country}" del sistema.{' '}
                            {citiesByCountry[country] && citiesByCountry[country].length > 0
                              ? 'Primero debes eliminar todas las ciudades asociadas.'
                              : 'Esta acción no se puede deshacer.'}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCountry(country)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle>Ciudades</CardTitle>
            <CardDescription>Agrega ciudades por cada país</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Selecciona un país</Label>
              <select
                className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">-- Selecciona un país --</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Input
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Nombre de la ciudad"
                disabled={!selectedCountry}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCity();
                  }
                }}
              />
              <Button
                onClick={handleAddCity}
                disabled={!selectedCountry}
                className="flex-shrink-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>

            {countries.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Primero agrega países
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {countries.map((country) => {
                  const countryCities = citiesByCountry[country] || [];
                  if (countryCities.length === 0) return null;

                  return (
                    <div key={country} className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {country}
                      </h4>
                      <div className="pl-6 space-y-1">
                        {countryCities.map((cityName) => (
                          <div
                            key={`${country}-${cityName}`}
                            className="flex items-center justify-between p-2 bg-green-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-green-600" />
                              <span className="text-sm">{cityName}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600"
                              onClick={() => handleDeleteCity(cityName, country)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Total de países:{' '}
                <span className="text-blue-600 font-semibold">{countries.length}</span>
              </div>
              <div className="text-sm text-gray-600">
                Total de ciudades:{' '}
                <span className="text-blue-600 font-semibold">{cities.length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
