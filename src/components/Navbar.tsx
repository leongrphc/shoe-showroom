import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Koleksiyon', href: '/' },
  { label: 'Formal', href: '/?category=Formal' },
  { label: 'Casual', href: '/?category=Casual' },
  { label: 'Sport', href: '/?category=Sport' },
  { label: 'Boots', href: '/?category=Boots' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-surface-primary/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-showroom">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-10 group flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cognac-400 to-cognac-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-white font-display font-bold text-lg">S</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-tight text-white leading-none">
                  SHOWROOM
                </span>
                <span className="text-[10px] font-heading font-medium tracking-[0.25em] uppercase text-white/40 leading-none mt-0.5">
                  Premium Collection
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  (link.href === '/' && location.pathname === '/' && !location.search) ||
                  (link.href !== '/' && location.pathname === '/' && location.search === link.href.split('?')[1]);

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`relative px-5 py-2.5 text-sm font-heading font-medium tracking-wide transition-colors duration-300 rounded-full ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Showroom Badge - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
                <span className="text-xs font-heading font-medium text-white/60 tracking-wide">
                  Showroom Açık
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden relative z-10 btn-icon"
              aria-label="Menüyü aç"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface-primary/98 backdrop-blur-2xl lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center h-full gap-2"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="block text-3xl font-heading font-bold text-white/80 hover:text-white py-3 px-6 rounded-2xl hover:bg-white/5 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
                <span className="text-xs font-heading font-medium text-white/60 tracking-wide">
                  Showroom Açık
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
