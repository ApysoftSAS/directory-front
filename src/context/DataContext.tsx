// DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { allCountries } from "../services/countriesService";
import { allCategories, allCategoriesAndBusinesses,allCategoriesInteraction  } from "../services/categoryService";
//import { businessTag } from "../services/BusinessService";
import { allTags, tagBussines } from "../services/TagsService";

interface City {
  id: number;
  name: string;
  active: number;
}

interface BusinessByTag {
  business_id: string;
  category_id: string;
  name: string;
  description: string;
  address: string;
  city_id: string;
  country_id: string;
  phone1: string;
  phone2?: string | null;
  whatsapp?: string | null;
  email?: string;
  website?: string;
  logo?: string | null;
  images: string[];
  tags: string[];
  status: string;
  schedule: { day: string; open: string; close: string }[];
  premium: boolean;
  social_media: { url: string; platform: string }[];
  lat: number;
  lng: number;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: number;
  name: string;
  active: number;
  cities: City[];
}

interface Category {
  id: number;
  name: string;
  status: number;
}

interface categoriesInteraction {
  category_interaction_id: number;
  category_id: string;
  count: number;
  category: Category[];
}

interface Business {
  id: number;
  name: string;
  categoryId: number;
}

interface Tag {
  tag_id: string;
  name: string;
  slug: string;
  type: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}


interface DataContextProps {
  countries: Country[];
  categories: Category[];
  categoriesAndBusinesses: any;
  allCategoriesInteraction: any;
  businesses: Business[];
  tags: Tag[];
  loading: boolean;
  error: string | null;
  loadTagBusinesses: (tagId: string) => Promise<void>;
  businessesByTag: BusinessByTag[];
}

const DataContext = createContext<DataContextProps>({
  countries: [],
  categories: [],
  categoriesAndBusinesses: [],
  allCategoriesInteraction: [],
  businesses: [],
  tags: [],
  loading: true,
  error: null,
  loadBusinesses: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesAndIterations, setCategoriesAndIterations] = useState<categoriesInteraction[]>([]);
  const [categoriesAndBusinesses, setCategoriesAndBusinesses] = useState<any>([]);
  //const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [businessesByTag, setBusinessesByTag] = useState<BusinessByTag[]>([]);

  // Cargar datos generales al inicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [countriesData, categoriesData, catAndBus, categoriesIterations,tagsData] = await Promise.all([
          allCountries(),
          allCategories(),
          allCategoriesAndBusinesses(),
          allCategoriesInteraction(),
          allTags(),
        ]);

        setCountries(countriesData);
        setCategories(categoriesData);
        setCategoriesAndBusinesses(catAndBus);
        setCategoriesAndIterations(categoriesIterations);
        setTags(tagsData.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadTagBusinesses = async (tagId: string) => {
  try {
    setLoading(true);
    const response = await tagBussines(tagId); // tu servicio
    if (response.success) {
      setBusinessesByTag(response.data);
    } else {
      setBusinessesByTag([]);
      setError(response.message || "No se encontraron negocios");
    }
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

 /* // Función para cargar negocios paginados bajo demanda
  const loadBusinesses = async (page = 1, perPage = 10) => {
    try {
      const result = await allBusiness(page, perPage);
      console.log('Businesses loaded:', result );
    setBusinesses(result.data || []);
    return result; // ajusta según tu respuesta
    } catch (err: any) {
      setError(err.message);
    }
  };*/

  return (
    <DataContext.Provider
      value={{
        countries,
        categories,
        categoriesAndBusinesses,
        categoriesAndIterations,
        //businesses,
        loading,
        error,
        tags,
        businessesByTag,
        loadTagBusinesses,
        //loadBusinesses,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
