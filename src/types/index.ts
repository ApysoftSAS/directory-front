export type UserRole = 'visitor' | 'registrador' | 'admin' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  whatsapp?: string;
  schedule?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  description?: string;
}

export interface Promotion {
  id: string;
  businessId: string;
  title: string;
  description: string;
  image?: string;
  startDate: string;
  endDate: string;
  discount?: string;
  active: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  comment: string;
  verified: boolean;
  approved: boolean;
  createdAt: string;
  response?: {
    text: string;
    respondedAt: string;
  };
}

export interface BusinessStats {
  businessId: string;
  views: number;
  clicks: number;
  whatsappClicks: number;
  websiteClicks: number;
  phoneClicks: number;
  date: string;
}

export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string;
  ogImage?: string;
  altTexts?: { [key: string]: string };
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  country: string;
  phone1: string;
  phone2?: string;
  whatsapp?: string;
  email: string;
  website?: string;
  logo?: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  premium: boolean;
  createdAt: string;
  registeredBy?: string;
  schedule?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  locations?: Location[];
  seo?: SEOData;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Popup {
  id: string;
  title: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
  frequency: number;
  active: boolean;
}

export interface SiteConfig {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  whatsappNumber?: string;
  countries?: string[];
  cities?: { country: string; name: string }[];
}

export interface ContactRequest {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'registered';
}

export interface UserSubscription {
  id: string;
  name: string;
  email: string;
  phone: string;
  acceptedTerms: boolean;
  subscribedAt: string;
  active: boolean;
}

export interface PromotionalBanner {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  format: 'horizontal';
  active: boolean;
  startDate: string;
  endDate: string;
  priority: number;
  createdAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'visitor' | 'registrador' | 'admin' | 'premium';
  password?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cities: string[];
  active: boolean;
  subscribedAt: string;
  lastEmailSent?: string;
}

export interface LandingBlock {
  id: string;
  type: 'banner' | 'video' | 'image' | 'text' | 'html';
  order: number;
  content: {
    title?: string;
    description?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
    videoUrl?: string;
    videoType?: 'youtube' | 'direct';
    imageUrl?: string;
    imageAlt?: string;
    heading?: string;
    text?: string;
    html?: string;
  };
}

export interface Landing {
  id: string;
  title: string;
  slug: string;
  blocks: LandingBlock[];
  published: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessReport {
  businessId: string;
  period: 'day' | 'week' | 'month';
  data: {
    date: string;
    views: number;
    clicks: number;
    whatsappClicks: number;
    websiteClicks: number;
    phoneClicks: number;
  }[];
}

export interface PremiumDiscount {
  id: string;
  code: string;
  percentage: number;
  description: string;
  active: boolean;
  validFrom: string;
  validTo: string;
  usageLimit?: number;
  usedCount: number;
  createdAt: string;
}
