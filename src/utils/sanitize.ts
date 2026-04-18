/**
 * HTML karakterlerini escape eder (XSS koruması)
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * URL'yi sanitize eder ve güvenli protokolleri kontrol eder
 */
export const sanitizeUrl = (url: string): string => {
  if (!url || typeof url !== 'string') return '';

  try {
    const trimmed = url.trim();
    const parsed = new URL(trimmed);

    // Sadece güvenli protokollere izin ver
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      console.warn('Güvensiz protokol tespit edildi:', parsed.protocol);
      return '';
    }

    return trimmed;
  } catch (error) {
    console.warn('Geçersiz URL:', url);
    return '';
  }
};

/**
 * Görsel URL'sini doğrular
 */
export const validateImageUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    const parsed = new URL(url);

    // Protokol kontrolü
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    // Dosya uzantısı kontrolü
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
    const hasValidExtension = validExtensions.some(ext =>
      parsed.pathname.toLowerCase().endsWith(ext)
    );

    // Unsplash gibi bilinen güvenli domainler için uzantı kontrolü atlanabilir
    const trustedDomains = ['images.unsplash.com', 'unsplash.com'];
    const isTrustedDomain = trustedDomains.some(domain =>
      parsed.hostname.includes(domain)
    );

    return hasValidExtension || isTrustedDomain;
  } catch {
    return false;
  }
};

/**
 * Hex renk kodunu doğrular
 */
export const validateHexColor = (hex: string): boolean => {
  if (!hex) return false;
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
};

/**
 * Hex renk kodunu sanitize eder
 */
export const sanitizeHexColor = (hex: string): string => {
  if (!hex) return '#000000';

  // # işareti yoksa ekle
  const normalized = hex.startsWith('#') ? hex : `#${hex}`;

  // Geçerli hex kodu mu kontrol et
  if (validateHexColor(normalized)) {
    return normalized.toUpperCase();
  }

  return '#000000';
};

/**
 * Sayı dizisini sanitize eder (numara listesi için)
 */
export const sanitizeNumberArray = (arr: any[]): number[] => {
  if (!Array.isArray(arr)) return [];

  return arr
    .filter(item => typeof item === 'number' && !isNaN(item))
    .map(item => Math.floor(item))
    .filter(item => item >= 0 && item <= 100);
};

/**
 * String dizisini sanitize eder
 */
export const sanitizeStringArray = (arr: any[]): string[] => {
  if (!Array.isArray(arr)) return [];

  return arr
    .filter(item => typeof item === 'string')
    .map(item => sanitizeInput(item.trim()))
    .filter(item => item.length > 0);
};

/**
 * Maksimum uzunluk kontrolü
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength);
};

/**
 * Email validasyonu (gelecekte kullanım için)
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Telefon numarası sanitizasyonu (gelecekte kullanım için)
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';
  // Sadece rakamları al
  return phone.replace(/\D/g, '');
};
