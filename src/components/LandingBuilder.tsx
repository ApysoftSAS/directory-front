import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Type,
  Video,
  Layout,
  Code,
  Save,
  Eye,
  EyeOff,
  Edit,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { LandingBlock, Landing } from '../types';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from './ui/dialog';

interface DraggableBlockProps {
  block: LandingBlock;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (block: LandingBlock) => void;
  onDelete: (blockId: string) => void;
}

const ItemType = 'BLOCK';

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  block,
  index,
  moveBlock,
  onEdit,
  onDelete,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveBlock(item.index, index);
        item.index = index;
      }
    },
  });

  const getBlockIcon = () => {
    switch (block.type) {
      case 'banner':
        return <Layout className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'image':
        return <ImageIcon className="w-5 h-5" />;
      case 'text':
        return <Type className="w-5 h-5" />;
      case 'html':
        return <Code className="w-5 h-5" />;
    }
  };

  const getBlockTitle = () => {
    switch (block.type) {
      case 'banner':
        return block.content.title || 'Banner sin título';
      case 'video':
        return `Video (${block.content.videoType || 'direct'})`;
      case 'image':
        return 'Imagen';
      case 'text':
        return block.content.heading || 'Texto';
      case 'html':
        return 'HTML Personalizado';
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`mb-3 ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
          {getBlockIcon()}
          <div className="flex-1">
            <p className="font-medium text-sm">{getBlockTitle()}</p>
            <p className="text-xs text-gray-500 capitalize">{block.type}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(block)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600"
              onClick={() => onDelete(block.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

interface LandingBuilderProps {
  landing?: Landing;
  onSave: (landing: Landing) => void;
  onCancel: () => void;
}

export const LandingBuilder: React.FC<LandingBuilderProps> = ({
  landing,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(landing?.title || '');
  const [slug, setSlug] = useState(landing?.slug || '');
  const [blocks, setBlocks] = useState<LandingBlock[]>(landing?.blocks || []);
  const [published, setPublished] = useState(landing?.published || false);
  const [editingBlock, setEditingBlock] = useState<LandingBlock | null>(null);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [newBlockType, setNewBlockType] = useState<LandingBlock['type']>('banner');

  const [blockContent, setBlockContent] = useState({
    title: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    videoUrl: '',
    videoType: 'youtube' as 'youtube' | 'direct',
    imageUrl: '',
    imageAlt: '',
    heading: '',
    text: '',
    html: '',
  });

  const moveBlock = (dragIndex: number, hoverIndex: number) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, movedBlock);
    
    // Update order
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));
    
    setBlocks(reorderedBlocks);
  };

  const handleAddBlock = () => {
    setEditingBlock(null);
    setBlockContent({
      title: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      videoUrl: '',
      videoType: 'youtube',
      imageUrl: '',
      imageAlt: '',
      heading: '',
      text: '',
      html: '',
    });
    setShowBlockDialog(true);
  };

  const handleEditBlock = (block: LandingBlock) => {
    setEditingBlock(block);
    setNewBlockType(block.type);
    setBlockContent({
      title: block.content.title || '',
      description: block.content.description || '',
      image: block.content.image || '',
      buttonText: block.content.buttonText || '',
      buttonLink: block.content.buttonLink || '',
      videoUrl: block.content.videoUrl || '',
      videoType: block.content.videoType || 'youtube',
      imageUrl: block.content.imageUrl || '',
      imageAlt: block.content.imageAlt || '',
      heading: block.content.heading || '',
      text: block.content.text || '',
      html: block.content.html || '',
    });
    setShowBlockDialog(true);
  };

  const handleSaveBlock = () => {
    const newBlock: LandingBlock = {
      id: editingBlock?.id || `block-${Date.now()}`,
      type: newBlockType,
      order: editingBlock?.order ?? blocks.length,
      content: blockContent,
    };

    if (editingBlock) {
      setBlocks(blocks.map((b) => (b.id === editingBlock.id ? newBlock : b)));
      toast.success('Bloque actualizado');
    } else {
      setBlocks([...blocks, newBlock]);
      toast.success('Bloque agregado');
    }

    setShowBlockDialog(false);
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
    toast.success('Bloque eliminado');
  };

  const handleSaveLanding = () => {
    if (!title || !slug) {
      toast.error('Por favor completa título y URL');
      return;
    }

    const newLanding: Landing = {
      id: landing?.id || `landing-${Date.now()}`,
      title,
      slug,
      blocks,
      published,
      createdBy: 'admin',
      createdAt: landing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newLanding);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Configuration */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl mb-4">Configuración de Landing</h3>
            <div className="space-y-4">
              <div>
                <Label>Título de la Landing</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Mi Landing Promocional"
                />
              </div>

              <div>
                <Label>URL (slug)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">/promo/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="mi-landing"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  URL completa: /promo/{slug || 'tu-url'}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Estado de Publicación</p>
                  <p className="text-sm text-gray-600">
                    {published ? 'Publicada y visible' : 'Borrador'}
                  </p>
                </div>
                <Button
                  variant={published ? 'outline' : 'default'}
                  onClick={() => setPublished(!published)}
                >
                  {published ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Despublicar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Publicar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Blocks List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Bloques de Contenido</h3>
              <Button onClick={handleAddBlock}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar
              </Button>
            </div>

            {blocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Layout className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No hay bloques aún</p>
                <p className="text-sm">Agrega bloques para comenzar</p>
              </div>
            ) : (
              <div>
                {blocks.map((block, index) => (
                  <DraggableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    moveBlock={moveBlock}
                    onEdit={handleEditBlock}
                    onDelete={handleDeleteBlock}
                  />
                ))}
              </div>
            )}
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSaveLanding} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Guardar Landing
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <Card className="p-6 h-full overflow-auto">
            <h3 className="text-xl mb-4">Vista Previa</h3>
            <div className="space-y-4">
              {blocks.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>Vista previa de la landing</p>
                </div>
              ) : (
                blocks.map((block) => (
                  <div key={block.id} className="border rounded-lg p-4 bg-gray-50">
                    <Badge className="mb-2 text-xs">{block.type}</Badge>
                    {block.type === 'banner' && (
                      <div>
                        <h4 className="font-bold">{block.content.title || 'Título del banner'}</h4>
                        <p className="text-sm text-gray-600">{block.content.description}</p>
                        {block.content.buttonText && (
                          <Button size="sm" className="mt-2">{block.content.buttonText}</Button>
                        )}
                      </div>
                    )}
                    {block.type === 'video' && (
                      <div>
                        <p className="text-sm">Video: {block.content.videoUrl || 'No URL'}</p>
                        <p className="text-xs text-gray-500">Tipo: {block.content.videoType}</p>
                      </div>
                    )}
                    {block.type === 'image' && (
                      <div>
                        <p className="text-sm">Imagen: {block.content.imageUrl || 'No URL'}</p>
                      </div>
                    )}
                    {block.type === 'text' && (
                      <div>
                        <h4 className="font-bold">{block.content.heading || 'Encabezado'}</h4>
                        <p className="text-sm text-gray-600">{block.content.text}</p>
                      </div>
                    )}
                    {block.type === 'html' && (
                      <div>
                        <p className="text-sm font-mono text-gray-600">HTML personalizado</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Block Edit Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingBlock ? 'Editar Bloque' : 'Agregar Bloque'}
            </DialogTitle>
            <DialogDescription>
              {editingBlock ? 'Edita el bloque existente' : 'Agrega un nuevo bloque'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Tipo de Bloque</Label>
              <Select
                value={newBlockType}
                onValueChange={(value: any) => setNewBlockType(value)}
                disabled={!!editingBlock}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banner">Banner Horizontal</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Imagen</SelectItem>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="html">HTML Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Banner Fields */}
            {newBlockType === 'banner' && (
              <>
                <div>
                  <Label>Título</Label>
                  <Input
                    value={blockContent.title}
                    onChange={(e) => setBlockContent({ ...blockContent, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={blockContent.description}
                    onChange={(e) =>
                      setBlockContent({ ...blockContent, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>URL de Imagen</Label>
                  <Input
                    value={blockContent.image}
                    onChange={(e) => setBlockContent({ ...blockContent, image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Texto del Botón</Label>
                    <Input
                      value={blockContent.buttonText}
                      onChange={(e) =>
                        setBlockContent({ ...blockContent, buttonText: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Enlace del Botón</Label>
                    <Input
                      value={blockContent.buttonLink}
                      onChange={(e) =>
                        setBlockContent({ ...blockContent, buttonLink: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* Video Fields */}
            {newBlockType === 'video' && (
              <>
                <div>
                  <Label>Tipo de Video</Label>
                  <Select
                    value={blockContent.videoType}
                    onValueChange={(value: any) =>
                      setBlockContent({ ...blockContent, videoType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="direct">Video Directo (MP4, etc.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>URL del Video</Label>
                  <Input
                    value={blockContent.videoUrl}
                    onChange={(e) =>
                      setBlockContent({ ...blockContent, videoUrl: e.target.value })
                    }
                    placeholder={
                      blockContent.videoType === 'youtube'
                        ? 'https://www.youtube.com/watch?v=...'
                        : 'https://...video.mp4'
                    }
                  />
                </div>
              </>
            )}

            {/* Image Fields */}
            {newBlockType === 'image' && (
              <>
                <div>
                  <Label>URL de Imagen</Label>
                  <Input
                    value={blockContent.imageUrl}
                    onChange={(e) =>
                      setBlockContent({ ...blockContent, imageUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Texto Alternativo</Label>
                  <Input
                    value={blockContent.imageAlt}
                    onChange={(e) =>
                      setBlockContent({ ...blockContent, imageAlt: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {/* Text Fields */}
            {newBlockType === 'text' && (
              <>
                <div>
                  <Label>Encabezado</Label>
                  <Input
                    value={blockContent.heading}
                    onChange={(e) =>
                      setBlockContent({ ...blockContent, heading: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Texto</Label>
                  <Textarea
                    value={blockContent.text}
                    onChange={(e) => setBlockContent({ ...blockContent, text: e.target.value })}
                    rows={6}
                  />
                </div>
              </>
            )}

            {/* HTML Fields */}
            {newBlockType === 'html' && (
              <div>
                <Label>Código HTML</Label>
                <Textarea
                  value={blockContent.html}
                  onChange={(e) => setBlockContent({ ...blockContent, html: e.target.value })}
                  rows={10}
                  className="font-mono text-sm"
                  placeholder="<div>Tu contenido HTML aquí</div>"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveBlock}>
                {editingBlock ? 'Actualizar' : 'Agregar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
};