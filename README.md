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
