import React, { useState } from 'react';
import { ShoppingCart, Search, Truck, Filter, Plus, Minus, MessageCircle } from 'lucide-react';
import { repuestos } from '../data';

// ============================================
// PÁGINA DE REPUESTOS
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

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

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
    const message = `¡Hola! Quiero hacer un pedido de repuestos:\n\n${items}\n\nTotal: S/ ${cartTotal.toFixed(2)}`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-white mb-2">
              Catálogo de Repuestos
            </h1>
            <p className="text-gray-400">
              Repuestos de calidad a precios competitivos para tu taller
            </p>
          </div>
          {/* Cart button */}
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative inline-flex items-center gap-2 px-5 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E55E00] transition-colors"
          >
            <ShoppingCart size={20} />
            Carrito
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#D32F2F] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Cart panel */}
        {showCart && (
          <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-[#FF6B00]/30 mb-8 animate-fade-in">
            <h3 className="text-white font-bold text-lg mb-4">Tu Pedido</h3>
            {cartItems.length > 0 ? (
              <>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item!.id} className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-xl">
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item!.nombre}</p>
                        <p className="text-gray-500 text-xs">S/ {item!.precio.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeFromCart(item!.id)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-bold text-sm w-6 text-center">{item!.qty}</span>
                          <button onClick={() => addToCart(item!.id)} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-[#FF6B00] font-bold text-sm w-20 text-right">
                          S/ {(item!.precio * item!.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white font-bold text-lg">Total: S/ {cartTotal.toFixed(2)}</span>
                  <button
                    onClick={handleWhatsAppOrder}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle size={18} />
                    Pedir por WhatsApp
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">Tu carrito está vacío</p>
            )}
          </div>
        )}

        {/* Search & Filters */}
        <div className="bg-[#1F1F1F] rounded-2xl p-4 border border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar repuesto o vehículo compatible..."
                className="w-full pl-9 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
            </div>
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
            >
              <option value="">Todas las categorías</option>
              {categorias.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRepuestos.map((repuesto) => (
            <div
              key={repuesto.id}
              className="bg-[#1F1F1F] rounded-2xl border border-white/5 hover:border-[#FF6B00]/30 transition-all duration-300 overflow-hidden group"
            >
              {/* Image placeholder */}
              <div className="h-36 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center relative">
                <Truck size={40} className="text-gray-700 group-hover:text-[#FF6B00]/30 transition-colors" />
                <span className="absolute top-3 left-3 px-2 py-1 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium rounded-full">
                  {repuesto.categoria}
                </span>
                {repuesto.stock < 20 && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-[#D32F2F]/10 text-[#D32F2F] text-xs font-medium rounded-full">
                    ¡Últimas unidades!
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {repuesto.nombre}
                </h3>
                <p className="text-gray-500 text-xs mb-3">
                  Compatible: {repuesto.compatible.join(', ')}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#FF6B00] font-bold text-lg">S/ {repuesto.precio.toFixed(2)}</span>
                  <span className="text-gray-500 text-xs">Stock: {repuesto.stock}</span>
                </div>
                <p className="text-gray-600 text-xs mb-4">Proveedor: {repuesto.proveedor}</p>
                
                <button
                  onClick={() => addToCart(repuesto.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF6B00] text-white font-semibold text-sm rounded-xl hover:bg-[#E55E00] transition-colors"
                >
                  <ShoppingCart size={16} />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredRepuestos.length === 0 && (
          <div className="text-center py-16">
            <Truck size={48} className="text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron repuestos</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepuestosPage;
