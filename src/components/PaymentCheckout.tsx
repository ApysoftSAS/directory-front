import React, { useState } from 'react';
import { CreditCard, Lock, Shield, Check, ArrowLeft, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PaymentCheckoutProps {
  onNavigate: (page: string, data?: any) => void;
}

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
    } else if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '').substring(0, 10);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('¡Pago procesado exitosamente!', {
      description: 'Bienvenido al Plan Premium. Redirigiendo a tu dashboard...',
    });

    setTimeout(() => {
      onNavigate('login');
    }, 2000);
  };

  const planFeatures = [
    'Perfil destacado',
    'Sedes ilimitadas',
    'Promociones ilimitadas',
    'Estadísticas avanzadas',
    'Gestión de reseñas',
    'Soporte prioritario',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => onNavigate('premium-landing')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Información de Pago</CardTitle>
                    <CardDescription>
                      Completa tus datos para activar tu plan Premium
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Pago 100% seguro y encriptado</span>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Información del Negocio
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">
                          Nombre del Negocio *
                        </Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="Mi Negocio S.A."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ownerName">Nombre del Propietario *</Label>
                        <Input
                          id="ownerName"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          placeholder="Juan Pérez"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="correo@negocio.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="5551234567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Información de la Tarjeta
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <ImageWithFallback
                            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                            alt="Visa"
                            className="h-6 w-auto"
                          />
                          <ImageWithFallback
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            className="h-6 w-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="JUAN PEREZ"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Fecha de Expiración *</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Dirección de Facturación</h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Calle Principal 123"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ciudad de México"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Código Postal *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="12345"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Acepto los{' '}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => toast.info('Términos y condiciones disponibles próximamente')}
                      >
                        términos y condiciones
                      </button>{' '}
                      y la{' '}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => toast.info('Política de privacidad disponible próximamente')}
                      >
                        política de privacidad
                      </button>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Lock className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Procesar Pago de $299 MXN
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>Encriptado SSL</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      <span>Pago Seguro</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="border-2 border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Plan Premium</span>
                      <Badge className="bg-blue-600">Popular</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Suscripción mensual</span>
                      <span className="text-2xl">$299</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="mb-3">Incluye:</div>
                      {planFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>$299.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA (16%)</span>
                      <span>$47.84</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg">
                      <span>Total</span>
                      <span className="text-2xl text-blue-600">$346.84</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      Cargo recurrente mensual
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check className="w-5 h-5" />
                      <span>30 días de prueba gratis</span>
                    </div>
                    <p className="text-xs text-green-600">
                      No se cobrará hasta el 30 de noviembre de 2025
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Cancela cuando quieras</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Sin contratos a largo plazo</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>Soporte 24/7</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-3xl">🎉</div>
                    <div className="font-semibold">¡Oferta Especial!</div>
                    <div className="text-sm text-blue-100">
                      Los primeros 3 meses con 20% de descuento
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
