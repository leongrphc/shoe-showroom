import React from 'react';
import { motion } from 'framer-motion';
import { ColorFamily } from '../types/shoe';

interface ColorOption {
  family: ColorFamily | 'all';
  label: string;
  hex: string;
  border?: boolean;
}

const COLOR_OPTIONS: ColorOption[] = [
  { family: 'all', label: 'Tümü', hex: 'linear-gradient(135deg, #FF3333, #5f66f4, #2D4A22, #B8860B)', border: false },
  { family: 'black', label: 'Siyah', hex: '#0d0d0d', border: true },
  { family: 'white', label: 'Beyaz', hex: '#FAFAFA', border: true },
  { family: 'brown', label: 'Kahverengi', hex: '#8B4513', border: false },
  { family: 'beige', label: 'Bej', hex: '#C2A878', border: false },
  { family: 'red', label: 'Kırmızı', hex: '#FF3333', border: false },
  { family: 'blue', label: 'Mavi', hex: '#1E6B8C', border: false },
  { family: 'green', label: 'Yeşil', hex: '#2D4A22', border: false },
  { family: 'grey', label: 'Gri', hex: '#808080', border: false },
];

interface ColorFilterProps {
  activeColor: ColorFamily | 'all';
  onColorChange: (color: ColorFamily | 'all') => void;
  counts?: Record<string, number>;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({ activeColor, onColorChange, counts }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      {COLOR_OPTIONS.map((option) => {
        const isActive = activeColor === option.family;
        const count = counts?.[option.family];

        return (
          <button
            key={option.family}
            onClick={() => onColorChange(option.family)}
            className="group flex flex-col items-center gap-2 transition-all duration-300"
            aria-label={`${option.label} rengi filtrele`}
          >
            <div className="relative">
              {/* Outer ring for active state */}
              <motion.div
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -inset-1.5 rounded-full border-2 border-cognac-400"
              />

              {/* Color circle */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full relative overflow-hidden transition-shadow duration-300 ${
                  option.border ? 'ring-1 ring-white/20' : ''
                } ${isActive ? 'shadow-lg' : 'shadow-sm group-hover:shadow-md'}`}
                style={
                  option.family === 'all'
                    ? { background: option.hex }
                    : { backgroundColor: option.hex }
                }
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>

            {/* Label */}
            <span
              className={`text-[10px] md:text-xs font-heading font-medium tracking-wide transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'
              }`}
            >
              {option.label}
              {count !== undefined && count > 0 && (
                <span className="ml-0.5 text-white/25">({count})</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
