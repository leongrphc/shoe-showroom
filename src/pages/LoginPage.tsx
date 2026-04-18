import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { rateLimiter } from '../utils/rateLimit';

export const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin';
  const isAuthConfigured = useMemo(() => Boolean(import.meta.env.VITE_ADMIN_PASSWORD_HASH), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthConfigured) {
      setError('Admin girişi yapılandırılmamış. VITE_ADMIN_PASSWORD_HASH tanımlanmalı.');
      return;
    }

    const identifier = 'admin-login';
    if (rateLimiter.isRateLimited(identifier)) {
      setError('Çok fazla başarısız deneme. Lütfen 15 dakika sonra tekrar deneyin.');
      return;
    }

    setIsLoading(true);

    // Minimum 500ms bekleme (brute force zorlaştırma)
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = await login(password);

    if (success) {
      rateLimiter.reset(identifier);
      navigate(from, { replace: true });
    } else {
      setError('Hatalı şifre. Lütfen tekrar deneyin.');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-cognac-950/20 via-transparent to-cognac-950/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Back to home link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-heading transition-colors mb-8"
          style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}
          onMouseEnter={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)'; }}
          onMouseLeave={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)'; }}
        >
          <ArrowLeft size={16} />
          Showroom'a Dön
        </Link>

        {/* Login Card */}
        <div className="bg-surface-secondary rounded-3xl overflow-hidden" style={{ border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}>
          {/* Header */}
          <div className="p-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cognac-400 to-cognac-600 flex items-center justify-center">
                <Lock size={28} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-heading font-bold text-center mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Admin Girişi
            </h1>
            <p className="text-sm text-center font-body" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
              Showroom yönetim paneline erişim için şifrenizi girin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 font-body">{error}</p>
              </motion.div>
            )}

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-body mb-3" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)' }}>
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 rounded-xl focus:border-cognac-400 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'rgba(var(--color-surface-rgb), 0.05)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  placeholder="Admin şifrenizi girin"
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}
                  onMouseEnter={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 62%, transparent)'; }}
                  onMouseLeave={(event) => { event.currentTarget.style.color = 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)'; }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isAuthConfigured && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-300 font-body leading-relaxed">
                  VITE_ADMIN_PASSWORD_HASH tanımlı değil. Admin girişi kapalı durumda.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !password || !isAuthConfigured}
              className="w-full btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 rounded-full"
                    style={{ border: '2px solid rgba(var(--color-inverse-rgb), 0.3)', borderTopColor: '#ffffff' }}
                  />
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-xs text-center font-body" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 30%, transparent)' }}>
                Bu sayfa yalnızca yetkili kullanıcılar içindir.
                <br />
                Tüm giriş denemeleri kaydedilir.
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(var(--color-surface-rgb), 0.05)', border: '1px solid var(--color-border)' }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            <span className="text-xs font-heading" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 40%, transparent)' }}>
              Güvenli Bağlantı
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
