import React from 'react';
import { Shoe } from '../types/shoe';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ShoeCardProps {
  shoe: Shoe;
  index: number;
}

export const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, index }) => {
  return (
    <Link to={`/shoe/${shoe.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full flex flex-col"
      >
        <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
          <img 
            src={shoe.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'600\' height=\'800\' viewBox=\'0 0 600 800\'%3E%3Crect width=\'600\' height=\'800\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\' font-family=\'sans-serif\' font-size=\'24\'%3ENO IMAGE%3C/text%3E%3C/svg%3E'} 
            alt={shoe.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          {shoe.images?.[1] && (
            <img 
              src={shoe.images[1]} 
              alt={shoe.name}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-start mb-1">
             <p className="text-xs font-medium tracking-widest uppercase opacity-80">{shoe.category}</p>
             <p className="text-sm font-bold">₺{(shoe.price || 0).toLocaleString('tr-TR')}</p>
          </div>
          <h3 className="text-xl font-bold mb-1">{shoe.name}</h3>
          <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {shoe.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
