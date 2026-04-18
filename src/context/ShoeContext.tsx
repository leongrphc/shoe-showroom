import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Shoe, ShoeContextType, ColorFamily, ShoeCategory } from '../types/shoe';
import { validateShoeArray, safeJSONParse } from '../utils/validation';

const ShoeContext = createContext<ShoeContextType | undefined>(undefined);

const SHOWROOM_CATALOG: Shoe[] = [
  {
    id: 'monarch-elite',
    name: 'Monarch Elite',
    subtitle: 'El Yapımı İtalyan Oxford',
    category: 'Formal',
    description: 'Modern yöneticiler için el yapımı İtalyan deri oxford. Floransa atölyelerinden doğrudan vitrininize.',
    longDescription: 'Monarch Elite, yüzyıllık İtalyan zanaatkarlığının modern estetikle buluştuğu noktadır. Her bir çift, Floransa\'daki atölyemizde usta zanaatkarlar tarafından 48 saatte tamamlanır. Tam tahıllı dana derisi, zamanla benzersiz bir patina kazanır ve sahibine özel bir karakter sunar. Blake dikiş yapısı sayesinde taban ince ve esnek kalırken, deri astar ayağın nefes almasını sağlar. İç taban, anatomik olarak şekillendirilmiş mantar yatak üzerine oturur.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478186111890-6eb32f66f556?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Konyak', hex: '#8B4513' },
      { name: 'Gece Siyahı', hex: '#1a1a1a' },
    ],
    colorFamily: ['brown', 'black'],
    sizes: [40, 41, 42, 43, 44, 45],
    features: ['Blake Dikiş Yapısı', 'Deri Taban', 'Nefes Alan Astar', 'Anatomik İç Taban'],
    materials: ['Tam Tahıllı İtalyan Dana Derisi', 'Doğal Mantar Yatak', 'Deri Taban'],
    collection: 'Artisan Heritage',
    isNew: false,
    isFeatured: true,
    createdAt: Date.now(),
  },
  {
    id: 'velocity-runner',
    name: 'Velocity Runner',
    subtitle: 'Performans Koşu Ayakkabısı',
    category: 'Sport',
    description: 'Hafif, tepkisel yastıklamalı performans ayakkabısı. Şehrin ritminde koşanlar için.',
    longDescription: 'Velocity Runner ile sınırları zorlayın. Patentli CloudFoam taban teknolojisi, her adımda enerji geri dönüşümü sağlar. 4D örgü üst yüzey ayağı çorap gibi sarar ve maksimum nefes alabilirlik sunar. Gece koşucuları için 360° reflektif detaylar, karanlıkta görünürlüğü artırır. Sadece 220 gram ağırlığıyla, ayağınızda olmadığını unutacaksınız.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Neon Kırmızı', hex: '#FF3333' },
      { name: 'Buz Mavisi', hex: '#87CEEB' },
    ],
    colorFamily: ['red', 'blue'],
    sizes: [38, 39, 40, 41, 42, 43, 44],
    features: ['CloudFoam Taban', '4D Örgü Üst Yüzey', '360° Reflektif Detaylar', '220g Ultra Hafif'],
    materials: ['Recycled Mesh Üst Yüzey', 'CloudFoam EVA Taban', 'Kauçuk Dış Taban'],
    collection: 'Motion Lab',
    isNew: true,
    isFeatured: true,
    createdAt: Date.now() - 1000,
  },
  {
    id: 'urban-drifter',
    name: 'Urban Drifter',
    subtitle: 'Minimalist Süet Loafer',
    category: 'Casual',
    description: 'Şehir konforu için tasarlanmış minimalist süet loafer. Sadeliğin zarafeti.',
    longDescription: 'Şehrin karmaşasında sadeliği arayanlar için. Urban Drifter, yumuşak süet dokusu ve esnek tabanı ile gün boyu konfor sunar. Su itici nano kaplama, beklenmedik yağmurlardan korur. Ortopedik iç taban, uzun yürüyüşlerde bile ayağı destekler. Hem ofis hem de hafta sonu kullanımı için ideal olan bu loafer, gardırobunuzun vazgeçilmezi olacak.',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616406432452-07bc59c65c38?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Kum Beji', hex: '#C2A878' },
      { name: 'Lacivert', hex: '#1B2A4A' },
      { name: 'Haki', hex: '#556B2F' },
    ],
    colorFamily: ['beige', 'blue', 'green'],
    sizes: [40, 41, 42, 43, 44],
    features: ['Ortopedik İç Taban', 'Kaymaz Kauçuk Taban', 'Nano Su İtici Kaplama', 'Esnek Yapı'],
    materials: ['Premium Süet Deri', 'Memory Foam İç Taban', 'Doğal Kauçuk Taban'],
    collection: 'City Essentials',
    isNew: false,
    isFeatured: true,
    createdAt: Date.now() - 2000,
  },
  {
    id: 'shadow-walker',
    name: 'Shadow Walker',
    subtitle: 'Gotik Deri Bot',
    category: 'Boots',
    description: 'Cesur ruhlar için. Tam tahıllı siyah deriden üretilmiş, karakterli Chelsea bot.',
    longDescription: 'Shadow Walker, klasik Chelsea bot silüetini modern bir yorumla yeniden tanımlar. Tam tahıllı mat siyah deri, Goodyear welt dikişle tabanla birleşir — bu, tabanın değiştirilebilir olduğu ve botun ömür boyu süreceği anlamına gelir. Komando tipi kauçuk taban, her zeminde güvenli yürüyüş sağlar. Elastik yan paneller kolay giyimi mümkün kılarken, yuvarlak burun formu hem rahatlık hem de karakter sunar.',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Obsidyen Siyah', hex: '#0d0d0d' },
      { name: 'Bordo', hex: '#4A0E0E' },
    ],
    colorFamily: ['black', 'red'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    features: ['Goodyear Welt Dikiş', 'Komando Taban', 'Elastik Yan Panel', 'Değiştirilebilir Taban'],
    materials: ['Full-Grain Mat Deri', 'Commando Kauçuk Taban', 'Deri Astar'],
    collection: 'Dark Craft',
    isNew: true,
    isFeatured: false,
    createdAt: Date.now() - 3000,
  },
  {
    id: 'cloud-stride',
    name: 'Cloud Stride',
    subtitle: 'Günlük Yürüyüş Sneaker',
    category: 'Sport',
    description: 'Bulutların üzerinde yürümek. Ultra yumuşak taban ve nefes alan mesh yapı.',
    longDescription: 'Cloud Stride, günlük yürüyüşlerinizi bir keyfe dönüştürür. Çift katmanlı ZeroGravity köpük taban, adımlarınızı yumuşatırken enerji geri dönüşümü sağlar. Tek parça örgü üst yüzey, ayağa çorap gibi oturur ve dikişsiz iç yapı sürtünmeyi ortadan kaldırır. Minimalist beyaz tasarımı, her kombinle uyum sağlar.',
    images: [
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Saf Beyaz', hex: '#FAFAFA' },
      { name: 'Krem', hex: '#F5F0E8' },
    ],
    colorFamily: ['white', 'beige'],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: ['ZeroGravity Köpük Taban', 'Dikişsiz İç Yapı', 'Tek Parça Örgü Üst', 'Slip-On Tasarım'],
    materials: ['Recycled Knit Mesh', 'ZeroGravity EVA Foam', 'Kauçuk Dış Taban'],
    collection: 'Motion Lab',
    isNew: true,
    isFeatured: true,
    createdAt: Date.now() - 4000,
  },
  {
    id: 'terra-expedition',
    name: 'Terra Expedition',
    subtitle: 'Outdoor Trekking Botu',
    category: 'Boots',
    description: 'Doğanın her koşuluna hazır. Su geçirmez membran ve Vibram taban.',
    longDescription: 'Terra Expedition, dağ yollarından şehir sokaklarına uzanan çok yönlü bir outdoor bot. Gore-Tex su geçirmez ve nefes alabilir membran, ayakları kuru tutar. Vibram Megagrip taban, ıslak kayalar ve çamurlu patikalarda bile üstün tutuş sağlar. Nubuk deri üst yüzey, dayanıklılığı ve estetiği bir arada sunar. Ayak bileğini saran yüksek yaka, engebeli arazilerde destek ve koruma sağlar.',
    images: [
      'https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Toprak Kahve', hex: '#6B4226' },
      { name: 'Orman Yeşili', hex: '#2D4A22' },
    ],
    colorFamily: ['brown', 'green'],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    features: ['Gore-Tex Membran', 'Vibram Megagrip Taban', 'Ayak Bileği Desteği', 'Speed Lacing Sistemi'],
    materials: ['Premium Nubuk Deri', 'Gore-Tex Membran', 'Vibram Kauçuk Taban'],
    collection: 'Wild Terrain',
    isNew: false,
    isFeatured: false,
    createdAt: Date.now() - 5000,
  },
  {
    id: 'nocturne-derby',
    name: 'Nocturne Derby',
    subtitle: 'Akşam Derisi Derby',
    category: 'Formal',
    description: 'Gece davetlerinin yıldızı. Parlak rugan detaylı, zarif derby silüeti.',
    longDescription: 'Nocturne Derby, özel akşamlar için tasarlanmış bir şaheserdir. Parlak rugan burun detayı, mat siyah dana derisiyle kontrastlı bir görünüm yaratır. İtalyan yapım geleneğinin en ince detaylarıyla işlenmiş bu derby, smokin ve takım elbise ile mükemmel uyum sağlar. Deri taban üzerindeki kauçuk enjeksiyon, kaygan zeminlerde güvenlik sunar. İpek astar, ayağa lüks bir dokunuş hissi verir.',
    images: [
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Parlak Siyah', hex: '#0a0a0a' },
    ],
    colorFamily: ['black'],
    sizes: [40, 41, 42, 43, 44, 45],
    features: ['Rugan Detay', 'İpek Astar', 'Kaymaz Deri Taban', 'Hand-Burnished Finish'],
    materials: ['Patent Rugan', 'Dana Derisi', 'İpek Astar', 'Deri + Kauçuk Taban'],
    collection: 'Artisan Heritage',
    isNew: false,
    isFeatured: false,
    createdAt: Date.now() - 6000,
  },
  {
    id: 'zephyr-knit',
    name: 'Zephyr Knit',
    subtitle: 'Teknik Örgü Sneaker',
    category: 'Casual',
    description: 'Rüzgâr gibi hafif. 3D örgü teknolojisiyle üretilmiş şehir sneaker\'ı.',
    longDescription: 'Zephyr Knit, ileri teknoloji 3D örgü yapısını günlük kullanılabilirlikle buluşturur. Bilgisayar kontrollü örgü makineleri, ayağın farklı bölgeleri için farklı yoğunluklarda dokuma yapar — nefes alması gereken yerde gevşek, destek gereken yerde sıkı. Çıkarılabilir ortopedik iç taban, farklı ayak formlarına uyum sağlar. Geri dönüştürülmüş malzemelerden üretilen taban, sürdürülebilirlik taahhüdümüzün bir yansımasıdır.',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Gri Melanj', hex: '#808080' },
      { name: 'Okyanus Mavi', hex: '#1E6B8C' },
      { name: 'Antrasit', hex: '#383838' },
    ],
    colorFamily: ['grey', 'blue', 'black'],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    features: ['3D Bilgisayarlı Örgü', 'Çıkarılabilir İç Taban', 'Geri Dönüştürülmüş Taban', '180g Ağırlık'],
    materials: ['Recycled 3D Knit', 'Ortopedik Memory Foam', 'Recycled EVA Taban'],
    collection: 'City Essentials',
    isNew: true,
    isFeatured: false,
    createdAt: Date.now() - 7000,
  },
  {
    id: 'sahara-moccasin',
    name: 'Sahara Moccasin',
    subtitle: 'El Dikişi Mokasen',
    category: 'Casual',
    description: 'Akdeniz zanaatkarlığının özü. El dikişi, yumuşak deri mokasen.',
    longDescription: 'Sahara Moccasin, Akdeniz kıyılarının gevşek zarafetini ayaklarınıza taşır. Her çift, ustanın ellerinde tek tek dikilerek tamamlanır — makine dikişi kullanılmaz. Nappa deri, tereyağı gibi yumuşak bir dokuya sahiptir ve ayağı sıkmadan sarar. Kauçuk topuk detaylı deri taban, şehir yürüyüşlerinde dayanıklılık sunarken, geleneksel mokasen konforunu korur.',
    images: [
      'https://images.unsplash.com/photo-1613987876445-fcb353cd8e27?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Bal', hex: '#B8860B' },
      { name: 'Ten', hex: '#D2A679' },
    ],
    colorFamily: ['brown', 'beige'],
    sizes: [40, 41, 42, 43, 44],
    features: ['Tam El Dikişi', 'Nappa Deri', 'Kauçuk Topuk Detayı', 'Unlined Yapı'],
    materials: ['Full-Grain Nappa Deri', 'Deri Taban', 'Doğal Kauçuk Topuk'],
    collection: 'Artisan Heritage',
    isNew: false,
    isFeatured: false,
    createdAt: Date.now() - 8000,
  },
  {
    id: 'apex-trail',
    name: 'Apex Trail',
    subtitle: 'Trail Running Ayakkabısı',
    category: 'Sport',
    description: 'Patikalardan asfalte. Agresif dış taban deseniyle her zeminde tutuş.',
    longDescription: 'Apex Trail, arazi koşucuları için tasarlanmış bir savaşçıdır. 5mm lugged dış taban deseni, çamurda, çakılda ve ıslak kayalarda eşsiz tutuş sağlar. Rock plate teknolojisi, sivri taşlardan ayağı korurken esnekliği korur. Gaiter uyumlu tasarımı, uzun mesafe trail koşularında kum ve çakıl girişini engeller. Ağırlığına rağmen tank gibi dayanıklı — ama bir tüy gibi hissedilir.',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Volkan Grisi', hex: '#4A4A4A' },
      { name: 'Ateş Turuncu', hex: '#E85D2C' },
    ],
    colorFamily: ['grey', 'red'],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    features: ['5mm Lugged Taban', 'Rock Plate Koruma', 'Gaiter Uyumlu', 'Quick-Dry Üst Yüzey'],
    materials: ['Ripstop Mesh', 'TPU Rock Plate', 'Vibram Megagrip Kauçuk'],
    collection: 'Wild Terrain',
    isNew: true,
    isFeatured: true,
    createdAt: Date.now() - 9000,
  },
];

