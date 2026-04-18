import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { HeroSlider } from '../components/HeroSlider';
import { ColorFilter } from '../components/ColorFilter';
import { ShoeCard } from '../components/ShoeCard';
import { Footer } from '../components/Footer';
import { useShoes } from '../context/ShoeContext';
import { ColorFamily, ShoeCategory } from '../types/shoe';

export const HomePage: React.FC = () => {
  const { shoes, featuredShoes, newArrivals, filterByCategory } = useShoes();
  const [searchParams] = useSearchParams();
  const [activeColor, setActiveColor] = useState<ColorFamily | 'all'>('all');
  const collectionRef = useRef<HTMLElement>(null);

  // Handle URL-based category filtering
  const categoryParam = searchParams.get('category') as ShoeCategory | null;
  const sectionParam = searchParams.get('section');

  // Scroll to collection section when category changes or section param is set
  useEffect(() => {
    if ((categoryParam || sectionParam === 'collection') && collectionRef.current) {
      setTimeout(() => {
        collectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [categoryParam, sectionParam]);

  // Get filtered shoes
  const getDisplayShoes = () => {
    let filtered = categoryParam ? filterByCategory(categoryParam) : shoes;
    if (activeColor !== 'all') {
      filtered = filtered.filter(s => s.colorFamily.includes(activeColor));
    }
    return filtered;
  };

  const displayShoes = getDisplayShoes();

  // Color counts for filter badges
  const colorCounts: Record<string, number> = {};
  const baseShoes = categoryParam ? filterByCategory(categoryParam) : shoes;
  baseShoes.forEach(shoe => {
    shoe.colorFamily.forEach(cf => {
      colorCounts[cf] = (colorCounts[cf] || 0) + 1;
    });
  });
  colorCounts['all'] = baseShoes.length;

  // Categories for showcase
  const categories: { name: ShoeCategory; label: string; description: string; image: string }[] = [
    {
      name: 'Formal',
      label: 'Formal',
      description: 'İtalyan zanaatkarlığının özü. El yapımı, zamansız tasarımlar.',
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Casual',
      label: 'Casual',
      description: 'Şehir yaşamının konforlu ve şık yüzü.',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Sport',
      label: 'Sport',
      description: 'Performans ve stil bir arada. Hareketin gücü.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Boots',
      label: 'Boots',
      description: 'Cesur adımlar için. Dayanıklılık ve karakter.',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO SLIDER
      ═══════════════════════════════════════════════ */}
      <HeroSlider featuredShoes={featuredShoes} />

      {/* ═══════════════════════════════════════════════
          NEW ARRIVALS - Horizontal Scroll
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="container-showroom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={16} className="text-cognac-400" />
                <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase text-cognac-400">
                  Yeni Gelenler
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white leading-tight">
                Son Koleksiyonumuz
              </h2>
              <p className="text-base text-white/40 font-body mt-3 max-w-md">
                En yeni tasarımlarımızı keşfedin. Her biri modern yaşamın ritmine ayak uydurmak için özenle seçildi.
              </p>
            </div>
            <Link
              to="/?section=collection"
              className="group flex items-center gap-2 text-sm font-heading font-medium text-white/50 hover:text-cognac-400 transition-colors duration-300"
            >
              Tümünü Gör
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] scrollbar-hide snap-x snap-mandatory">
            {newArrivals.map((shoe, index) => (
              <motion.div
                key={shoe.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-[300px] md:w-[340px] lg:w-[380px] snap-start"
              >
                <ShoeCard shoe={shoe} index={index} />
              </motion.div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute top-0 right-0 bottom-6 w-24 bg-gradient-to-l from-surface-primary to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════════════ */}
      <div className="container-showroom">
        <div className="divider-glow" />
      </div>

      {/* ═══════════════════════════════════════════════
          FEATURED - Bento Grid Layout
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="container-showroom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase text-white/30 mb-4 block">
              Editörün Seçimi
            </span>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
              Öne Çıkanlar
            </h2>
            <p className="text-base text-white/40 font-body max-w-lg mx-auto">
              Koleksiyonumuzun en dikkat çekici parçaları. Zanaatkarlık ve tasarımın buluşma noktası.
            </p>
          </motion.div>

          {/* Bento Grid: 1 large left + 2 stacked right */}
          {featuredShoes.length >= 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Large card */}
              <div className="lg:row-span-2">
                <ShoeCard shoe={featuredShoes[0]} index={0} variant="large" />
              </div>
              {/* Two smaller cards */}
              <div>
                <ShoeCard shoe={featuredShoes[1]} index={1} />
              </div>
              <div>
                <ShoeCard shoe={featuredShoes[2]} index={2} />
              </div>
            </div>
          )}

          {/* Additional featured in row */}
          {featuredShoes.length > 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {featuredShoes.slice(3).map((shoe, index) => (
                <ShoeCard key={shoe.id} shoe={shoe} index={index + 3} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════════════ */}
      <div className="container-showroom">
        <div className="divider-glow" />
      </div>

      {/* ═══════════════════════════════════════════════
          CATEGORY SHOWCASE
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="container-showroom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase text-white/30 mb-4 block">
              Kategoriler
            </span>
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Tarzını Bul
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/?category=${cat.name}`}
                  className="group relative block aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden"
                >
                  {/* Background image */}
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 group-hover:via-black/50 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-xl lg:text-2xl font-heading font-bold text-white mb-2 group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-white/50 font-body opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      {cat.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-150">
                      <span className="text-xs font-heading font-medium text-cognac-400">
                        Keşfet
                      </span>
                      <ArrowRight size={14} className="text-cognac-400" />
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════════════ */}
      <div className="container-showroom">
        <div className="divider-glow" />
      </div>

      {/* ═══════════════════════════════════════════════
          FULL COLLECTION - With Color Filter
      ═══════════════════════════════════════════════ */}
      <section ref={collectionRef} className="py-20 lg:py-28 scroll-mt-24">
        <div className="container-showroom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6"
          >
            <div>
              <span className="text-xs font-heading font-medium tracking-[0.3em] uppercase text-white/30 mb-4 block">
                {categoryParam ? categoryParam : 'Tüm Koleksiyon'}
              </span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white leading-tight">
                {categoryParam ? `${categoryParam} Koleksiyonu` : 'Vitrin'}
              </h2>
              <p className="text-base text-white/40 font-body mt-3 max-w-md">
                {categoryParam
                  ? `${categoryParam} kategorisindeki tüm tasarımlarımızı keşfedin.`
                  : 'Tüm koleksiyonumuzu renklere göre filtreleyerek keşfedin.'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Eye size={16} className="text-white/30" />
              <span className="text-sm font-heading font-medium text-white/40">
                {displayShoes.length} Tasarım
              </span>
            </div>
          </motion.div>

          {/* Color Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <ColorFilter
              activeColor={activeColor}
              onColorChange={setActiveColor}
              counts={colorCounts}
            />
          </motion.div>

          {/* Product Grid */}
          {displayShoes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <p className="text-white/40 font-body text-lg mb-2">Bu filtreye uygun ürün bulunamadı.</p>
              <button
                onClick={() => setActiveColor('all')}
                className="text-sm text-cognac-400 hover:text-cognac-300 font-heading font-medium transition-colors"
              >
                Filtreleri Temizle
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {displayShoes.map((shoe, index) => (
                <ShoeCard key={shoe.id} shoe={shoe} index={index} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BRAND STATEMENT
      ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 noise-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-primary via-cognac-950/10 to-surface-primary" />

        <div className="container-showroom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[2px] bg-gradient-to-r from-transparent via-cognac-400 to-transparent mx-auto mb-10"
            />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display italic text-white/80 leading-relaxed mb-8">
              "Bir ayakkabı sadece ayağınızı değil, duruşunuzu, tarzınızı ve hikayenizi taşır."
            </blockquote>
            <p className="text-sm font-heading font-medium tracking-[0.3em] uppercase text-cognac-400/60">
              Showroom — Premium Collection
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
