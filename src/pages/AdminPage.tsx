import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useShoes } from '../context/ShoeContext';
import { Trash2, Plus, Image as ImageIcon, X, Save, Palette, List } from 'lucide-react';
import { Shoe, ShoeColor } from '../types/shoe';

export const AdminPage: React.FC = () => {
  const { shoes, addShoe, deleteShoe } = useShoes();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Complex form state
  const [formData, setFormData] = useState<Partial<Shoe>>({
    name: '',
    category: '',
    price: 0,
    description: '',
    longDescription: '',
    images: [''],
    colors: [],
    sizes: [40, 41, 42, 43, 44],
    features: ['']
  });

  // Helper for array inputs
  const handleImageChange = (idx: number, val: string) => {
    const newImages = [...(formData.images || [])];
    newImages[idx] = val;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => setFormData({ ...formData, images: [...(formData.images || []), ''] });

  const handleFeatureChange = (idx: number, val: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[idx] = val;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeatureField = () => setFormData({ ...formData, features: [...(formData.features || []), ''] });

  // Color management
  const [tempColor, setTempColor] = useState<ShoeColor>({ name: '', hex: '#000000' });
  const addColor = () => {
    if (tempColor.name) {
      setFormData({ ...formData, colors: [...(formData.colors || []), tempColor] });
      setTempColor({ name: '', hex: '#000000' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.images?.[0]) return;
    
    // Filter empty values
    const cleanData = {
      ...formData,
      images: formData.images.filter(i => i.trim() !== ''),
      features: formData.features?.filter(f => f.trim() !== ''),
    } as Omit<Shoe, 'id' | 'createdAt'>;

    addShoe(cleanData);
    setIsPanelOpen(false);
    // Reset form
    setFormData({
      name: '',
      category: '',
      price: 0,
      description: '',
      longDescription: '',
      images: [''],
      colors: [],
      sizes: [40, 41, 42, 43, 44],
      features: ['']
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Envanter Yönetimi</h1>
            <p className="text-gray-500 mt-1">Dijital vitrininizi buradan yönetin.</p>
          </div>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg shadow-black/10"
          >
            <Plus size={20} />
            Yeni Ürün Ekle
          </button>
        </div>

        {/* Product Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider w-24">Görsel</th>
                  <th className="py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ürün Detayları</th>
                  <th className="py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Kategori</th>
                  <th className="py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Fiyat</th>
                  <th className="py-5 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shoes.map((shoe) => (
                  <tr key={shoe.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-100">
                        <img 
                          src={shoe.images[0]} 
                          alt={shoe.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{shoe.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{shoe.description}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        {shoe.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-gray-600">
                      ₺{(shoe.price || 0).toLocaleString('tr-TR')}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => deleteShoe(shoe.id)}
                        className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {shoes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-gray-400">
                      Henüz ürün eklenmemiş. Sağ üstteki butondan yeni bir ürün ekleyin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-over Panel */}
      {isPanelOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setIsPanelOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-[70] overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Yeni Koleksiyon Parçası</h2>
                <button 
                  onClick={() => setIsPanelOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4">Temel Bilgiler</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                        placeholder="Örn: Monarch Elite"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      >
                        <option value="">Seçiniz</option>
                        <option value="Formal">Formal</option>
                        <option value="Casual">Casual</option>
                        <option value="Sport">Sport</option>
                        <option value="Boots">Boots</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Description */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4">Hikaye & Detaylar</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama (Kart Görünümü)</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detaylı Açıklama (Ürün Sayfası)</label>
                    <textarea
                      rows={4}
                      value={formData.longDescription}
                      onChange={e => setFormData({...formData, longDescription: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </section>

                {/* Images */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4 flex items-center gap-2">
                    <ImageIcon size={16} /> Görseller
                  </h3>
                  {formData.images?.map((url, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={e => handleImageChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addImageField} className="text-sm text-blue-600 font-medium hover:underline">+ Başka Görsel Ekle</button>
                </section>

                {/* Features */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4 flex items-center gap-2">
                    <List size={16} /> Özellikler
                  </h3>
                  {formData.features?.map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={e => handleFeatureChange(idx, e.target.value)}
                        className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Örn: Hakiki Deri"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addFeatureField} className="text-sm text-blue-600 font-medium hover:underline">+ Özellik Ekle</button>
                </section>

                {/* Colors */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b pb-2 mb-4 flex items-center gap-2">
                    <Palette size={16} /> Renk Seçenekleri
                  </h3>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500">Renk Adı</label>
                      <input
                        type="text"
                        value={tempColor.name}
                        onChange={e => setTempColor({...tempColor, name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                        placeholder="Örn: Gece Mavisi"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Renk</label>
                      <input
                        type="color"
                        value={tempColor.hex}
                        onChange={e => setTempColor({...tempColor, hex: e.target.value})}
                        className="h-10 w-20 rounded cursor-pointer"
                      />
                    </div>
                    <button type="button" onClick={addColor} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium">Ekle</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.colors?.map((c, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 pl-2 pr-3 py-1 bg-gray-100 rounded-full text-sm">
                        <span className="w-4 h-4 rounded-full border border-gray-300" style={{backgroundColor: c.hex}} />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="pt-6 border-t flex gap-4 sticky bottom-0 bg-white pb-4">
                  <button
                    type="button"
                    onClick={() => setIsPanelOpen(false)}
                    className="flex-1 px-6 py-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-colors"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 font-bold transition-colors flex items-center justify-center gap-2 shadow-xl shadow-black/20"
                  >
                    <Save size={20} />
                    Koleksiyona Ekle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