export const ShoeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shoes, setShoes] = useState<Shoe[]>(() => {
    try {
      // sessionStorage kullan (localStorage yerine daha güvenli)
      const stored = sessionStorage.getItem('showroom-shoes');

      if (stored) {
        const parsed = safeJSONParse<Shoe[]>(stored, SHOWROOM_CATALOG);

        // Veri doğrulama
        if (validateShoeArray(parsed)) {
          console.log('✅ Geçerli shoe verisi yüklendi:', parsed.length, 'ürün');
          return parsed;
        } else {
          console.warn('⚠️ Geçersiz shoe verisi, varsayılan katalog yükleniyor');
        }
      }
    } catch (error) {
      console.error('❌ Shoe verisi yükleme hatası:', error);
    }

    return SHOWROOM_CATALOG;
  });

  // sessionStorage'a kaydet
  useEffect(() => {
    try {
      sessionStorage.setItem('showroom-shoes', JSON.stringify(shoes));
    } catch (error) {
      console.error('❌ Shoe verisi kaydetme hatası:', error);
    }
  }, [shoes]);

  const getShoe = (id: string) => shoes.find(s => s.id === id);

  const addShoe = (shoe: Shoe) => {
    setShoes(prev => [...prev, shoe]);
  };

  const deleteShoe = (id: string) => {
    setShoes(prev => prev.filter(s => s.id !== id));
  };

  const filterByColor = (color: ColorFamily | 'all') => {
    if (color === 'all') return shoes;
    return shoes.filter(s => s.colorFamily.includes(color));
  };

  const filterByCategory = (category: ShoeCategory | 'all') => {
    if (category === 'all') return shoes;
    return shoes.filter(s => s.category === category);
  };

  const featuredShoes = useMemo(() => shoes.filter(s => s.isFeatured), [shoes]);
  const newArrivals = useMemo(() => shoes.filter(s => s.isNew), [shoes]);

  return (
    <ShoeContext.Provider value={{
      shoes,
      getShoe,
      addShoe,
      deleteShoe,
      filterByColor,
      filterByCategory,
      featuredShoes,
      newArrivals,
    }}>
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
