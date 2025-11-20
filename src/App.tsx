import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { BusinessListPage } from './components/Business/BusinessListPage';
import { BusinessDetailPage } from './components/Business/BusinessDetailPage';
import { RegistradorDashboard } from './components/RegistradorDashboard';
import { AdminDashboardNew } from './components/AdminDashboardNew';
import { PremiumDashboardNew } from './components/PremiumDashboardNew';
import { CategoriesPage } from './components/category/CategoriesPage';
import { ContactPage } from './components/ContactPage';
import { UserSignupPage } from './components/UserSignupPage';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toaster } from './components/ui/sonner';
import { UserRole } from './types';
import { PremiumLandingPage } from './components/PremiumLandingPage';
import { PaymentCheckout } from './components/PaymentCheckout';

type Page =
  | 'home'
  | 'negocios'
  | 'negocio'
  | 'categorias'
  | 'contacto'
  | 'registro-usuario'
  | 'registrador-dashboard'
  | 'admin-dashboard'
  | 'premium-dashboard'
  | 'landing'
  | 'login'
  | 'premium-landing'
  | 'payment-checkout';

interface PageState {
  page: Page;
  data?: any;
}

function AppContent() {
  const { landings, user, setUser } = useApp();
  const [pageState, setPageState] = useState<PageState>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string, data?: any) => {
    // Check if it's a landing page route
    if (page.startsWith('promo/')) {
      const slug = page.replace('promo/', '');
      const landing = landings.find((l) => l.slug === slug && l.published);
      if (landing) {
        setPageState({ page: 'landing', data: { landing } });
        window.scrollTo(0, 0);
        return;
      }
    }

    // Check if trying to access dashboard without login
    const protectedPages = ['registrador-dashboard', 'admin-dashboard', 'premium-dashboard'];
    if (protectedPages.includes(page) && !user) {
      setPageState({ page: 'login', data: { returnTo: page, returnData: data } });
      window.scrollTo(0, 0);
      return;
    }

    setPageState({ page: page as Page, data });
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoginSuccess = (role: UserRole) => {
    // Create a mock user based on role
    const mockUser = {
      id: '1',
      name: role === 'admin' ? 'Administrador' : role === 'premium' ? 'Usuario Premium' : 'Registrador',
      email: `${role}@test.com`,
      role: role,
    };
    
    setUser(mockUser);

    // Navigate to appropriate dashboard
    const returnTo = pageState.data?.returnTo;
    const returnData = pageState.data?.returnData;

    if (returnTo) {
      setPageState({ page: returnTo as Page, data: returnData });
    } else {
      // Default navigation based on role
      switch (role) {
        case 'admin':
          setPageState({ page: 'admin-dashboard' });
          break;
        case 'premium':
          setPageState({ page: 'premium-dashboard' });
          break;
        case 'registrador':
          setPageState({ page: 'registrador-dashboard' });
          break;
        default:
          setPageState({ page: 'home' });
      }
    }
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setUser(null);
    setPageState({ page: 'home' });
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (pageState.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'negocios':
        return (
          <BusinessListPage
            onNavigate={handleNavigate}
            filters={{
              searchQuery,
              selectedCategory: pageState.data?.selectedCategory,
              selectedCity: pageState.data?.selectedCity,
            }}
          />
        );
      case 'negocio':
        return (
          <BusinessDetailPage
            businessId={pageState.data?.id}
            onNavigate={handleNavigate}
          />
        );
      case 'categorias':
        return <CategoriesPage onNavigate={handleNavigate} />;
      case 'contacto':
        return <ContactPage />;
      case 'registro-usuario':
        return <UserSignupPage />;
      case 'registrador-dashboard':
        return <RegistradorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboardNew />;
      case 'premium-dashboard':
        return <PremiumDashboardNew businessId={pageState.data?.businessId} />;
      case 'landing':
        return (
          <LandingPage
            landing={pageState.data?.landing}
            onNavigate={handleNavigate}
          />
        );
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'premium-landing':
        return <PremiumLandingPage onNavigate={handleNavigate} />;
      case 'payment-checkout':
        return <PaymentCheckout onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} onSearch={handleSearch} onLogout={handleLogout} />
      {renderPage()}
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}