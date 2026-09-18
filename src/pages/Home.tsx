import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ChevronLeft, ChevronRight, MessageCircle, Wrench, Shield, Zap } from 'lucide-react';
import { talleres, testimonios, SERVICIOS, departamentos } from '../data';
import { useInView, useScrollProgress, useCountUp } from '../hooks/useAnimations';
import { WordReveal, MagneticButton, ScrollReveal } from '../components/Animations';

// Imágenes
const IMG = {
  hero: 'https://image.qwenlm.ai/generated-images/7277ed6c-aeb8-4843-afba-1397604b3390/_result.png',
  workshop: 'https://image.qwenlm.ai/generated-images/fedb225b-b980-4a27-b64c-45ee2c976091/_result.png',
  auxilio: 'https://image.qwenlm.ai/generated-images/0ef27cd8-5895-4585-aa49-5a8b2b0b6ea8/_result.png',
  customer1: 'https://image.qwenlm.ai/generated-images/a6ed3c56-f377-4892-b4d4-d1b1dd530bbf/_result.png',
  owner: 'https://image.qwenlm.ai/generated-images/e0f9423d-ddf5-401a-8c41-1a6cf10ac847/_result.png',
  mechanic: 'https://image.qwenlm.ai/generated-images/9b90cf1e-c5c4-4f71-8c2f-515a4ac8963a/_result.png',
};

// ============================================
// HOME - ALTAMENTE PROFESIONAL Y ORGÁSMICO
// ============================================
const Home: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      <HeroSection />
      <ManifestoSection />
      <AuxilioSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedTalleres />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
};

// ============================================
// HERO - COMPOSICIÓN ASIMÉTRICA
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      </div>

      {/* Content - Asimétrico */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto - Izquierda (60%) */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <ScrollReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-10 glow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ember"></span>
                </span>
                <span className="text-sm text-white/90 font-medium tracking-wide">
                  +500 talleres verificados en Perú
                </span>
              </div>
            </ScrollReveal>

            {/* Headline */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tight leading-[0.85] text-white mb-10">
              <WordReveal delay={0.3}>Llegamos</WordReveal>
              <br />
              <WordReveal delay={0.5}>hasta donde</WordReveal>
              <br />
              <span className="text-ember">
                <WordReveal delay={0.7}>más lo</WordReveal>
              </span>
              <br />
              <span className="text-ember">
                <WordReveal delay={0.9}>necesites.</WordReveal>
              </span>
            </h1>

            {/* Subtitle */}
            <ScrollReveal delay={1.1}>
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-12">
                La plataforma que conecta clientes con talleres de confianza y talleres con proveedores de repuestos.
              </p>
            </ScrollReveal>

            {/* Search */}
            <ScrollReveal delay={1.3}>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <select
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="flex-1 px-5 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white focus:outline-none focus:border-ember focus:glow-sm transition-all"
                >
                  <option value="">Ubicación</option>
                  {departamentos.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="flex-1 px-5 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white focus:outline-none focus:border-ember focus:glow-sm transition-all"
                >
                  <option value="">Servicio</option>
                  {SERVICIOS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <MagneticButton>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-ember text-white font-semibold rounded-xl hover:bg-ember-hot transition-all btn-premium glow-sm"
                  >
                    Buscar
                  </button>
                </MagneticButton>
              </form>
            </ScrollReveal>
          </div>

          {/* Imagen - Derecha (40%) - Solo en desktop */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
              <img
                src={IMG.workshop}
                alt="Taller profesional"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              
              {/* Stats flotantes */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                <div className="flex-1 bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Star size={16} className="text-ember fill-ember" />
                    <span className="text-white font-bold text-lg">4.8</span>
                  </div>
                  <p className="text-white/60 text-xs">Calificación</p>
                </div>
                <div className="flex-1 bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={16} className="text-ember" />
                    <span className="text-white font-bold text-lg">100%</span>
                  </div>
                  <p className="text-white/60 text-xs">Verificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">01</div>
    </section>
  );
};

// ============================================
// MANIFIESTO - SIMPLE Y PODEROSO
// ============================================
const ManifestoSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="py-48 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <p 
          className="text-sm text-ember uppercase tracking-[0.2em] font-semibold mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.2s'
          }}
        >
          Nuestro manifiesto
        </p>
        
        {/* Línea decorativa */}
        <div className="w-24 h-px bg-ember mx-auto mb-12" />
        
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white">
          <WordReveal delay={0.3}>No somos un taller.</WordReveal>
          <br />
          <WordReveal delay={0.6}>Somos el puente entre</WordReveal>
          <br />
          <span className="text-ember link-underline">
            <WordReveal delay={0.9}>quien necesita</WordReveal>
          </span>
          <br />
          <WordReveal delay={1.2}>y quien sabe hacer.</WordReveal>
        </h2>
      </div>

      {/* Número de sección */}
      <div className="section-number">02</div>
    </section>
  );
};

