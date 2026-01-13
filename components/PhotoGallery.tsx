
import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_PHOTOS } from '../constants';

const PhotoGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-3 my-2">
      {GALLERY_PHOTOS.map((photo, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-md shadow-sm aspect-[4/5] bg-gray-100 border border-gray-100"
        >
          <img 
            src={photo} 
            alt={`Thauanne Victoria ${index + 1}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGallery;
