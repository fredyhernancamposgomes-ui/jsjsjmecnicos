import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { talleres, testimonios, SERVICIOS, departamentos } from '../data';
import { useInView, useScrollProgress, useCountUp } from '../hooks/useAnimations';
import { TextReveal, WordReveal, ParallaxImage, MagneticButton, ScrollReveal } from '../components/Animations';

// Imágenes
const IMG = {
  hero: 'https://image.qwenlm.ai/generated-images/7277ed6c-aeb8-4843-afba-1397604b3390/_result.png',
  workshop: 'https://image.qwenlm.ai/generated-images/fedb225b-b980-4a27-b64c-45ee2c976091/_result.png',
  brakes: 'https://image.qwenlm.ai/generated-images/fc835050-224c-40d5-a301-aafa8cd4b825/_result.png',
  oilFilter: 'https://image.qwenlm.ai/generated-images/61cd071d-5c5b-415a-8ea8-59ff5043a17a/_result.png',
  shock: 'https://image.qwenlm.ai/generated-images/97a9252e-260e-458b-821b-962ac0ce9fb5/_result.png',
  customer1: 'https://image.qwenlm.ai/generated-images/a6ed3c56-f377-4892-b4d4-d1b1dd530bbf/_result.png',
  owner: 'https://image.qwenlm.ai/generated-images/e0f9423d-ddf5-401a-8c41-1a6cf10ac847/_result.png',
  mechanic: 'https://image.qwenlm.ai/generated-images/9b90cf1e-c5c4-4f71-8c2f-515a4ac8963a/_result.png',
  battery: 'https://image.qwenlm.ai/generated-images/aa5c6d96-3dd0-49a3-b8f0-a777396422c9/_result.png',
  oil: 'https://image.qwenlm.ai/generated-images/959a999e-5841-460f-8d3a-0f2a5795f7c0/_result.png',
};

// ============================================
// HOME - EXPERIENCIA WOW PREMIUM
// ============================================
const Home: React.FC = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      <HeroSection />
      <ManifestoSection />
      <AuxilioSection /> {/* CLÍMAX - Auxilio 24/7 */}
      <StatsSection />
      <BentoServices />
      <HowItWorks />
      <FeaturedTalleres />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
};

// ============================================
// HERO - Cinematográfico con parallax
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
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background image con parallax */}
      <div className="absolute inset-0 scale-110">
        <img
          src={IMG.hero}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-50' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          style={{ transform: 'scale(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-5xl">
          {/* Badge */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember"></span>
              </span>
              <span className="text-xs text-ash font-medium tracking-wide">
                +500 talleres verificados en todo el Perú
              </span>
            </div>
          </ScrollReveal>

          {/* Headline masivo con Instrument Serif */}
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.02em] leading-[0.85] text-bone mb-12">
            <WordReveal delay={0.3}>Llegamos hasta</WordReveal>
            <br />
            <WordReveal delay={0.5}>donde más</WordReveal>
            <br />
            <span className="text-gradient-ember italic">
              <WordReveal delay={0.7}>lo necesites.</WordReveal>
            </span>
          </h1>

          {/* Subtítulo */}
          <ScrollReveal delay={0.9}>
            <p className="text-lg sm:text-xl text-ash max-w-xl leading-relaxed mb-12 font-body">
              La plataforma que conecta clientes con talleres de confianza y talleres con proveedores de repuestos.
            </p>
          </ScrollReveal>

          {/* Search bar */}
          <ScrollReveal delay={1.1}>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 px-5 py-4 glass rounded-2xl">
                <svg className="w-4 h-4 text-smoke flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <select
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="flex-1 bg-transparent text-bone text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-ink">Ubicación</option>
                  {departamentos.map(d => (
                    <option key={d} value={d} className="bg-ink">{d}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 flex items-center gap-3 px-5 py-4 glass rounded-2xl">
                <svg className="w-4 h-4 text-smoke flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                <select
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                  className="flex-1 bg-transparent text-bone text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-ink">Servicio</option>
                  {SERVICIOS.map(s => (
                    <option key={s} value={s} className="bg-ink">{s}</option>
                  ))}
                </select>
              </div>

              <MagneticButton>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ember text-ink font-semibold rounded-2xl hover:bg-ember-soft transition-all glow-on-hover group"
                >
                  Buscar
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-smoke uppercase tracking-widest font-grotesk">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-ember to-transparent" />
      </div>
    </section>
  );
};

// ============================================
// MANIFIESTO - Texto gigante que ocupa toda la pantalla
// ============================================
const ManifestoSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="py-64 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-6xl">
          <p 
            className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.2s'
            }}
          >
            Nuestro manifiesto
          </p>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.02em] leading-[1.15] text-bone">
            <WordReveal delay={0.3}>No somos un taller.</WordReveal>
            <br />
            <WordReveal delay={0.6}>Somos el puente entre</WordReveal>
            <br />
            <span className="text-gradient-ember italic">
              <WordReveal delay={0.9}>quien necesita</WordReveal>
            </span>
            <br />
            <WordReveal delay={1.2}>y quien sabe hacer.</WordReveal>
          </h2>
        </div>
      </div>
    </section>
  );
};

