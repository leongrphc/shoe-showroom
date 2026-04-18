import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Shoe } from '../types/shoe';

interface HeroSliderProps {
  featuredShoes: Shoe[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ featuredShoes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredShoes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredShoes.length]);

  if (!featuredShoes.length) return null;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute inset-0"
        >
          <img
            src={featuredShoes[currentIndex]?.images?.[0] || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%231a1a1a\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%234a4a4a\' font-family=\'sans-serif\' font-size=\'24\'%3ENO IMAGE%3C/text%3E%3C/svg%3E'}
            alt={featuredShoes[currentIndex]?.name || 'Shoe'}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white max-w-4xl px-4 z-10 pointer-events-auto">
          <motion.p
            key={`cat-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-gray-300"
          >
            {featuredShoes[currentIndex].category} Collection
          </motion.p>
          
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-none"
          >
            {featuredShoes[currentIndex].name}
          </motion.h1>

          <motion.div
            key={`btn-${currentIndex}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Link 
              to={`/shoe/${featuredShoes[currentIndex].id}`}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-200 transition-colors group"
            >
              İncele
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
        {featuredShoes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 transition-all duration-500 rounded-full ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
