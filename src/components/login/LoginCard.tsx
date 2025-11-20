import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Building2, Lock, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { loginRequest, decodeToken } from '../../services/authService';
import { parseScopes, getDashboardFromScopes } from '../../utils/authUtils';

interface LoginCardProps {
  onForgotPassword: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ onForgotPassword, onLoginSuccess }) => {
  const { siteConfig } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000); // desaparece después de 4s
      return () => clearTimeout(timer); // limpia el timer si cambia el error
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginRequest(email, password);
      const token = res.access_token;
      localStorage.setItem('token', token);

      const payload = decodeToken(token);
      const dashboard = getDashboardFromScopes(parseScopes(payload.scopes || []));
      const userData = {
        id: payload.user_id,
        name: payload.name,
        email: payload.email,
        role: dashboard,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      onLoginSuccess?.(dashboard);

      switch (dashboard) {
        case 'admin': navigate('/admin-dashboard'); break;
        case 'premium': navigate('/premium-dashboard'); break;
        case 'registrador': navigate('/registrador-dashboard'); break;
        default: navigate('/'); break;
      }
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl border-0">
      <CardHeader className="space-y-1 text-center pb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <CardTitle className="text-3xl">DirectorioLocal </CardTitle>
        <CardDescription className="text-base">Ingresa a tu panel de control</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            style={{ backgroundColor: siteConfig.primaryColor }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Lock className="w-4 h-4" />
              </motion.div>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={onForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500 pt-4">
          <p>¿No tienes cuenta?</p>
          <Link to="/premium-landing">

            <button
              type="button"
              className="text-blue-600 hover:underline mt-1"
            >
              Solicitar acceso
            </button>
          </Link>

        </div>
      </CardContent>
    </Card>
  );
};
