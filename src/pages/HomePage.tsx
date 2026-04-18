import React from 'react';
import { Navbar } from '../components/Navbar';
import { ShoeCard } from '../components/ShoeCard';
import { HeroSlider } from '../components/HeroSlider';
import { useShoes } from '../context/ShoeContext';

export const HomePage: React.FC = () => {
  const { shoes } = useShoes();

  // Sort by newest for the grid, maybe take top 3 for slider
  const sortedShoes = [...shoes].sort((a, b) => b.createdAt - a.createdAt);
  const sliderShoes = sortedShoes.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <HeroSlider featuredShoes={sliderShoes} />

      {/* Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Küratörün Seçimi</h2>
            <p className="text-lg text-gray-500">
              Estetik ve fonksiyonun mükemmel uyumu. Her bir parça, modern yaşamın ritmine ayak uydurmak için tasarlandı.
            </p>
          </div>
          <div className="text-sm font-medium px-4 py-2 bg-gray-100 rounded-full text-gray-600">
            {shoes.length} Eşsiz Tasarım
          </div>
        </div>

        {shoes.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">Henüz vitrinde ürün yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {sortedShoes.map((shoe, index) => (
              <ShoeCard key={shoe.id} shoe={shoe} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
