import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
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
          className={`relative overflow-hidden rounded-2xl lg:rounded-3xl bg-surface-secondary transition-all duration-500 group-hover:shadow-xl ${
            isLarge ? 'aspect-[3/4]' : 'aspect-shoe'
          }`}
          style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}
        >
          {/* Main image */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
              <SafeImage
                src={shoe.images[0]}
                alt={shoe.name}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Second image on hover */}
          {shoe.images[1] && (
            <div className="absolute inset-0 overflow-hidden">
              <SafeImage
                src={shoe.images[1]}
                alt={`${shoe.name} alternatif`}
                className="w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/80 dark:via-black/20 dark:to-transparent bg-gradient-to-t from-[#fffaf4]/88 via-[#fffaf4]/18 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

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
            <div className="w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ background: 'rgba(var(--color-surface-rgb), 0.12)', border: '1px solid rgba(var(--color-surface-rgb), 0.14)' }}>
              <ArrowUpRight size={14} style={{ color: 'var(--color-text-primary)' }} />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 z-10">
            {/* Color dots */}
            <div className="flex gap-1.5 mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
              {shoe.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: color.hex, border: '1px solid rgba(var(--color-surface-rgb), 0.2)' }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Category */}
            <p className="text-[10px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 mb-1">
              {shoe.category}
            </p>

            {/* Name */}
            <h3
              className={`font-heading font-bold leading-tight mb-1 transition-transform duration-300 group-hover:translate-y-0 ${
                isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
              }`}
              style={{ color: '#ffffff' }}
            >
              {shoe.name}
            </h3>

            {/* Subtitle */}
            <p className="text-sm font-body text-white/60 line-clamp-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
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
