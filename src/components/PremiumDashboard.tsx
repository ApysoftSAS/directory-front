import React, { useState } from 'react';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  MessageCircle,
  Globe,
  Phone,
  Plus,
  Star,
  MapPin,
  Calendar,
  Edit,
  Save,
  Tag,
  Megaphone,
  Trash2,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';
import { Promotion, Review, BusinessStats, Business, PromotionalBanner } from '../types';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { SEOManager } from './SEOManager';
import { LocationsManager } from './LocationsManager';

interface PremiumDashboardProps {
  businessId?: string;
}

export const PremiumDashboard: React.FC<PremiumDashboardProps> = ({ businessId = '1' }) => {
  const { businesses, setBusinesses, siteConfig, banners, setBanners } = useApp();
  const business = businesses.find((b) => b.id === businessId);

  const [editMode, setEditMode] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState<Business | null>(business || null);

  const [stats] = useState<BusinessStats>({
    businessId,
    views: 1234,
    clicks: 567,
    whatsappClicks: 234,
    websiteClicks: 189,
    phoneClicks: 144,
    date: new Date().toISOString(),
  });

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      businessId,
      title: '20% de descuento en tu primera compra',
      description: 'Válido hasta fin de mes',
      startDate: '2025-10-01',
      endDate: '2025-10-31',
      discount: '20%',
      active: true,
      createdAt: '2025-10-15',
    },
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      businessId,
      userName: 'Carlos Martínez',
      rating: 5,
      comment: 'Excelente servicio, muy recomendado',
      verified: true,
      approved: true,
      createdAt: '2025-10-20',
    },
    {
      id: '2',
      businessId,
      userName: 'Ana López',
      rating: 4,
      comment: 'Muy buena atención al cliente',
      verified: true,
      approved: true,
      createdAt: '2025-10-22',
    },
  ]);

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
  });

  const businessBanners = banners.filter((b) => b.businessId === businessId);
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    startDate: '',
    endDate: '',
    priority: 1,
  });

  const handleSaveProfile = () => {
    if (!editedBusiness) return;

    setBusinesses(
      businesses.map((b) => (b.id === businessId ? editedBusiness : b))
    );
    setEditMode(false);
    toast.success('Perfil actualizado exitosamente');
  };

  const handleAddPromotion = () => {
    if (!newPromotion.title || !newPromotion.startDate || !newPromotion.endDate) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const promotion: Promotion = {
      id: String(Date.now()),
      businessId,
      ...newPromotion,
      active: true,
      createdAt: new Date().toISOString(),
    };

    setPromotions([...promotions, promotion]);
    setNewPromotion({
      title: '',
      description: '',
      discount: '',
      startDate: '',
      endDate: '',
    });
    toast.success('Promoción agregada exitosamente');
  };

  const handleSaveSEO = (seoData: any) => {
    if (!editedBusiness) return;
    
    const updatedBusiness = {
      ...editedBusiness,
      seo: seoData,
    };
    
    setEditedBusiness(updatedBusiness);
    setBusinesses(
      businesses.map((b) => (b.id === businessId ? updatedBusiness : b))
    );
  };

  const handleLocationsChange = (locations: any[]) => {
    if (!editedBusiness) return;
    
    const updatedBusiness = {
      ...editedBusiness,
      locations,
    };
    
    setEditedBusiness(updatedBusiness);
    setBusinesses(
      businesses.map((b) => (b.id === businessId ? updatedBusiness : b))
    );
  };

  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.image || !newBanner.link || !newBanner.startDate || !newBanner.endDate) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const banner: PromotionalBanner = {
      id: String(Date.now()),
      businessId,
      businessName: business?.name || '',
      ...newBanner,
      format: 'horizontal',
      active: true,
      createdAt: new Date().toISOString(),
    };

    setBanners([...banners, banner]);
    setNewBanner({
      title: '',
      description: '',
      image: '',
      link: '',
      startDate: '',
      endDate: '',
      priority: 1,
    });
    toast.success('Banner promocional agregado exitosamente');
  };

  const handleDeleteBanner = (bannerId: string) => {
    setBanners(banners.filter((b) => b.id !== bannerId));
    toast.success('Banner promocional eliminado exitosamente');
  };

  const handleTogglePromotion = (promoId: string) => {
    setPromotions(
      promotions.map((p) =>
        p.id === promoId ? { ...p, active: !p.active } : p
      )
    );
    toast.success('Estado de promoción actualizado');
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="text-center py-12">
          <p className="text-lg sm:text-xl text-gray-600">Negocio no encontrado</p>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2">Panel Premium</h1>
              <p className="text-base sm:text-lg text-gray-600">{business.name}</p>
              <Badge className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600">
                ⭐ Cuenta Premium
              </Badge>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={<Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
            label="Visualizaciones"
            value={stats.views}
            color={siteConfig.primaryColor}
          />
          <StatCard
            icon={<MousePointerClick className="w-5 h-5 sm:w-6 sm:h-6" />}
            label="Clics totales"
            value={stats.clicks}
            color={siteConfig.secondaryColor}
          />
          <StatCard
            icon={<MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            label="WhatsApp"
            value={stats.whatsappClicks}
            color="#25D366"
          />
          <StatCard
            icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6" />}
            label="Sitio Web"
            value={stats.websiteClicks}
            color={siteConfig.accentColor}
          />
          <StatCard
            icon={<Phone className="w-5 h-5 sm:w-6 sm:h-6" />}
            label="Teléfono"
            value={stats.phoneClicks}
            color="#6366f1"
          />
        </div>

        <Tabs defaultValue="promotions" className="w-full">
          <TabsList className="w-full overflow-x-auto flex-wrap h-auto gap-2 mb-6">
            <TabsTrigger value="promotions" className="flex-shrink-0">
              <Tag className="w-4 h-4 mr-2" />
              Promociones
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-shrink-0">
              <Star className="w-4 h-4 mr-2" />
              Opiniones
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex-shrink-0">
              <Edit className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex-shrink-0">
              <MapPin className="w-4 h-4 mr-2" />
              Sedes
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex-shrink-0">
              ⭐ SEO
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex-shrink-0">
              <Megaphone className="w-4 h-4 mr-2" />
              Banners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="promotions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Nueva Promoción
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Título *</Label>
                    <Input
                      value={newPromotion.title}
                      onChange={(e) =>
                        setNewPromotion({ ...newPromotion, title: e.target.value })
                      }
                      placeholder="Ej: 20% de descuento"
                    />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={newPromotion.description}
                      onChange={(e) =>
                        setNewPromotion({ ...newPromotion, description: e.target.value })
                      }
                      placeholder="Detalles de la promoción"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Descuento</Label>
                      <Input
                        value={newPromotion.discount}
                        onChange={(e) =>
                          setNewPromotion({ ...newPromotion, discount: e.target.value })
                        }
                        placeholder="20%"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha inicio *</Label>
                      <Input
                        type="date"
                        value={newPromotion.startDate}
                        onChange={(e) =>
                          setNewPromotion({ ...newPromotion, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Fecha fin *</Label>
                      <Input
                        type="date"
                        value={newPromotion.endDate}
                        onChange={(e) =>
                          setNewPromotion({ ...newPromotion, endDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleAddPromotion}
                    className="w-full"
                    style={{ backgroundColor: siteConfig.primaryColor }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Publicar Promoción
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl">Promociones Activas</h3>
                {promotions.map((promo) => (
                  <Card key={promo.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-base sm:text-lg mb-1">{promo.title}</h4>
                        {promo.discount && (
                          <Badge style={{ backgroundColor: siteConfig.secondaryColor }}>
                            {promo.discount} OFF
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant={promo.active ? 'default' : 'outline'}
                        onClick={() => handleTogglePromotion(promo.id)}
                      >
                        {promo.active ? 'Activa' : 'Inactiva'}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{promo.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(promo.startDate).toLocaleDateString()}
                      </div>
                      <span>-</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(promo.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl mb-2">Opiniones de Clientes</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= avgRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg">
                      {avgRating.toFixed(1)} ({reviews.length} opiniones)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verificado
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 mb-1">{review.comment}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="text-lg sm:text-xl">Editar Perfil del Negocio</h3>
                <Button
                  onClick={() => (editMode ? handleSaveProfile() : setEditMode(true))}
                  style={{ backgroundColor: siteConfig.primaryColor }}
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre del Negocio</Label>
                    <Input
                      value={editedBusiness?.name || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, name: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Categoría</Label>
                    <Input
                      value={editedBusiness?.category || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, category: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={editedBusiness?.description || ''}
                    onChange={(e) =>
                      editedBusiness &&
                      setEditedBusiness({ ...editedBusiness, description: e.target.value })
                    }
                    disabled={!editMode}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Teléfono Principal</Label>
                    <Input
                      value={editedBusiness?.phone1 || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, phone1: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <Input
                      value={editedBusiness?.whatsapp || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, whatsapp: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editedBusiness?.email || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, email: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Sitio Web</Label>
                    <Input
                      value={editedBusiness?.website || ''}
                      onChange={(e) =>
                        editedBusiness &&
                        setEditedBusiness({ ...editedBusiness, website: e.target.value })
                      }
                      disabled={!editMode}
                    />
                  </div>
                </div>

                <div>
                  <Label>Horario de Atención</Label>
                  <Input
                    value={editedBusiness?.schedule || ''}
                    onChange={(e) =>
                      editedBusiness &&
                      setEditedBusiness({ ...editedBusiness, schedule: e.target.value })
                    }
                    disabled={!editMode}
                    placeholder="Lun-Vie 9:00-18:00"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="locations">
            <LocationsManager
              locations={editedBusiness?.locations || []}
              onLocationsChange={handleLocationsChange}
            />
          </TabsContent>

          <TabsContent value="seo">
            <SEOManager
              seoData={editedBusiness?.seo}
              businessName={business.name}
              onSave={handleSaveSEO}
            />
          </TabsContent>

          <TabsContent value="banners">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Nuevo Banner Promocional
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Título *</Label>
                    <Input
                      value={newBanner.title}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, title: e.target.value })
                      }
                      placeholder="Ej: Oferta Especial"
                    />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <Textarea
                      value={newBanner.description}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, description: e.target.value })
                      }
                      placeholder="Detalles del banner"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Imagen (URL) *</Label>
                    <Input
                      value={newBanner.image}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, image: e.target.value })
                      }
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  <div>
                    <Label>Enlace *</Label>
                    <Input
                      value={newBanner.link}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, link: e.target.value })
                      }
                      placeholder="/negocio/1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha inicio *</Label>
                      <Input
                        type="date"
                        value={newBanner.startDate}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, startDate: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Fecha fin *</Label>
                      <Input
                        type="date"
                        value={newBanner.endDate}
                        onChange={(e) =>
                          setNewBanner({ ...newBanner, endDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Prioridad (1-10)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={newBanner.priority}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, priority: parseInt(e.target.value) || 1 })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleAddBanner}
                    className="w-full"
                    style={{ backgroundColor: siteConfig.primaryColor }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Banner
                  </Button>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl">Banners Activos</h3>
                {businessBanners.length > 0 ? (
                  businessBanners.map((banner) => (
                    <Card key={banner.id} className="p-4 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: siteConfig.primaryColor }}
                        >
                          <Megaphone className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg mb-2">{banner.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mb-3">
                            <Calendar className="w-4 h-4" />
                            {new Date(banner.startDate).toLocaleDateString()} -{' '}
                            {new Date(banner.endDate).toLocaleDateString()}
                          </div>
                          <Badge>Prioridad: {banner.priority}</Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteBanner(banner.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-6 text-center">
                    <Megaphone className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No hay banners registrados</p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 truncate">{label}</p>
          <p className="text-lg sm:text-2xl truncate">{value.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);
