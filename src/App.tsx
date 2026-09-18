import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import TallerProfile from './pages/TallerProfile';
import RegistroPage from './pages/Registro';
import RepuestosPage from './pages/Repuestos';
import AdminPage from './pages/Admin';

// ============================================
// APP PRINCIPAL - TALLERYA
// "Llegamos hasta donde más lo necesites"
// ============================================
const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/taller/:id" element={<TallerProfile />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/repuestos" element={<RepuestosPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
