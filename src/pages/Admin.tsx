import React, { useState } from 'react';
import { Users, Wrench, Star, TrendingUp, CheckCircle, XCircle, Eye, BarChart3, AlertCircle } from 'lucide-react';
import { talleres, resenas } from '../data';

// ============================================
// PANEL DE ADMINISTRACIÓN
// ============================================
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'talleres' | 'resenas'>('dashboard');

  // Stats
  const totalTalleres = talleres.length;
  const talleresVerificados = talleres.filter(t => t.verificado).length;
  const talleresPendientes = talleres.filter(t => !t.verificado).length;
  const totalResenas = resenas.length;
  const promedioCalificacion = (talleres.reduce((sum, t) => sum + t.calificacion, 0) / talleres.length).toFixed(1);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-400">
            Gestiona talleres, reseñas y estadísticas de la plataforma
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard' as const, label: 'Dashboard', icon: <BarChart3 size={16} /> },
            { id: 'talleres' as const, label: 'Talleres', icon: <Wrench size={16} /> },
            { id: 'resenas' as const, label: 'Reseñas', icon: <Star size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-[#1F1F1F] text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<Wrench size={24} />}
                label="Total Talleres"
                value={totalTalleres.toString()}
                color="text-[#FF6B00]"
                bgColor="bg-[#FF6B00]/10"
              />
              <StatCard
                icon={<CheckCircle size={24} />}
                label="Verificados"
                value={talleresVerificados.toString()}
                color="text-[#2E7D32]"
                bgColor="bg-[#2E7D32]/10"
              />
              <StatCard
                icon={<AlertCircle size={24} />}
                label="Pendientes"
                value={talleresPendientes.toString()}
                color="text-[#FFD700]"
                bgColor="bg-[#FFD700]/10"
              />
              <StatCard
                icon={<Star size={24} />}
                label="Calificación Prom."
                value={promedioCalificacion}
                color="text-[#FFD700]"
                bgColor="bg-[#FFD700]/10"
              />
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-4">Registro de Talleres (últimos 6 meses)</h3>
                <div className="h-48 flex items-end justify-between gap-2 px-4">
                  {[3, 5, 8, 12, 15, totalTalleres].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#FF6B00] to-[#FF8C38] rounded-t-lg transition-all duration-500"
                        style={{ height: `${(val / totalTalleres) * 100}%` }}
                      />
                      <span className="text-gray-500 text-xs">
                        {['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-bold mb-4">Reseñas por Mes</h3>
                <div className="h-48 flex items-end justify-between gap-2 px-4">
                  {[5, 8, 12, 15, 18, totalResenas].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-[#D32F2F] to-[#E53935] rounded-t-lg transition-all duration-500"
                        style={{ height: `${(val / totalResenas) * 100}%` }}
                      />
                      <span className="text-gray-500 text-xs">
                        {['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {talleres.slice(0, 5).map((taller, i) => (
                  <div key={taller.id} className="flex items-center gap-4 p-3 bg-[#0A0A0A] rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      taller.verificado ? 'bg-[#2E7D32]/10' : 'bg-[#FFD700]/10'
                    }`}>
                      {taller.verificado ? (
                        <CheckCircle size={16} className="text-[#2E7D32]" />
                      ) : (
                        <AlertCircle size={16} className="text-[#FFD700]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{taller.nombre}</p>
                      <p className="text-gray-500 text-xs">
                        {taller.verificado ? 'Taller verificado y activo' : 'Pendiente de verificación'}
                      </p>
                    </div>
                    <span className="text-gray-600 text-xs">{taller.distrito}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Talleres Tab */}
        {activeTab === 'talleres' && (
          <div className="bg-[#1F1F1F] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-white font-bold">Lista de Talleres Registrados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Taller</th>
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">RUC</th>
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Distrito</th>
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Calificación</th>
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Estado</th>
                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {talleres.map((taller) => (
                    <tr key={taller.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white text-xs font-bold">
                            {taller.nombre.charAt(0)}
                          </div>
                          <span className="text-white text-sm font-medium">{taller.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm font-mono">{taller.ruc}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{taller.distrito}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
                          <span className="text-white text-sm">{taller.calificacion}</span>
                          <span className="text-gray-500 text-xs">({taller.numResenas})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          taller.verificado
                            ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                            : 'bg-[#FFD700]/10 text-[#FFD700]'
                        }`}>
                          {taller.verificado ? '✓ Verificado' : '⏳ Pendiente'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Ver perfil">
                            <Eye size={14} />
                          </button>
                          {!taller.verificado && (
                            <button className="p-2 rounded-lg bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32]/20 transition-colors" title="Aprobar">
                              <CheckCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reseñas Tab */}
        {activeTab === 'resenas' && (
          <div className="space-y-4">
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10 mb-4">
              <h3 className="text-white font-bold">Moderación de Reseñas</h3>
              <p className="text-gray-500 text-sm mt-1">Revisa y modera las reseñas de los usuarios</p>
            </div>

            {resenas.map((resena) => {
              const taller = talleres.find(t => t.id === resena.tallerId);
              return (
                <div key={resena.id} className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white text-xs font-bold">
                          {resena.clienteNombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{resena.clienteNombre}</p>
                          <p className="text-gray-500 text-xs">{new Date(resena.fecha).toLocaleDateString('es-PE')} • {taller?.nombre}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(resena.calificacion)].map((_, i) => (
                          <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm">{resena.comentario}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-[#FF6B00]/10 text-[#FF6B00] text-xs rounded">
                        {resena.servicio}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32]/20 transition-colors" title="Aprobar">
                        <CheckCircle size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-[#D32F2F]/10 text-[#D32F2F] hover:bg-[#D32F2F]/20 transition-colors" title="Rechazar">
                        <XCircle size={16} />
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

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, bgColor }) => (
  <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
    <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center ${color} mb-4`}>
      {icon}
    </div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-white font-heading text-2xl font-black">{value}</p>
  </div>
);

export default AdminPage;
