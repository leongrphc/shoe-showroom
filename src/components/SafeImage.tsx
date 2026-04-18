import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  onError?: () => void;
}

const ALLOWED_DOMAINS = [
  'images.unsplash.com',
  'unsplash.com',
  'localhost',
  '127.0.0.1'
];

/**
 * Güvenli görsel yükleme component'i
 * - URL güvenlik kontrolü
 * - Fallback desteği
 * - Lazy loading
 * - Referrer policy
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallback = '/placeholder.jpg',
  onError
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  /**
   * URL güvenlik kontrolü
   */
  const isSafeUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;

    try {
      const parsed = new URL(url);

      // Sadece HTTP/HTTPS protokollerine izin ver
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        console.warn('⚠️ Güvensiz protokol:', parsed.protocol);
        return false;
      }

      // Domain whitelist kontrolü
      const isAllowedDomain = ALLOWED_DOMAINS.some(domain =>
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
      );

      if (!isAllowedDomain) {
        console.warn('⚠️ İzin verilmeyen domain:', parsed.hostname);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('⚠️ Geçersiz URL:', url);
      return false;
    }
  };

  /**
   * Görsel yükleme hatası
   */
  const handleError = () => {
    if (!hasError) {
      console.warn('⚠️ Görsel yükleme hatası:', imgSrc);
      setHasError(true);
      setImgSrc(fallback);
      onError?.();
    }
  };

  // URL güvenlik kontrolü
  if (!isSafeUrl(imgSrc)) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-secondary ${className}`}
        style={{ border: '1px solid var(--color-border)' }}
      >
        <p className="text-xs text-center p-4" style={{ color: 'color-mix(in srgb, var(--color-text-primary) 42%, transparent)' }}>
          Güvenli olmayan görsel URL'si
        </p>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
  );
};
