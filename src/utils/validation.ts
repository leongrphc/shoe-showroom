import { Shoe, ShoeCategory, ColorFamily } from '../types/shoe';

/**
 * Shoe objesinin tüm alanlarını doğrular
 */
export const validateShoeData = (shoe: any): boolean => {
  if (!shoe || typeof shoe !== 'object') return false;

  // Zorunlu string alanları
  const requiredStrings = ['id', 'name', 'subtitle', 'category', 'description', 'collection'];
  for (const field of requiredStrings) {
    if (typeof shoe[field] !== 'string' || shoe[field].trim() === '') {
      console.warn(`Geçersiz alan: ${field}`);
      return false;
    }
  }

  // Kategori kontrolü
  const validCategories: ShoeCategory[] = ['Formal', 'Casual', 'Sport', 'Boots'];
  if (!validCategories.includes(shoe.category)) {
    console.warn('Geçersiz kategori:', shoe.category);
    return false;
  }

  // Diziler
  if (!Array.isArray(shoe.images) || shoe.images.length === 0) {
    console.warn('Geçersiz images dizisi');
    return false;
  }

  if (!Array.isArray(shoe.colors) || shoe.colors.length === 0) {
    console.warn('Geçersiz colors dizisi');
    return false;
  }

  if (!Array.isArray(shoe.colorFamily) || shoe.colorFamily.length === 0) {
    console.warn('Geçersiz colorFamily dizisi');
    return false;
  }

  if (!Array.isArray(shoe.sizes) || shoe.sizes.length === 0) {
    console.warn('Geçersiz sizes dizisi');
    return false;
  }

  if (!Array.isArray(shoe.features)) {
    console.warn('Geçersiz features dizisi');
    return false;
  }

  if (!Array.isArray(shoe.materials)) {
    console.warn('Geçersiz materials dizisi');
    return false;
  }

  // Boolean alanları
  if (typeof shoe.isNew !== 'boolean' || typeof shoe.isFeatured !== 'boolean') {
    console.warn('Geçersiz boolean alanlar');
    return false;
  }

  // Timestamp
  if (typeof shoe.createdAt !== 'number' || shoe.createdAt <= 0) {
    console.warn('Geçersiz createdAt');
    return false;
  }

  return true;
};

/**
 * Shoe dizisini doğrular
 */
export const validateShoeArray = (data: any): data is Shoe[] => {
  if (!Array.isArray(data)) return false;
  return data.every(item => validateShoeData(item));
};

/**
 * ColorFamily değerini doğrular
 */
export const validateColorFamily = (family: any): family is ColorFamily => {
  const validFamilies: ColorFamily[] = [
    'black', 'white', 'red', 'blue', 'brown', 'green', 'grey', 'beige', 'multi'
  ];
  return validFamilies.includes(family);
};

/**
 * ShoeCategory değerini doğrular
 */
export const validateCategory = (category: any): category is ShoeCategory => {
  const validCategories: ShoeCategory[] = ['Formal', 'Casual', 'Sport', 'Boots'];
  return validCategories.includes(category);
};

/**
 * Numara aralığını doğrular
 */
export const validateShoeSize = (size: number): boolean => {
  return Number.isInteger(size) && size >= 35 && size <= 50;
};

/**
 * Form verilerinin minimum gereksinimlerini kontrol eder
 */
export const validateFormData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Ayakkabı adı en az 2 karakter olmalıdır');
  }

  if (!data.subtitle || data.subtitle.trim().length < 2) {
    errors.push('Alt başlık en az 2 karakter olmalıdır');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Açıklama en az 10 karakter olmalıdır');
  }

  if (!data.category || !validateCategory(data.category)) {
    errors.push('Geçerli bir kategori seçilmelidir');
  }

  if (!data.collection || data.collection.trim().length < 2) {
    errors.push('Koleksiyon adı en az 2 karakter olmalıdır');
  }

  if (!Array.isArray(data.images) || data.images.length === 0) {
    errors.push('En az bir görsel URL\'si gereklidir');
  }

  if (!Array.isArray(data.colors) || data.colors.length === 0) {
    errors.push('En az bir renk tanımlanmalıdır');
  }

  if (!Array.isArray(data.colorFamily) || data.colorFamily.length === 0) {
    errors.push('En az bir renk ailesi seçilmelidir');
  }

  if (!Array.isArray(data.sizes) || data.sizes.length === 0) {
    errors.push('En az bir numara seçilmelidir');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * localStorage/sessionStorage verilerini güvenli şekilde parse eder
 */
export const safeJSONParse = <T>(json: string | null, fallback: T): T => {
  if (!json) return fallback;

  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (error) {
    console.error('JSON parse hatası:', error);
    return fallback;
  }
};
