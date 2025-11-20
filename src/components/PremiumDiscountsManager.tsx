import React, { useState } from 'react';
import { Percent, Plus, Edit, Trash2, Save, X, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { PremiumDiscount } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface PremiumDiscountsManagerProps {
  discounts: PremiumDiscount[];
  onDiscountsChange: (discounts: PremiumDiscount[]) => void;
}

export const PremiumDiscountsManager: React.FC<PremiumDiscountsManagerProps> = ({
  discounts = [],
  onDiscountsChange,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PremiumDiscount>>({
    code: '',
    percentage: 0,
    description: '',
    active: true,
    validFrom: '',
    validTo: '',
    usageLimit: undefined,
    usedCount: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (!formData.code || !formData.percentage || !formData.validFrom || !formData.validTo) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    if (formData.percentage < 1 || formData.percentage > 100) {
      toast.error('El porcentaje debe estar entre 1 y 100');
      return;
    }

    const newDiscount: PremiumDiscount = {
      id: Date.now().toString(),
      code: formData.code!.toUpperCase(),
      percentage: Number(formData.percentage!),
      description: formData.description || '',
      active: formData.active || true,
      validFrom: formData.validFrom!,
      validTo: formData.validTo!,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
      usedCount: 0,
      createdAt: new Date().toISOString(),
    };

    onDiscountsChange([...discounts, newDiscount]);
    toast.success('Descuento creado exitosamente');
    resetForm();
  };

  const handleEdit = (discount: PremiumDiscount) => {
    setEditingId(discount.id);
    setFormData(discount);
    setIsAdding(true);
  };

  const handleUpdate = () => {
    if (!formData.code || !formData.percentage) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const updatedDiscounts = discounts.map((d) =>
      d.id === editingId ? { ...d, ...formData } : d
    );

    onDiscountsChange(updatedDiscounts);
    toast.success('Descuento actualizado exitosamente');
    resetForm();
  };

  const handleDelete = (id: string) => {
    const updatedDiscounts = discounts.filter((d) => d.id !== id);
    onDiscountsChange(updatedDiscounts);
    toast.success('Descuento eliminado exitosamente');
  };

  const handleToggleActive = (id: string) => {
    const updatedDiscounts = discounts.map((d) =>
      d.id === id ? { ...d, active: !d.active } : d
    );
    onDiscountsChange(updatedDiscounts);
    toast.success('Estado del descuento actualizado');
  };

  const resetForm = () => {
    setFormData({
      code: '',
      percentage: 0,
      description: '',
      active: true,
      validFrom: '',
      validTo: '',
      usageLimit: undefined,
      usedCount: 0,
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const isExpired = (validTo: string) => {
    return new Date(validTo) < new Date();
  };

  const isUsageLimitReached = (discount: PremiumDiscount) => {
    return discount.usageLimit ? discount.usedCount >= discount.usageLimit : false;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl flex items-center gap-2">
            <Percent className="w-6 h-6" />
            Descuentos Premium
          </h2>
          <p className="text-gray-600 mt-1">
            Gestiona códigos de descuento para suscripciones premium
          </p>
        </div>
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear Descuento
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-2 border-purple-200 bg-purple-50/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{editingId ? 'Editar Descuento' : 'Nuevo Descuento'}</span>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  {editingId
                    ? 'Actualiza la información del descuento'
                    : 'Crea un nuevo código de descuento'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código *</Label>
                    <Input
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="PREMIUM20"
                      className="uppercase"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Porcentaje de Descuento * (1-100)</Label>
                    <Input
                      id="percentage"
                      name="percentage"
                      type="number"
                      min="1"
                      max="100"
                      value={formData.percentage}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descuento especial de lanzamiento"
                    rows={2}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validFrom">Válido Desde *</Label>
                    <Input
                      id="validFrom"
                      name="validFrom"
                      type="date"
                      value={formData.validFrom}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validTo">Válido Hasta *</Label>
                    <Input
                      id="validTo"
                      name="validTo"
                      type="date"
                      value={formData.validTo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Límite de Usos (opcional)</Label>
                  <Input
                    id="usageLimit"
                    name="usageLimit"
                    type="number"
                    min="1"
                    value={formData.usageLimit || ''}
                    onChange={handleInputChange}
                    placeholder="Ilimitado"
                  />
                  <p className="text-xs text-gray-500">
                    Deja vacío para uso ilimitado
                  </p>
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Actualizar' : 'Crear'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {discounts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Percent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No hay descuentos registrados</p>
            <Button onClick={() => setIsAdding(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Crear primer descuento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descuento</TableHead>
                  <TableHead>Validez</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discounts.map((discount) => (
                  <TableRow key={discount.id}>
                    <TableCell>
                      <div className="font-mono font-bold">{discount.code}</div>
                      {discount.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {discount.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-purple-600">{discount.percentage}% OFF</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(discount.validFrom).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          hasta {new Date(discount.validTo).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {discount.usedCount}
                        {discount.usageLimit && ` / ${discount.usageLimit}`}
                        {!discount.usageLimit && <span className="text-gray-500"> (∞)</span>}
                      </div>
                      {isUsageLimitReached(discount) && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          Límite alcanzado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {isExpired(discount.validTo) ? (
                        <Badge variant="outline" className="text-red-600">
                          Expirado
                        </Badge>
                      ) : discount.active ? (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <XCircle className="w-3 h-3 mr-1" />
                          Inactivo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleActive(discount.id)}
                          disabled={isExpired(discount.validTo)}
                        >
                          {discount.active ? 'Desactivar' : 'Activar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(discount)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar descuento?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el
                                código "{discount.code}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(discount.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
