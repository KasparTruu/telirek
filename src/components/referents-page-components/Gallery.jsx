import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES_PER_PAGE = 12;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Memoize the image loading function
  const loadImages = useCallback(async () => {
    try {
      const imageContext = import.meta.glob('/src/assets/gallery/*.{jpg,jpeg,png}', { 
        eager: true,
        import: 'default'
      });
      
      const imageArray = Object.entries(imageContext).map(([path, module]) => ({
        src: module,
        alt: path.split('/').pop(),
        loaded: false
      }));

      setImages(imageArray);
      setVisibleImages(imageArray.slice(0, IMAGES_PER_PAGE));
      setHasMore(imageArray.length > IMAGES_PER_PAGE);
      setLoading(false);
    } catch (error) {
      console.error('Error loading images:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  // Load more images function
  const loadMoreImages = useCallback(() => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    
    if (startIndex < images.length) {
      setVisibleImages(prev => [...prev, ...images.slice(startIndex, endIndex)]);
      setPage(nextPage);
      setHasMore(endIndex < images.length);
    }
    setIsLoadingMore(false);
  }, [page, images]);

  // Optimized image load handler
  const handleImageLoad = useCallback(() => {
    setLoadedImages(prev => {
      const newCount = prev + 1;
      if (newCount === images.length) {
        setLoading(false);
      }
      return newCount;
    });
  }, [images.length]);

  // Memoized keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.src === selectedImage.src);
    
    switch (e.key) {
      case 'ArrowLeft':
        setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
        break;
      case 'ArrowRight':
        setSelectedImage(images[(currentIndex + 1) % images.length]);
        break;
      case 'Escape':
        setSelectedImage(null);
        break;
      default:
        break;
    }
  }, [selectedImage, images]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Memoized navigation function
  const navigateImage = useCallback((direction) => {
    const currentIndex = images.findIndex(img => img.src === selectedImage.src);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  }, [selectedImage, images]);

  // Memoize the current image index
  const currentImageIndex = useMemo(() => 
    selectedImage ? images.findIndex(img => img.src === selectedImage.src) + 1 : 0,
    [selectedImage, images]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      
      {/* Loading Progress Bar */}
      {loading && (
        <div className="w-full h-2 bg-gray-200 mb-8">
          <motion.div
            className="h-full bg-[#00529c]"
            initial={{ width: 0 }}
            animate={{ width: `${(loadedImages / images.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className="space-y-8">
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((image, index) => (
            <motion.div
              key={image.alt}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {!loading && visibleImages.length < images.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreImages}
              disabled={isLoadingMore}
              className={`
                text-gray-500 hover:text-[#00529c] transition-colors duration-300 
                text-lg font-medium py-3 px-8 border-2 
                border-gray-300 hover:border-[#00529c] 
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isLoadingMore ? 'animate-pulse' : ''}
              `}
            >
              {isLoadingMore ? 'Laen...' : 'Näita rohkem'}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Previous Button */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
              {currentImageIndex} / {images.length}
            </div>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
              loading="eager"
              decoding="async"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery; 