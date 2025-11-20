import React from 'react';
import { Check, Star, TrendingUp, BarChart3, Megaphone, Users, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PremiumLandingPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export const PremiumLandingPage: React.FC<PremiumLandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Perfil Destacado',
      description: 'Tu negocio aparece en las primeras posiciones de búsqueda',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Estadísticas Avanzadas',
      description: 'Reportes detallados de visitas, clics y conversiones',
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: 'Promociones Ilimitadas',
      description: 'Crea y publica todas las promociones que necesites',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Gestión de Reseñas',
      description: 'Responde a las reseñas y construye tu reputación',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Múltiples Sedes',
      description: 'Administra todas tus ubicaciones desde un solo panel',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Soporte Prioritario',
      description: 'Atención personalizada y respuesta rápida',
    },
  ];

  const plans = [
    {
      name: 'Plan Básico',
      price: '$0',
      period: '/mes',
      description: 'Perfecto para empezar',
      features: [
        'Listado básico',
        '1 sede',
        'Sin promociones',
        'Estadísticas básicas',
      ],
      notIncluded: [
        'Posición destacada',
        'Múltiples ubicaciones',
        'Soporte prioritario',
      ],
      popular: false,
    },
    {
      name: 'Plan Premium',
      price: '$299',
      period: '/mes',
      description: 'Lo mejor para crecer',
      features: [
        'Perfil destacado',
        'Sedes ilimitadas',
        'Promociones ilimitadas',
        'Estadísticas avanzadas',
        'Gestión de reseñas',
        'Banners publicitarios',
        'SEO optimizado',
        'Soporte prioritario',
      ],
      notIncluded: [],
      popular: true,
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      business: 'Restaurante El Buen Sabor',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Desde que me suscribí al plan Premium, mis ventas aumentaron un 150%. La visibilidad es increíble.',
    },
    {
      name: 'Carlos Ramírez',
      business: 'Tech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Las estadísticas me ayudan a entender mejor a mis clientes. Una inversión que vale totalmente la pena.',
    },
    {
      name: 'Ana Martínez',
      business: 'Salón Belleza Total',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
      rating: 5,
      text: 'Poder gestionar mis 3 sedes desde un solo lugar es fantástico. Ahorro tiempo y dinero.',
    },
  ];

  const stats = [
    { value: '5000+', label: 'Negocios Premium' },
    { value: '150%', label: 'Aumento promedio de visitas' },
    { value: '24/7', label: 'Soporte disponible' },
    { value: '99.9%', label: 'Satisfacción del cliente' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-yellow-500/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-600">
                <Crown className="w-3 h-3 mr-1" />
                Plan Premium
              </Badge>
              <h1 className="text-5xl lg:text-6xl mb-6">
                Haz que tu negocio{' '}
                <span className="text-blue-600">destaque</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Aumenta tu visibilidad, atrae más clientes y haz crecer tu negocio
                con nuestro Plan Premium. Desde solo $299/mes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                  onClick={() => onNavigate('payment-checkout')}
                >
                  Comenzar ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6"
                  onClick={() => {
                    const element = document.getElementById('planes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Ver planes
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761044592252-cc6c1f3bf210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZW1pdW0lMjBzdWJzY3JpcHRpb258ZW58MXx8fHwxNzYxOTEzMTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Premium Business"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl">+150%</div>
                    <div className="text-sm text-gray-600">Más visibilidad</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">
              Todo lo que necesitas para{' '}
              <span className="text-blue-600">triunfar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para hacer crecer tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planes" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">
              Elige el plan perfecto para ti
            </h2>
            <p className="text-xl text-gray-600">
              Sin contratos a largo plazo. Cancela cuando quieras.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.popular
                      ? 'border-2 border-blue-600 shadow-xl'
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Más popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription className="mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="mb-6">
                      <span className="text-5xl">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                      size="lg"
                      onClick={() =>
                        plan.popular
                          ? onNavigate('payment-checkout')
                          : onNavigate('login')
                      }
                    >
                      {plan.popular ? 'Comenzar ahora' : 'Continuar gratis'}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-400">
                        <span className="w-5 h-5 mt-0.5 flex-shrink-0">—</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">
              Lo que dicen nuestros{' '}
              <span className="text-blue-600">clientes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Miles de negocios han crecido con nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div>{testimonial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testimonial.business}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Únete a miles de negocios que ya confían en nosotros.
              Empieza hoy mismo sin compromisos.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => onNavigate('payment-checkout')}
            >
              Comenzar prueba gratis de 30 días
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-blue-200 mt-4">
              No se requiere tarjeta de crédito • Cancela cuando quieras
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
