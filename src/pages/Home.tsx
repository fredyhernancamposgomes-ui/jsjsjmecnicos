import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Wrench, Star, Users, Shield, Truck, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, Zap, Clock, Award } from 'lucide-react';
import { talleres, testimonios, SERVICIOS, departamentos } from '../data';

// ============================================
// COMPONENTE PRINCIPAL - HOME PAGE
// ============================================
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SearchSection />
      <HowItWorksSection />
      <ForTalleresSection />
      <ForProveedoresSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A]" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D32F2F]/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-8">
            <Zap size={16} className="text-[#FF6B00]" />
            <span className="text-[#FF6B00] text-sm font-medium">La plataforma #1 de talleres en Perú</span>
          </div>

          {/* Main headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Llegamos hasta donde
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8C38]">
              más lo necesites
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Encuentra talleres de confianza, repuestos baratos y servicio a domicilio en todo el Perú. 
            Conectamos clientes con talleres calificados por la comunidad.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/buscar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold text-lg rounded-xl hover:bg-[#E55E00] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FF6B00]/25 animate-pulse-glow"
            >
              <Search size={20} />
              Buscar Taller
            </Link>
            <Link
              to="/registro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              <Wrench size={20} />
              Registrar mi Taller
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#2E7D32]" />
              <span className="text-sm">Talleres verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[#FFD700]" />
              <span className="text-sm">Calificaciones reales</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#FF6B00]" />
              <span className="text-sm">Auxilio 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-[#FF6B00] rounded-full" />
        </div>
      </div>
    </section>
  );
};

// ============================================
// SEARCH SECTION
// ============================================
const SearchSection: React.FC = () => {
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState('');
  const [servicio, setServicio] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (ubicacion) params.set('ubicacion', ubicacion);
    if (servicio) params.set('servicio', servicio);
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="bg-[#1F1F1F] rounded-2xl p-6 shadow-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ubicación */}
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value="">📍 Ubicación</option>
                {departamentos.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Servicio */}
            <div className="relative">
              <Wrench size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value="">🔧 Tipo de servicio</option>
                {SERVICIOS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E55E00] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <Search size={18} />
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS SECTION
// ============================================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Busca un taller cerca",
      description: "Encuentra talleres verificados en tu zona filtrando por servicio, calificación y disponibilidad.",
      color: "from-[#FF6B00] to-[#FF8C38]"
    },
    {
      icon: <Wrench size={32} />,
      title: "Recibe tu presupuesto",
      description: "El taller revisa tu solicitud y te envía un presupuesto transparente sin compromisos.",
      color: "from-[#D32F2F] to-[#E53935]"
    },
    {
      icon: <Star size={32} />,
      title: "Califica tu experiencia",
      description: "Después del servicio, califica al taller con estrellas. Tu opinión ayuda a toda la comunidad.",
      color: "from-[#2E7D32] to-[#43A047]"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" id="como-funciona">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            En 3 simples pasos encuentras el taller perfecto para tu vehículo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-[#1F1F1F] rounded-2xl p-8 border border-white/5 hover:border-[#FF6B00]/30 transition-all duration-300 h-full">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOR TALLERES SECTION
// ============================================
const ForTalleresSection: React.FC = () => {
  const beneficios = [
    { icon: <Users size={24} />, title: "Más clientes", desc: "Aumenta tu visibilidad y recibe solicitudes de clientes verificados en tu zona." },
    { icon: <Truck size={24} />, title: "Repuestos más baratos", desc: "Accede a nuestra red de proveedores con precios competitivos y entrega rápida." },
    { icon: <Award size={24} />, title: "Visibilidad gratuita", desc: "Regístrate gratis y aparece en las búsquedas. Sin comisiones ocultas." },
    { icon: <Shield size={24} />, title: "Reputación digital", desc: "Construye tu reputación con calificaciones reales de tus clientes satisfechos." },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] to-[#1F1F1F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6">
              <Wrench size={14} className="text-[#FF6B00]" />
              <span className="text-[#FF6B00] text-xs font-semibold uppercase tracking-wider">Para Talleres</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
              Haz crecer tu taller con <span className="text-[#FF6B00]">TallerYa</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              No somos un taller, somos el puente. Te conectamos con clientes que buscan exactamente lo que tú ofreces.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {beneficios.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">{b.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/registro"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E55E00] transition-all duration-300 transform hover:scale-105"
            >
              Registrar mi Taller
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-white/10">
              <div className="space-y-4">
                {talleres.slice(0, 3).map((taller) => (
                  <div key={taller.id} className="flex items-center gap-4 p-4 bg-[#1F1F1F] rounded-xl border border-white/5">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white font-bold text-sm">
                      {taller.nombre.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{taller.nombre}</h4>
                      <p className="text-gray-500 text-xs">{taller.distrito}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
                      <span className="text-white text-sm font-medium">{taller.calificacion}</span>
                    </div>
                    {taller.verificado && (
                      <CheckCircle size={16} className="text-[#2E7D32]" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">+{talleres.length} talleres registrados en la plataforma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOR PROVEEDORES SECTION
// ============================================
const ForProveedoresSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#1F1F1F] rounded-2xl p-8 border border-white/10">
              <h3 className="text-white font-bold mb-6">Catálogo de Repuestos</h3>
              <div className="space-y-3">
                {[
                  { nombre: "Pastillas de freno", precio: "S/ 85.00", stock: 45 },
                  { nombre: "Filtro de aceite", precio: "S/ 25.00", stock: 200 },
                  { nombre: "Amortiguador", precio: "S/ 180.00", stock: 30 },
                  { nombre: "Aceite sintético 5W-30", precio: "S/ 95.00", stock: 150 },
                ].map((rep, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#FF6B00]/10 flex items-center justify-center">
                        <Truck size={14} className="text-[#FF6B00]" />
                      </div>
                      <span className="text-white text-sm">{rep.nombre}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#FF6B00] font-bold text-sm">{rep.precio}</span>
                      <span className="text-gray-500 text-xs">Stock: {rep.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D32F2F]/10 border border-[#D32F2F]/20 mb-6">
              <Truck size={14} className="text-[#D32F2F]" />
              <span className="text-[#D32F2F] text-xs font-semibold uppercase tracking-wider">Para Proveedores</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
              Vende tus repuestos a <span className="text-[#D32F2F]">más talleres</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              No solo conectamos, también proveemos. Accede a nuestra red de talleres registrados y vende tus repuestos a precios competitivos.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Vende directamente a talleres verificados",
                "Pagos seguros y rápidos",
                "Logística simplificada con nuestros aliados",
                "Panel de inventario y pedidos en tiempo real",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-[#2E7D32] flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/repuestos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D32F2F] text-white font-bold rounded-xl hover:bg-[#B71C1C] transition-all duration-300 transform hover:scale-105"
            >
              Ver Catálogo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS SECTION
// ============================================
const StatsSection: React.FC = () => {
  const stats = [
    { number: "500+", label: "Talleres registrados", icon: <Wrench size={24} /> },
    { number: "10,000+", label: "Clientes satisfechos", icon: <Users size={24} /> },
    { number: "4.7", label: "Calificación promedio", icon: <Star size={24} /> },
    { number: "24/7", label: "Auxilio mecánico", icon: <Clock size={24} /> },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                {stat.icon}
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-black text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS SECTION
// ============================================
const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonios.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4">
            Lo que dice nuestra comunidad
          </h2>
          <p className="text-gray-400 text-lg">
            No calificamos nosotros, califican los clientes
          </p>
        </div>

        <div className="relative">
          <div className="bg-[#1F1F1F] rounded-2xl p-8 sm:p-12 border border-white/10">
            {/* Quote mark */}
            <div className="text-[#FF6B00]/20 text-6xl font-serif absolute top-4 left-6">"</div>
            
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonios[current].calificacion)].map((_, i) => (
                  <Star key={i} size={20} className="text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white text-lg sm:text-xl leading-relaxed mb-8 italic">
                "{testimonios[current].texto}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white font-bold">
                  {testimonios[current].nombre.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonios[current].nombre}</p>
                  <p className="text-gray-400 text-sm">{testimonios[current].rol}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B00] transition-colors"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-[#FF6B00] w-6' : 'bg-white/30'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#FF6B00] transition-colors"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CTA SECTION
// ============================================
const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] rounded-3xl p-12 text-center overflow-hidden">
          {/* Decorative */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Únete a la comunidad automotriz más grande del Perú. Ya sea como cliente, taller o proveedor, hay un lugar para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/buscar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#FF6B00] font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <Search size={20} />
                Buscar Taller
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Wrench size={20} />
                Soy Taller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
