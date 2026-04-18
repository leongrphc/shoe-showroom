import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield } from 'lucide-react';
import { useShoes } from '../context/ShoeContext';
import { Navbar } from '../components/Navbar';

export const ShoeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getShoe } = useShoes();
  const shoe = getShoe(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (!shoe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h2>
          <Link to="/" className="text-blue-600 hover:underline">Ana Sayfaya Dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Koleksiyona Dön
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/5] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-lg relative"
            >
              <img 
                src={shoe.images[selectedImage] || shoe.images[0]} 
                alt={shoe.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex gap-4 overflow-x-auto pb-2">
              {shoe.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-24 aspect-square flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${shoe.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider text-gray-900">
                  {shoe.category}
                </span>
                <span className="text-xl font-medium text-gray-900">
                  ₺{(shoe.price || 0).toLocaleString('tr-TR')}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-gray-900 leading-tight">
                {shoe.name}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {shoe.longDescription || shoe.description}
              </p>

              {/* Colors */}
              {shoe.colors && shoe.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-900">Mevcut Renkler</h3>
                  <div className="flex gap-4">
                    {shoe.colors.map((color, idx) => (
                      <div key={idx} className="group cursor-pointer">
                        <div 
                          className="w-10 h-10 rounded-full border border-gray-200 shadow-sm mb-2 mx-auto"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs text-gray-500 group-hover:text-black transition-colors">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {shoe.sizes && shoe.sizes.length > 0 && (
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Numara Seçimi</h3>
                    <button className="text-xs text-gray-500 underline">Beden Tablosu</button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {shoe.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-12 rounded-lg border flex items-center justify-center font-medium transition-all ${
                          selectedSize === size 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-900 border-gray-200 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {shoe.features && shoe.features.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-10">
                  <ul className="space-y-3">
                    {shoe.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Check size={18} className="text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto">
                <button 
                  disabled
                  className="w-full bg-gray-900 text-white py-5 rounded-xl text-lg font-bold hover:bg-black transition-colors disabled:opacity-90 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <Shield size={20} />
                  Sadece Sergileme Amaçlıdır
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Bu ürün şu anda mağazalarımızda incelenebilir. Online satış kapalıdır.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
