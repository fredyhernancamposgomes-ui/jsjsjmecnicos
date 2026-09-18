import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Plus, Minus, MessageCircle, X, Filter, ChevronDown, Truck, Package, Star, ArrowRight, Zap } from 'lucide-react';
import { repuestos } from '../data';
import { useInView } from '../hooks/useAnimations';

// Imágenes de productos
const PRODUCT_IMAGES: Record<string, string> = {
  'rep1': 'https://image.qwenlm.ai/generated-images/fc835050-224c-40d5-a301-aafa8cd4b825/_result.png',
  'rep2': 'https://image.qwenlm.ai/generated-images/61cd071d-5c5b-415a-8ea8-59ff5043a17a/_result.png',
  'rep3': 'https://image.qwenlm.ai/generated-images/97a9252e-260e-458b-821b-962ac0ce9fb5/_result.png',
  'rep4': 'https://image.qwenlm.ai/generated-images/61cd071d-5c5b-415a-8ea8-59ff5043a17a/_result.png',
  'rep5': 'https://image.qwenlm.ai/generated-images/aa5c6d96-3dd0-49a3-b8f0-a777396422c9/_result.png',
  'rep6': 'https://image.qwenlm.ai/generated-images/959a999e-5841-460f-8d3a-0f2a5795f7c0/_result.png',
  'rep7': 'https://image.qwenlm.ai/generated-images/61cd071d-5c5b-415a-8ea8-59ff5043a17a/_result.png',
  'rep8': 'https://image.qwenlm.ai/generated-images/fc835050-224c-40d5-a301-aafa8cd4b825/_result.png',
};

