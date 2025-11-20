#!/usr/bin/env node

/**
 * Script de Verificación del Proyecto
 * Ejecutar con: node verificar-proyecto.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del proyecto...\n');

let errores = 0;
let advertencias = 0;

// Verificar archivos esenciales
const archivosEsenciales = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tailwind.config.js',
  'postcss.config.js',
  'index.html',
  'main.tsx',
  'App.tsx',
  'styles/globals.css',
];

console.log('📁 Verificando archivos esenciales...');
archivosEsenciales.forEach((archivo) => {
  if (fs.existsSync(archivo)) {
    console.log(`  ✅ ${archivo}`);
  } else {
    console.log(`  ❌ ${archivo} - FALTA`);
    errores++;
  }
});

console.log('\n📦 Verificando package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Verificar TailwindCSS version
  const tailwindVersion = packageJson.devDependencies?.tailwindcss;
  if (tailwindVersion) {
    if (tailwindVersion.includes('3.4.13')) {
      console.log(`  ✅ TailwindCSS: ${tailwindVersion}`);
    } else {
      console.log(`  ⚠️  TailwindCSS: ${tailwindVersion} (esperado: ^3.4.13)`);
      advertencias++;
    }
  }
  
  // Verificar React
  const reactVersion = packageJson.dependencies?.react;
  if (reactVersion) {
    console.log(`  ✅ React: ${reactVersion}`);
  }
  
  // Verificar Vite
  const viteVersion = packageJson.devDependencies?.vite;
  if (viteVersion) {
    console.log(`  ✅ Vite: ${viteVersion}`);
  }
  
  // Verificar scripts
  if (packageJson.scripts?.dev) {
    console.log(`  ✅ Script 'dev': ${packageJson.scripts.dev}`);
  } else {
    console.log(`  ❌ Script 'dev' no encontrado`);
    errores++;
  }
  
  if (packageJson.scripts?.build) {
    console.log(`  ✅ Script 'build': ${packageJson.scripts.build}`);
  }
  
} catch (error) {
  console.log(`  ❌ Error leyendo package.json: ${error.message}`);
  errores++;
}

console.log('\n🎨 Verificando configuración de Tailwind...');
try {
  const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
  
  if (tailwindConfig.includes('darkMode')) {
    console.log('  ✅ darkMode configurado');
  }
  
  if (tailwindConfig.includes('content')) {
    console.log('  ✅ content configurado');
  }
  
  if (tailwindConfig.includes('tailwindcss-animate')) {
    console.log('  ✅ Plugin tailwindcss-animate incluido');
  }
  
} catch (error) {
  console.log(`  ❌ Error leyendo tailwind.config.js: ${error.message}`);
  errores++;
}

console.log('\n📝 Verificando estilos globales...');
try {
  const globalsCss = fs.readFileSync('styles/globals.css', 'utf8');
  
  if (globalsCss.includes('@tailwind base')) {
    console.log('  ✅ @tailwind base presente');
  } else {
    console.log('  ❌ @tailwind base NO encontrado');
    errores++;
  }
  
  if (globalsCss.includes('@tailwind components')) {
    console.log('  ✅ @tailwind components presente');
  } else {
    console.log('  ❌ @tailwind components NO encontrado');
    errores++;
  }
  
  if (globalsCss.includes('@tailwind utilities')) {
    console.log('  ✅ @tailwind utilities presente');
  } else {
    console.log('  ❌ @tailwind utilities NO encontrado');
    errores++;
  }
  
  // Verificar formato de variables (v3 vs v4)
  if (globalsCss.includes('oklch')) {
    console.log('  ⚠️  Variables en formato oklch (TailwindCSS v4) - Debería ser HSL para v3');
    advertencias++;
  } else if (globalsCss.match(/--background:\s*\d+\s+\d+%\s+\d+%/)) {
    console.log('  ✅ Variables en formato HSL (TailwindCSS v3)');
  }
  
} catch (error) {
  console.log(`  ❌ Error leyendo globals.css: ${error.message}`);
  errores++;
}

console.log('\n📂 Verificando estructura de carpetas...');
const carpetas = ['components', 'components/ui', 'context', 'styles', 'types'];
carpetas.forEach((carpeta) => {
  if (fs.existsSync(carpeta)) {
    const archivos = fs.readdirSync(carpeta);
    console.log(`  ✅ ${carpeta}/ (${archivos.length} archivos)`);
  } else {
    console.log(`  ❌ ${carpeta}/ - NO EXISTE`);
    errores++;
  }
});

console.log('\n🔧 Verificando node_modules...');
if (fs.existsSync('node_modules')) {
  const packageCount = fs.readdirSync('node_modules').length;
  console.log(`  ✅ node_modules existe (${packageCount} paquetes)`);
} else {
  console.log('  ⚠️  node_modules NO existe - Ejecuta: npm install');
  advertencias++;
}

console.log('\n' + '='.repeat(60));
console.log('\n📊 RESUMEN:\n');

if (errores === 0 && advertencias === 0) {
  console.log('  ✅ ¡Todo está perfecto!');
  console.log('  \n  Ejecuta: npm run dev\n');
} else {
  if (errores > 0) {
    console.log(`  ❌ ${errores} error(es) encontrado(s)`);
  }
  if (advertencias > 0) {
    console.log(`  ⚠️  ${advertencias} advertencia(s) encontrada(s)`);
  }
  
  console.log('\n  🔧 Acciones recomendadas:\n');
  
  if (!fs.existsSync('node_modules')) {
    console.log('     1. Ejecuta: npm install');
  }
  
  if (errores > 0) {
    console.log('     2. Revisa los errores ❌ arriba');
    console.log('     3. Consulta /EJECUTAR_LOCALMENTE.md');
  }
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(errores > 0 ? 1 : 0);
