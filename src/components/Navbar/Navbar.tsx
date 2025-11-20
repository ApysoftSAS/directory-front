import React from 'react';
import { Search, User, Home, Menu, Bell, Crown } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from '../ui/sheet';


interface NavbarProps {
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Obtener usuario desde localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  setSearchQuery(""); 
  navigate('/negocios', { state: { searchQuery } });
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Search Desktop */}
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-blue-600">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xl hidden sm:inline">Local Point</span>
            </button>

            <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar negocios..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-blue-600 text-white">
                Buscar
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">

            <Link to="/negocios">
              <Button variant="ghost">Negocios</Button>
            </Link>

            <Link to="/categorias">
              <Button variant="ghost">Categorías</Button>
            </Link>

            <Link to="/contacto">
              <Button variant="ghost">Regístra tu Negocio</Button>
            </Link>

            <Link to="/premium-landing">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Hazte Premium
              </Button>
            </Link>

            <Link to="/registro-usuario">
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Suscríbete
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      if (user.role === 'admin') navigate("/admin-dashboard");
                      else if (user.role === 'premium') navigate("/premium-dashboard");
                      else navigate("/registrador-dashboard");
                    }}
                  >
                    Mi Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="bg-blue-600 text-white"
                onClick={() => navigate("/login")}
              >
                <User className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menú de Navegación</SheetTitle>
                  <SheetDescription>
                    Accede a todas las secciones de DirectorioLocal
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-4">
                  <Link to="/negocios">
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>Negocios</Button>
                  </Link>
                  <Link to="/categorias">
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>Categorías</Button>
                  </Link>
                  <Link to="/contacto">
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>Regístra tu Negocio</Button>
                  </Link>
                  <Link to="/premium-landing">
                    <Button className="justify-start bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Hazte Premium
                    </Button>
                  </Link>
                  <Link to="/registro-usuario">
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Bell className="w-4 h-4 mr-2" />
                      Suscríbete
                    </Button>
                  </Link>

                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <p className="px-2 mb-3 text-sm text-gray-600">{user.name}</p>
                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                          onClick={() => {
                            if (user.role === 'admin') navigate("/admin-dashboard");
                            else if (user.role === 'premium') navigate("/premium-dashboard");
                            else navigate("/registrador-dashboard");
                            setMobileMenuOpen(false);
                          }}
                        >
                          Mi Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start w-full"
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Cerrar Sesión
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        className="justify-start w-full bg-blue-600 text-white"
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Iniciar Sesión
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar negocios..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-600 text-white">
              Buscar
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
};
