import React, { useState } from 'react';
import { Search, Save, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { SEOData } from '../types';

interface SEOManagerProps {
  seoData: SEOData | undefined;
  businessName: string;
  onSave: (seo: SEOData) => void;
}

export const SEOManager: React.FC<SEOManagerProps> = ({ seoData, businessName, onSave }) => {
  const [formData, setFormData] = useState<SEOData>({
    metaTitle: seoData?.metaTitle || '',
    metaDescription: seoData?.metaDescription || '',
    keywords: seoData?.keywords || [],
    slug: seoData?.slug || '',
    ogImage: seoData?.ogImage || '',
    altTexts: seoData?.altTexts || {},
  });

  const [keywordInput, setKeywordInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) {
      toast.error('Escribe una palabra clave');
      return;
    }

    if (formData.keywords && formData.keywords.includes(keywordInput.trim())) {
      toast.error('Esta palabra clave ya existe');
      return;
    }

    setFormData({
      ...formData,
      keywords: [...(formData.keywords || []), keywordInput.trim()],
    });
    setKeywordInput('');
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords?.filter((k) => k !== keyword) || [],
    });
  };

  const handleSave = () => {
    if (!formData.metaTitle || !formData.metaDescription) {
      toast.error('Por favor completa el título y descripción SEO');
      return;
    }

    onSave(formData);
    toast.success('Configuración SEO guardada exitosamente');
  };

  const generateSlug = () => {
    const slug = businessName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData({ ...formData, slug });
    toast.success('Slug generado automáticamente');
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-6 h-6 text-purple-600" />
              <div>
                <CardTitle>Configuración SEO Premium</CardTitle>
                <CardDescription>
                  Optimiza tu negocio para motores de búsqueda
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">
              Título SEO * 
              <span className="text-sm text-gray-500 ml-2">(50-60 caracteres recomendado)</span>
            </Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              placeholder={`${businessName} - Servicio de Calidad`}
              maxLength={60}
            />
            <p className="text-xs text-gray-500">
              {formData.metaTitle?.length || 0}/60 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">
              Descripción SEO *
              <span className="text-sm text-gray-500 ml-2">(150-160 caracteres recomendado)</span>
            </Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              placeholder="Describe tu negocio de forma atractiva para los motores de búsqueda"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500">
              {formData.metaDescription?.length || 0}/160 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              URL Amigable (Slug)
              <span className="text-sm text-gray-500 ml-2">(sin espacios ni caracteres especiales)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="mi-negocio-nombre"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateSlug}
              >
                Generar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogImage">
              Imagen Open Graph (URL)
              <span className="text-sm text-gray-500 ml-2">(para redes sociales)</span>
            </Label>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <Input
                id="ogImage"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Palabras Clave
              <span className="text-sm text-gray-500 ml-2">(importantes para SEO)</span>
            </Label>
            <div className="flex gap-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Ej: restaurante, comida italiana"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddKeyword}
              >
                Agregar
              </Button>
            </div>
            {formData.keywords && formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-red-50 hover:border-red-300"
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    {keyword}
                    <span className="ml-2 text-red-500">×</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Vista Previa en Google</h4>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-blue-700 text-lg">{formData.metaTitle || businessName}</div>
              <div className="text-green-700 text-sm">{`https://sitio.com/${formData.slug || 'negocio'}`}</div>
              <div className="text-gray-600 text-sm mt-1">
                {formData.metaDescription || 'Tu descripción SEO aparecerá aquí...'}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Configuración SEO
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
