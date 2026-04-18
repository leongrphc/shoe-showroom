import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const FOOTER_LINKS = {
  koleksiyon: [
    { label: 'Formal', href: '/?category=Formal' },
    { label: 'Casual', href: '/?category=Casual' },
    { label: 'Sport', href: '/?category=Sport' },
    { label: 'Boots', href: '/?category=Boots' },
  ],
  showroom: [
    { label: 'Hakkımızda', href: '#' },
    { label: 'Atölyemiz', href: '#' },
    { label: 'Zanaatkarlık', href: '#' },
    { label: 'Sürdürülebilirlik', href: '#' },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cognac-400/30 to-transparent" />

      <div className="container-showroom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link to="/" className="group flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cognac-400 to-cognac-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-display font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-tight text-white leading-none">
                  SHOWROOM
                </span>
                <span className="text-[9px] font-heading font-medium tracking-[0.25em] uppercase text-white/30 leading-none mt-0.5">
                  Premium Collection
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-6 max-w-xs">
              Dünyanın en prestijli atölyelerinden özenle seçilmiş ayakkabı koleksiyonları.
              Zanaatkarlık, malzeme kalitesi ve zamansız tasarımın buluşma noktası.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Collection Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/60 mb-5">
              Koleksiyon
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.koleksiyon.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm font-body text-white/35 hover:text-white/70 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Showroom Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/60 mb-5">
              Showroom
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.showroom.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-body text-white/35 hover:text-white/70 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-white/60 mb-5">
              Ziyaret Edin
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-cognac-400/60 mt-0.5 flex-shrink-0" />
                <span className="text-sm font-body text-white/35 leading-relaxed">
                  Nişantaşı, Abdi İpekçi Cad. No:42<br />
                  Şişli, İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-cognac-400/60 flex-shrink-0" />
                <span className="text-sm font-body text-white/35">
                  +90 212 555 0042
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-cognac-400/60 flex-shrink-0" />
                <span className="text-sm font-body text-white/35">
                  info@showroom.com.tr
                </span>
              </li>
            </ul>

            {/* Showroom hours */}
            <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-[10px] font-heading font-medium tracking-[0.2em] uppercase text-white/30 mb-2">
                Showroom Saatleri
              </p>
              <p className="text-sm font-body text-white/50">
                Pzt - Cmt: 10:00 - 20:00
              </p>
              <p className="text-sm font-body text-white/50">
                Pazar: 12:00 - 18:00
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-body text-white/20">
              © {new Date().getFullYear()} Showroom Premium Collection. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs font-body text-white/20 hover:text-white/40 transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-xs font-body text-white/20 hover:text-white/40 transition-colors">
                Kullanım Koşulları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
