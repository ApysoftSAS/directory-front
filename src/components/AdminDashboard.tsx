import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Tag,
  Megaphone,
  Palette,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { businesses, setBusinesses, categories, setCategories, popups, setPopups, siteConfig, setSiteConfig } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const pendingBusinesses = businesses.filter((b) => b.status === 'pending');
  const approvedBusinesses = businesses.filter((b) => b.status === 'approved');
  const rejectedBusinesses = businesses.filter((b) => b.status === 'rejected');

  const handleApproveBusiness = (id: string) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, status: 'approved' as const } : b))
    );
    toast.success('Negocio aprobado exitosamente');
  };

  const handleRejectBusiness = (id: string) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, status: 'rejected' as const } : b))
    );
    toast.error('Negocio rechazado');
  };

  const handleToggleFeatured = (id: string) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, featured: !b.featured } : b))
    );
    toast.success('Negocio actualizado');
  };

  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error('El nombre es obligatorio');
      return;
    }
    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        name: newCategory.name,
        icon: newCategory.icon || 'tag',
        count: 0,
      },
    ]);
    setNewCategory({ name: '', icon: '' });
    toast.success('Categoría creada exitosamente');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success('Categoría eliminada');
  };

  const [colorConfig, setColorConfig] = useState(siteConfig);

  const handleSaveColors = () => {
    setSiteConfig(colorConfig);
    toast.success('Colores actualizados exitosamente');
  };

  const chartData = categories.map((cat) => ({
    name: cat.name,
    negocios: businesses.filter((b) => b.category === cat.name && b.status === 'approved').length,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: siteConfig.backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl mb-8">Panel de Administración</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="overview">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="pending">
              <Clock className="w-4 h-4 mr-2" />
              Pendientes ({pendingBusinesses.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              <CheckSquare className="w-4 h-4 mr-2" />
              Aprobados
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Tag className="w-4 h-4 mr-2" />
              Categorías
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Palette className="w-4 h-4 mr-2" />
              Apariencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Negocios</span>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl">{businesses.length}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Pendientes</span>
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-3xl">{pendingBusinesses.length}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Aprobados</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl">{approvedBusinesses.length}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Categorías</span>
                  <Tag className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl">{categories.length}</p>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-2xl mb-6">Negocios por Categoría</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="negocios" fill={siteConfig.primaryColor} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Solicitudes Pendientes</h2>

              {pendingBusinesses.length > 0 ? (
                <div className="space-y-4">
                  {pendingBusinesses.map((business) => (
                    <Card key={business.id} className="p-4 border-l-4 border-yellow-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl mb-2">{business.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{business.category}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendiente
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{business.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <p>📍 {business.city}, {business.country}</p>
                            <p>📞 {business.phone1}</p>
                            <p>✉️ {business.email}</p>
                            <p>📅 {new Date(business.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            onClick={() => handleApproveBusiness(business.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aprobar
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleRejectBusiness(business.id)}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rechazar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay solicitudes pendientes</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Negocios Aprobados</h2>

              {approvedBusinesses.length > 0 ? (
                <div className="space-y-4">
                  {approvedBusinesses.map((business) => (
                    <Card key={business.id} className="p-4 border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl mb-2">{business.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{business.category}</Badge>
                            {business.featured && (
                              <Badge style={{ backgroundColor: siteConfig.secondaryColor }}>
                                Destacado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {business.city}, {business.country}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleToggleFeatured(business.id)}
                        >
                          {business.featured ? 'Quitar destacado' : 'Marcar destacado'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>No hay negocios aprobados</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-2xl mb-6">Nueva Categoría</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Nombre de la categoría</Label>
                    <Input
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory({ ...newCategory, name: e.target.value })
                      }
                      placeholder="Ej: Restaurantes"
                    />
                  </div>
                  <Button
                    onClick={handleAddCategory}
                    style={{ backgroundColor: siteConfig.primaryColor }}
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Crear Categoría
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl mb-6">Categorías Existentes</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p>{category.name}</p>
                        <p className="text-sm text-gray-500">
                          {businesses.filter((b) => b.category === category.name && b.status === 'approved').length} negocios
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <XCircle className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Personalizar Apariencia</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label>Nombre del Sitio</Label>
                  <Input
                    value={colorConfig.name}
                    onChange={(e) =>
                      setColorConfig({ ...colorConfig, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label>Color Primario</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colorConfig.primaryColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, primaryColor: e.target.value })
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={colorConfig.primaryColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, primaryColor: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Color Secundario</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colorConfig.secondaryColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, secondaryColor: e.target.value })
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={colorConfig.secondaryColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, secondaryColor: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Color de Acento</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={colorConfig.accentColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, accentColor: e.target.value })
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={colorConfig.accentColor}
                      onChange={(e) =>
                        setColorConfig({ ...colorConfig, accentColor: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg mb-4">Vista Previa</h3>
                <div className="p-6 rounded-lg border space-y-4">
                  <div
                    className="h-20 rounded flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: colorConfig.primaryColor }}
                  >
                    Color Primario
                  </div>
                  <div
                    className="h-20 rounded flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: colorConfig.secondaryColor }}
                  >
                    Color Secundario
                  </div>
                  <div
                    className="h-20 rounded flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: colorConfig.accentColor }}
                  >
                    Color de Acento
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveColors} style={{ backgroundColor: siteConfig.primaryColor }}>
                <Settings className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
