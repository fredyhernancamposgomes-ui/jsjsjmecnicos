import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Phone, Clock, CheckCircle, MessageCircle, Wrench, ArrowLeft, Send } from 'lucide-react';
import { talleres, resenas } from '../data';

// ============================================
// PÁGINA DE PERFIL DEL TALLER
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
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Taller no encontrado</h2>
          <Link to="/buscar" className="text-[#FF6B00] hover:underline">Volver a buscar</Link>
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
    <div className="min-h-screen pt-20 pb-12">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link to="/buscar" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm">Volver a búsqueda</span>
        </Link>
      </div>

      {/* Cover / Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#1F1F1F] rounded-2xl overflow-hidden border border-white/10">
          {/* Cover image placeholder */}
          <div className="h-48 sm:h-64 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white font-bold text-4xl shadow-2xl">
                {taller.nombre.charAt(0)}
              </div>
            </div>
            {taller.verificado && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-[#2E7D32] rounded-full">
                <CheckCircle size={14} className="text-white" />
                <span className="text-white text-sm font-medium">Verificado</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2">
                  {taller.nombre}
                </h1>
                <p className="text-gray-400 flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-[#FF6B00]" />
                  {taller.direccion}, {taller.distrito}, {taller.departamento}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={20} className="text-[#FFD700] fill-[#FFD700]" />
                      <span className="text-white font-bold text-xl">{taller.calificacion}</span>
                    </div>
                    <span className="text-gray-500">({taller.numResenas} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span className="text-sm">{taller.horario}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${taller.whatsapp.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${taller.telefono}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E55E00] transition-colors"
                >
                  <Phone size={18} />
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Sobre el taller</h2>
              <p className="text-gray-400 leading-relaxed">{taller.descripcion}</p>
            </div>

            {/* Services */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Servicios</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {taller.servicios.map((servicio) => (
                  <div key={servicio} className="flex items-center gap-2 px-4 py-3 bg-[#0A0A0A] rounded-xl">
                    <Wrench size={14} className="text-[#FF6B00]" />
                    <span className="text-gray-300 text-sm">{servicio}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-6">Reseñas ({tallerResenas.length})</h2>
              
              {/* Review list */}
              <div className="space-y-4 mb-8">
                {tallerResenas.length > 0 ? tallerResenas.map((resena) => (
                  <div key={resena.id} className="p-4 bg-[#0A0A0A] rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D32F2F] flex items-center justify-center text-white text-xs font-bold">
                          {resena.clienteNombre.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{resena.clienteNombre}</p>
                          <p className="text-gray-500 text-xs">{new Date(resena.fecha).toLocaleDateString('es-PE')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(resena.calificacion)].map((_, i) => (
                          <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{resena.comentario}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-[#FF6B00]/10 text-[#FF6B00] text-xs rounded">
                      {resena.servicio}
                    </span>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-8">Aún no hay reseñas para este taller.</p>
                )}
              </div>

              {/* Write review */}
              {submitted ? (
                <div className="p-4 bg-[#2E7D32]/10 border border-[#2E7D32]/20 rounded-xl text-center">
                  <CheckCircle size={24} className="text-[#2E7D32] mx-auto mb-2" />
                  <p className="text-[#2E7D32] font-medium">¡Gracias por tu reseña!</p>
                  <p className="text-gray-400 text-sm mt-1">Tu opinión ayuda a toda la comunidad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-semibold mb-4">Escribe una reseña</h3>
                  
                  {/* Star rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 text-sm">Calificación:</span>
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
                            size={24}
                            className={`transition-colors ${
                              star <= (hoverRating || userRating)
                                ? 'text-[#FFD700] fill-[#FFD700]'
                                : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Cuéntanos tu experiencia..."
                    className="w-full p-4 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 resize-none h-24 focus:outline-none focus:border-[#FF6B00] transition-colors"
                    required
                  />

                  <button
                    type="submit"
                    disabled={userRating === 0 || !reviewText.trim()}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#E55E00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    Enviar reseña
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Contacto</h3>
              <div className="space-y-3">
                <a href={`tel:${taller.telefono}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Phone size={16} className="text-[#FF6B00]" />
                  <span className="text-sm">{taller.telefono}</span>
                </a>
                <a href={`https://wa.me/${taller.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#25D366] transition-colors">
                  <MessageCircle size={16} className="text-[#25D366]" />
                  <span className="text-sm">WhatsApp</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={16} className="text-[#FF6B00]" />
                  <span className="text-sm">{taller.direccion}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock size={16} className="text-[#FF6B00]" />
                  <span className="text-sm">{taller.horario}</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Ubicación</h3>
              <div className="h-48 bg-[#0A0A0A] rounded-xl flex items-center justify-center border border-white/5">
                <div className="text-center">
                  <MapPin size={32} className="text-[#FF6B00] mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">{taller.distrito}, {taller.departamento}</p>
                  <p className="text-gray-600 text-xs mt-1">Mapa interactivo próximamente</p>
                </div>
              </div>
            </div>

            {/* RUC */}
            <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-4">Información legal</h3>
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">RUC: <span className="text-white font-mono">{taller.ruc}</span></p>
                <p className="text-gray-400 text-sm">ID: <span className="text-white font-mono">{taller.id}</span></p>
                <p className="text-gray-400 text-sm">Estado: <span className={`font-medium ${taller.verificado ? 'text-[#2E7D32]' : 'text-[#FF6B00]'}`}>{taller.verificado ? 'Verificado ✓' : 'Pendiente'}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TallerProfile;
