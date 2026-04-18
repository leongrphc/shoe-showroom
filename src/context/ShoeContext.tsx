import React, { createContext, useContext, useEffect, useState } from 'react';
import { Shoe, ShoeContextType } from '../types/shoe';

const ShoeContext = createContext<ShoeContextType | undefined>(undefined);

const INITIAL_SHOES: Shoe[] = [
  {
    id: '1',
    name: 'Monarch Elite',
    category: 'Formal',
    price: 4500,
    description: 'Modern yöneticiler için el yapımı İtalyan deri oxford.',
    longDescription: 'Monarch Elite, yüzyıllık İtalyan zanaatkarlığının modern estetikle buluştuğu noktadır. Her bir çift, Floransa\'daki atölyemizde usta zanaatkarlar tarafından 48 saatte tamamlanır. Tam tahıllı deri, zamanla benzersiz bir patina kazanır.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478186111890-6eb32f66f556?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Konyak', hex: '#8B4513' },
      { name: 'Gece Siyahı', hex: '#000000' }
    ],
    sizes: [40, 41, 42, 43, 44, 45],
    features: ['Tam Tahıllı İtalyan Derisi', 'Blake Dikiş Yapısı', 'Deri Taban', 'Nefes Alan Astar'],
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Velocity Runner',
    category: 'Sport',
    price: 3200,
    description: 'Hafif, tepkisel yastıklamalı performans ayakkabısı.',
    longDescription: 'Velocity Runner ile sınırları zorlayın. Patentli CloudFoam taban teknolojisi, her adımda enerji geri dönüşümü sağlar. Örgü üst yüzey ayağı çorap gibi sarar ve maksimum nefes alabilirlik sunar.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Neon Kırmızı', hex: '#FF3333' },
      { name: 'Buz Mavisi', hex: '#E0FFFF' }
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    features: ['CloudFoam Taban', '4D Örgü Üst Yüzey', 'Reflektif Detaylar', '220g Ağırlık'],
    createdAt: Date.now() - 1000,
  },
  {
    id: '3',
    name: 'Urban Drifter',
    category: 'Casual',
    price: 2800,
    description: 'Şehir konforu için tasarlanmış minimalist süet loafer.',
    longDescription: 'Şehrin karmaşasında sadeliği arayanlar için. Urban Drifter, yumuşak süet dokusu ve esnek tabanı ile gün boyu konfor sunar. Hem ofis hem de hafta sonu kullanımı için idealdir.',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616406432452-07bc59c65c38?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Kum Beji', hex: '#F4A460' },
      { name: 'Lacivert', hex: '#000080' },
      { name: 'Haki', hex: '#556B2F' }
    ],
    sizes: [40, 41, 42, 43, 44],
    features: ['Premium Süet', 'Ortopedik İç Taban', 'Kaymaz Kauçuk Taban', 'Su İtici Kaplama'],
    createdAt: Date.now() - 2000,
  }
];

export const ShoeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shoes, setShoes] = useState<Shoe[]>(() => {
    const saved = localStorage.getItem('shoes');
    return saved ? JSON.parse(saved) : INITIAL_SHOES;
  });

  useEffect(() => {
    localStorage.setItem('shoes', JSON.stringify(shoes));
  }, [shoes]);

  const addShoe = (newShoe: Omit<Shoe, 'id' | 'createdAt'>) => {
    const shoe: Shoe = {
      ...newShoe,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setShoes(prev => [shoe, ...prev]);
  };

  const deleteShoe = (id: string) => {
    setShoes(prev => prev.filter(shoe => shoe.id !== id));
  };

  const getShoe = (id: string) => {
    return shoes.find(s => s.id === id);
  }

  // Ensure mock data has valid arrays
  const validatedShoes = shoes.map(s => ({
    ...s,
    images: Array.isArray(s.images) ? s.images : [],
    colors: Array.isArray(s.colors) ? s.colors : [],
    sizes: Array.isArray(s.sizes) ? s.sizes : [],
    features: Array.isArray(s.features) ? s.features : []
  }));

  return (
    <ShoeContext.Provider value={{ shoes: validatedShoes, getShoe, addShoe, deleteShoe }}>
      {children}
    </ShoeContext.Provider>
  );
};

export const useShoes = () => {
  const context = useContext(ShoeContext);
  if (context === undefined) {
    throw new Error('useShoes must be used within a ShoeProvider');
  }
  return context;
};
