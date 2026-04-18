import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShoeProvider } from './context/ShoeContext';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ShoeDetailPage } from './pages/ShoeDetailPage';
import { useEffect } from 'react';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ShoeProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/shoe/:id" element={<ShoeDetailPage />} />
        </Routes>
      </ShoeProvider>
    </BrowserRouter>
  );
};

export default App;
