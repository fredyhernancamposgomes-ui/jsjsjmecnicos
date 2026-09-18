import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { talleres, testimonios, SERVICIOS, departamentos } from '../data';

// ============================================
// HOME - Rediseño premium, minimalista
// ============================================
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LogosStrip />
      <HowItWorksSection />
      <FeaturedTalleres />
      <ForTalleresSection />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
};

// ============================================
// HERO - Minimalista, tipografía gigante
// ============================================
const HeroSection: React.FC = () => {
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-radial-glow">
      {/* Grid sutil de fondo */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Línea decorativa superior */}
      <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-4xl">
          {/* Badge minimalista */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            <span className="text-xs text-ash font-medium tracking-wide">
              +500 talleres verificados en Perú
            </span>
          </div>

          {/* Headline gigante */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-bone mb-8 animate-slide-up">
            Llegamos hasta
            <br />
            donde más
            <br />
            <span className="text-gradient-ember italic font-normal">lo necesites.</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-lg sm:text-xl text-ash max-w-xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            La plataforma que conecta clientes con talleres de confianza y talleres con proveedores de repuestos. Calificados por la comunidad.
          </p>

          {/* Search bar inline */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex-1 flex items-center gap-2 px-4 py-3.5 bg-ink-soft border border-line rounded-xl">
              <svg className="w-4 h-4 text-smoke flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="flex-1 bg-transparent text-bone text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-ink-soft">Ubicación</option>
                {departamentos.map(d => (
                  <option key={d} value={d} className="bg-ink-soft">{d}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex items-center gap-2 px-4 py-3.5 bg-ink-soft border border-line rounded-xl">
              <svg className="w-4 h-4 text-smoke flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="flex-1 bg-transparent text-bone text-sm focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-ink-soft">Servicio</option>
                {SERVICIOS.map(s => (
                  <option key={s} value={s} className="bg-ink-soft">{s}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors"
            >
              Buscar
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Stats minimalistas */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-16 pt-8 border-t border-line-soft animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div>
              <div className="font-display text-2xl font-semibold text-bone">4.8<span className="text-ember">/5</span></div>
              <div className="text-xs text-smoke mt-0.5">Calificación promedio</div>
            </div>
            <div className="w-px h-10 bg-line-soft hidden sm:block" />
            <div>
              <div className="font-display text-2xl font-semibold text-bone">10k+</div>
              <div className="text-xs text-smoke mt-0.5">Clientes satisfechos</div>
            </div>
            <div className="w-px h-10 bg-line-soft hidden sm:block" />
            <div>
              <div className="font-display text-2xl font-semibold text-bone">24/7</div>
              <div className="text-xs text-smoke mt-0.5">Auxilio mecánico</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// LOGOS STRIP - "Confían en nosotros"
// ============================================
const LogosStrip: React.FC = () => {
  return (
    <section className="py-16 border-y border-line-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-xs text-smoke uppercase tracking-widest mb-8">
          Servicios disponibles en la plataforma
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {['Frenos', 'Motor', 'Eléctrico', 'Suspensión', 'Pintura', 'A/C', 'Diagnóstico', 'Auxilio 24/7'].map((s) => (
            <span key={s} className="text-sm text-ash font-medium">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS - Simple, tipográfico
// ============================================
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Busca',
      description: 'Encuentra talleres verificados cerca de ti. Filtra por servicio, calificación y disponibilidad.'
    },
    {
      num: '02',
      title: 'Conecta',
      description: 'El taller revisa tu solicitud y te envía un presupuesto transparente sin compromisos.'
    },
    {
      num: '03',
      title: 'Califica',
      description: 'Después del servicio, califica al taller. Tu opinión construye la reputación de la comunidad.'
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
            Cómo funciona
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight">
            Tres pasos. Sin complicaciones.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-ink p-10 hover:bg-ink-soft transition-colors group"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-smoke">{step.num}</span>
                <ArrowUpRight size={18} className="text-smoke group-hover:text-ember transition-colors" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-bone mb-4 tracking-tight">
                {step.title}.
              </h3>
              <p className="text-ash leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FEATURED TALLERES
// ============================================
const FeaturedTalleres: React.FC = () => {
  const featured = talleres.filter(t => t.verificado).slice(0, 4);

  return (
    <section className="py-32 px-6 lg:px-8 bg-ink-soft">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
              Destacados
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight">
              Talleres mejor calificados.
            </h2>
          </div>
          <Link
            to="/buscar"
            className="inline-flex items-center gap-2 text-sm text-bone hover:text-ember transition-colors group"
          >
            Ver todos los talleres
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden">
          {featured.map((taller) => (
            <Link
              key={taller.id}
              to={`/taller/${taller.id}`}
              className="bg-ink p-8 hover:bg-ink-soft transition-colors group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold">
                  {taller.nombre.charAt(0)}
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-ink-muted border border-line">
                  <Star size={12} className="text-ember fill-ember" />
                  <span className="text-xs text-bone font-medium">{taller.calificacion}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-bone mb-2 group-hover:text-ember transition-colors tracking-tight">
                {taller.nombre}
              </h3>
              <p className="text-sm text-smoke mb-6">
                {taller.distrito}, {taller.departamento}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {taller.servicios.slice(0, 3).map((s) => (
                  <span key={s} className="text-xs text-ash px-2.5 py-1 bg-ink-muted rounded-md border border-line-soft">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-line-soft">
                <span className="text-xs text-smoke">{taller.numResenas} reseñas</span>
                <ArrowRight size={14} className="text-smoke group-hover:text-ember group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOR TALLERES - Sección de conversión
// ============================================
const ForTalleresSection: React.FC = () => {
  const beneficios = [
    { title: 'Más clientes', desc: 'Aumenta tu visibilidad y recibe solicitudes de clientes verificados en tu zona.' },
    { title: 'Repuestos baratos', desc: 'Accede a nuestra red de proveedores con precios competitivos.' },
    { title: 'Reputación digital', desc: 'Construye tu reputación con calificaciones reales de clientes.' },
    { title: 'Sin comisiones', desc: 'Regístrate gratis. Aparece en búsquedas sin costos ocultos.' },
  ];

  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
              Para talleres
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight mb-6">
              Haz crecer tu taller sin intermediarios.
            </h2>
            <p className="text-lg text-ash leading-relaxed mb-10 max-w-lg">
              No somos un taller. Somos el puente. Te conectamos con clientes que buscan exactamente lo que tú ofreces.
            </p>

            <div className="space-y-5 mb-10">
              {beneficios.map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-ember-glow-strong border border-ember/20 flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-ember" />
                  </div>
                  <div>
                    <h4 className="text-bone font-medium mb-1">{b.title}</h4>
                    <p className="text-sm text-smoke leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/registro"
              className="inline-flex items-center gap-2 px-6 py-3 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors group"
            >
              Registrar mi taller
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual - Mockup limpio */}
          <div className="relative">
            <div className="bg-ink-soft rounded-2xl border border-line p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-line" />
                  <div className="w-2.5 h-2.5 rounded-full bg-line" />
                  <div className="w-2.5 h-2.5 rounded-full bg-line" />
                </div>
                <span className="text-xs text-smoke font-mono">tallerya.pe/talleres</span>
              </div>

              <div className="space-y-3">
                {talleres.slice(0, 4).map((taller, i) => (
                  <div
                    key={taller.id}
                    className="flex items-center gap-4 p-4 bg-ink rounded-xl border border-line-soft"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold text-sm">
                      {taller.nombre.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-bone text-sm font-medium truncate">{taller.nombre}</p>
                      <p className="text-smoke text-xs">{taller.distrito}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-ember fill-ember" />
                      <span className="text-bone text-xs font-medium">{taller.calificacion}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-line-soft">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-smoke">+500 talleres activos</span>
                  <span className="text-xs text-ember">En vivo</span>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-ember/5 rounded-3xl blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// TESTIMONIALS
// ============================================
const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonios.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 6000);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 6000);
  };

  return (
    <section className="py-32 px-6 lg:px-8 bg-ink-soft border-y border-line-soft">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4 text-center">
          Testimonios
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight text-center mb-16">
          Lo que dice la comunidad.
        </h2>

        <div className="relative">
          <div className="min-h-[280px] flex items-center">
            <div key={current} className="w-full animate-fade-in">
              <div className="text-center max-w-3xl mx-auto">
                {/* Quote */}
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-bone leading-snug tracking-tight mb-10 font-light">
                  "{testimonios[current].texto}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-semibold mb-3">
                    {testimonios[current].nombre.charAt(0)}
                  </div>
                  <p className="text-bone font-medium">{testimonios[current].nombre}</p>
                  <p className="text-sm text-smoke mt-1">{testimonios[current].rol}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1.5">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === current ? 'bg-ember w-8' : 'bg-line w-1'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
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
  return (
    <section className="py-32 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-bone leading-[1] mb-8">
          ¿Listo para
          <br />
          <span className="text-gradient-ember italic font-normal">empezar?</span>
        </h2>
        <p className="text-lg text-ash max-w-xl mx-auto mb-12 leading-relaxed">
          Únete a la comunidad automotriz más grande del Perú. Clientes, talleres y proveedores, todos en un solo lugar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/buscar"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors group"
          >
            Buscar taller
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/registro"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-line text-bone font-medium rounded-xl hover:border-bone transition-colors"
          >
            Soy taller
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
