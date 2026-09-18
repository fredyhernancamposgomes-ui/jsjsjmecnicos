import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Star, ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { talleres, SERVICIOS, departamentos } from '../data';

// ============================================
// PÁGINA DE BÚSQUEDA - Diseño limpio
// ============================================
const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [ubicacion, setUbicacion] = useState(searchParams.get('ubicacion') || '');
  const [servicio, setServicio] = useState(searchParams.get('servicio') || '');
  const [calificacionMin, setCalificacionMin] = useState(0);

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
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
            Explorar
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight mb-4">
            Encuentra tu taller.
          </h1>
          <p className="text-lg text-ash">
            Talleres verificados y calificados por la comunidad.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-10 border-b border-line-soft">
          <select
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="px-4 py-2.5 bg-ink-soft border border-line rounded-lg text-bone text-sm focus:outline-none focus:border-ember transition-colors appearance-none cursor-pointer"
          >
            <option value="">Todas las ubicaciones</option>
            {departamentos.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className="px-4 py-2.5 bg-ink-soft border border-line rounded-lg text-bone text-sm focus:outline-none focus:border-ember transition-colors appearance-none cursor-pointer"
          >
            <option value="">Todos los servicios</option>
            {SERVICIOS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={calificacionMin}
            onChange={(e) => setCalificacionMin(Number(e.target.value))}
            className="px-4 py-2.5 bg-ink-soft border border-line rounded-lg text-bone text-sm focus:outline-none focus:border-ember transition-colors appearance-none cursor-pointer"
          >
            <option value={0}>Cualquier calificación</option>
            <option value={4}>4+ estrellas</option>
            <option value={4.5}>4.5+ estrellas</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-smoke hover:text-bone transition-colors flex items-center gap-1"
            >
              <X size={14} />
              Limpiar
            </button>
          )}

          <div className="ml-auto text-sm text-smoke">
            <span className="text-bone font-medium">{filteredTalleres.length}</span> resultados
          </div>
        </div>

        {/* Results */}
        {filteredTalleres.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden">
            {filteredTalleres.map((taller) => (
              <TallerCard key={taller.id} taller={taller} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-ash text-lg mb-2">No se encontraron talleres</p>
            <p className="text-smoke text-sm mb-6">Intenta ajustar los filtros de búsqueda</p>
            <button
              onClick={clearFilters}
              className="text-sm text-ember hover:text-ember-soft transition-colors"
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
// TALLER CARD - Diseño minimalista
// ============================================
interface TallerCardProps {
  taller: typeof talleres[0];
}

const TallerCard: React.FC<TallerCardProps> = ({ taller }) => {
  return (
    <Link
      to={`/taller/${taller.id}`}
      className="group bg-ink p-8 hover:bg-ink-soft transition-colors"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-11 h-11 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold">
          {taller.nombre.charAt(0)}
        </div>
        <div className="flex items-center gap-3">
          {taller.verificado && (
            <span className="text-xs text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Verificado
            </span>
          )}
          <div className="flex items-center gap-1">
            <Star size={13} className="text-ember fill-ember" />
            <span className="text-xs text-bone font-medium">{taller.calificacion}</span>
          </div>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-bone mb-1.5 group-hover:text-ember transition-colors tracking-tight">
        {taller.nombre}
      </h3>
      <p className="text-sm text-smoke mb-5 flex items-center gap-1.5">
        <MapPin size={12} />
        {taller.distrito}, {taller.departamento}
        {taller.distancia && <span className="text-fog">· {taller.distancia}</span>}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {taller.servicios.slice(0, 2).map((s) => (
          <span key={s} className="text-xs text-ash px-2 py-1 bg-ink-muted rounded border border-line-soft">
            {s}
          </span>
        ))}
        {taller.servicios.length > 2 && (
          <span className="text-xs text-smoke px-2 py-1">
            +{taller.servicios.length - 2}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-line-soft">
        <span className="text-xs text-smoke">{taller.numResenas} reseñas</span>
        <ArrowUpRight size={14} className="text-smoke group-hover:text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
};

export default SearchPage;
