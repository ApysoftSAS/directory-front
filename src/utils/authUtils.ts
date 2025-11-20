// =====================================
// UTILIDADES PARA AUTENTICACIÓN
// =====================================

export interface ParsedScope {
  moduleName: string;
  path: string;
}

/**
 * Convierte un listado de scopes tipo:
 *   "module:Login;/login"
 *   "module:Usuarios;/users"
 *
 * En objetos:
 *   { moduleName: "Login", path: "/login" }
 */
export function parseScopes(scopes: string[]) {
  return scopes.map((s) => {
    const [moduleName, path] = s.split(';');
    return { moduleName: moduleName.replace('module:', ''), path };
  });
}

/**
 * Lee el rol desde el token.
 * El JWT trae:
 *   roles: ["Admin"]
 */
export function getRoleFromPayload(payload: any): string {
  if (payload?.roles && Array.isArray(payload.roles) && payload.roles.length > 0) {
    return payload.roles[0];
  }

  // Fallback por seguridad
  return 'Admin';
}


/**
 * Detecta qué dashboard tiene el usuario según sus scopes.
 * Retorna: 'admin' | 'premium' | 'registrador' | 'cliente' | null
 */
export const getDashboardFromScopes = (parsedScopes: ParsedScope[]): 'admin' | 'registrador' | 'premium' | null => {
  if (parsedScopes.some(s => s.moduleName.includes('Dashboard Administrador'))) return 'admin';
  if (parsedScopes.some(s => s.moduleName.includes('Dashboard del Registrador'))) return 'registrador';
  if (parsedScopes.some(s => s.moduleName.includes('Dashboard Cliente'))) return 'premium';
  return null;
};