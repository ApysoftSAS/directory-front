# 📱 Local Points - Plataforma de Negocios Locales

Plataforma web moderna tipo "Páginas Amarillas" para listar, registrar y administrar negocios locales organizados por categorías y ubicaciones.

---

## ⚡ INICIO RÁPIDO

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000
```

**¿Primera vez?** Lee `/INICIO_RAPIDO.md` o `/EJECUTAR_LOCALMENTE.md`

---

## 🚀 Características Principales

### 👥 Roles de Usuario
- **Visitantes**: Buscan y consultan negocios
- **Registradores**: Agregan nuevos negocios (pendientes de aprobación)
- **Premium**: Gestión completa con analytics y sedes múltiples
- **Administradores**: Aprueban registros y gestionan la plataforma

### ✨ Funcionalidades

#### Para Visitantes
- Búsqueda avanzada por categoría, ciudad y texto
- Visualización de negocios con imágenes y mapas
- Sistema de contacto (teléfono, email, WhatsApp)
- Suscripción a promociones por ciudades de interés
- Popups publicitarios configurables
- Carrusel de banners promocionales

#### Para Registradores
- Dashboard para registrar nuevos negocios
- Gestión de información completa del negocio
- Carga de imágenes y logo
- Seguimiento de estado de aprobación

#### Para Negocios Premium
- **Dashboard avanzado** con estadísticas y gráficos
- **Gestión de múltiples sedes** con información independiente
- **Sistema de opiniones verificadas** con moderación
- **Reportes descargables** (Excel/PDF) de opiniones
- **Respuesta a opiniones** de clientes
- **Envío de reportes por email**
- **Banners promocionales** horizontales
- **Landing Builder**: Constructor visual drag & drop para páginas promocionales
- Analytics de visualizaciones y contactos

#### Para Administradores
- **Gestión de negocios**: Aprobar/rechazar registros pendientes
- **Gestión de usuarios**: CRUD completo de usuarios de la plataforma
- **Gestión de suscriptores**: 
  - Ver todos los suscriptores registrados
  - Editar información (nombre, email, teléfono)
  - **Asignar ciudades de interés** a cada suscriptor
  - Activar/desactivar suscriptores
  - Enviar promociones segmentadas por ciudad
  - Eliminar suscriptores
- **Gestión de categorías**: CRUD completo
- **Gestión de popups publicitarios**: Configuración con fechas y frecuencia
- **Landing Builder**: Crear páginas promocionales con URLs personalizadas
- **Configuración del sitio**: Personalización de colores y branding
- Estadísticas y reportes visuales

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS 3.4.13** para estilos
- **Shadcn/ui** componentes UI de alta calidad
- **Recharts** para gráficos y reportes
- **Motion (Framer Motion)** para animaciones
- **Lucide React** para iconos
- **React Router** para navegación
- **React Hook Form** para formularios
- **Sonner** para notificaciones toast
- **jsPDF & XLSX** para exportación de reportes

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0 (o yarn/pnpm)

## 🚀 Instalación y Ejecución Local

### 1. Clonar o descargar el proyecto

```bash
# Si tienes git
git clone <url-del-repositorio>
cd directorio-local

# O simplemente descomprime el ZIP en una carpeta
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

El proyecto se abrirá automáticamente en `http://localhost:3000`

### 4. Compilar para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### 5. Vista previa de producción

```bash
npm run preview
```

## 🎨 Estructura del Proyecto

```
directorio-local/
├── components/           # Componentes React
│   ├── ui/              # Componentes UI (Shadcn)
│   ├── AdminDashboardNew.tsx    # Dashboard de administrador
│   ├── PremiumDashboardNew.tsx  # Dashboard premium
│   ├── HomePage.tsx             # Página principal
│   ├── BusinessListPage.tsx     # Listado de negocios
│   ├── BusinessDetailPage.tsx   # Detalle de negocio
│   ├── UserSignupPage.tsx       # Registro de suscriptores
│   ├── LandingBuilder.tsx       # Constructor de landings
│   └── ...
├── context/             # Estado global (React Context)
│   ── AppContext.tsx
├── types/               # Tipos TypeScript
│   └── index.ts
├── styles/              # Estilos globales
│   └── globals.css
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
├── index.html           # HTML principal
└── package.json         # Dependencias
```

## 👤 Usuarios de Prueba

### Visitante
- Sin login necesario, acceso directo a todas las páginas públicas

### Registrador
- Email: `registrador@test.com`
- Password: `123456`

### Premium
- Email: `premium@test.com`
- Password: `123456`

### Administrador
- Email: `admin@test.com`
- Password: `123456`

## 📱 Funcionalidades Destacadas

### 🎯 Sistema de Suscriptores con Ciudades de Interés

Los usuarios pueden suscribirse para recibir promociones de negocios. Características:

- **Selección múltiple de ciudades**: Los suscriptores eligen de qué ciudades quieren recibir promociones
- **Gestión desde admin**: El administrador puede ver y editar las ciudades de cada suscriptor
- **Segmentación automática**: El sistema filtra promociones según las ciudades seleccionadas
- **Control de estado**: Activar/desactivar suscriptores
- **Tracking de envíos**: Registro de último email enviado

### 🏢 Sistema de Múltiples Sedes

Los negocios premium pueden gestionar varias ubicaciones:
- Información independiente por sede (dirección, teléfono, horario)
- Gestión visual desde el dashboard
- Cada sede visible en el perfil público

### ⭐ Opiniones Verificadas

Sistema completo de reseñas con:
- Moderación de opiniones antes de publicar
- Respuesta del negocio a cada opinión
- Reportes descargables en Excel y PDF
- Envío de reportes por email
- Gráficos de distribución de calificaciones

### 🎨 Landing Builder

Constructor visual con sistema drag & drop:
- Múltiples tipos de bloques (Hero, Features, Gallery, etc.)
- Personalización completa de estilos
- URLs personalizadas (/promo/nombre-landing)
- Sistema de publicación/borrador

## 🎨 Personalización

### Colores del Sitio

Los colores se pueden personalizar desde el **Panel de Administración** → **Config**:

- Color Primario (azul por defecto)
- Color Secundario (amarillo)
- Color de Acento (verde)
- Color de Fondo
- Color de Texto

### Agregar Categorías

Desde el **Panel de Administración** → **Categorías**:
1. Clic en "Nueva Categoría"
2. Ingresar nombre e icono (lucide-react)
3. Guardar

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Producción
npm run build            # Compila para producción
npm run preview          # Vista previa de build

# Calidad de código
npm run lint             # Ejecuta ESLint
npm run type-check       # Verifica tipos TypeScript
```

## 🌐 Despliegue

El proyecto está listo para desplegarse en:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Cualquier hosting con soporte para SPA

### Desplegar en Vercel

1. Crear cuenta en [Vercel](https://vercel.com)
2. Conectar repositorio de Git
3. Vercel detectará automáticamente Vite
4. Deploy automático

## 📝 Notas Importantes

- Los datos actuales son **mock data** (no persistentes)
- Para producción, se recomienda integrar con **Supabase** para:
  - Autenticación de usuarios
  - Base de datos PostgreSQL
  - Almacenamiento de imágenes
  - APIs serverless

## 🤝 Soporte

Para preguntas o problemas:
1. Revisa la documentación en `/guidelines/`
2. Verifica los archivos `.md` en la raíz del proyecto
3. Consulta los comentarios en el código

## 📄 Licencia

Este proyecto es privado y propietario.

---

**Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS**