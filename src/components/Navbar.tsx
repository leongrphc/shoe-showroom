import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const textPrimary = 'var(--color-text-primary)';
const borderColor = 'var(--color-border)';
const navBg = 'color-mix(in srgb, var(--color-bg-primary) 88%, transparent)';
const navActiveBg = 'rgba(var(--color-surface-rgb), 0.08)';
const surfaceBadge = 'rgba(var(--color-surface-rgb), 0.05)';
const statusText = 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)';
const brandSubtext = 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)';
const linkMuted = 'color-mix(in srgb, var(--color-text-primary) 50%, transparent)';
const linkHover = 'color-mix(in srgb, var(--color-text-primary) 82%, transparent)';
const mobileBg = 'color-mix(in srgb, var(--color-bg-primary) 96%, transparent)';
const mobileLinkHoverBg = 'rgba(var(--color-surface-rgb), 0.05)';
const navShadow = '0 18px 50px rgba(0, 0, 0, 0.12)';
const lightNavShadow = '0 18px 50px rgba(23, 20, 18, 0.08)';
const navShadowValue = 'var(--theme-nav-shadow)';

const setThemeShadow = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--theme-nav-shadow', document.documentElement.getAttribute('data-theme') === 'light' ? lightNavShadow : navShadow);
  }
};
setThemeShadow();

const ThemeToggleButton: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`btn-icon ${mobile ? 'w-14 h-14' : ''}`}
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
      title={isDark ? 'Açık tema' : 'Koyu tema'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun size={mobile ? 22 : 18} /> : <Moon size={mobile ? 22 : 18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const NavStatusBadge: React.FC = () => (
  <div
    className="flex items-center gap-2 px-4 py-2 rounded-full border"
    style={{ background: surfaceBadge, borderColor }}
  >
    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
    <span className="text-xs font-heading font-medium tracking-wide" style={{ color: statusText }}>
      Showroom Açık
    </span>
  </div>
);

const NAV_LINKS = [
  { label: 'Koleksiyon', href: '/?section=collection' },
  { label: 'Formal', href: '/?category=Formal' },
  { label: 'Casual', href: '/?category=Casual' },
  { label: 'Sport', href: '/?category=Sport' },
  { label: 'Boots', href: '/?category=Boots' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    setThemeShadow();
  }, [theme]);

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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={isScrolled ? { background: navBg, backdropFilter: 'blur(24px)', borderBottom: `1px solid ${borderColor}`, boxShadow: navShadowValue } : undefined}
      >
        <div className="container-showroom">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-10 group flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cognac-400 to-cognac-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                  <span className="text-white font-display font-bold text-lg">S</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-tight leading-none" style={{ color: textPrimary }}>
                  SHOWROOM
                </span>
                <span className="text-[10px] font-heading font-medium tracking-[0.25em] uppercase leading-none mt-0.5" style={{ color: brandSubtext }}>
                  Premium Collection
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  (link.label === 'Koleksiyon' && location.pathname === '/' && location.search === '?section=collection') ||
                  (link.href !== '/?section=collection' && location.pathname === '/' && location.search === link.href.split('?')[1]);

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative px-5 py-2.5 text-sm font-heading font-medium tracking-wide transition-colors duration-300 rounded-full"
                    style={{ color: isActive ? textPrimary : linkMuted }}
                    onMouseEnter={(event) => {
                      if (!isActive) event.currentTarget.style.color = linkHover;
                    }}
                    onMouseLeave={(event) => {
                      if (!isActive) event.currentTarget.style.color = linkMuted;
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border"
                        style={{ background: navActiveBg, borderColor }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggleButton />
              <NavStatusBadge />
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
            className="fixed inset-0 z-40 backdrop-blur-2xl lg:hidden"
            style={{ background: mobileBg }}
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
                    className="block text-3xl font-heading font-bold py-3 px-6 rounded-2xl transition-all duration-300"
                    style={{ color: linkHover, background: 'transparent' }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = mobileLinkHoverBg;
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8"
              >
                <ThemeToggleButton mobile />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3"
              >
                <NavStatusBadge />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
