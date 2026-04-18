import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit2, Save, X, ArrowLeft, Image as ImageIcon, Palette, Tag } from 'lucide-react';
import { useShoes } from '../context/ShoeContext';
import { Shoe, ShoeCategory, ColorFamily } from '../types/shoe';
import { Navbar } from '../components/Navbar';

type ShoeFormData = Omit<Shoe, 'id' | 'createdAt'>;

const EMPTY_FORM: ShoeFormData = {
  name: '',
  subtitle: '',
  category: 'Casual',
  description: '',
  longDescription: '',
  images: ['', '', ''],
  colors: [{ name: '', hex: '#000000' }],
  colorFamily: [],
  sizes: [],
  features: [''],
  materials: [''],
  collection: '',
  isNew: false,
  isFeatured: false,
};

const CATEGORIES: ShoeCategory[] = ['Formal', 'Casual', 'Sport', 'Boots'];
const COLOR_FAMILIES: ColorFamily[] = ['black', 'white', 'brown', 'beige', 'red', 'blue', 'green', 'grey'];

export const AdminPage: React.FC = () => {
  const { shoes, addShoe, deleteShoe } = useShoes();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ShoeFormData>(EMPTY_FORM);

  const handleOpenForm = (shoe?: Shoe) => {
    if (shoe) {
      setEditingId(shoe.id);
      const { id, createdAt, ...rest } = shoe;
      setFormData(rest);
    } else {
      setEditingId(null);
      setFormData(EMPTY_FORM);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty strings from arrays
    const cleanedData: ShoeFormData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      features: formData.features.filter(f => f.trim() !== ''),
      materials: formData.materials.filter(m => m.trim() !== ''),
      colors: formData.colors.filter(c => c.name.trim() !== '' && c.hex.trim() !== ''),
    };

    if (editingId) {
      // Update existing
      deleteShoe(editingId);
      addShoe({ ...cleanedData, id: editingId, createdAt: Date.now() });
    } else {
      // Add new
      addShoe({ ...cleanedData, id: `shoe-${Date.now()}`, createdAt: Date.now() });
    }

    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bu ayakkabıyı silmek istediğinizden emin misiniz?')) {
      deleteShoe(id);
    }
  };

  const updateFormField = <K extends keyof ShoeFormData>(field: K, value: ShoeFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'images' | 'features' | 'materials' | 'colors') => {
    if (field === 'colors') {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { name: '', hex: '#000000' }],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ''],
      }));
    }
  };

  const removeArrayItem = (field: 'images' | 'features' | 'materials' | 'colors', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateArrayItem = (field: 'images' | 'features' | 'materials', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const updateColorItem = (index: number, key: 'name' | 'hex', value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) =>
        i === index ? { ...color, [key]: value } : color
      ),
    }));
  };

  const toggleColorFamily = (family: ColorFamily) => {
    setFormData(prev => ({
      ...prev,
      colorFamily: prev.colorFamily.includes(family)
        ? prev.colorFamily.filter(f => f !== family)
        : [...prev.colorFamily, family],
    }));
  };

  const toggleSize = (size: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a, b) => a - b),
    }));
  };

  return (
    <div className="min-h-screen bg-surface-primary">
      <Navbar />

      <div className="pt-28 lg:pt-32 pb-20">
        <div className="container-showroom">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-heading text-white/40 hover:text-white/60 transition-colors mb-4"
              >
                <ArrowLeft size={16} />
                Showroom'a Dön
              </Link>
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                Admin Panel
              </h1>
              <p className="text-white/40 font-body">
                Showroom koleksiyonunu yönetin
              </p>
            </div>
            <button
              onClick={() => handleOpenForm()}
              className="btn-primary"
            >
              <Plus size={18} />
              Yeni Ayakkabı Ekle
            </button>
          </div>

          {/* Shoe List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoes.map((shoe, index) => (
              <motion.div
                key={shoe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl bg-surface-secondary border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={shoe.images[0]}
                    alt={shoe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-heading text-white/40 mb-1">{shoe.category}</p>
                      <h3 className="text-lg font-heading font-bold text-white truncate">
                        {shoe.name}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      {shoe.isNew && (
                        <span className="tag-accent text-[9px]">Yeni</span>
                      )}
                      {shoe.isFeatured && (
                        <span className="tag text-[9px]">Öne Çıkan</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenForm(shoe)}
                      className="flex-1 btn-ghost text-sm py-2"
                    >
                      <Edit2 size={14} />
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(shoe.id)}
                      className="btn-icon bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {shoes.length === 0 && (
            <div className="text-center py-20 rounded-2xl border border-white/5 bg-white/[0.02]">
              <p className="text-white/40 font-body text-lg mb-4">Henüz ayakkabı eklenmemiş.</p>
              <button onClick={() => handleOpenForm()} className="btn-primary">
                <Plus size={18} />
                İlk Ayakkabıyı Ekle
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-surface-secondary rounded-3xl border border-white/10 shadow-2xl my-8"
            >
              {/* Form Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-2xl font-heading font-bold text-white">
                  {editingId ? 'Ayakkabıyı Düzenle' : 'Yeni Ayakkabı Ekle'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="btn-icon"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60 flex items-center gap-2">
                    <Tag size={14} />
                    Temel Bilgiler
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body text-white/60 mb-2">Ayakkabı Adı *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateFormField('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="Monarch Elite"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/60 mb-2">Alt Başlık *</label>
                      <input
                        type="text"
                        required
                        value={formData.subtitle}
                        onChange={(e) => updateFormField('subtitle', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="El Yapımı İtalyan Oxford"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-body text-white/60 mb-2">Kategori *</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => updateFormField('category', e.target.value as ShoeCategory)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cognac-400 focus:outline-none transition-colors"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-body text-white/60 mb-2">Koleksiyon *</label>
                      <input
                        type="text"
                        required
                        value={formData.collection}
                        onChange={(e) => updateFormField('collection', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="Artisan Heritage"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body text-white/60 mb-2">Kısa Açıklama *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => updateFormField('description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors resize-none"
                      placeholder="Modern yöneticiler için el yapımı İtalyan deri oxford..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-body text-white/60 mb-2">Detaylı Açıklama</label>
                    <textarea
                      value={formData.longDescription}
                      onChange={(e) => updateFormField('longDescription', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors resize-none"
                      placeholder="Monarch Elite, yüzyıllık İtalyan zanaatkarlığının..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => updateFormField('isNew', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cognac-400 focus:ring-cognac-400"
                      />
                      <span className="text-sm font-body text-white/60">Yeni Ürün</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => updateFormField('isFeatured', e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cognac-400 focus:ring-cognac-400"
                      />
                      <span className="text-sm font-body text-white/60">Öne Çıkan</span>
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60 flex items-center gap-2">
                      <ImageIcon size={14} />
                      Görseller (En az 1)
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayItem('images')}
                      className="text-xs btn-ghost py-1.5 px-3"
                    >
                      <Plus size={12} />
                      Görsel Ekle
                    </button>
                  </div>
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="url"
                        value={img}
                        onChange={(e) => updateArrayItem('images', idx, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="https://images.unsplash.com/..."
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('images', idx)}
                          className="btn-icon bg-red-500/10 border-red-500/20 text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60 flex items-center gap-2">
                      <Palette size={14} />
                      Renkler
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayItem('colors')}
                      className="text-xs btn-ghost py-1.5 px-3"
                    >
                      <Plus size={12} />
                      Renk Ekle
                    </button>
                  </div>
                  {formData.colors.map((color, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={color.name}
                        onChange={(e) => updateColorItem(idx, 'name', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="Konyak"
                      />
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColorItem(idx, 'hex', e.target.value)}
                        className="w-16 h-12 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
                      />
                      {formData.colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('colors', idx)}
                          className="btn-icon bg-red-500/10 border-red-500/20 text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Color Families */}
                  <div>
                    <label className="block text-sm font-body text-white/60 mb-3">Renk Aileleri *</label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_FAMILIES.map(family => (
                        <button
                          key={family}
                          type="button"
                          onClick={() => toggleColorFamily(family)}
                          className={`px-4 py-2 rounded-xl text-sm font-heading transition-all ${
                            formData.colorFamily.includes(family)
                              ? 'bg-cognac-400/20 border-cognac-400 text-cognac-400'
                              : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                          } border`}
                        >
                          {family}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-4">
                  <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60">
                    Numaralar *
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 14 }, (_, i) => i + 36).map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`w-12 h-12 rounded-xl text-sm font-heading transition-all ${
                          formData.sizes.includes(size)
                            ? 'bg-cognac-400/20 border-cognac-400 text-cognac-400'
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                        } border`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60">
                      Özellikler
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayItem('features')}
                      className="text-xs btn-ghost py-1.5 px-3"
                    >
                      <Plus size={12} />
                      Özellik Ekle
                    </button>
                  </div>
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateArrayItem('features', idx, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="Blake Dikiş Yapısı"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('features', idx)}
                          className="btn-icon bg-red-500/10 border-red-500/20 text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Materials */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-heading font-semibold tracking-[0.2em] uppercase text-white/60">
                      Malzemeler
                    </h3>
                    <button
                      type="button"
                      onClick={() => addArrayItem('materials')}
                      className="text-xs btn-ghost py-1.5 px-3"
                    >
                      <Plus size={12} />
                      Malzeme Ekle
                    </button>
                  </div>
                  {formData.materials.map((material, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => updateArrayItem('materials', idx, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-cognac-400 focus:outline-none transition-colors"
                        placeholder="Tam Tahıllı İtalyan Dana Derisi"
                      />
                      {formData.materials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('materials', idx)}
                          className="btn-icon bg-red-500/10 border-red-500/20 text-red-400"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 btn-ghost"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    <Save size={18} />
                    {editingId ? 'Güncelle' : 'Kaydet'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
