import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Toaster } from "./components/ui/sonner";

export default function AppLayout() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
}
