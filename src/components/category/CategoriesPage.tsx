import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { SEOHead } from "../SEOHead";
import { toast } from "sonner";
import { useSiteConfig } from "../siteConfigContext/SiteConfigContext";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

interface CategoriesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

// Skeleton Loader
const SkeletonCard = () => (
  <div className="p-4 sm:p-6 bg-white rounded-lg animate-pulse">
    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-gray-300"></div>
    <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
  </div>
);

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { config } = useSiteConfig();
  const navigate = useNavigate();
  const { categoriesAndBusinesses, loading, error } = useData();

  // Helper para asegurarnos de siempre tener un array
  const safeArray = (arr: any) => Array.isArray(arr) ? arr : [];

  // Cargar categorías cuando los datos estén disponibles
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      console.log("Cargando datos...");
    } else {
      setCategories(safeArray(categoriesAndBusinesses?.data));
      setIsLoading(false);
      console.log("DataContext categoriesAndBusinesses:", categoriesAndBusinesses);
    }
    if (error) {
      console.error("Error al cargar categoriesAndBusinesses:", error);
      setIsLoading(false);
      toast.error("Hubo un error al cargar las categorías.");
    }
  }, [loading, categoriesAndBusinesses, error]);

  const handleNavigate = (categoryName: string) => {
    console.log("Navegando con categoría:", categoryName);
    navigate("/negocios", { 
      state: { selectedCategory: categoryName } 
    });
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: config?.background_color || "#ffffff",
      color: config?.text_color || "#000000"
    }}>
      <SEOHead
        title="Categorías de Negocios"
        description="Explora todas las categorías de negocios disponibles en nuestro directorio"
        keywords={[
          "categorías",
          "negocios",
          "directorio",
          ...safeArray(categories).map((c) => c.name),
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 sm:mb-8">
          Todas las Categorías
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {/* Mostrar skeletons mientras cargamos */}
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : safeArray(categories).map((category) => (
                <Card
                  key={category.category_id}
                  className="p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer text-center"
                  onClick={() => handleNavigate(category.category_id)}
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl"
                    style={{ backgroundColor: "#ff0707ff" }}
                  >
                    {category.name?.charAt(0) || ""}
                  </div>

                  <h3 className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">
                    {category.name || "Sin nombre"}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600">
                    {category.businesses_count ?? 0}{" "}
                    {(category.businesses_count ?? 0) === 1 ? "negocio" : "negocios"}
                  </p>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};
