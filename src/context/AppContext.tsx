import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Business, Category, Popup, SiteConfig, PromotionalBanner, AppUser, Landing, Review, Subscriber, PremiumDiscount } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  businesses: Business[];
  setBusinesses: (businesses: Business[]) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  popups: Popup[];
  setPopups: (popups: Popup[]) => void;
  siteConfig: SiteConfig;
  setSiteConfig: (config: SiteConfig) => void;
  banners: PromotionalBanner[];
  setBanners: (banners: PromotionalBanner[]) => void;
  appUsers: AppUser[];
  setAppUsers: (users: AppUser[]) => void;
  landings: Landing[];
  setLandings: (landings: Landing[]) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  subscribers: Subscriber[];
  setSubscribers: (subscribers: Subscriber[]) => void;
  premiumDiscounts: PremiumDiscount[];
  setPremiumDiscounts: (discounts: PremiumDiscount[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const defaultCategories: Category[] = [
  { id: '1', name: 'Restaurantes', icon: 'utensils', count: 45 },
  { id: '2', name: 'Salud', icon: 'heart-pulse', count: 32 },
  { id: '3', name: 'Educación', icon: 'graduation-cap', count: 28 },
  { id: '4', name: 'Tecnología', icon: 'laptop', count: 38 },
  { id: '5', name: 'Construcción', icon: 'hammer', count: 25 },
  { id: '6', name: 'Belleza', icon: 'scissors', count: 41 },
  { id: '7', name: 'Automotriz', icon: 'car', count: 19 },
  { id: '8', name: 'Legal', icon: 'scale', count: 22 },
];

const defaultBusinesses: Business[] = [
  {
    id: '1',
    name: 'Restaurante El Buen Sabor',
    category: 'Restaurantes',
    description: 'Restaurante familiar con comida tradicional y ambiente acogedor. Servimos los mejores platillos de la región con ingredientes frescos y recetas auténticas.',
    address: 'Calle Principal 123',
    city: 'Ciudad de México',
    country: 'México',
    phone1: '+52 55 1234 5678',
    phone2: '+52 55 8765 4321',
    whatsapp: '+5255123456',
    email: 'contacto@buensabor.com',
    website: 'www.buensabor.com',
    logo: '',
    images: [],
    status: 'approved',
    featured: true,
    premium: true,
    createdAt: '2025-10-15',
    schedule: 'Lun-Sáb 9:00-22:00',
    socialMedia: {
      facebook: 'facebook.com/buensabor',
      instagram: 'instagram.com/buensabor',
    },
    locations: [
      {
        id: '1',
        name: 'Sucursal Centro',
        address: 'Calle Principal 123',
        city: 'Ciudad de México',
        phone: '+52 55 1234 5678',
        schedule: 'Lun-Sáb 9:00-22:00',
      },
    ],
  },
  {
    id: '2',
    name: 'Clínica Dental Sonrisa',
    category: 'Salud',
    description: 'Clínica dental con tecnología de punta y profesionales certificados. Ofrecemos tratamientos dentales de alta calidad en un ambiente cómodo.',
    address: 'Av. Reforma 456',
    city: 'Guadalajara',
    country: 'México',
    phone1: '+52 33 2222 3333',
    whatsapp: '+5233222233',
    email: 'info@clinicasonrisa.com',
    logo: '',
    images: [],
    status: 'approved',
    featured: true,
    premium: false,
    createdAt: '2025-10-16',
  },
  {
    id: '3',
    name: 'Academia Tech Pro',
    category: 'Educación',
    description: 'Academia especializada en cursos de programación y desarrollo web. Formamos a los profesionales del futuro con metodologías modernas.',
    address: 'Boulevard Digital 789',
    city: 'Monterrey',
    country: 'México',
    phone1: '+52 81 9999 8888',
    email: 'cursos@techpro.com',
    website: 'www.techpro.edu',
    logo: '',
    images: [],
    status: 'approved',
    featured: false,
    premium: false,
    createdAt: '2025-10-17',
  },
  {
    id: '4',
    name: 'Soluciones IT GlobalTech',
    category: 'Tecnología',
    description: 'Empresa de soluciones tecnológicas para empresas. Desarrollo de software, consultoría IT y soporte técnico especializado.',
    address: 'Zona Industrial 321',
    city: 'Puebla',
    country: 'México',
    phone1: '+52 22 5555 6666',
    phone2: '+52 22 7777 8888',
    email: 'ventas@globaltech.mx',
    logo: '',
    images: [],
    status: 'pending',
    featured: false,
    premium: false,
    createdAt: '2025-10-25',
  },
  {
    id: '5',
    name: 'Constructora Edificar',
    category: 'Construcción',
    description: 'Constructora con más de 20 años de experiencia en proyectos residenciales y comerciales.',
    address: 'Calle de la Obra 555',
    city: 'Querétaro',
    country: 'México',
    phone1: '+52 44 3333 4444',
    email: 'proyectos@edificar.com',
    logo: '',
    images: [],
    status: 'approved',
    featured: false,
    premium: false,
    createdAt: '2025-10-18',
  },
  {
    id: '6',
    name: 'Salón de Belleza Estilo',
    category: 'Belleza',
    description: 'Salón de belleza con servicios completos de estética, peluquería y spa.',
    address: 'Plaza Comercial Norte 101',
    city: 'Ciudad de México',
    country: 'México',
    phone1: '+52 55 4444 5555',
    email: 'citas@salonestilo.com',
    logo: '',
    images: [],
    status: 'approved',
    featured: true,
    premium: false,
    createdAt: '2025-10-19',
  },
];

const defaultPopups: Popup[] = [
  {
    id: '1',
    title: 'Descuento Especial - Restaurante El Buen Sabor',
    image: '',
    link: '/negocio/1',
    startDate: '2025-10-20',
    endDate: '2025-11-30',
    frequency: 1,
    active: true,
  },
];

const defaultSiteConfig: SiteConfig = {
  name: 'LocalPoint',
  logo: '',
  primaryColor: '#2563eb',
  secondaryColor: '#f59e0b',
  accentColor: '#10b981',
  backgroundColor: '#f3f4f6',
  textColor: '#1f2937',
  whatsappNumber: '+573163784652',
  countries: ['México', 'Colombia', 'Argentina', 'España'],
  cities: [
    { country: 'México', name: 'Ciudad de México' },
    { country: 'México', name: 'Guadalajara' },
    { country: 'México', name: 'Monterrey' },
    { country: 'Colombia', name: 'Bogotá' },
    { country: 'Colombia', name: 'Medellín' },
    { country: 'Argentina', name: 'Buenos Aires' },
    { country: 'España', name: 'Madrid' },
    { country: 'España', name: 'Barcelona' },
  ],
};

const defaultPremiumDiscounts: PremiumDiscount[] = [
  {
    id: '1',
    code: 'PREMIUM20',
    percentage: 20,
    description: 'Descuento especial de lanzamiento',
    active: true,
    validFrom: '2025-10-01',
    validTo: '2025-12-31',
    usageLimit: 100,
    usedCount: 15,
    createdAt: '2025-10-01',
  },
  {
    id: '2',
    code: 'PROMO50',
    percentage: 50,
    description: 'Promoción especial 50% OFF',
    active: true,
    validFrom: '2025-11-01',
    validTo: '2025-11-30',
    usedCount: 5,
    createdAt: '2025-10-25',
  },
];

const defaultBanners: PromotionalBanner[] = [
  {
    id: '1',
    businessId: '1',
    businessName: 'Restaurante El Buen Sabor',
    title: '¡30% OFF en Menú Ejecutivo!',
    description: 'Disfruta de nuestros platillos especiales con un descuento increíble. Válido de lunes a viernes.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop',
    link: '/negocio/1',
    format: 'horizontal',
    active: true,
    startDate: '2025-10-20',
    endDate: '2025-12-31',
    priority: 1,
    createdAt: '2025-10-20',
  },
  {
    id: '2',
    businessId: '6',
    businessName: 'Salón de Belleza Estilo',
    title: 'Promo Especial de Temporada',
    description: '2x1 en cortes de cabello todos los martes. ¡No te lo pierdas!',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=800&fit=crop',
    link: '/negocio/6',
    format: 'horizontal',
    active: true,
    startDate: '2025-10-25',
    endDate: '2025-11-30',
    priority: 2,
    createdAt: '2025-10-25',
  },
];

const defaultReviews: Review[] = [
  {
    id: '1',
    businessId: '1',
    userName: 'María González',
    userEmail: 'maria@example.com',
    rating: 5,
    comment: 'Excelente servicio y comida deliciosa. El ambiente es muy acogedor y el personal muy atento.',
    verified: true,
    approved: true,
    createdAt: '2025-10-20',
  },
  {
    id: '2',
    businessId: '1',
    userName: 'Carlos Ramírez',
    userEmail: 'carlos@example.com',
    rating: 4,
    comment: 'Muy buena experiencia, los platillos son abundantes y sabrosos.',
    verified: true,
    approved: false,
    createdAt: '2025-10-25',
  },
  {
    id: '3',
    businessId: '1',
    userName: 'Ana López',
    userEmail: 'ana@example.com',
    rating: 5,
    comment: 'El mejor restaurante de la zona. Totalmente recomendado.',
    verified: true,
    approved: true,
    createdAt: '2025-10-22',
    response: {
      text: '¡Muchas gracias por tu comentario Ana! Nos alegra que hayas disfrutado tu visita.',
      respondedAt: '2025-10-23',
    },
  },
];

const defaultAppUsers: (AppUser & { password: string })[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'registrador@test.com',
    phone: '+52 55 1111 2222',
    role: 'registrador',
    password: '123456',
    createdAt: '2025-10-01',
    lastLogin: '2025-10-29',
  },
  {
    id: '2',
    name: 'Usuario Premium',
    email: 'premium@test.com',
    phone: '+52 55 3333 4444',
    role: 'premium',
    password: '123456',
    createdAt: '2025-10-15',
    lastLogin: '2025-10-30',
  },
  {
    id: '3',
    name: 'Administrador',
    email: 'admin@test.com',
    phone: '+52 55 5555 6666',
    role: 'admin',
    password: '123456',
    createdAt: '2025-09-01',
    lastLogin: '2025-10-30',
  },
];

const defaultSubscribers: Subscriber[] = [
  {
    id: '1',
    name: 'Laura Martínez',
    email: 'laura.martinez@example.com',
    phone: '+52 55 1234 5678',
    cities: ['Ciudad de México', 'Guadalajara'],
    active: true,
    subscribedAt: '2025-10-01',
    lastEmailSent: '2025-10-28',
  },
  {
    id: '2',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@example.com',
    phone: '+52 33 8765 4321',
    cities: ['Guadalajara', 'Monterrey'],
    active: true,
    subscribedAt: '2025-10-15',
  },
  {
    id: '3',
    name: 'Carmen Torres',
    email: 'carmen.torres@example.com',
    phone: '+52 81 5555 6666',
    cities: ['Monterrey'],
    active: true,
    subscribedAt: '2025-10-20',
    lastEmailSent: '2025-10-29',
  },
  {
    id: '4',
    name: 'Pedro Gómez',
    email: 'pedro.gomez@example.com',
    cities: ['Ciudad de México', 'Querétaro', 'Puebla'],
    active: false,
    subscribedAt: '2025-09-05',
    lastEmailSent: '2025-09-20',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>(defaultBusinesses);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [popups, setPopups] = useState<Popup[]>(defaultPopups);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [banners, setBanners] = useState<PromotionalBanner[]>(defaultBanners);
  const [appUsers, setAppUsers] = useState<AppUser[]>(defaultAppUsers);
  const [landings, setLandings] = useState<Landing[]>([]);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(defaultSubscribers);
  const [premiumDiscounts, setPremiumDiscounts] = useState<PremiumDiscount[]>(defaultPremiumDiscounts);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        businesses,
        setBusinesses,
        categories,
        setCategories,
        popups,
        setPopups,
        siteConfig,
        setSiteConfig,
        banners,
        setBanners,
        appUsers,
        setAppUsers,
        landings,
        setLandings,
        reviews,
        setReviews,
        subscribers,
        setSubscribers,
        premiumDiscounts,
        setPremiumDiscounts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};