// ============================================
// TIENDA B2B - Premium
// ============================================
const TiendaPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categorias = [...new Set(repuestos.map(r => r.categoria))];

  const filteredRepuestos = repuestos.filter(r => {
    const matchSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.compatible.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = !categoriaFilter || r.categoria === categoriaFilter;
    return matchSearch && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.precio - b.precio;
    if (sortBy === 'price-desc') return b.precio - a.precio;
    return 0;
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

  // Descuento mayorista
  const wholesaleDiscount = cartTotal > 500 ? 0.15 : cartTotal > 200 ? 0.1 : 0;
  const finalTotal = cartTotal * (1 - wholesaleDiscount);

  const handleWhatsAppOrder = () => {
    const items = cartItems.map(item => `• ${item!.nombre} x${item!.qty} - S/ ${(item!.precio * item!.qty).toFixed(2)}`).join('\n');
    const discountText = wholesaleDiscount > 0 ? `\n🏷️ Descuento mayorista: -${(wholesaleDiscount * 100).toFixed(0)}%` : '';
    const message = `¡Hola! Quiero hacer un pedido:\n\n${items}${discountText}\n\nTotal: S/ ${finalTotal.toFixed(2)}`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero de tienda */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-6">
                <Zap size={12} className="text-ember" />
                <span className="text-xs text-ash font-medium">Precios mayoristas para talleres</span>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.9] text-bone mb-6">
                Repuestos
                <br />
                <span className="text-gradient-ember italic font-light">al mejor precio.</span>
              </h1>
              <p className="text-lg text-ash max-w-lg mb-8">
                Calidad garantizada, entrega rápida y descuentos por volumen para talleres registrados.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Truck size={16} className="text-ember" />
                  Envío gratis +S/200
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Package size={16} className="text-ember" />
                  Garantía 6 meses
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Star size={16} className="text-ember" />
                  15% off mayorista
                </div>
              </div>
            </div>
            
            {/* Search bar grande */}
            <div className="w-full lg:w-96">
              <div className="glass rounded-2xl p-2">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search size={18} className="text-smoke" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar repuesto o vehículo..."
                    className="flex-1 bg-transparent text-bone text-sm placeholder-fog focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Cart panel flotante */}
        {showCart && cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 w-96 glass rounded-3xl p-6 z-50 border-gradient shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-bone font-display font-semibold text-lg">Tu pedido</h3>
              <button onClick={() => setShowCart(false)} className="text-smoke hover:text-bone">
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div key={item!.id} className="flex items-center justify-between p-3 bg-ink rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-bone text-sm font-medium truncate">{item!.nombre}</p>
                    <p className="text-smoke text-xs">S/ {item!.precio.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <button onClick={() => removeFromCart(item!.id)} className="w-6 h-6 rounded-md border border-line flex items-center justify-center text-smoke hover:text-bone">
                      <Minus size={10} />
                    </button>
                    <span className="text-bone text-xs font-medium w-4 text-center">{item!.qty}</span>
                    <button onClick={() => addToCart(item!.id)} className="w-6 h-6 rounded-md border border-line flex items-center justify-center text-smoke hover:text-bone">
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {wholesaleDiscount > 0 && (
              <div className="flex items-center gap-2 p-3 bg-ember/10 border border-ember/20 rounded-xl mb-3">
                <Zap size={14} className="text-ember" />
                <span className="text-ember text-xs font-medium">
                  ¡Descuento mayorista! -{(wholesaleDiscount * 100).toFixed(0)}%
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-line-soft">
              <div>
                {wholesaleDiscount > 0 && (
                  <p className="text-smoke text-xs line-through">S/ {cartTotal.toFixed(2)}</p>
                )}
                <p className="text-bone font-display text-xl font-semibold">S/ {finalTotal.toFixed(2)}</p>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ember text-ink font-semibold rounded-xl hover:bg-ember-soft transition-colors text-sm"
              >
                <MessageCircle size={14} />
                Pedir
              </button>
            </div>
          </div>
        )}

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-line-soft">
          <select
            value={categoriaFilter}
            onChange={(e) => setCategoriaFilter(e.target.value)}
            className="px-4 py-2.5 bg-ink-soft border border-line rounded-xl text-bone text-sm appearance-none focus:outline-none focus:border-ember transition-colors cursor-pointer"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-ink-soft border border-line rounded-xl text-bone text-sm appearance-none focus:outline-none focus:border-ember transition-colors cursor-pointer"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-smoke">{filteredRepuestos.length} productos</span>
            
            {/* Cart button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-ink-soft border border-line rounded-xl text-bone text-sm hover:border-ember transition-colors"
            >
              <ShoppingCart size={14} />
              Carrito
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-ember text-ink text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Wholesale banner */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-ember/10 via-ink-soft to-ink-soft border border-ember/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-ember/20 flex items-center justify-center">
                <Zap size={20} className="text-ember" />
              </div>
              <div>
                <h3 className="text-bone font-semibold">Precios mayoristas</h3>
                <p className="text-sm text-ash">+S/200 = 10% off · +S/500 = 15% off</p>
              </div>
            </div>
            <Link to="/registro" className="text-sm text-ember hover:text-ember-soft transition-colors flex items-center gap-1">
              Registra tu taller <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRepuestos.map((repuesto, i) => (
            <ProductCard key={repuesto.id} repuesto={repuesto} index={i} onAdd={() => addToCart(repuesto.id)} inCart={cart[repuesto.id] || 0} />
          ))}
        </div>

        {filteredRepuestos.length === 0 && (
          <div className="text-center py-24">
            <Package size={48} className="text-line mx-auto mb-4" />
            <p className="text-ash mb-2">No se encontraron repuestos</p>
            <p className="text-smoke text-sm">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// PRODUCT CARD
// ============================================
interface ProductCardProps {
  repuesto: typeof repuestos[0];
  index: number;
  onAdd: () => void;
  inCart: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ repuesto, index, onAdd, inCart }) => {
  const { ref, isVisible } = useInView(0.1);
  const image = PRODUCT_IMAGES[repuesto.id] || '';

  return (
    <div
      ref={ref}
      className="bg-ink-soft rounded-2xl border border-line-soft overflow-hidden group hover:border-ember/30 transition-all tilt-hover card-shine"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.05, 0.3)}s`
      }}
    >
      {/* Image */}
      <div className="aspect-square relative overflow-hidden bg-ink-muted">
        {image ? (
          <img
            src={image}
            alt={repuesto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={40} className="text-line" />
          </div>
        )}
        
        {repuesto.stock < 20 && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-danger/90 text-bone text-xs rounded-full font-medium">
            Últimas {repuesto.stock}
          </span>
        )}

        {inCart > 0 && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-ember text-ink flex items-center justify-center text-xs font-bold">
            {inCart}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs text-ember font-medium uppercase tracking-wider">
          {repuesto.categoria}
        </span>
        <h3 className="text-bone font-medium mt-1 mb-2 group-hover:text-ember transition-colors leading-tight">
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
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-line text-bone text-sm font-medium rounded-xl hover:border-ember hover:text-ember transition-colors group/btn"
        >
          <ShoppingCart size={14} className="group-hover/btn:scale-110 transition-transform" />
          {inCart > 0 ? `En carrito (${inCart})` : 'Agregar'}
        </button>
      </div>
    </div>
  );
};

export default TiendaPage;
