import React, { useState } from 'react';
import { ShoppingCart, Search, Plus, Minus, MessageCircle, X } from 'lucide-react';
import { repuestos } from '../data';

// ============================================
// CATÁLOGO DE REPUESTOS - Premium
// ============================================
const RepuestosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);

  const categorias = [...new Set(repuestos.map(r => r.categoria))];

  const filteredRepuestos = repuestos.filter(r => {
    const matchSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.compatible.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = !categoriaFilter || r.categoria === categoriaFilter;
    return matchSearch && matchCategory;
  });

  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id]--;
      else delete newCart[id];
      return newCart;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const repuesto = repuestos.find(r => r.id === id);
    return repuesto ? { ...repuesto, qty } : null;
  }).filter(Boolean);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item!.precio * item!.qty), 0);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleWhatsAppOrder = () => {
    const items = cartItems.map(item => `• ${item!.nombre} x${item!.qty} - S/ ${(item!.precio * item!.qty).toFixed(2)}`).join('\n');
    const message = `Hola, quiero hacer un pedido:\n\n${items}\n\nTotal: S/ ${cartTotal.toFixed(2)}`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
              Catálogo
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight mb-4">
              Repuestos.
            </h1>
            <p className="text-lg text-ash">
              Calidad garantizada, precios competitivos.
            </p>
          </div>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative inline-flex items-center gap-2 px-5 py-3 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors self-start"
          >
            <ShoppingCart size={16} />
            Carrito
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-ember text-ink text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Cart panel */}
        {showCart && (
          <div className="bg-ink-soft rounded-2xl border border-line-soft p-6 mb-10 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-bone font-display font-semibold text-lg">Tu pedido</h3>
              <button onClick={() => setShowCart(false)} className="text-smoke hover:text-bone">
                <X size={18} />
              </button>
            </div>
            {cartItems.length > 0 ? (
              <>
                <div className="space-y-2 mb-6">
                  {cartItems.map((item) => (
                    <div key={item!.id} className="flex items-center justify-between p-4 bg-ink rounded-xl">
                      <div className="flex-1">
                        <p className="text-bone text-sm font-medium">{item!.nombre}</p>
                        <p className="text-smoke text-xs">S/ {item!.precio.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeFromCart(item!.id)} className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone">
                            <Minus size={12} />
                          </button>
                          <span className="text-bone text-sm font-medium w-6 text-center">{item!.qty}</span>
                          <button onClick={() => addToCart(item!.id)} className="w-7 h-7 rounded-lg border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-ember font-medium text-sm w-20 text-right">
                          S/ {(item!.precio * item!.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-line-soft">
                  <div>
                    <p className="text-sm text-smoke">Total</p>
                    <p className="text-bone font-display text-2xl font-semibold">S/ {cartTotal.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleWhatsAppOrder}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors"
                  >
                    <MessageCircle size={16} />
                    Pedir por WhatsApp
                  </button>
                </div>
              </>
            ) : (
              <p className="text-smoke text-center py-8">Tu carrito está vacío</p>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar repuesto o vehículo..."
              className="w-full pl-10 pr-4 py-3 bg-ink-soft border border-line rounded-xl text-bone text-sm placeholder-fog focus:outline-none focus:border-ember transition-colors"
            />
          </div>
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
            className="px-4 py-3 bg-ink-soft border border-line rounded-xl text-bone text-sm appearance-none focus:outline-none focus:border-ember transition-colors cursor-pointer"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden">
          {filteredRepuestos.map((repuesto) => (
            <div
              key={repuesto.id}
              className="bg-ink p-6 hover:bg-ink-soft transition-colors group"
            >
              {/* Image area */}
              <div className="aspect-square bg-ink-muted rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center">
                  <span className="text-ember font-display text-xl font-semibold">{repuesto.nombre.charAt(0)}</span>
                </div>
                {repuesto.stock < 20 && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-danger/10 border border-danger/20 text-danger text-xs rounded-full">
                    Últimas unidades
                  </span>
                )}
              </div>

              <span className="text-xs text-ember font-medium uppercase tracking-wider">
                {repuesto.categoria}
              </span>
              <h3 className="text-bone font-medium mt-1 mb-2 group-hover:text-ember transition-colors">
                {repuesto.nombre}
              </h3>
              <p className="text-xs text-smoke mb-4">
                {repuesto.compatible.join(' · ')}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-bone font-display text-xl font-semibold">
                  S/ {repuesto.precio.toFixed(2)}
                </span>
                <span className="text-xs text-smoke">Stock: {repuesto.stock}</span>
              </div>

              <button
                onClick={() => addToCart(repuesto.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-line text-bone text-sm font-medium rounded-xl hover:border-bone hover:bg-bone/5 transition-colors"
              >
                <ShoppingCart size={14} />
                Agregar
              </button>
            </div>
          ))}
        </div>

        {filteredRepuestos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-ash mb-2">No se encontraron repuestos</p>
            <p className="text-smoke text-sm">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepuestosPage;