// ============================================
// AUXILIO 24/7 - EL CLÍMAX
// ============================================
const AuxilioSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={IMG.auxilio} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-md border-2 border-ember rounded-full mb-10 glow-md">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-ember animate-ping opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ember"></span>
              </div>
              <span className="text-white font-bold tracking-wide">DISPONIBLE 24/7</span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.85] text-white mb-8">
            <WordReveal delay={0.3}>Auxilio</WordReveal>
            <br />
            <WordReveal delay={0.5}>mecánico</WordReveal>
            <br />
            <span className="text-ember">
              <WordReveal delay={0.7}>24/7.</WordReveal>
            </span>
          </h2>

          {/* Subtitle */}
          <ScrollReveal delay={0.9}>
            <p className="text-2xl text-white/80 max-w-2xl leading-relaxed mb-12">
              Se te averió el auto en la carretera a las 3am? <span className="text-white font-semibold">Llegamos en 30 minutos.</span>
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={1.1}>
            <MagneticButton>
              <a
                href="https://wa.me/51999999999?text=Necesito auxilio mecánico urgente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-ember text-white font-bold text-lg rounded-xl hover:bg-ember-hot transition-all btn-premium glow-lg"
              >
                <MessageCircle size={20} />
                Solicitar auxilio ahora
                <ArrowRight size={18} />
              </a>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">03</div>
    </section>
  );
};

// ============================================
// STATS - NÚMEROS IMPACTANTES
// ============================================
const StatsSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  const talleresCount = useCountUp(500, 2000, isVisible);
  const clientesCount = useCountUp(10, 1500, isVisible);
  const ratingCount = useCountUp(48, 1800, isVisible);

  return (
    <section ref={ref} className="py-48 px-6 lg:px-8 border-y border-line">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <div className="text-center md:text-left">
            <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none mb-4">
              {talleresCount}<span className="text-ember text-6xl sm:text-7xl lg:text-8xl">+</span>
            </div>
            <p className="text-white/60 text-lg font-medium">Talleres verificados</p>
          </div>
          <div className="text-center md:text-left md:border-x border-line px-8">
            <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-none mb-4">
              {clientesCount}<span className="text-ember text-6xl sm:text-7xl lg:text-8xl">K+</span>
            </div>
            <p className="text-white/60 text-lg font-medium">Clientes satisfechos</p>
          </div>
          <div className="text-center md:text-left">
            <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none mb-4">
              <span className="text-white">{(ratingCount / 10).toFixed(1)}</span>
              <span className="text-ember text-6xl sm:text-7xl lg:text-8xl">★</span>
            </div>
            <p className="text-white/60 text-lg font-medium">Calificación promedio</p>
          </div>
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">04</div>
    </section>
  );
};

