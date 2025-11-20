import React, { useState } from 'react';
import { Plus, List, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useApp } from '../context/AppContext';
import { Business } from '../types';
import { toast } from 'sonner@2.0.3';

export const RegistradorDashboard: React.FC = () => {
  const { user, businesses, setBusinesses, categories, siteConfig } = useApp();
  const [activeTab, setActiveTab] = useState('nuevo');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    city: '',
    country: 'México',
    phone1: '',
    phone2: '',
    whatsapp: '',
    email: '',
    website: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.description || !formData.phone1 || !formData.email) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const newBusiness: Business = {
      id: Date.now().toString(),
      ...formData,
      images: [],
      status: 'pending',
      featured: false,
      createdAt: new Date().toISOString(),
      registeredBy: user?.id,
    };

    setBusinesses([...businesses, newBusiness]);
    toast.success('Negocio registrado exitosamente. Pendiente de aprobación.');

    setFormData({
      name: '',
      category: '',
      description: '',
      address: '',
      city: '',
      country: 'México',
      phone1: '',
      phone2: '',
      whatsapp: '',
      email: '',
      website: '',
    });
  };

  const myBusinesses = businesses.filter((b) => b.registeredBy === user?.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aprobado
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pendiente
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rechazado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8">Dashboard del Registrador</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="nuevo">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Negocio
            </TabsTrigger>
            <TabsTrigger value="registros">
              <List className="w-4 h-4 mr-2" />
              Mis Registros ({myBusinesses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nuevo">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Registrar Nuevo Negocio</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nombre del Negocio *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <select
                      id="category"
                      name="category"
                      className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">País *</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone1">Teléfono Principal *</Label>
                    <Input
                      id="phone1"
                      name="phone1"
                      type="tel"
                      value={formData.phone1}
                      onChange={handleInputChange}
                      placeholder="+52 55 1234 5678"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone2">Teléfono Secundario (Opcional)</Label>
                    <Input
                      id="phone2"
                      name="phone2"
                      type="tel"
                      value={formData.phone2}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+5215512345678"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa el número con código de país, sin espacios
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Sitio Web (Opcional)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="text"
                      placeholder="www.ejemplo.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: siteConfig.primaryColor }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Negocio
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="registros">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Mis Registros</h2>

              {myBusinesses.length > 0 ? (
                <div className="space-y-4">
                  {myBusinesses.map((business) => (
                    <Card key={business.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl">{business.name}</h3>
                            {getStatusBadge(business.status)}
                          </div>
                          <p className="text-gray-600 mb-2">{business.category}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            {business.city}, {business.country}
                          </p>
                          <p className="text-sm text-gray-500">
                            Registrado: {new Date(business.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <List className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No has registrado ningún negocio todavía</p>
                  <Button
                    className="mt-4"
                    onClick={() => setActiveTab('nuevo')}
                    style={{ backgroundColor: siteConfig.primaryColor }}
                  >
                    Registrar mi primer negocio
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
