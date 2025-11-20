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
  Users,
  Layout,
  Edit,
  Plus,
  Trash2,
  Mail,
  MapPin,
  ToggleLeft,
  ToggleRight,
  X,
  Send,
  UserCheck,
  Globe,
  Star,
  Percent,
  BarChart3,
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
import { LandingBuilder } from './LandingBuilder';
import { CountriesCitiesManager } from './CountriesCitiesManager';
import { PremiumDiscountsManager } from './PremiumDiscountsManager';
import { Landing, AppUser, Subscriber, Category, Popup } from '../types';
import { motion } from 'motion/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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

export const AdminDashboardNew: React.FC = () => {
  const {
    businesses,
    setBusinesses,
    categories,
    setCategories,
    popups,
    setPopups,
    siteConfig,
    setSiteConfig,
    appUsers,
    setAppUsers,
    landings,
    setLandings,
    subscribers,
    setSubscribers,
    premiumDiscounts,
    setPremiumDiscounts,
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [showLandingBuilder, setShowLandingBuilder] = useState(false);
  const [editingLanding, setEditingLanding] = useState<Landing | undefined>();
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [showSubscriberDialog, setShowSubscriberDialog] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [newCity, setNewCity] = useState('');

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');

  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [showPopupDialog, setShowPopupDialog] = useState(false);

  const pendingBusinesses = businesses.filter((b) => b.status === 'pending');
  const approvedBusinesses = businesses.filter((b) => b.status === 'approved');
  const rejectedBusinesses = businesses.filter((b) => b.status === 'rejected');
  const premiumBusinesses = businesses.filter((b) => b.premium && b.status === 'approved');

  const availableCities = Array.from(new Set(businesses.map((b) => b.city))).sort();

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
    toast.success('Estado destacado actualizado');
  };

  const handleTogglePremium = (id: string) => {
    setBusinesses(
      businesses.map((b) => (b.id === id ? { ...b, premium: !b.premium } : b))
    );
    toast.success('Estado premium actualizado');
  };

  const handleUpdateSiteConfig = (key: string, value: any) => {
    setSiteConfig({ ...siteConfig, [key]: value });
  };

  const handleSaveConfig = () => {
    toast.success('Configuración guardada exitosamente');
  };

  const handleEditUser = (user: AppUser) => {
    setEditingUser(user);
    setShowUserDialog(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    setAppUsers(appUsers.map((u) => (u.id === editingUser.id ? editingUser : u)));
    toast.success('Usuario actualizado');
    setShowUserDialog(false);
    setEditingUser(null);
  };

  const handleEditSubscriber = (subscriber: Subscriber) => {
    setEditingSubscriber(subscriber);
    setSelectedCities(subscriber.cities || []);
    setShowSubscriberDialog(true);
  };

  const handleAddCity = () => {
    if (newCity && !selectedCities.includes(newCity)) {
      setSelectedCities([...selectedCities, newCity]);
      setNewCity('');
    }
  };

  const handleRemoveCity = (city: string) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const handleSaveSubscriber = () => {
    if (!editingSubscriber) return;

    const updatedSubscriber = {
      ...editingSubscriber,
      cities: selectedCities,
    };

    setSubscribers(
      subscribers.map((s) => (s.id === editingSubscriber.id ? updatedSubscriber : s))
    );
    toast.success('Suscriptor actualizado');
    setShowSubscriberDialog(false);
    setEditingSubscriber(null);
    setSelectedCities([]);
  };

  const handleToggleSubscriberActive = (id: string) => {
    setSubscribers(
      subscribers.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    toast.success('Estado del suscriptor actualizado');
  };

  const handleDeleteSubscriber = (id: string) => {
    setSubscribers(subscribers.filter((s) => s.id !== id));
    toast.success('Suscriptor eliminado');
  };

  const handleSendPromotionEmail = (subscriber: Subscriber) => {
    const updatedSubscriber = {
      ...subscriber,
      lastEmailSent: new Date().toISOString().split('T')[0],
    };
    setSubscribers(subscribers.map((s) => (s.id === subscriber.id ? updatedSubscriber : s)));
    toast.success(`Email enviado a ${subscriber.email}`);
  };

  const handleCreateLanding = () => {
    setEditingLanding(undefined);
    setShowLandingBuilder(true);
  };

  const handleEditLanding = (landing: Landing) => {
    setEditingLanding(landing);
    setShowLandingBuilder(true);
  };

  const handleSaveLanding = (landing: Landing) => {
    if (editingLanding) {
      setLandings(landings.map((l) => (l.id === landing.id ? landing : l)));
      toast.success('Landing actualizada');
    } else {
      setLandings([...landings, landing]);
      toast.success('Landing creada');
    }
    setShowLandingBuilder(false);
    setEditingLanding(undefined);
  };

  const handleDeleteLanding = (id: string) => {
    setLandings(landings.filter((l) => l.id !== id));
    toast.success('Landing eliminada');
  };

  const handleToggleLandingPublished = (id: string) => {
    setLandings(
      landings.map((l) => (l.id === id ? { ...l, published: !l.published } : l))
    );
    toast.success('Estado de publicación actualizado');
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryIcon('tag');
    setShowCategoryDialog(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryIcon(category.icon);
    setShowCategoryDialog(true);
  };

  const handleSaveCategory = () => {
    if (!newCategoryName) {
      toast.error('El nombre de la categoría es requerido');
      return;
    }

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: newCategoryName, icon: newCategoryIcon }
            : c
        )
      );
      toast.success('Categoría actualizada');
    } else {
      const newCategory: Category = {
        id: `${Date.now()}`,
        name: newCategoryName,
        icon: newCategoryIcon,
        count: 0,
      };
      setCategories([...categories, newCategory]);
      toast.success('Categoría creada');
    }
    setShowCategoryDialog(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success('Categoría eliminada');
  };

  const handleCreatePopup = () => {
    setEditingPopup({
      id: `${Date.now()}`,
      title: '',
      image: '',
      link: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      frequency: 1,
      active: true,
    });
    setShowPopupDialog(true);
  };

  const handleEditPopup = (popup: Popup) => {
    setEditingPopup(popup);
    setShowPopupDialog(true);
  };

  const handleSavePopup = () => {
    if (!editingPopup) return;

    if (!editingPopup.title || !editingPopup.image) {
      toast.error('Título e imagen son requeridos');
      return;
    }

    const existingPopup = popups.find((p) => p.id === editingPopup.id);
    if (existingPopup) {
      setPopups(popups.map((p) => (p.id === editingPopup.id ? editingPopup : p)));
      toast.success('Popup actualizado');
    } else {
      setPopups([...popups, editingPopup]);
      toast.success('Popup creado');
    }
    setShowPopupDialog(false);
    setEditingPopup(null);
  };

  const handleDeletePopup = (id: string) => {
    setPopups(popups.filter((p) => p.id !== id));
    toast.success('Popup eliminado');
  };

  const handleTogglePopupActive = (id: string) => {
    setPopups(popups.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
    toast.success('Estado del popup actualizado');
  };

  const chartData = categories.map((cat) => ({
    name: cat.name,
    negocios: cat.count,
  }));

  if (showLandingBuilder) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl mb-2">
            {editingLanding ? 'Editar Landing' : 'Crear Nueva Landing'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Usa el sistema de bloques drag & drop para construir tu landing
          </p>
        </div>
        <LandingBuilder
          landing={editingLanding}
          onSave={handleSaveLanding}
          onCancel={() => {
            setShowLandingBuilder(false);
            setEditingLanding(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl mb-2">Panel de Administración</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gestiona todos los aspectos de la plataforma
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 mb-6">
            <TabsTrigger value="overview">
              <LayoutDashboard className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="approval">
              <CheckSquare className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Aprobar</span>
            </TabsTrigger>
            <TabsTrigger value="premium">
              <Star className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Premium</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <Mail className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Suscriptores</span>
            </TabsTrigger>
            <TabsTrigger value="landings">
              <Layout className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Landings</span>
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Tag className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Categorías</span>
            </TabsTrigger>
            <TabsTrigger value="popups">
              <Megaphone className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Popups</span>
            </TabsTrigger>
            <TabsTrigger value="locations">
              <Globe className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Países</span>
            </TabsTrigger>
            <TabsTrigger value="discounts">
              <Percent className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Descuentos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-gray-600">Total Negocios</p>
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 opacity-20" />
                    </div>
                    <p className="text-2xl sm:text-3xl">{businesses.length}</p>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-gray-600">Pendientes</p>
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 opacity-20" />
                    </div>
                    <p className="text-2xl sm:text-3xl">{pendingBusinesses.length}</p>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-gray-600">Aprobados</p>
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 opacity-20" />
                    </div>
                    <p className="text-2xl sm:text-3xl">{approvedBusinesses.length}</p>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-gray-600">Premium</p>
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 opacity-20" />
                    </div>
                    <p className="text-2xl sm:text-3xl">{premiumBusinesses.length}</p>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-gray-600">Categorías</p>
                      <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 opacity-20" />
                    </div>
                    <p className="text-2xl sm:text-3xl">{categories.length}</p>
                  </Card>
                </motion.div>
              </div>

              <Card className="p-6">
                <h3 className="text-xl mb-4">Negocios por Categoría</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="negocios" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl mb-4">Actividad Reciente</h3>
                  <div className="space-y-4">
                    {businesses.slice(0, 5).map((business) => (
                      <div key={business.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {business.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{business.name}</p>
                          <p className="text-sm text-gray-500">{business.city}</p>
                        </div>
                        <Badge
                          variant={
                            business.status === 'approved'
                              ? 'default'
                              : business.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {business.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl mb-4">Estadísticas Rápidas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Usuarios Totales</span>
                      <span className="text-2xl">{appUsers.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Suscriptores</span>
                      <span className="text-2xl">{subscribers.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Landings</span>
                      <span className="text-2xl">{landings.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Popups Activos</span>
                      <span className="text-2xl">{popups.filter(p => p.active).length}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="approval">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Negocios Pendientes de Aprobación</h3>
              {pendingBusinesses.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No hay negocios pendientes de aprobación
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Negocio</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Ciudad</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingBusinesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{business.name}</p>
                            <p className="text-sm text-gray-500">{business.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{business.category}</TableCell>
                        <TableCell>{business.city}</TableCell>
                        <TableCell>{new Date(business.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveBusiness(business.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Aprobar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectBusiness(business.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Rechazar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>

            <Card className="p-6 mt-6">
              <h3 className="text-xl mb-4">Todos los Negocios</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Negocio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Destacado</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell>
                        <p className="font-medium">{business.name}</p>
                        <p className="text-sm text-gray-500">{business.city}</p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            business.status === 'approved'
                              ? 'default'
                              : business.status === 'pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                        >
                          {business.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={business.featured ? 'default' : 'outline'}
                          onClick={() => handleToggleFeatured(business.id)}
                        >
                          {business.featured ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={business.premium ? 'default' : 'outline'}
                          className={business.premium ? 'bg-purple-600 hover:bg-purple-700' : ''}
                          onClick={() => handleTogglePremium(business.id)}
                        >
                          {business.premium ? <Star className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {business.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApproveBusiness(business.id)}
                              >
                                Aprobar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRejectBusiness(business.id)}
                              >
                                Rechazar
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="premium">
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl flex items-center gap-2">
                      <Star className="w-6 h-6 text-purple-600" />
                      Negocios Premium
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Gestiona los negocios con cuenta premium activa
                    </p>
                  </div>
                  <Badge className="bg-purple-600 text-white text-lg px-4 py-2">
                    {premiumBusinesses.length} Activos
                  </Badge>
                </div>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Premium</p>
                      <p className="text-3xl mt-2">{premiumBusinesses.length}</p>
                    </div>
                    <Star className="w-12 h-12 text-purple-500 opacity-20" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Con Múltiples Sedes</p>
                      <p className="text-3xl mt-2">
                        {premiumBusinesses.filter(b => b.locations && b.locations.length > 0).length}
                      </p>
                    </div>
                    <MapPin className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Con SEO Configurado</p>
                      <p className="text-3xl mt-2">
                        {premiumBusinesses.filter(b => b.seo && b.seo.metaTitle).length}
                      </p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-green-500 opacity-20" />
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-xl mb-4">Lista de Negocios Premium</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Negocio</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Sedes</TableHead>
                      <TableHead>SEO</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {premiumBusinesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-purple-600" />
                            <div>
                              <p className="font-medium">{business.name}</p>
                              <p className="text-sm text-gray-500">{business.city}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{business.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {(business.locations?.length || 0) + 1} sedes
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {business.seo?.metaTitle ? (
                            <Badge className="bg-green-600">Configurado</Badge>
                          ) : (
                            <Badge variant="outline">Pendiente</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {business.featured ? (
                            <Badge className="bg-yellow-500">Destacado</Badge>
                          ) : (
                            <Badge variant="outline">Normal</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTogglePremium(business.id)}
                            >
                              Quitar Premium
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggleFeatured(business.id)}
                            >
                              {business.featured ? 'Quitar Destacado' : 'Destacar'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">Gestión de Usuarios</h3>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === 'admin'
                              ? 'default'
                              : user.role === 'premium'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Usuario</DialogTitle>
                  <DialogDescription>
                    Actualiza la información del usuario
                  </DialogDescription>
                </DialogHeader>
                {editingUser && (
                  <div className="space-y-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Rol</Label>
                      <Select
                        value={editingUser.role}
                        onValueChange={(value) =>
                          setEditingUser({
                            ...editingUser,
                            role: value as any,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visitor">Visitante</SelectItem>
                          <SelectItem value="registrador">Registrador</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSaveUser} className="w-full">
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="p-6">
              <h3 className="text-xl mb-4">Gestión de Suscriptores</h3>
              <p className="text-gray-600 mb-6">
                Gestiona los suscriptores y sus ciudades de interés para recibir promociones
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Suscriptor</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ciudades de Interés</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Email</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{subscriber.name}</p>
                          <p className="text-sm text-gray-500">{subscriber.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {subscriber.cities.map((city) => (
                            <Badge key={city} variant="outline">
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={subscriber.active ? 'default' : 'outline'}
                          onClick={() => handleToggleSubscriberActive(subscriber.id)}
                        >
                          {subscriber.active ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Activo
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              Inactivo
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        {subscriber.lastEmailSent
                          ? new Date(subscriber.lastEmailSent).toLocaleDateString()
                          : 'Nunca'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditSubscriber(subscriber)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendPromotionEmail(subscriber)}
                            disabled={!subscriber.active}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar suscriptor?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción eliminará permanentemente a {subscriber.name} de la lista
                                  de suscriptores.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteSubscriber(subscriber.id)}
                                  className="bg-red-600"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Dialog open={showSubscriberDialog} onOpenChange={setShowSubscriberDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Suscriptor</DialogTitle>
                  <DialogDescription>
                    Gestiona las ciudades de interés del suscriptor
                  </DialogDescription>
                </DialogHeader>
                {editingSubscriber && (
                  <div className="space-y-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input value={editingSubscriber.name} disabled />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={editingSubscriber.email} disabled />
                    </div>
                    <div>
                      <Label>Ciudades de Interés</Label>
                      <div className="flex gap-2 mb-2">
                        <Select value={newCity} onValueChange={setNewCity}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button onClick={handleAddCity}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCities.map((city) => (
                          <Badge key={city} variant="secondary">
                            {city}
                            <button
                              onClick={() => handleRemoveCity(city)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button onClick={handleSaveSubscriber} className="w-full">
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="landings">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">Gestión de Landings Premium</h3>
                <Button onClick={handleCreateLanding}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Landing
                </Button>
              </div>

              {landings.length === 0 ? (
                <div className="text-center py-12">
                  <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No hay landings creadas</p>
                  <Button onClick={handleCreateLanding}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primera Landing
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {landings.map((landing) => (
                      <TableRow key={landing.id}>
                        <TableCell className="font-medium">{landing.title}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            /{landing.slug}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={landing.published ? 'default' : 'outline'}
                            onClick={() => handleToggleLandingPublished(landing.id)}
                          >
                            {landing.published ? 'Publicada' : 'Borrador'}
                          </Button>
                        </TableCell>
                        <TableCell>{new Date(landing.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditLanding(landing)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar landing?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteLanding(landing.id)}
                                    className="bg-red-600"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">Gestión de Categorías</h3>
                <Button onClick={handleCreateCategory}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Categoría
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg">{category.name}</h4>
                        <p className="text-sm text-gray-500">{category.count} negocios</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Se eliminará "{category.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteCategory(category.id)}
                                className="bg-red-600"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory ? 'Actualiza la información de la categoría' : 'Crea una nueva categoría para el directorio'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nombre</Label>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Nombre de la categoría"
                    />
                  </div>
                  <div>
                    <Label>Icono</Label>
                    <Input
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      placeholder="tag"
                    />
                  </div>
                  <Button onClick={handleSaveCategory} className="w-full">
                    Guardar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="popups">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl">Gestión de Popups Publicitarios</h3>
                <Button onClick={handleCreatePopup}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Popup
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Fechas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popups.map((popup) => (
                    <TableRow key={popup.id}>
                      <TableCell className="font-medium">{popup.title}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(popup.startDate).toLocaleDateString()}</p>
                          <p className="text-gray-500">
                            {new Date(popup.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={popup.active ? 'default' : 'outline'}
                          onClick={() => handleTogglePopupActive(popup.id)}
                        >
                          {popup.active ? (
                            <>
                              <ToggleRight className="w-4 h-4 mr-1" />
                              Activo
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 mr-1" />
                              Inactivo
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPopup(popup)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar popup?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePopup(popup.id)}
                                  className="bg-red-600"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Dialog open={showPopupDialog} onOpenChange={setShowPopupDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingPopup?.id ? 'Editar Popup' : 'Nuevo Popup'}</DialogTitle>
                  <DialogDescription>
                    {editingPopup?.id ? 'Actualiza la información del popup publicitario' : 'Crea un nuevo popup publicitario'}
                  </DialogDescription>
                </DialogHeader>
                {editingPopup && (
                  <div className="space-y-4">
                    <div>
                      <Label>Título</Label>
                      <Input
                        value={editingPopup.title}
                        onChange={(e) =>
                          setEditingPopup({ ...editingPopup, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Imagen (URL)</Label>
                      <Input
                        value={editingPopup.image}
                        onChange={(e) =>
                          setEditingPopup({ ...editingPopup, image: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Enlace</Label>
                      <Input
                        value={editingPopup.link}
                        onChange={(e) =>
                          setEditingPopup({ ...editingPopup, link: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Fecha inicio</Label>
                        <Input
                          type="date"
                          value={editingPopup.startDate}
                          onChange={(e) =>
                            setEditingPopup({ ...editingPopup, startDate: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Fecha fin</Label>
                        <Input
                          type="date"
                          value={editingPopup.endDate}
                          onChange={(e) =>
                            setEditingPopup({ ...editingPopup, endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <Button onClick={handleSavePopup} className="w-full">
                      Guardar
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="locations">
            <CountriesCitiesManager
              countries={siteConfig.countries || []}
              cities={siteConfig.cities || []}
              onCountriesChange={(countries) =>
                handleUpdateSiteConfig('countries', countries)
              }
              onCitiesChange={(cities) => handleUpdateSiteConfig('cities', cities)}
            />
          </TabsContent>

          <TabsContent value="discounts">
            <PremiumDiscountsManager
              discounts={premiumDiscounts}
              onDiscountsChange={setPremiumDiscounts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
