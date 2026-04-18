import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Layers, Ruler, Palette, Shield, Star, ArrowUpRight } from 'lucide-react';
import { useShoes } from '../context/ShoeContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShoeCard } from '../components/ShoeCard';
import { SafeImage } from '../components/SafeImage';

export const ShoeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getShoe, shoes } = useShoes();
  const shoe = getShoe(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!shoe) {
    return (
      <div className="min-h-screen bg-surface-primary flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Ürün Bulunamadı</h2>
            <p className="font-body mb-8" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>Aradığınız ürün showroom'da mevcut değil.</p>
            <Link to="/" className="btn-primary inline-flex">
              Showroom'a Dön
              <ArrowLeft size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Related shoes: same category, different id
  const relatedShoes = shoes
    .filter(s => s.category === shoe.category && s.id !== shoe.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 lg:pt-32">
        <div className="container-showroom">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm font-body mb-8"
          >
            <Link to="/" className="transition-colors" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 32%, transparent)' }}>
              Showroom
            </Link>
            <ChevronRight size={14} style={{ color: 'color-mix(in srgb, var(--color-text-primary) 24%, transparent)' }} />
            <Link
              to={`/?category=${shoe.category}`}
              className="transition-colors"
              style={{ color: 'color-mix(in srgb, var(--color-text-primary) 32%, transparent)' }}
              onMouseEnter={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 58%, transparent)'; }}
              onMouseLeave={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 32%, transparent)'; }}
            >
              {shoe.category}
            </Link>
            <ChevronRight size={14} style={{ color: 'color-mix(in srgb, var(--color-text-primary) 24%, transparent)' }} />
            <span style={{ color: 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)' }}>{shoe.name}</span>
          </motion.nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-20 lg:pb-28">
        <div className="container-showroom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-secondary" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <SafeImage
                      src={shoe.images[selectedImage]}
                      alt={shoe.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Collection badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="tag-accent text-[10px]">{shoe.collection}</span>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-5 right-5 z-10">
                  <span className="text-xs font-mono backdrop-blur-sm px-3 py-1.5 rounded-full" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 44%, transparent)', background: 'rgba(var(--color-surface-rgb), 0.12)', border: '1px solid rgba(var(--color-surface-rgb), 0.14)' }}>
                    {String(selectedImage + 1).padStart(2, '0')} / {String(shoe.images.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black/30 dark:via-transparent dark:to-transparent bg-gradient-to-t from-[#fff8f0]/28 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {shoe.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-1 aspect-square rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx
                        ? 'border-cognac-400 shadow-lg shadow-cognac-400/20'
                        : 'border-[var(--color-border)] hover:border-cognac-400/20'
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${shoe.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage !== idx && (
                      <div className="absolute inset-0 dark:bg-black/40 bg-[rgba(255,248,240,0.36)] transition-opacity duration-300" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {/* Category & New badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-heading font-medium tracking-[0.2em] uppercase" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
                  {shoe.category}
                </span>
                {shoe.isNew && (
                  <span className="tag-accent text-[10px]">Yeni</span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[0.95] mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {shoe.name}
              </h1>

              {/* Subtitle */}
              <p className="text-lg font-body mb-6" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 52%, transparent)' }}>
                {shoe.subtitle}
              </p>

              {/* Divider */}
              <div className="w-full h-px mb-6" style={{ background: 'var(--color-border)' }} />

              {/* Description */}
              <p className="text-base font-body leading-relaxed mb-8" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 64%, transparent)' }}>
                {shoe.longDescription || shoe.description}
              </p>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
                  <Palette size={14} />
                  Mevcut Renkler
                </h3>
                <div className="flex gap-4">
                  {shoe.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="relative">
                        {selectedColor === idx && (
                          <motion.div
                            layoutId="color-ring"
                            className="absolute -inset-1.5 rounded-full border-2 border-cognac-400"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                          />
                        )}
                        <div
                          className="w-10 h-10 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: color.hex, border: '1px solid rgba(var(--color-surface-rgb), 0.16)' }}
                        />
                      </div>
                      <span className={`text-xs font-heading transition-colors duration-300 ${
                        selectedColor === idx ? 'text-[var(--color-text-primary)]' : 'text-[color-mix(in_srgb,var(--color-text-primary)_32%,transparent)] group-hover:text-[color-mix(in_srgb,var(--color-text-primary)_52%,transparent)]'
                      }`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
                  <Ruler size={14} />
                  Mevcut Numaralar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shoe.sizes.map((size) => (
                    <div
                      key={size}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-heading font-medium" style={{ background: 'rgba(var(--color-surface-rgb), 0.05)', border: '1px solid var(--color-border)', color: 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)' }}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
                  <Star size={14} />
                  Özellikler
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {shoe.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl glass"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cognac-400 flex-shrink-0" />
                      <span className="text-sm font-body" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-10">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
                  <Layers size={14} />
                  Malzemeler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shoe.materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="tag"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Showroom Notice */}
              <div className="mt-auto">
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(216, 128, 53, 0.08) 0%, rgba(255, 250, 244, 0.86) 100%)', border: '1px solid rgba(216, 128, 53, 0.14)', boxShadow: 'var(--shadow-md)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cognac-400/10 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-cognac-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                        Showroom'da İnceleyin
                      </h4>
                      <p className="text-sm font-body leading-relaxed" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 44%, transparent)' }}>
                        Bu ürün showroom'umuzda sergilenmektedir. Yakından incelemek ve denemek için mağazamızı ziyaret edebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          RELATED PRODUCTS
      ═══════════════════════════════════════════════ */}
      {relatedShoes.length > 0 && (
        <section className="py-20 lg:py-28" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="container-showroom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-between items-end mb-12"
            >
              <div>
                <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase mb-3 block" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 34%, transparent)' }}>
                  Benzer Tasarımlar
                </span>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  İlginizi Çekebilir
                </h2>
              </div>
              <Link
                to={`/?category=${shoe.category}`}
                className="group flex items-center gap-2 text-sm font-heading font-medium transition-colors duration-300" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 46%, transparent)' }}
              >
                Tümünü Gör
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedShoes.map((relShoe, index) => (
                <ShoeCard key={relShoe.id} shoe={relShoe} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};
