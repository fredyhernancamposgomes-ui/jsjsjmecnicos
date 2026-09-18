import React, { useState } from 'react';
import { Check, X, Eye, Star } from 'lucide-react';
import { talleres, resenas } from '../data';

// ============================================
// PANEL DE ADMINISTRACIÓN - Premium
// ============================================
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'talleres' | 'resenas'>('dashboard');

  const totalTalleres = talleres.length;
  const talleresVerificados = talleres.filter(t => t.verificado).length;
  const talleresPendientes = talleres.filter(t => !t.verificado).length;
  const totalResenas = resenas.length;
  const promedioCalificacion = (talleres.reduce((sum, t) => sum + t.calificacion, 0) / talleres.length).toFixed(1);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
            Administración
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight">
            Panel.
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 p-1 bg-ink-soft border border-line-soft rounded-xl w-fit">
          {[
            { id: 'dashboard' as const, label: 'Dashboard' },
            { id: 'talleres' as const, label: 'Talleres' },
            { id: 'resenas' as const, label: 'Reseñas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-ink text-bone'
                  : 'text-smoke hover:text-bone'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden">
              <StatCard label="Talleres" value={totalTalleres.toString()} />
              <StatCard label="Verificados" value={talleresVerificados.toString()} accent="success" />
              <StatCard label="Pendientes" value={talleresPendientes.toString()} accent="ember" />
              <StatCard label="Calificación" value={promedioCalificacion} accent="ember" />
            </div>

            {/* Chart */}
            <div className="bg-ink-soft rounded-2xl border border-line-soft p-8">
              <h3 className="text-bone font-display font-semibold mb-8">Registros mensuales</h3>
              <div className="h-48 flex items-end justify-between gap-3">
                {[3, 5, 8, 12, 15, totalTalleres].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <div
                      className="w-full bg-ember/20 hover:bg-ember/40 rounded-t transition-colors"
                      style={{ height: `${(val / totalTalleres) * 100}%` }}
                    />
                    <span className="text-xs text-smoke">
                      {['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent */}
            <div className="bg-ink-soft rounded-2xl border border-line-soft overflow-hidden">
              <div className="p-6 border-b border-line-soft">
                <h3 className="text-bone font-display font-semibold">Actividad reciente</h3>
              </div>
              <div className="divide-y divide-line-soft">
                {talleres.slice(0, 5).map((taller) => (
                  <div key={taller.id} className="flex items-center gap-4 p-5 hover:bg-ink transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold text-sm">
                      {taller.nombre.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-bone text-sm font-medium truncate">{taller.nombre}</p>
                      <p className="text-smoke text-xs">{taller.distrito}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      taller.verificado
                        ? 'bg-success/10 text-success'
                        : 'bg-ember/10 text-ember'
                    }`}>
                      {taller.verificado ? 'Activo' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Talleres */}
        {activeTab === 'talleres' && (
          <div className="bg-ink-soft rounded-2xl border border-line-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-line-soft">
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Taller</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">RUC</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Ubicación</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Rating</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Estado</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {talleres.map((taller) => (
                    <tr key={taller.id} className="hover:bg-ink transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember text-xs font-semibold">
                            {taller.nombre.charAt(0)}
                          </div>
                          <span className="text-bone text-sm font-medium">{taller.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-smoke text-sm font-mono">{taller.ruc}</td>
                      <td className="px-6 py-4 text-smoke text-sm">{taller.distrito}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-ember fill-ember" />
                          <span className="text-bone text-sm">{taller.calificacion}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          taller.verificado ? 'bg-success/10 text-success' : 'bg-ember/10 text-ember'
                        }`}>
                          {taller.verificado ? 'Verificado' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 rounded-lg text-smoke hover:text-bone hover:bg-ink transition-colors">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reseñas */}
        {activeTab === 'resenas' && (
          <div className="space-y-3">
            {resenas.map((resena) => {
              const taller = talleres.find(t => t.id === resena.tallerId);
              return (
                <div key={resena.id} className="bg-ink-soft rounded-2xl border border-line-soft p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember text-xs font-semibold">
                          {resena.clienteNombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-bone text-sm font-medium">{resena.clienteNombre}</p>
                          <p className="text-smoke text-xs">{taller?.nombre} · {new Date(resena.fecha).toLocaleDateString('es-PE', { month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(resena.calificacion)].map((_, i) => (
                          <Star key={i} size={12} className="text-ember fill-ember" />
                        ))}
                      </div>
                      <p className="text-ash text-sm leading-relaxed">{resena.comentario}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                        <Check size={14} />
                      </button>
                      <button className="p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  accent?: 'ember' | 'success';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, accent }) => (
  <div className="bg-ink p-6">
    <p className="text-xs text-smoke uppercase tracking-wider mb-3">{label}</p>
    <p className={`font-display text-3xl font-semibold tracking-tight ${
      accent === 'ember' ? 'text-ember' : accent === 'success' ? 'text-success' : 'text-bone'
    }`}>
      {value}
    </p>
  </div>
);

export default AdminPage;
