/**
 * CSRF Token yönetimi
 * Cross-Site Request Forgery saldırılarına karşı koruma
 */

const CSRF_TOKEN_KEY = 'csrf-token';
const CSRF_TOKEN_TIMESTAMP_KEY = 'csrf-token-timestamp';
const TOKEN_VALIDITY_MS = 60 * 60 * 1000; // 1 saat

/**
 * Güvenli rastgele token oluştur
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Yeni CSRF token oluştur ve kaydet
 */
export const setCSRFToken = (): string => {
  const token = generateCSRFToken();
  const timestamp = Date.now().toString();

  sessionStorage.setItem(CSRF_TOKEN_KEY, token);
  sessionStorage.setItem(CSRF_TOKEN_TIMESTAMP_KEY, timestamp);

  return token;
};

/**
 * Mevcut CSRF token'ı al
 */
export const getCSRFToken = (): string | null => {
  const token = sessionStorage.getItem(CSRF_TOKEN_KEY);
  const timestamp = sessionStorage.getItem(CSRF_TOKEN_TIMESTAMP_KEY);

  if (!token || !timestamp) {
    return null;
  }

  // Token süresi dolmuş mu kontrol et
  const elapsed = Date.now() - parseInt(timestamp);
  if (elapsed > TOKEN_VALIDITY_MS) {
    clearCSRFToken();
    return null;
  }

  return token;
};

/**
 * CSRF token'ı doğrula
 */
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken !== null && token === storedToken;
};

/**
 * CSRF token'ı temizle
 */
export const clearCSRFToken = (): void => {
  sessionStorage.removeItem(CSRF_TOKEN_KEY);
  sessionStorage.removeItem(CSRF_TOKEN_TIMESTAMP_KEY);
};

/**
 * CSRF token'ı yenile (gerekirse)
 */
export const refreshCSRFToken = (): string => {
  const existingToken = getCSRFToken();

  if (existingToken) {
    return existingToken;
  }

  return setCSRFToken();
};

/**
 * Form submit için CSRF token kontrolü
 */
export const validateFormSubmit = (): { valid: boolean; token: string | null } => {
  const token = getCSRFToken();

  if (!token) {
    console.error('❌ CSRF token bulunamadı');
    return { valid: false, token: null };
  }

  return { valid: true, token };
};
