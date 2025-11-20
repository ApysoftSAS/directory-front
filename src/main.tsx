import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AppProvider } from "./context/AppContext";
import { SiteConfigProvider } from "./components/siteConfigContext/SiteConfigContext";
import './styles/globals.css';
import './index.css';
import { DataProvider } from "./context/DataContext";


ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
    <SiteConfigProvider>              
      <AppProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </AppProvider>
    </SiteConfigProvider>
  </React.StrictMode>
);
