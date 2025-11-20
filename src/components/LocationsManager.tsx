import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit, Save, X, Phone, Clock, Navigation, Image as ImageIcon, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Location } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LocationsManagerProps {
  locations: Location[];
  onLocationsChange: (locations: Location[]) => void;
}

export const LocationsManager: React.FC<LocationsManagerProps> = ({
  locations = [],
  onLocationsChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    address: '',
    city: '',
    phone: '',
    whatsapp: '',
    schedule: '',
    description: '',
    images: [],
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      toast.error('Por favor ingresa una URL de imagen');
      return;
    }

    setFormData({
      ...formData,
      images: [...(formData.images || []), newImageUrl.trim()],
    });
    setNewImageUrl('');
    toast.success('Imagen agregada');
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.address || !formData.city) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const newLocation: Location = {
      id: Date.now().toString(),
      name: formData.name!,
      address: formData.address!,
      city: formData.city!,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      schedule: formData.schedule,
      description: formData.description,
      images: formData.images || [],
    };

    onLocationsChange([...locations, newLocation]);
    toast.success('Sede agregada exitosamente');
    resetForm();
  };

  const handleEdit = (location: Location) => {
    setEditingId(location.id);
    setFormData(location);
    setIsAdding(true);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.address || !formData.city) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const updatedLocations = locations.map((loc) =>
      loc.id === editingId ? { ...loc, ...formData } : loc
    );

    onLocationsChange(updatedLocations);
    toast.success('Sede actualizada exitosamente');
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updatedLocations = locations.filter((loc) => loc.id !== id);
    onLocationsChange(updatedLocations);
    toast.success('Sede eliminada exitosamente');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      phone: '',
      whatsapp: '',
      schedule: '',
      description: '',
      images: [],
    });
    setIsAdding(false);
    setEditingId(null);
    setNewImageUrl('');
  };

  const groupedLocations = locations.reduce((acc, location) => {
    if (!acc[location.city]) {
      acc[location.city] = [];
    }
    acc[location.city].push(location);
    return acc;
  }, {} as Record<string, Location[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Gestión de Sedes
          </h2>
          <p className="text-gray-600 mt-1">
            Administra las diferentes ubicaciones de tu negocio con galería de imágenes
          </p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Sede
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{editingId ? 'Editar Sede' : 'Nueva Sede'}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  {editingId
                    ? 'Actualiza la información de la sede'
                    : 'Completa la información de la nueva sede'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Información Básica</TabsTrigger>
                    <TabsTrigger value="gallery">Galería</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Nombre de la Sede *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Sucursal Centro"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">
                          Ciudad *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ciudad de México"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">
                        Dirección *
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Calle Principal 123, Col. Centro"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Descripción
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe las características especiales de esta sede..."
                        rows={3}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Teléfono
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+52 55 1234 5678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">
                          WhatsApp
                        </Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder="+52 55 8765 4321"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schedule">
                        Horario
                      </Label>
                      <Textarea
                        id="schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleInputChange}
                        placeholder="Lun-Vie: 9:00-18:00, Sáb: 10:00-14:00"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>
                        Agregar Imagen (URL)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://ejemplo.com/imagen.jpg"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddImage();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={handleAddImage}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {formData.images && formData.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <ImageWithFallback
                              src={image}
                              alt={`Imagen ${index + 1} de ${formData.name}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No hay imágenes agregadas</p>
                        <p className="text-sm text-gray-500">Agrega URLs de imágenes arriba</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 justify-end mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Actualizar' : 'Agregar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {locations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              No hay sedes registradas
            </p>
            <Button
              onClick={() => setIsAdding(true)}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar primera sede
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedLocations).map(([city, cityLocations]) => (
            <div key={city}>
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl">
                  {city}
                </h3>
                <Badge variant="outline">
                  {cityLocations.length} {cityLocations.length === 1 ? 'sede' : 'sedes'}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {cityLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      {location.images && location.images.length > 0 && (
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={location.images[0]}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                          {location.images.length > 1 && (
                            <Badge className="absolute bottom-2 right-2 bg-black/70">
                              <ImageIcon className="w-3 h-3 mr-1" />
                              {location.images.length} fotos
                            </Badge>
                          )}
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-blue-600" />
                              {location.name}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {location.address}
                            </CardDescription>
                            {location.description && (
                              <p className="text-sm text-gray-600 mt-2">{location.description}</p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(location)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar sede?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se eliminará permanentemente
                                    la sede "{location.name}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(location.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {location.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{location.phone}</span>
                          </div>
                        )}
                        {location.schedule && (
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 mt-0.5" />
                            <span>{location.schedule}</span>
                          </div>
                        )}
                        {location.whatsapp && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => window.open(`https://wa.me/${location.whatsapp}`, '_blank')}
                            >
                              WhatsApp
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {locations.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Total de sedes:{' '}
                  <span className="text-blue-600">{locations.length}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Ciudades:{' '}
                  <span className="text-blue-600">
                    {Object.keys(groupedLocations).length}
                  </span>
                </div>
              </div>
              <Badge className="bg-blue-600">
                Plan Premium Activo
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
