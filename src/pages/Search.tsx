import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, CheckCircle, Filter, X, Wrench, Phone } from 'lucide-react';
import { talleres, SERVICIOS, departamentos, DISTRITOS_LIMA } from '../data';

// ============================================
// PÁGINA DE BÚSQUEDA DE TALLERES
// ============================================
const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [ubicacion, setUbicacion] = useState(searchParams.get('ubicacion') || '');
  const [servicio, setServicio] = useState(searchParams.get('servicio') || '');
  const [calificacionMin, setCalificacionMin] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTalleres = useMemo(() => {
    return talleres.filter((taller) => {
      if (ubicacion && taller.departamento !== ubicacion) return false;
      if (servicio && !taller.servicios.includes(servicio)) return false;
      if (calificacionMin && taller.calificacion < calificacionMin) return false;
      return true;
    });
  }, [ubicacion, servicio, calificacionMin]);

  const clearFilters = () => {
    setUbicacion('');
    setServicio('');
    setCalificacionMin(0);
  };

  const hasFilters = ubicacion || servicio || calificacionMin > 0;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white mb-2">
            Buscar Taller
          </h1>
          <p className="text-gray-400">
            Encuentra el taller perfecto para tu vehículo
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Ubicación */}
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value="">📍 Departamento</option>
                {departamentos.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Servicio */}
            <div className="relative">
              <Wrench size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value="">🔧 Servicio</option>
                {SERVICIOS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Calificación mínima */}
            <div className="relative">
              <Star size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={calificacionMin}
                onChange={(e) => setCalificacionMin(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value={0}>⭐ Calificación mín.</option>
                <option value={3}>3+ estrellas</option>
                <option value={4}>4+ estrellas</option>
                <option value={4.5}>4.5+ estrellas</option>
              </select>
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B00] text-white font-semibold rounded-xl hover:bg-[#E55E00] transition-colors md:hidden"
            >
              <Filter size={16} />
              Filtros
            </button>
          </div>

          {/* Active filters */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <span className="text-gray-500 text-sm">Filtros activos:</span>
              {ubicacion && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium rounded-full">
                  {ubicacion}
                  <button onClick={() => setUbicacion('')}><X size={12} /></button>
                </span>
              )}
              {servicio && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium rounded-full">
                  {servicio}
                  <button onClick={() => setServicio('')}><X size={12} /></button>
                </span>
              )}
              {calificacionMin > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium rounded-full">
                  {calificacionMin}+ estrellas
                  <button onClick={() => setCalificacionMin(0)}><X size={12} /></button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-white text-xs underline ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            <span className="text-white font-semibold">{filteredTalleres.length}</span> talleres encontrados
          </p>
        </div>

        {/* Results Grid */}
        {filteredTalleres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalleres.map((taller) => (
              <TallerCard key={taller.id} taller={taller} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1F1F1F] flex items-center justify-center">
              <Search size={32} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron talleres</h3>
            <p className="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#FF6B00] text-white font-semibold rounded-xl hover:bg-[#E55E00] transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// TALLER CARD COMPONENT
// ============================================
interface TallerCardProps {
  taller: typeof talleres[0];
}

const TallerCard: React.FC<TallerCardProps> = ({ taller }) => {
  return (
    <Link
      to={`/taller/${taller.id}`}
      className="group bg-[#1F1F1F] rounded-2xl border border-white/5 hover:border-[#FF6B00]/30 transition-all duration-300 overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="relative h-40 bg-gradient-to-br from-[#1F1F1F] to-[#2a2a2a] flex items-center justify-center overflow-hidden">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
          {taller.nombre.charAt(0)}
        </div>
        {taller.verificado && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-[#2E7D32]/90 rounded-full">
            <CheckCircle size={12} className="text-white" />
            <span className="text-white text-xs font-medium">Verificado</span>
          </div>
        )}
        {taller.distancia && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/70 rounded-full">
            <MapPin size={12} className="text-[#FF6B00]" />
            <span className="text-white text-xs">{taller.distancia}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF6B00] transition-colors">
          {taller.nombre}
        </h3>
        <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
          <MapPin size={12} />
          {taller.distrito}, {taller.departamento}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="text-white font-bold">{taller.calificacion}</span>
          </div>
          <span className="text-gray-500 text-sm">({taller.numResenas} reseñas)</span>
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5">
          {taller.servicios.slice(0, 3).map((servicio) => (
            <span
              key={servicio}
              className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md"
            >
              {servicio}
            </span>
          ))}
          {taller.servicios.length > 3 && (
            <span className="px-2 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs rounded-md">
              +{taller.servicios.length - 3} más
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchPage;
