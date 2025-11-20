import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { useApp } from '../../context/AppContext';
import { forgotPassword } from '../../services/recoveryService';

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ open, onClose }) => {
  const { siteConfig } = useApp();
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);

    try {
      const response = await forgotPassword(resetEmail);

      toast.success('¡Correo enviado!', {
        description: response.message || `Se ha enviado un enlace a ${resetEmail}`,
      });
    } catch (error: any) {
      toast.error('Error al enviar el correo', {
        description: error.message,
      });
    } finally {
      setResetEmail('');
      setIsResetting(false);
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recuperar Contraseña</DialogTitle>
          <DialogDescription>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleForgotPassword} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="reset-email"
                type="email"
                placeholder="tu@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isResetting} style={{ backgroundColor: siteConfig.primaryColor }}>
              {isResetting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Mail className="w-4 h-4" />
                </motion.div>
              ) : (
                'Enviar Enlace'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