// ============================================
// AUXILIO 24/7 - EL CLÍMAX
// ============================================
const AuxilioSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  const [availableTechs, setAvailableTechs] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableTechs(Math.floor(Math.random() * 3) + 2); // 2-4 técnicos
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image cinematográfica */}
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/0ef27cd8-5895-4585-aa49-5a8b2b0b6ea8/_result.png"
          alt="Auxilio mecánico 24/7"
          className="w-full h-full object-cover"
        />
        {/* Overlay dramático */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/80" />
      </div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-4xl">
          {/* Badge urgente */}
          <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-3 px-5 py-3 glass rounded-full mb-10 border-2 border-ember/30">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-ember animate-ping opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-ember"></span>
              </div>
              <span className="text-sm text-bone font-semibold tracking-wide">
                DISPONIBLE AHORA · {availableTechs} TÉCNICOS EN LÍNEA
              </span>
            </div>
          </ScrollReveal>

          {/* Headline masivo */}
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.03em] leading-[0.85] text-bone mb-8">
            <WordReveal delay={0.3}>Auxilio</WordReveal>
            <br />
            <WordReveal delay={0.5}>mecánico</WordReveal>
            <br />
            <span className="text-gradient-ember italic">
              <WordReveal delay={0.7}>24/7.</WordReveal>
            </span>
          </h2>

          {/* Subtítulo dramático */}
          <ScrollReveal delay={0.9}>
            <p className="text-xl sm:text-2xl text-ash max-w-2xl leading-relaxed mb-12 font-body">
              Se te averió el auto en la carretera a las 3am? <span className="text-bone font-semibold">Llegamos en 30 minutos o menos.</span> En cualquier punto del Perú.
            </p>
          </ScrollReveal>

          {/* Stats en tiempo real */}
          <ScrollReveal delay={1.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="glass rounded-2xl p-6 border border-ember/20">
                <div className="font-display text-5xl font-normal text-ember mb-2">30min</div>
                <p className="text-sm text-ash">Tiempo de respuesta promedio</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-ember/20">
                <div className="font-display text-5xl font-normal text-ember mb-2">24/7</div>
                <p className="text-sm text-ash">Disponibilidad total</p>
              </div>
              <div className="glass rounded-2xl p-6 border border-ember/20">
                <div className="font-display text-5xl font-normal text-ember mb-2">100%</div>
                <p className="text-sm text-ash">Cobertura nacional</p>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA gigante */}
          <ScrollReveal delay={1.3}>
            <MagneticButton>
              <a
                href="https://wa.me/51999999999?text=¡Necesito auxilio mecánico urgente!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-ember text-ink font-bold text-xl rounded-2xl hover:bg-ember-hot transition-all glow-on-hover group shadow-2xl shadow-ember/30"
              >
                <MessageCircle size={24} />
                SOLICITAR AUXILIO AHORA
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================
// STATS - Números gigantes
// ============================================
const StatsSection: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);
  const talleres = useCountUp(500, 2000, isVisible);
  const clientes = useCountUp(10, 1500, isVisible);
  const rating = useCountUp(48, 1800, isVisible);

  return (
    <section ref={ref} className="py-56 px-6 lg:px-8 border-y border-line-soft relative overflow-hidden">
      {/* Glow background más intenso */}
      <div className="absolute inset-0 mesh-gradient opacity-80" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-16">
          <div className="text-center md:text-left">
            <div className="font-display text-8xl sm:text-9xl font-normal tracking-tighter text-bone leading-none">
              {talleres}<span className="text-ember-hot">+</span>
            </div>
            <p className="text-sm text-ember uppercase tracking-widest font-grotesk mt-8 font-semibold">Talleres verificados</p>
          </div>
          <div className="text-center md:text-left md:border-x border-line-soft px-8">
            <div className="font-display text-8xl sm:text-9xl font-normal tracking-tighter text-bone leading-none">
              {clientes}<span className="text-ember-hot">K+</span>
            </div>
            <p className="text-sm text-ember uppercase tracking-widest font-grotesk mt-8 font-semibold">Clientes satisfechos</p>
          </div>
          <div className="text-center md:text-left">
            <div className="font-display text-8xl sm:text-9xl font-normal tracking-tighter leading-none">
              <span className="text-bone">{(rating / 10).toFixed(1)}</span><span className="text-ember-hot">★</span>
            </div>
            <p className="text-sm text-ember uppercase tracking-widest font-grotesk mt-8 font-semibold">Calificación promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BENTO GRID - Apple style
// ============================================
const BentoServices: React.FC = () => {
  return (
    <section className="py-64 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mb-24">
            <p className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium mb-6">Servicios</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.02em] leading-[0.9] text-bone">
              Todo lo que tu auto
              <span className="italic text-gradient-ember"> necesita.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[220px] md:auto-rows-[280px]">
          {/* Card grande */}
          <ScrollReveal delay={0.1} className="md:col-span-4 md:row-span-2">
            <div className="relative h-full rounded-3xl overflow-hidden group card-shine">
              <ParallaxImage src={IMG.workshop} alt="Taller" className="absolute inset-0 w-full h-full" speed={0.2} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium">Talleres certificados</span>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-bone mt-3 tracking-tight">
                  Encuentra el taller perfecto
                </h3>
                <Link to="/buscar" className="inline-flex items-center gap-2 mt-6 text-bone text-sm font-medium group-hover:text-ember transition-colors">
                  Explorar talleres
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card repuestos */}
          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="relative h-full rounded-3xl overflow-hidden group card-shine bg-ink-soft border border-line-soft">
              <ParallaxImage src={IMG.brakes} alt="Repuestos" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80" speed={0.15} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="relative p-6 h-full flex flex-col justify-end">
                <span className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium">Repuestos</span>
                <h3 className="font-display text-2xl font-normal text-bone mt-2">Precios mayoristas</h3>
                <Link to="/tienda" className="inline-flex items-center gap-1 mt-3 text-ash text-xs group-hover:text-ember transition-colors">
                  Ver catálogo <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Card aceite */}
          <ScrollReveal delay={0.3} className="md:col-span-2">
            <div className="relative h-full rounded-3xl overflow-hidden group card-shine bg-ink-soft border border-line-soft">
              <ParallaxImage src={IMG.oil} alt="Aceite" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-80" speed={0.15} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="relative p-6 h-full flex flex-col justify-end">
                <span className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium">Lubricantes</span>
                <h3 className="font-display text-2xl font-normal text-bone mt-2">Aceites premium</h3>
              </div>
            </div>
          </ScrollReveal>

          {/* Card suspensión */}
          <ScrollReveal delay={0.4} className="md:col-span-3">
            <div className="relative h-full rounded-3xl overflow-hidden group card-shine bg-ink-soft border border-line-soft">
              <ParallaxImage src={IMG.shock} alt="Suspensión" className="absolute inset-0 w-full h-full opacity-50 group-hover:opacity-70" speed={0.15} />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-transparent" />
              <div className="relative p-6 h-full flex flex-col justify-center">
                <span className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium">Suspensión</span>
                <h3 className="font-display text-2xl font-normal text-bone mt-2">Amortiguadores y más</h3>
              </div>
            </div>
          </ScrollReveal>

          {/* Card auxilio 24/7 */}
          <ScrollReveal delay={0.5} className="md:col-span-3">
            <div className="relative h-full rounded-3xl overflow-hidden group bg-gradient-to-br from-ember/20 to-ink-soft border border-ember/20">
              <div className="relative p-6 h-full flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-3 h-3">
                    <span className="absolute inset-0 rounded-full bg-ember animate-ping opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-ember" />
                  </div>
                  <span className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium">Disponible ahora</span>
                </div>
                <h3 className="font-display text-3xl font-normal text-bone tracking-tight">
                  Auxilio mecánico <span className="italic text-gradient-ember">24/7</span>
                </h3>
                <p className="text-ash mt-2 text-sm">Llegamos a donde estés, a la hora que sea.</p>
                <a href="https://wa.me/51999999999" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-ember text-ink text-sm font-semibold rounded-xl hover:bg-ember-soft transition-colors w-fit">
                  Solicitar ahora
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS - Scroll storytelling
// ============================================
const HowItWorks: React.FC = () => {
  const steps = [
    { num: '01', title: 'Busca', desc: 'Filtra por ubicación, servicio y calificación. Encuentra el taller perfecto en segundos.' },
    { num: '02', title: 'Conecta', desc: 'Recibe presupuestos transparentes. Sin compromisos, sin sorpresas.' },
    { num: '03', title: 'Califica', desc: 'Tu opinión construye la comunidad. Cada reseña ayuda al siguiente cliente.' },
  ];

  return (
    <section className="py-64 px-6 lg:px-8 bg-ink-soft border-y border-line-soft">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="max-w-3xl mb-32">
            <p className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium mb-6">Cómo funciona</p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-[-0.02em] leading-[0.9] text-bone">
              Tres pasos.
              <br />
              <span className="italic text-gradient-ember">Sin complicaciones.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-px">
          {steps.map((step, i) => (
            <StepRow key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepRow: React.FC<{ step: { num: string; title: string; desc: string }; index: number }> = ({ step, index }) => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <div
      ref={ref}
      className="group border-b border-line-soft py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-ink transition-colors"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`
      }}
    >
      <div className="md:col-span-1">
        <span className="font-mono text-sm text-smoke font-grotesk">{step.num}</span>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-display text-5xl sm:text-6xl font-normal text-bone tracking-tight group-hover:text-ember transition-colors">
          {step.title}.
        </h3>
      </div>
      <div className="md:col-span-7">
        <p className="text-lg text-ash leading-relaxed max-w-lg">{step.desc}</p>
      </div>
      <div className="md:col-span-1 flex justify-end">
        <ArrowUpRight size={20} className="text-smoke group-hover:text-ember group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>
    </div>
  );
};

// ============================================
// FEATURED TALLERES - Scroll horizontal
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
    <section className="py-64 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <ScrollReveal>
            <div>
              <p className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium mb-6">Destacados</p>
              <h2 className="font-display text-5xl sm:text-6xl font-normal tracking-[-0.02em] text-bone">
                Los mejor <span className="italic text-gradient-ember">calificados.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-6 lg:px-8 pb-4 -mx-6 lg:-mx-8 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        <div className="w-6 lg:w-8 flex-shrink-0" />
        {featured.map((taller, i) => (
          <ScrollReveal key={taller.id} delay={i * 0.1} className="flex-shrink-0 w-[340px] snap-start">
            <Link
              to={`/taller/${taller.id}`}
              className="block bg-ink-soft rounded-3xl border border-line-soft overflow-hidden group card-shine hover:border-ember/30 transition-all"
            >
              <div className="h-52 relative overflow-hidden">
                <img src={IMG.workshop} alt={taller.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-soft to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 glass rounded-full">
                  <Star size={12} className="text-ember fill-ember" />
                  <span className="text-xs text-bone font-medium">{taller.calificacion}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-normal text-bone group-hover:text-ember transition-colors tracking-tight">
                  {taller.nombre}
                </h3>
                <p className="text-sm text-smoke mt-1">{taller.distrito}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {taller.servicios.slice(0, 2).map(s => (
                    <span key={s} className="text-xs text-ash px-2 py-1 bg-ink rounded-md">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-line-soft">
                  <span className="text-xs text-smoke">{taller.numResenas} reseñas</span>
                  <ArrowUpRight size={14} className="text-smoke group-hover:text-ember transition-colors" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
        <div className="w-6 lg:w-8 flex-shrink-0" />
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIOS con fotos reales
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
    <section className="py-64 px-6 lg:px-8 bg-ink-soft border-y border-line-soft">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-24">
            <p className="text-xs text-ember uppercase tracking-widest font-grotesk font-medium mb-6">Testimonios</p>
            <h2 className="font-display text-5xl sm:text-6xl font-normal tracking-[-0.02em] text-bone">
              Lo que dice la <span className="italic text-gradient-ember">comunidad.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div key={current} className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img src={photos[current]} alt={testimonios[current].nombre} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 float">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-ember fill-ember" />
                    ))}
                  </div>
                  <p className="text-xs text-ash">Calificación perfecta</p>
                </div>
              </div>

              <div>
                <p className="font-display text-3xl sm:text-4xl text-bone leading-snug tracking-tight font-normal mb-8">
                  "{testimonios[current].texto}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold">
                    {testimonios[current].nombre.charAt(0)}
                  </div>
                  <div>
                    <p className="text-bone font-medium">{testimonios[current].nombre}</p>
                    <p className="text-sm text-smoke">{testimonios[current].rol}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-12">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all ${i === current ? 'bg-ember w-8' : 'bg-line w-4'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FINAL CTA
// ============================================
const FinalCTA: React.FC = () => {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section ref={ref} className="py-72 px-6 lg:px-8 relative overflow-hidden">
      {/* Dramatic background más intenso */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 mesh-gradient opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-ember/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent" />
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative">
        <h2
          className="font-display text-7xl sm:text-8xl md:text-9xl font-normal tracking-[-0.03em] leading-[0.85] text-bone mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          ¿Listo para
          <br />
          <span className="text-gradient-ember italic">empezar?</span>
        </h2>
        <p
          className="text-xl text-ash max-w-2xl mx-auto mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease 0.3s'
          }}
        >
          Únete a la comunidad automotriz más grande del Perú.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.5s'
          }}
        >
          <MagneticButton>
            <Link
              to="/buscar"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-ember text-ink font-bold rounded-2xl hover:bg-ember-hot transition-all glow-on-hover group text-xl shadow-2xl shadow-ember/40"
            >
              Buscar taller
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              to="/registro"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 border-2 border-ember text-ember font-bold rounded-2xl hover:border-ember-hot hover:bg-ember/10 transition-all text-xl"
            >
              Soy taller
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Home;
