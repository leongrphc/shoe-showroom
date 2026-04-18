import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-black text-white p-2 rounded-lg group-hover:bg-gray-800 transition-colors">
              <ShoppingBag size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter">AYAKKABI<span className="text-gray-400">.CO</span></span>
          </Link>

          <div className="flex gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${!isAdmin ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Koleksiyon
            </Link>
            <Link 
              to="/admin" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isAdmin ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              <LayoutDashboard size={16} />
              Yönetim Paneli
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
