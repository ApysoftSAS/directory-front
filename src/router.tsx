import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

// Pages
import { HomePage } from "./components/HomePage";
import { BusinessListPage } from "./components/Business/BusinessListPage";
import { BusinessDetailPage } from "./components/Business/BusinessDetailPage";
import { RegistradorDashboard } from "./components/RegistradorDashboard";
import { AdminDashboardNew } from "./components/AdminDashboardNew";
import { PremiumDashboardNew } from "./components/PremiumDashboardNew";
import { CategoriesPage } from "./components/category/CategoriesPage";
import { ContactPage } from "./components/contact/ContactPage";
import  UserSignupPage  from "./components/signupUser/UserSignupPage";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/login/LoginPage";
import { PremiumLandingPage } from "./components/PremiumLandingPage";
import { PaymentCheckout } from "./components/PaymentCheckout";

// Protegidas
import ProtectedRoute from "./routes/ProtectedRoute";
import LandingRoute from "./routes/LandingRoute";
import { ResetPasswordPage } from "./components/login/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "negocios", element: <BusinessListPage /> },
      { path: "negocio/:id", element: <BusinessDetailPage /> },
      { path: "categorias", element: <CategoriesPage /> },
      { path: "contacto", element: <ContactPage /> },
      { path: "registro-usuario", element: <UserSignupPage /> },
      { path: "premium-landing", element: <PremiumLandingPage /> },
      { path: "payment-checkout", element: <PaymentCheckout /> },
      { path: "reset-password", element: <ResetPasswordPage /> },

      // Landing dinámica
      { path: "promo/:slug", element: <LandingRoute /> },

      // Rutas protegidas
      {
        path: "registrador-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["registrador"]}>
            <RegistradorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboardNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "premium-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["premium"]}>
            <PremiumDashboardNew />
          </ProtectedRoute>
        ),
      },

      // Login
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
