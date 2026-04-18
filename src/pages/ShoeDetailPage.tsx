import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Layers, Ruler, Palette, Shield, Star, ArrowUpRight } from 'lucide-react';
import { useShoes } from '../context/ShoeContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShoeCard } from '../components/ShoeCard';

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
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Ürün Bulunamadı</h2>
            <p className="text-white/40 font-body mb-8">Aradığınız ürün showroom'da mevcut değil.</p>
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
            <Link to="/" className="text-white/30 hover:text-white/60 transition-colors">
              Showroom
            </Link>
            <ChevronRight size={14} className="text-white/20" />
            <Link to={`/?category=${shoe.category}`} className="text-white/30 hover:text-white/60 transition-colors">
              {shoe.category}
            </Link>
            <ChevronRight size={14} className="text-white/20" />
            <span className="text-white/60">{shoe.name}</span>
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
              <div className="relative aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden bg-surface-secondary border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={shoe.images[selectedImage]}
                    alt={shoe.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Collection badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="tag-accent text-[10px]">{shoe.collection}</span>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-5 right-5 z-10">
                  <span className="text-xs font-mono text-white/40 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    {String(selectedImage + 1).padStart(2, '0')} / {String(shoe.images.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
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
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${shoe.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage !== idx && (
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />
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
                <span className="text-xs font-heading font-medium tracking-[0.2em] uppercase text-white/40">
                  {shoe.category}
                </span>
                {shoe.isNew && (
                  <span className="tag-accent text-[10px]">Yeni</span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[0.95] mb-3">
                {shoe.name}
              </h1>

              {/* Subtitle */}
              <p className="text-lg font-body text-white/50 mb-6">
                {shoe.subtitle}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-6" />

              {/* Description */}
              <p className="text-base font-body text-white/60 leading-relaxed mb-8">
                {shoe.longDescription || shoe.description}
              </p>

              {/* Colors */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 flex items-center gap-2">
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
                          className="w-10 h-10 rounded-full border border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                        />
                      </div>
                      <span className={`text-xs font-heading transition-colors duration-300 ${
                        selectedColor === idx ? 'text-white' : 'text-white/30 group-hover:text-white/50'
                      }`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 flex items-center gap-2">
                  <Ruler size={14} />
                  Mevcut Numaralar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shoe.sizes.map((size) => (
                    <div
                      key={size}
                      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-heading font-medium text-white/60"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 flex items-center gap-2">
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cognac-400 flex-shrink-0" />
                      <span className="text-sm font-body text-white/60">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-10">
                <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/40 mb-4 flex items-center gap-2">
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
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cognac-950/30 to-cognac-900/10 border border-cognac-400/10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cognac-400/10 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-cognac-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-semibold text-white mb-1">
                        Showroom'da İnceleyin
                      </h4>
                      <p className="text-sm font-body text-white/40 leading-relaxed">
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
        <section className="py-20 lg:py-28 border-t border-white/5">
          <div className="container-showroom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-between items-end mb-12"
            >
              <div>
                <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase text-white/30 mb-3 block">
                  Benzer Tasarımlar
                </span>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white">
                  İlginizi Çekebilir
                </h2>
              </div>
              <Link
                to={`/?category=${shoe.category}`}
                className="group flex items-center gap-2 text-sm font-heading font-medium text-white/50 hover:text-cognac-400 transition-colors duration-300"
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
