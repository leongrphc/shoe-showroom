import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { Shoe } from '../types/shoe';

interface HeroSliderProps {
  featuredShoes: Shoe[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ featuredShoes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const SLIDE_DURATION = 7000;

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredShoes.length);
  }, [featuredShoes.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredShoes.length) % featuredShoes.length);
  }, [featuredShoes.length]);

  useEffect(() => {
    if (!featuredShoes.length) return;
    const timer = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [featuredShoes.length, goNext]);

  if (!featuredShoes.length) return null;

  const currentShoe = featuredShoes[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '8%' : '-8%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-8%' : '8%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-surface-primary"
    >
      {/* Background Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.5, ease: [0.85, 0, 0.15, 1] }}
          className="absolute inset-0"
        >
          <SafeImage
            src={currentShoe.images[0]}
            alt={currentShoe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-black/80 dark:via-black/40 dark:to-transparent bg-gradient-to-r from-[#fff8f0]/95 via-[#fff8f0]/58 to-transparent transition-colors duration-500" />
          <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/90 dark:via-transparent dark:to-black/30 bg-gradient-to-t from-[#f2e2cf]/72 via-transparent to-[#fffdf9]/34 transition-colors duration-500" />
          <div className="absolute inset-0 dark:bg-black/20 bg-[rgba(255,248,240,0.12)] transition-colors duration-500" />
        </motion.div>
      </AnimatePresence>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end lg:items-center">
        <div className="container-showroom w-full pb-32 lg:pb-0">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${currentIndex}`}>
                {/* Collection tag */}
                <motion.div
                  variants={textVariants}
                  custom={0.3}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <span className="tag-accent mb-6 inline-block">
                    {currentShoe.collection}
                  </span>
                </motion.div>

                {/* Category */}
                <motion.p
                  variants={textVariants}
                  custom={0.4}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-sm md:text-base font-heading font-medium tracking-[0.3em] uppercase mb-3"
                  style={{ color: 'color-mix(in srgb, var(--color-text-primary) 60%, transparent)' }}
                >
                  {currentShoe.category} Collection
                </motion.p>

                {/* Title */}
                <motion.h1
                  variants={textVariants}
                  custom={0.5}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-hero font-heading font-bold mb-4 leading-[0.9]"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {currentShoe.name}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={textVariants}
                  custom={0.65}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-lg md:text-xl font-body mb-8 max-w-xl leading-relaxed"
                  style={{ color: 'color-mix(in srgb, var(--color-text-primary) 68%, transparent)' }}
                >
                  {currentShoe.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={textVariants}
                  custom={0.8}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to={`/shoe/${currentShoe.id}`}
                    className="btn-primary group"
                  >
                    Keşfet
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link to="/?section=collection" className="btn-ghost">
                    Tüm Koleksiyon
                  </Link>
                </motion.div>

                {/* Color dots */}
                <motion.div
                  variants={textVariants}
                  custom={0.95}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center gap-3 mt-8"
                >
                  <span className="text-xs font-heading uppercase tracking-wider" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 36%, transparent)' }}>Renkler</span>
                  <div className="flex gap-2">
                    {currentShoe.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full shadow-sm"
                        style={{ backgroundColor: color.hex, border: '1px solid rgba(var(--color-surface-rgb), 0.2)' }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Desktop */}
      <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
        <button onClick={goPrev} className="btn-icon" aria-label="Önceki">
          <ChevronLeft size={20} />
        </button>
        <button onClick={goNext} className="btn-icon" aria-label="Sonraki">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container-showroom">
          <div className="flex items-center gap-4">
            {/* Slide counter */}
            <span className="text-xs font-mono tabular-nums" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 44%, transparent)' }}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(featuredShoes.length).padStart(2, '0')}
            </span>

            {/* Progress bars */}
            <div className="flex gap-2 flex-1 max-w-xs">
              {featuredShoes.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="relative h-[3px] flex-1 rounded-full overflow-hidden cursor-pointer group"
                  style={{ background: 'rgba(var(--color-surface-rgb), 0.12)' }}
                  aria-label={`Slide ${idx + 1}`}
                >
                  {idx === currentIndex && (
                    <motion.div
                      key={`progress-${currentIndex}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cognac-400 to-cognac-500 rounded-full"
                    />
                  )}
                  {idx < currentIndex && (
                    <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(var(--color-surface-rgb), 0.3)' }} />
                  )}
                  <div className="absolute inset-0 rounded-full transition-colors duration-200 group-hover:bg-[rgba(var(--color-surface-rgb),0.2)]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-24 right-12 hidden lg:block">
        <div className="w-16 h-16 rounded-tr-lg" style={{ borderTop: '1px solid rgba(var(--color-surface-rgb), 0.12)', borderRight: '1px solid rgba(var(--color-surface-rgb), 0.12)' }} />
      </div>
      <div className="absolute bottom-24 left-12 hidden lg:block">
        <div className="w-16 h-16 rounded-bl-lg" style={{ borderBottom: '1px solid rgba(var(--color-surface-rgb), 0.12)', borderLeft: '1px solid rgba(var(--color-surface-rgb), 0.12)' }} />
      </div>
    </section>
  );
};
