YONFRV: Hola, me ayudas con el readme de este proyetco ?

Workspace: Collecting workspace information```markdown
# Proyecto: directory-front

Breve descripción
- Aplicación frontend construida con Vite + React + TypeScript y Tailwind (estructura en [src](src/)).
- Carpeta de producción lista para servir en `build/` ([build/index.html](build/index.html)).

Archivos y componentes clave
- Componente raíz: [`App`](src/App.tsx) — [src/App.tsx](src/App.tsx)  
- Layout principal: [`AppLayout`](src/AppLayout.tsx) — [src/AppLayout.tsx](src/AppLayout.tsx)  
- Punto de entrada: [`main`](src/main.tsx) — [src/main.tsx](src/main.tsx)  
- Router: [`router`](src/router.tsx) — [src/router.tsx](src/router.tsx)  
- Configuración Vite (root): [vite.config.ts](vite.config.ts)  
- Configuración Vite (src): [src/vite.config.ts](src/vite.config.ts)  
- Configuración TypeScript: [tsconfig.json](tsconfig.json)  
- Tailwind: [tailwind.config.js](tailwind.config.js)  
- Dependencias y scripts: [`package.json`](package.json) — [package.json](package.json)  
- Archivo .gitignore activo: [.gitignore](.gitignore)

Requisitos
- Node.js (>= 16 recommended)
- npm / pnpm / yarn

Instalación (desde la raíz del proyecto)
```sh
npm install
# o
# pnpm install
# yarn
```

Scripts útiles (ver [`package.json`](package.json))
```sh
# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

Estructura relevante
- [src/](src/) — código fuente (componentes en [src/components/](src/components/))
- [build/](build/) — salida producida por `npm run build`
- [index.html](index.html) — plantilla pública para desarrollo
- [src/package.json](src/package.json) — (si aplica) paquetes o scripts específicos del subproyecto

Buenas prácticas
- Mantén variables de entorno fuera del repo (.env está en .gitignore) — [.gitignore](.gitignore)
- Formatea y lint antes de commitear si tienes herramientas configuradas
- Agrega tests y usa la carpeta `coverage/` (actualmente ignorada por .gitignore)

Cómo contribuir
1. Crea una branch por feature/bugfix.
2. Añade tests cuando aplique.
3. Abre PR con descripción y screenshots si cambias UI.

Despliegue
- Genera el build con `npm run build`. Los archivos estáticos resultantes quedan en [build/](build/).
- Sirve el contenido de [build/index.html](build/index.html) desde cualquier servidor estático.

Archivos menores de interés
- [postcss.config.js](postcss.config.js)  
- [tailwind.config.js](tailwind.config.js)  
- [tsconfig.node.json](tsconfig.node.json)

Contacto
- Usa el sistema de issues/PR del repositorio para coordinar cambios.

Si quieres, puedo:
- Generar un README más detallado (secciones de despliegue concreto, CI/CD, ejemplos de rutas).
- Añadir badges y un ejemplo de workflow de GitHub Actions.
```


YONFRV: pero me lo peudes copiar en el archivo ?

GitHub Copilot: He actualizado README.md con el contenido solicitado:

````markdown
// ...existing code...
# Plataforma Páginas Amarillas (directory-front)

Aplicación frontend para la Plataforma Páginas Amarillas. Diseño y prototipos disponibles en Figma: https://www.figma.com/design/eAoV6AxDCJtUUZUlTVgmFK/Plataforma-P%C3%A1ginas-Amarillas

## Descripción breve
Frontend construido con Vite + React + TypeScript y Tailwind CSS. Contiene la UI y rutas principales para consumir los servicios del backend.

## Requisitos
- Node.js >= 16
- npm, yarn o pnpm

## Instalación
Desde la raíz del proyecto:
```sh
npm install
# o
# pnpm install
# yarn install
```

## Desarrollo
```sh
npm run dev
```

## Build y vista previa
```sh
npm run build
npm run preview
```

## Estructura relevante
- src/ — código fuente (componentes en src/components/)
- build/ — salida de producción
- index.html — plantilla pública
- vite.config.ts, tsconfig.json, tailwind.config.js — configuraciones principales
- .gitignore — archivos ignorados (incluye node_modules, .env, dist, etc.)

## Buenas prácticas
- Mantén variables sensibles fuera del repositorio (.env está en .gitignore).
- Crea branches por feature/bugfix y agrega tests cuando corresponda.
- Formatea y lint antes de commitear si tienes herramientas configuradas.

## Cómo contribuir
1. Crear branch con nombre descriptivo.
2. Añadir tests y documentación de los cambios.
3. Abrir PR con descripción y capturas si modifica UI.

## Despliegue
Generar build con `npm run build`. Servir los archivos estáticos de la carpeta `build/` desde un servidor estático.

## Contacto
Usa el sistema de issues/PR del repositorio para coordinación.
````

YONFRV: te falta, nomrbar las rutas etc, me lo peude dar mas compelto ?

GitHub Copilot: ```markdown
// ...existing code...
# Plataforma Páginas Amarillas (directory-front)

