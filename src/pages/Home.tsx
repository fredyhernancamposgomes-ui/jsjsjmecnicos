import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { talleres, SERVICIOS, departamentos } from '../data';
import { useInView, useScrollProgress, useCountUp } from '../hooks/useAnimations';
import { WordReveal, ScrollReveal } from '../components/Animations';

// Imágenes
const IMG = {
  hero: 'https://image.qwenlm.ai/generated-images/7277ed6c-aeb8-4843-afba-1397604b3390/_result.png',
  workshop: 'https://image.qwenlm.ai/generated-images/fedb225b-b980-4a27-b64c-45ee2c976091/_result.png',
};

// ============================================
// HOME - LIMPIO Y PROFESIONAL
// ============================================
const Home: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      <HeroSection />
      <BenefitsSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedTalleres />
      <FinalCTA />
    </div>
  );
};

// ============================================
// HERO - CENTRADO Y LIMPIO
// ============================================
const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState('');
  const [servicio, setServicio] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (ubicacion) params.set('ubicacion', ubicacion);
    if (servicio) params.set('servicio', servicio);
    navigate(`/buscar?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-20' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
      </div>

      {/* Content - Centrado */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center py-32">
        {/* Badge */}
        <ScrollReveal delay={0.2}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-bone/5 backdrop-blur-md border border-bone/10 rounded-full mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ember"></span>
            </span>
            <span className="text-sm text-bone/90 font-medium">
              +500 talleres verificados en Perú
            </span>
          </div>
        </ScrollReveal>

        {/* Headline - Corto y poderoso */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-bone mb-8">
          <WordReveal delay={0.3}>Reparamos lo que</WordReveal>
          <br />
          <span className="text-ember">
            <WordReveal delay={0.5}>mueve al Perú.</WordReveal>
          </span>
        </h1>

        {/* Subtitle */}
        <ScrollReveal delay={0.7}>
          <p className="text-xl sm:text-2xl text-ash max-w-2xl mx-auto leading-relaxed mb-12">
            Talleres, repuestos y auxilio para autos, motos, camiones y más.
          </p>
        </ScrollReveal>

        {/* Search */}
        <ScrollReveal delay={0.9}>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <select
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="flex-1 px-5 py-4 bg-bone/5 backdrop-blur-md border border-bone/10 rounded-xl text-bone focus:outline-none focus:border-ember transition-colors"
            >
              <option value="">Ubicación</option>
              {departamentos.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              className="flex-1 px-5 py-4 bg-bone/5 backdrop-blur-md border border-bone/10 rounded-xl text-bone focus:outline-none focus:border-ember transition-colors"
            >
              <option value="">Servicio</option>
              {SERVICIOS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              type="submit"
              className="px-8 py-4 bg-ember text-bone font-semibold rounded-xl hover:bg-ember-hot transition-colors btn-hover"
            >
              Buscar
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ============================================
// QUÉ OFRECEMOS - BENEFICIOS
// ============================================
const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Talleres verificados',
      description: 'Calificados por la comunidad. Solo los mejores pasan nuestro proceso de verificación.'
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: 'Repuestos al mejor precio',
      description: 'Accede a precios mayoristas y minoristas. Calidad garantizada en cada pieza.'
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Auxilio 24/7',
      description: 'Llegamos hasta donde más lo necesites. En 30 minutos o menos, disponible las 24 horas.'
    },
    {
      icon: (
        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.588-.995l-.008-.007a2.126 2.126 0 00-3.003 0l-.008.007a2.126 2.126 0 00-.588.995v.75c0 .591.212 1.163.598 1.611l.007.008a2.126 2.126 0 003.003 0l.008-.007a2.126 2.126 0 00.588-.995v-.75zM6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM17.25 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
      title: 'Soporte personalizado',
      description: 'Te ayudamos a encontrar exactamente lo que necesitas. Atención humana y cercana.'
    }
  ];

  return (
    <section className="py-48 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm text-ember uppercase tracking-widest font-semibold mb-4">Qué ofrecemos</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-bone">
              Todo lo que necesitas en un solo lugar.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group p-10 bg-ink-soft rounded-2xl border border-bone/5 hover:border-ember/30 transition-all card-hover min-h-[300px] flex flex-col">
                <div className="w-20 h-20 rounded-xl bg-ember/10 flex items-center justify-center text-ember mb-8 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold text-bone mb-4 group-hover:text-ember transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-ash leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS - LIMPIO
// ============================================
const StatsSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  const talleresCount = useCountUp(500, 2000, isVisible);
  const clientesCount = useCountUp(10, 1500, isVisible);
  const ratingCount = useCountUp(48, 1800, isVisible);

  return (
    <section ref={ref} className="py-48 px-6 lg:px-8 border-y border-line">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-32">
          <div className="text-center">
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-bone mb-4">
              {talleresCount}<span className="text-ember">+</span>
            </div>
            <p className="text-ash text-lg">Talleres verificados</p>
          </div>
          <div className="text-center">
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-bone mb-4">
              {clientesCount}<span className="text-ember">K+</span>
            </div>
            <p className="text-ash text-lg">Clientes satisfechos</p>
          </div>
          <div className="text-center">
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
              <span className="text-bone">{(ratingCount / 10).toFixed(1)}</span>
              <span className="text-ember">★</span>
            </div>
            <p className="text-ash text-lg">Calificación promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SERVICIOS - GRID SIMPLE
// ============================================
const ServicesSection: React.FC = () => {
  const services = [
    { name: 'Frenos', desc: 'Pastillas, discos, líquido de frenos' },
    { name: 'Motor', desc: 'Reparación completa y mantenimiento' },
    { name: 'Eléctrico', desc: 'Baterías, alternadores, cableado' },
    { name: 'Suspensión', desc: 'Amortiguadores, rotulas, bujes' },
    { name: 'Transmisión', desc: 'Cajas manuales y automáticas' },
    { name: 'Aire acondicionado', desc: 'Recarga, reparación, mantenimiento' },
    { name: 'Diagnóstico', desc: 'Escáner computarizado avanzado' },
    { name: 'Pintura y latonería', desc: 'Acabado profesional' },
    { name: 'Auxilio mecánico', desc: 'Servicio 24/7 en carretera' }
  ];

  return (
    <section className="py-48 px-6 lg:px-8 bg-ink-soft">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm text-ember uppercase tracking-widest font-semibold mb-4">Servicios</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-bone">
              Todo lo que tu vehículo necesita.
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {services.map((servicio, i) => (
            <ScrollReveal key={servicio.name} delay={i * 0.05}>
              <div className="group flex items-center justify-between p-6 rounded-xl border border-bone/5 hover:border-ember/30 hover:bg-ink transition-all cursor-pointer">
                <div className="flex items-center gap-6">
                  <span className="text-smoke text-sm font-mono w-8">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-bone group-hover:text-ember transition-colors">
                    {servicio.name}
                  </h3>
                </div>
                <p className="text-ash text-sm sm:text-base hidden sm:block">
                  {servicio.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// TALLERES DESTACADOS
// ============================================
const FeaturedTalleres: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = talleres.filter(t => t.verificado).slice(0, 6);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-48 px-6 lg:px-8 bg-ink-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <ScrollReveal>
            <div>
              <p className="text-sm text-ember uppercase tracking-widest font-semibold mb-4">Destacados</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-bone">
                Los mejor calificados.
              </h2>
            </div>
          </ScrollReveal>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone hover:border-bone/30 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-ash hover:text-bone hover:border-bone/30 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-6 lg:px-8 pb-4 -mx-6 lg:-mx-8" style={{ scrollbarWidth: 'none' }}>
        <div className="w-6 lg:w-8 flex-shrink-0" />
        {featured.map((taller) => (
          <Link
            key={taller.id}
            to={`/taller/${taller.id}`}
            className="flex-shrink-0 w-[360px] bg-ink rounded-2xl border border-bone/5 overflow-hidden group card-hover"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={IMG.workshop} alt={taller.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full">
                <Star size={14} className="text-ember fill-ember" />
                <span className="text-bone text-sm font-bold">{taller.calificacion}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-bone group-hover:text-ember transition-colors mb-2">
                {taller.nombre}
              </h3>
              <p className="text-ash text-sm mb-4">{taller.distrito}</p>
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <span className="text-ash text-sm">{taller.numResenas} reseñas</span>
                <ArrowRight size={16} className="text-ash group-hover:text-ember transition-colors" />
              </div>
            </div>
          </Link>
        ))}
        <div className="w-6 lg:w-8 flex-shrink-0" />
      </div>
    </section>
  );
};

// ============================================
// CTA FINAL
// ============================================
const FinalCTA: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="py-48 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-bone mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          ¿Listo para
          <br />
          <span className="text-ember">empezar?</span>
        </h2>
        <p
          className="text-lg text-ash max-w-2xl mx-auto mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s'
          }}
        >
          Únete a la red de talleres más grande del Perú.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s'
          }}
        >
          <Link
            to="/buscar"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-ember text-bone font-bold text-lg rounded-xl hover:bg-ember-hot transition-colors btn-hover"
          >
            Buscar taller
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/registro"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-bone/5 backdrop-blur-md border border-bone/20 text-bone font-bold text-lg rounded-xl hover:bg-bone/10 transition-colors btn-hover"
          >
            Soy taller
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
