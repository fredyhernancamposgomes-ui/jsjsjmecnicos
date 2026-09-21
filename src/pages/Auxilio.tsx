import React from 'react';
import { MessageCircle, Clock, MapPin, Phone, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../components/Animations';

// Imagen de auxilio
const IMG = {
  auxilio: 'https://image.qwenlm.ai/generated-images/0ef27cd8-5895-4585-aa49-5a8b2b0b6ea8/_result.png',
};

const AuxilioPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero con imagen de fondo */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden mb-20">
        <div className="absolute inset-0">
          <img src={IMG.auxilio} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <ScrollReveal>
            <p className="text-sm text-ember uppercase tracking-widest font-semibold mb-4">
              Servicio de emergencia
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-bone mb-6">
              Auxilio mecánico 24/7
            </h1>
            <p className="text-xl text-ash max-w-2xl leading-relaxed mb-8">
              Llegamos en 30 minutos o menos. Disponible las 24 horas, los 7 días de la semana, en todo el Perú.
            </p>
            <a
              href="https://wa.me/51999999999?text=Necesito auxilio mecánico urgente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-ember text-bone font-bold text-lg rounded-xl hover:bg-ember-hot transition-colors btn-hover"
            >
              <MessageCircle size={24} />
              Solicitar auxilio ahora
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Características */}
      <section className="px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="bg-ink-soft rounded-2xl border border-bone/5 p-8 text-center">
                <div className="w-16 h-16 rounded-xl bg-ember/10 flex items-center justify-center text-ember mx-auto mb-6">
                  <Clock size={32} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bone mb-3">
                  30 minutos
                </h3>
                <p className="text-ash">
                  Tiempo promedio de respuesta en zonas urbanas. Llegamos rápido cuando más lo necesitas.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-ink-soft rounded-2xl border border-bone/5 p-8 text-center">
                <div className="w-16 h-16 rounded-xl bg-ember/10 flex items-center justify-center text-ember mx-auto mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bone mb-3">
                  Cobertura nacional
                </h3>
                <p className="text-ash">
                  Presentes en las principales ciudades del Perú. Lima, Arequipa, Trujillo, Cusco y más.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bg-ink-soft rounded-2xl border border-bone/5 p-8 text-center">
                <div className="w-16 h-16 rounded-xl bg-ember/10 flex items-center justify-center text-ember mx-auto mb-6">
                  <Phone size={32} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-bone mb-3">
                  24/7 disponible
                </h3>
                <p className="text-ash">
                  No importa la hora. Estamos disponibles las 24 horas, los 365 días del año.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-bone mb-12 text-center">
              ¿Qué incluye nuestro servicio?
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              'Diagnóstico inicial gratuito',
              'Reparaciones menores en el lugar',
              'Servicio de grúa si es necesario',
              'Transporte a taller certificado',
              'Seguimiento en tiempo real',
              'Técnicos certificados y experimentados',
              'Precios transparentes sin sorpresas',
              'Garantía en todas las reparaciones'
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 p-6 bg-ink-soft rounded-xl border border-bone/5">
                  <CheckCircle size={24} className="text-ember flex-shrink-0" />
                  <span className="text-bone text-lg">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-bone mb-12 text-center">
              ¿Cómo funciona?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ember text-bone font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                  1
                </div>
                <h3 className="font-display text-xl font-semibold text-bone mb-3">
                  Contáctanos
                </h3>
                <p className="text-ash">
                  Llámanos o escríbenos por WhatsApp. Cuéntanos tu problema y ubicación.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ember text-bone font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                  2
                </div>
                <h3 className="font-display text-xl font-semibold text-bone mb-3">
                  Te ubicamos
                </h3>
                <p className="text-ash">
                  Enviamos al técnico más cercano. Te damos tiempo estimado de llegada.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-ember text-bone font-bold text-2xl flex items-center justify-center mx-auto mb-6">
                  3
                </div>
                <h3 className="font-display text-xl font-semibold text-bone mb-3">
                  Resolvemos
                </h3>
                <p className="text-ash">
                  Diagnosticamos y reparamos. Si es necesario, te llevamos a un taller certificado.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-ink-soft rounded-3xl border border-bone/5 p-12">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-bone mb-6">
              ¿Necesitas ayuda ahora?
            </h2>
            <p className="text-lg text-ash mb-8">
              No esperes más. Nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/51999999999?text=Necesito auxilio mecánico urgente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-ember text-bone font-bold text-lg rounded-xl hover:bg-ember-hot transition-colors btn-hover"
              >
                <MessageCircle size={24} />
                WhatsApp
              </a>
              <a
                href="tel:+51999999999"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-bone/5 border border-bone/20 text-bone font-bold text-lg rounded-xl hover:bg-bone/10 transition-colors btn-hover"
              >
                <Phone size={24} />
                Llamar ahora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AuxilioPage;