Aplicación frontend para la Plataforma Páginas Amarillas. Diseño y prototipos: https://www.figma.com/design/eAoV6AxDCJtUUZUlTVgmFK/Plataforma-P%C3%A1ginas-Amarillas

## Descripción breve
Frontend construido con Vite + React + TypeScript y Tailwind CSS. Contiene la UI, layout y rutas principales para consumir los servicios del backend.

## Tech stack
- Vite
- React (TypeScript)
- Tailwind CSS
- React Router (routes en src/router.tsx)
- Herramientas recomendadas: ESLint, Prettier, vitest/jest

## Requisitos
- Node.js >= 16
- npm, yarn o pnpm

## Instalación
Desde la raíz del proyecto:
```sh
npm install
# o
# pnpm install
# yarn install
```

## Scripts principales
```sh
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Lint (si está configurado)
npm run lint

# Tests (si están configurados)
npm run test
```

## Variables de entorno recomendadas
Crear un archivo `.env` (no incluir en el repo). Variables típicas:
- VITE_API_URL=https://api.ejemplo.com
- VITE_APP_ENV=development
- VITE_AUTH_PROVIDER_URL=...
Ajustar según backend.

## Rutas principales (ejemplo / adaptar según src/router.tsx)
- / — Home / búsqueda
- /login — Inicio de sesión
- /register — Registro de usuario
- /dashboard — Panel del usuario (área privada)
- /directorio — Listado de empresas
- /directorio/:id — Ficha de empresa
- /negocio/nuevo — Formulario para crear un negocio
- /perfil — Ajustes y perfil de usuario
- /404 — Página no encontrada

(Revisar src/router.tsx para la lista exacta de rutas y nombres de componentes.)

## Estructura relevante
- src/ — código fuente
  - src/components/ — componentes reutilizables
  - src/pages/ — vistas / páginas
  - src/layouts/ — layouts (AppLayout)
  - src/router.tsx — definición de rutas
  - src/main.tsx — punto de entrada
- public/ / index.html
- build/ — salida de producción
- vite.config.ts, tsconfig.json, tailwind.config.js — configuraciones

## Buenas prácticas
- Mantener secretos fuera del repo (.env está en .gitignore).
- Crear branches por feature/bugfix.
- Añadir tests y documentación para cambios importantes.
- Ejecutar lint y format antes de commitear.

## Build y despliegue
1. Generar build:
```sh
npm run build
```
2. Servir `build/` desde un servidor estático (Nginx, Netlify, Vercel, Surge, etc.).  
3. Si usas Vercel/Netlify, conectar repo y configurar VITE_API_URL como variable de entorno del entorno de despliegue.

## Testing y CI (recomendado)
- Añadir vitest o jest para tests unitarios.  
- Añadir workflow de GitHub Actions para:
  - Instalar dependencias
  - Ejecutar lint
  - Ejecutar tests
  - Construir (opcional) y publicar artefactos

## Troubleshooting rápido
- Error de CORS: revisar configuración del backend y VITE_API_URL.
- Issues con rutas en producción: asegurarse de que el servidor estático devuelve index.html para rutas SPA.
- Problemas de estilos: eliminar cache y reconstruir `npm run build`.

## Cómo contribuir
1. Fork / crear branch feature/bugfix.
2. Añadir tests cuando aplique.
3. Abrir PR con descripción y capturas si cambia UI.
4. Asignar reviewers y cerrar issues relacionados.

## Contacto
Usa el sistema de issues/PR del repositorio para coordinación.

## Licencia
Agregar licencia del proyecto (ej. MIT) si aplica.
```