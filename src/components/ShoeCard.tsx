import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Shoe } from '../types/shoe';

interface ShoeCardProps {
  shoe: Shoe;
  index: number;
  variant?: 'default' | 'large';
}

export const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, index, variant = 'default' }) => {
  const isLarge = variant === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link to={`/shoe/${shoe.id}`} className="group block">
        <div
          className={`relative overflow-hidden rounded-2xl lg:rounded-3xl bg-surface-secondary border border-white/5 transition-all duration-500 group-hover:border-white/10 group-hover:shadow-xl group-hover:shadow-black/30 ${
            isLarge ? 'aspect-[3/4]' : 'aspect-shoe'
          }`}
        >
          {/* Main image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={shoe.images[0]}
              alt={shoe.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Second image on hover */}
          {shoe.images[1] && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={shoe.images[1]}
                alt={`${shoe.name} alternatif`}
                className="w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex gap-2">
              {shoe.isNew && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="tag-accent text-[10px]"
                >
                  Yeni
                </motion.span>
              )}
            </div>
            {/* Arrow icon */}
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
            {/* Color dots */}
            <div className="flex gap-1.5 mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
              {shoe.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Category */}
            <p className="text-[10px] font-heading font-medium tracking-[0.2em] uppercase text-white/40 mb-1">
              {shoe.category}
            </p>

            {/* Name */}
            <h3
              className={`font-heading font-bold text-white leading-tight mb-1 transition-transform duration-300 group-hover:translate-y-0 ${
                isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
              }`}
            >
              {shoe.name}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-white/50 font-body line-clamp-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
              {shoe.subtitle}
            </p>
          </div>

          {/* Hover border glow */}
          <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-cognac-400/0 group-hover:border-cognac-400/20 transition-colors duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};