// ============================================
// SERVICIOS - GRID ASIMÉTRICO
// ============================================
const ServicesSection: React.FC = () => {
  const services = [
    { name: 'Frenos', icon: <Shield size={24} />, large: true },
    { name: 'Motor', icon: <Wrench size={24} /> },
    { name: 'Eléctrico', icon: <Zap size={24} /> },
    { name: 'Suspensión', icon: <Wrench size={24} /> },
    { name: 'Pintura', icon: <Wrench size={24} /> },
    { name: 'Aire acondicionado', icon: <Wrench size={24} /> },
  ];

  return (
    <section className="py-48 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <p className="text-sm text-ember uppercase tracking-[0.2em] font-semibold mb-4">Servicios</p>
            <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Todo lo que tu auto necesita.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((servicio, i) => (
            <ScrollReveal key={servicio.name} delay={i * 0.1}>
              <div className={`group p-8 bg-ink-soft rounded-2xl border border-white/5 hover:border-ember/50 transition-all card-premium ${servicio.large ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-ember/10 flex items-center justify-center text-ember mb-6 group-hover:scale-110 transition-transform">
                  {servicio.icon}
                </div>
                <h3 className="font-display text-2xl font-semibold text-white mb-3 group-hover:text-ember transition-colors">
                  {servicio.name}
                </h3>
                <p className="text-white/60">
                  Servicio profesional con garantía y técnicos certificados.
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">05</div>
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
    <section className="py-48 px-6 lg:px-8 bg-ink-soft relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <ScrollReveal>
            <div>
              <p className="text-sm text-ember uppercase tracking-[0.2em] font-semibold mb-4">Destacados</p>
              <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white">
                Los mejor calificados.
              </h2>
            </div>
          </ScrollReveal>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all btn-premium">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-all btn-premium">
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
            className="flex-shrink-0 w-[360px] bg-ink rounded-2xl border border-white/5 overflow-hidden group card-premium"
          >
            <div className="h-56 relative overflow-hidden">
              <img src={IMG.workshop} alt={taller.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                <Star size={14} className="text-ember fill-ember" />
                <span className="text-white text-sm font-bold">{taller.calificacion}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-white group-hover:text-ember transition-colors mb-2">
                {taller.nombre}
              </h3>
              <p className="text-white/60 text-sm mb-4">{taller.distrito}</p>
              <div className="flex items-center justify-between pt-4 border-t border-line">
                <span className="text-white/60 text-sm">{taller.numResenas} reseñas</span>
                <ArrowRight size={16} className="text-white/60 group-hover:text-ember group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
        <div className="w-6 lg:w-8 flex-shrink-0" />
      </div>

      {/* Número de sección */}
      <div className="section-number">06</div>
    </section>
  );
};

// ============================================
// TESTIMONIOS
// ============================================
const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const photos = [IMG.customer1, IMG.owner, IMG.mechanic, IMG.customer1];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <section className="py-48 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm text-ember uppercase tracking-[0.2em] font-semibold mb-4">Testimonios</p>
            <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-white">
              Lo que dice la comunidad.
            </h2>
          </div>
        </ScrollReveal>

        <div key={current} className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
              <img src={photos[current]} alt={testimonios[current].nombre} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-6xl text-ember/20 font-serif mb-4">"</div>
              <p className="font-display text-3xl text-white leading-snug mb-8">
                {testimonios[current].texto}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ember/20 flex items-center justify-center text-ember font-bold">
                  {testimonios[current].nombre.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonios[current].nombre}</p>
                  <p className="text-white/60 text-sm">{testimonios[current].rol}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonios.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all ${i === current ? 'bg-ember w-8' : 'bg-line w-4'}`}
            />
          ))}
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">07</div>
    </section>
  );
};

// ============================================
// CTA FINAL
// ============================================
const FinalCTA: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="py-64 px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      <div className="max-w-4xl mx-auto text-center relative">
        <h2
          className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          ¿Listo para
          <br />
          <span className="text-ember">empezar?</span>
        </h2>
        <p
          className="text-xl text-white/70 max-w-2xl mx-auto mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.3s'
          }}
        >
          Únete a la comunidad automotriz más grande del Perú.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s'
          }}
        >
          <MagneticButton>
            <Link
              to="/buscar"
              className="inline-flex items-center gap-2 px-10 py-5 bg-ember text-white font-bold text-lg rounded-xl hover:bg-ember-hot transition-all btn-premium glow-md"
            >
              Buscar taller
              <ArrowRight size={18} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/10 hover:border-white/40 transition-all btn-premium"
            >
              Soy taller
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Número de sección */}
      <div className="section-number">08</div>
    </section>
  );
};

export default Home;
