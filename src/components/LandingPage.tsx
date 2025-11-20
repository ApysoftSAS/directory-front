import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Landing } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface LandingPageProps {
  landing: Landing;
  onNavigate?: (page: string, data?: any) => void;
}

const getYouTubeEmbedUrl = (url: string): string => {
  // Convert various YouTube URL formats to embed URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export const LandingPage: React.FC<LandingPageProps> = ({ landing, onNavigate }) => {
  const sortedBlocks = [...landing.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Landing Title */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-white text-center"
          >
            {landing.title}
          </motion.h1>
        </div>
      </div>

      {/* Blocks */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-12">
          {sortedBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Banner Block */}
              {block.type === 'banner' && (
                <Card className="overflow-hidden aspect-[21/9] relative group cursor-pointer hover:shadow-xl transition-shadow">
                  {block.content.image && (
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={block.content.image}
                        alt={block.content.title || 'Banner'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                    {block.content.title && (
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4 drop-shadow-lg">
                        {block.content.title}
                      </h2>
                    )}
                    {block.content.description && (
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl drop-shadow">
                        {block.content.description}
                      </p>
                    )}
                    {block.content.buttonText && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="lg"
                          onClick={() => {
                            if (block.content.buttonLink && onNavigate) {
                              if (block.content.buttonLink.startsWith('/')) {
                                // Internal navigation
                                const path = block.content.buttonLink.split('/')[1];
                                onNavigate(path);
                              } else {
                                // External link
                                window.open(block.content.buttonLink, '_blank');
                              }
                            }
                          }}
                        >
                          {block.content.buttonText}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </Card>
              )}

              {/* Video Block */}
              {block.type === 'video' && block.content.videoUrl && (
                <Card className="overflow-hidden">
                  <div className="aspect-video">
                    {block.content.videoType === 'youtube' ? (
                      <iframe
                        src={getYouTubeEmbedUrl(block.content.videoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={block.content.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      >
                        Tu navegador no soporta videos HTML5.
                      </video>
                    )}
                  </div>
                </Card>
              )}

              {/* Image Block */}
              {block.type === 'image' && block.content.imageUrl && (
                <Card className="overflow-hidden">
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <ImageWithFallback
                      src={block.content.imageUrl}
                      alt={block.content.imageAlt || 'Imagen'}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </Card>
              )}

              {/* Text Block */}
              {block.type === 'text' && (
                <Card className="p-6 sm:p-8 lg:p-12">
                  {block.content.heading && (
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
                      {block.content.heading}
                    </h2>
                  )}
                  {block.content.text && (
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap">{block.content.text}</p>
                    </div>
                  )}
                </Card>
              )}

              {/* HTML Block */}
              {block.type === 'html' && block.content.html && (
                <Card className="p-6 sm:p-8">
                  <div
                    dangerouslySetInnerHTML={{ __html: block.content.html }}
                    className="prose prose-lg max-w-none"
                  />
                </Card>
              )}
            </motion.div>
          ))}
        </div>

        {sortedBlocks.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>Esta landing aún no tiene contenido.</p>
          </div>
        )}
      </div>
    </div>
  );
};
