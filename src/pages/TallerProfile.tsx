import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, Clock, Check, ArrowLeft, MessageCircle, Send, ArrowUpRight } from 'lucide-react';
import { talleres, resenas } from '../data';

// ============================================
// PERFIL DEL TALLER - Premium
// ============================================
const TallerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const taller = talleres.find(t => t.id === id);
  const tallerResenas = resenas.filter(r => r.tallerId === id);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!taller) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold text-bone mb-4">Taller no encontrado</h2>
          <Link to="/buscar" className="text-ember hover:text-ember-soft transition-colors">Volver a buscar</Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating > 0 && reviewText.trim()) {
      setSubmitted(true);
      setReviewText('');
      setUserRating(0);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8">
        <Link to="/buscar" className="inline-flex items-center gap-2 text-sm text-smoke hover:text-bone transition-colors">
          <ArrowLeft size={14} />
          Volver
        </Link>
      </div>

      {/* Header del taller */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember font-display text-3xl font-semibold flex-shrink-0">
              {taller.nombre.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-bone">
                  {taller.nombre}
                </h1>
                {taller.verificado && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-medium">
                    <Check size={10} />
                    Verificado
                  </span>
                )}
              </div>

              <p className="text-ash flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-smoke" />
                {taller.direccion}, {taller.distrito}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-ember fill-ember" />
                  <span className="text-bone font-semibold">{taller.calificacion}</span>
                  <span className="text-smoke text-sm">({taller.numResenas} reseñas)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-smoke">
                  <Clock size={14} />
                  {taller.horario}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 lg:flex-shrink-0">
            <a
              href={`https://wa.me/${taller.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={`tel:${taller.telefono}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-line text-bone font-medium rounded-xl hover:border-bone transition-colors"
            >
              <Phone size={16} />
              Llamar
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <section>
              <h2 className="text-xs text-ember uppercase tracking-widest font-medium mb-6">Sobre el taller</h2>
              <p className="text-ash text-lg leading-relaxed">{taller.descripcion}</p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-xs text-ember uppercase tracking-widest font-medium mb-6">Servicios</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {taller.servicios.map((servicio) => (
                  <div key={servicio} className="flex items-center gap-2 px-4 py-3 bg-ink-soft rounded-xl border border-line-soft">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                    <span className="text-bone text-sm">{servicio}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xs text-ember uppercase tracking-widest font-medium mb-6">
                Reseñas ({tallerResenas.length})
              </h2>

              <div className="space-y-px bg-line-soft border border-line-soft rounded-2xl overflow-hidden mb-8">
                {tallerResenas.length > 0 ? tallerResenas.map((resena) => (
                  <div key={resena.id} className="p-6 bg-ink">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-ember-glow-strong border border-ember/20 flex items-center justify-center text-ember text-sm font-semibold">
                          {resena.clienteNombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-bone text-sm font-medium">{resena.clienteNombre}</p>
                          <p className="text-smoke text-xs">{new Date(resena.fecha).toLocaleDateString('es-PE', { month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(resena.calificacion)].map((_, i) => (
                          <Star key={i} size={12} className="text-ember fill-ember" />
                        ))}
                      </div>
                    </div>
                    <p className="text-ash text-sm leading-relaxed">{resena.comentario}</p>
                  </div>
                )) : (
                  <div className="p-8 bg-ink text-center">
                    <p className="text-smoke">Aún no hay reseñas para este taller.</p>
                  </div>
                )}
              </div>

              {/* Write review */}
              {submitted ? (
                <div className="p-6 bg-success/5 border border-success/20 rounded-2xl text-center">
                  <Check size={24} className="text-success mx-auto mb-2" />
                  <p className="text-bone font-medium">¡Gracias por tu reseña!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="bg-ink-soft rounded-2xl border border-line-soft p-6">
                  <h3 className="text-bone font-medium mb-4">Escribe una reseña</h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-smoke">Tu calificación:</span>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="star"
                          aria-label={`${star} estrellas`}
                        >
                          <Star
                            size={20}
                            className={`transition-colors ${
                              star <= (hoverRating || userRating)
                                ? 'text-ember fill-ember'
                                : 'text-line'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Cuéntanos tu experiencia..."
                    className="w-full p-4 bg-ink border border-line rounded-xl text-bone placeholder-fog resize-none h-28 focus:outline-none focus:border-ember transition-colors"
                    required
                  />

                  <button
                    type="submit"
                    disabled={userRating === 0 || !reviewText.trim()}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    Enviar
                  </button>
                </form>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-ink-soft rounded-2xl border border-line-soft p-6">
              <h3 className="text-xs text-ember uppercase tracking-widest font-medium mb-5">Contacto</h3>
              <div className="space-y-4">
                <a href={`tel:${taller.telefono}`} className="flex items-center gap-3 text-ash hover:text-bone transition-colors text-sm">
                  <Phone size={14} className="text-smoke" />
                  {taller.telefono}
                </a>
                <a href={`https://wa.me/${taller.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ash hover:text-bone transition-colors text-sm">
                  <MessageCircle size={14} className="text-smoke" />
                  WhatsApp
                </a>
                <div className="flex items-start gap-3 text-ash text-sm">
                  <MapPin size={14} className="text-smoke mt-0.5 flex-shrink-0" />
                  <span>{taller.direccion}</span>
                </div>
              </div>
            </div>

            <div className="bg-ink-soft rounded-2xl border border-line-soft p-6">
              <h3 className="text-xs text-ember uppercase tracking-widest font-medium mb-5">Información</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-smoke">RUC</span>
                  <span className="text-bone font-mono text-xs">{taller.ruc}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-smoke">Horario</span>
                  <span className="text-bone text-right">{taller.horario}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-smoke">Estado</span>
                  <span className={taller.verificado ? 'text-success' : 'text-ember'}>
                    {taller.verificado ? 'Verificado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TallerProfile;
