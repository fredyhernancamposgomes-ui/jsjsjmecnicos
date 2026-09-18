import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, CreditCard, Star, Clock, CheckCircle, ArrowUpRight, ArrowRight, Plus, Heart, Repeat, FileText, BarChart3, Truck } from 'lucide-react';
import { repuestos } from '../data';
import { useInView } from '../hooks/useAnimations';

// ============================================
// DASHBOARD DE TALLER - B2B
// ============================================
const DashboardTaller: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pedidos' | 'catalogo' | 'favoritos'>('overview');

  // Datos simulados del taller
  const tallerData = {
    nombre: 'AutoService Pro',
    credito: 2500,
    creditoUsado: 800,
    pedidosMes: 12,
    gastoMes: 3450,
    favoritos: 8,
  };

  // Pedidos simulados
  const pedidos = [
    { id: 'P-001', fecha: '2024-12-20', items: 5, total: 485, estado: 'entregado' },
    { id: 'P-002', fecha: '2024-12-18', items: 3, total: 320, estado: 'enviado' },
    { id: 'P-003', fecha: '2024-12-15', items: 8, total: 890, estado: 'entregado' },
    { id: 'P-004', fecha: '2024-12-12', items: 2, total: 175, estado: 'entregado' },
    { id: 'P-005', fecha: '2024-12-10', items: 6, total: 620, estado: 'procesando' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs text-ember uppercase tracking-widest font-medium mb-2">Dashboard</p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-bone">
              Bienvenido, {tallerData.nombre}
            </h1>
          </div>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ember text-ink font-semibold rounded-xl hover:bg-ember-soft transition-colors text-sm"
          >
            <Plus size={16} />
            Nuevo pedido
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 p-1 bg-ink-soft border border-line-soft rounded-xl w-fit overflow-x-auto">
          {[
            { id: 'overview' as const, label: 'Resumen', icon: <BarChart3 size={14} /> },
            { id: 'pedidos' as const, label: 'Pedidos', icon: <Package size={14} /> },
            { id: 'catalogo' as const, label: 'Catálogo', icon: <ShoppingCart size={14} /> },
            { id: 'favoritos' as const, label: 'Favoritos', icon: <Heart size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-ink text-bone'
                  : 'text-smoke hover:text-bone'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashStatCard
                icon={<CreditCard size={20} />}
                label="Crédito disponible"
                value={`S/ ${tallerData.credito - tallerData.creditoUsado}`}
                sub={`de S/ ${tallerData.credito} total`}
                accent="ember"
              />
              <DashStatCard
                icon={<Package size={20} />}
                label="Pedidos este mes"
                value={tallerData.pedidosMes.toString()}
                sub="+3 vs mes anterior"
                accent="success"
              />
              <DashStatCard
                icon={<TrendingUp size={20} />}
                label="Gasto mensual"
                value={`S/ ${tallerData.gastoMes}`}
                sub="Promedio S/ 2,800"
              />
              <DashStatCard
                icon={<Star size={20} />}
                label="Calificación"
                value="4.8"
                sub="156 reseñas"
                accent="ember"
              />
            </div>

            {/* Credit bar */}
            <div className="bg-ink-soft rounded-2xl border border-line-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-bone font-semibold">Línea de crédito</h3>
                <span className="text-sm text-ember font-medium">Paga a 30 días</span>
              </div>
              <div className="w-full h-3 bg-ink rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ember to-ember-soft rounded-full transition-all duration-500"
                  style={{ width: `${(tallerData.creditoUsado / tallerData.credito) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-sm">
                <span className="text-smoke">Usado: S/ {tallerData.creditoUsado}</span>
                <span className="text-bone">Disponible: S/ {tallerData.credito - tallerData.creditoUsado}</span>
              </div>
            </div>

            {/* Recent orders + Quick actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent orders */}
              <div className="lg:col-span-2 bg-ink-soft rounded-2xl border border-line-soft overflow-hidden">
                <div className="p-6 border-b border-line-soft flex items-center justify-between">
                  <h3 className="text-bone font-semibold">Pedidos recientes</h3>
                  <button onClick={() => setActiveTab('pedidos')} className="text-sm text-ember hover:text-ember-soft transition-colors">
                    Ver todos
                  </button>
                </div>
                <div className="divide-y divide-line-soft">
                  {pedidos.slice(0, 4).map((pedido) => (
                    <div key={pedido.id} className="flex items-center gap-4 p-5 hover:bg-ink transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember">
                        <Package size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-bone text-sm font-medium">{pedido.id}</p>
                        <p className="text-smoke text-xs">{pedido.items} items · {new Date(pedido.fecha).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-bone text-sm font-medium">S/ {pedido.total}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          pedido.estado === 'entregado' ? 'bg-success/10 text-success' :
                          pedido.estado === 'enviado' ? 'bg-ember/10 text-ember' :
                          'bg-line text-smoke'
                        }`}>
                          {pedido.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="space-y-4">
                <h3 className="text-bone font-semibold mb-2">Acciones rápidas</h3>
                
                <Link to="/tienda" className="flex items-center gap-4 p-4 bg-ink-soft rounded-2xl border border-line-soft hover:border-ember/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember">
                    <Repeat size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-bone text-sm font-medium">Repetir último pedido</p>
                    <p className="text-smoke text-xs">5 items · S/ 485</p>
                  </div>
                  <ArrowUpRight size={14} className="text-smoke group-hover:text-ember transition-colors" />
                </Link>

                <Link to="/tienda" className="flex items-center gap-4 p-4 bg-ink-soft rounded-2xl border border-line-soft hover:border-ember/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-bone text-sm font-medium">Crear cotización</p>
                    <p className="text-smoke text-xs">Para enviar a cliente</p>
                  </div>
                  <ArrowUpRight size={14} className="text-smoke group-hover:text-ember transition-colors" />
                </Link>

                <Link to="/tienda" className="flex items-center gap-4 p-4 bg-ink-soft rounded-2xl border border-line-soft hover:border-ember/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember">
                    <Truck size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-bone text-sm font-medium">Tracking</p>
                    <p className="text-smoke text-xs">1 pedido en camino</p>
                  </div>
                  <ArrowUpRight size={14} className="text-smoke group-hover:text-ember transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Pedidos Tab */}
        {activeTab === 'pedidos' && (
          <div className="bg-ink-soft rounded-2xl border border-line-soft overflow-hidden">
            <div className="p-6 border-b border-line-soft">
              <h3 className="text-bone font-semibold">Historial de pedidos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-line-soft">
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Pedido</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Fecha</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Items</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Total</th>
                    <th className="text-left px-6 py-4 text-xs text-smoke uppercase tracking-wider font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id} className="hover:bg-ink transition-colors">
                      <td className="px-6 py-4 text-bone text-sm font-medium">{pedido.id}</td>
                      <td className="px-6 py-4 text-smoke text-sm">{new Date(pedido.fecha).toLocaleDateString('es-PE')}</td>
                      <td className="px-6 py-4 text-smoke text-sm">{pedido.items} items</td>
                      <td className="px-6 py-4 text-bone text-sm font-medium">S/ {pedido.total}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          pedido.estado === 'entregado' ? 'bg-success/10 text-success' :
                          pedido.estado === 'enviado' ? 'bg-ember/10 text-ember' :
                          'bg-line text-smoke'
                        }`}>
                          {pedido.estado === 'entregado' && <CheckCircle size={10} className="inline mr-1" />}
                          {pedido.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Catálogo Tab */}
        {activeTab === 'catalogo' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-ash">Precios mayoristas para talleres verificados</p>
              <Link to="/tienda" className="text-sm text-ember hover:text-ember-soft transition-colors flex items-center gap-1">
                Ir a la tienda <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {repuestos.slice(0, 8).map((repuesto) => (
                <div key={repuesto.id} className="bg-ink-soft rounded-2xl border border-line-soft p-5 hover:border-ember/30 transition-colors group">
                  <div className="aspect-square bg-ink rounded-xl mb-4 flex items-center justify-center">
                    <Package size={32} className="text-line" />
                  </div>
                  <span className="text-xs text-ember font-medium uppercase tracking-wider">{repuesto.categoria}</span>
                  <h4 className="text-bone text-sm font-medium mt-1 mb-2 group-hover:text-ember transition-colors">{repuesto.nombre}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-bone font-display text-lg font-semibold">S/ {repuesto.precio.toFixed(2)}</p>
                      <p className="text-xs text-success">-15% mayorista</p>
                    </div>
                    <button className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-smoke hover:text-ember hover:border-ember transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favoritos Tab */}
        {activeTab === 'favoritos' && (
          <div>
            <p className="text-sm text-ash mb-6">Tus productos favoritos para pedidos rápidos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repuestos.slice(0, 6).map((repuesto) => (
                <div key={repuesto.id} className="flex items-center gap-4 p-4 bg-ink-soft rounded-2xl border border-line-soft hover:border-ember/30 transition-colors">
                  <div className="w-16 h-16 bg-ink rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package size={24} className="text-line" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-bone text-sm font-medium truncate">{repuesto.nombre}</h4>
                    <p className="text-smoke text-xs mt-0.5">{repuesto.categoria}</p>
                    <p className="text-ember text-sm font-semibold mt-1">S/ {repuesto.precio.toFixed(2)}</p>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-ember/10 flex items-center justify-center text-ember hover:bg-ember/20 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card component
interface DashStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent?: 'ember' | 'success';
}

const DashStatCard: React.FC<DashStatCardProps> = ({ icon, label, value, sub, accent }) => (
  <div className="bg-ink-soft rounded-2xl border border-line-soft p-6">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
      accent === 'ember' ? 'bg-ember-glow-strong text-ember' :
      accent === 'success' ? 'bg-success/10 text-success' :
      'bg-line text-smoke'
    }`}>
      {icon}
    </div>
    <p className="text-sm text-smoke mb-1">{label}</p>
    <p className="text-bone font-display text-2xl font-semibold tracking-tight">{value}</p>
    <p className="text-xs text-smoke mt-1">{sub}</p>
  </div>
);

export default DashboardTaller;
