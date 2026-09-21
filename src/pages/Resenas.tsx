import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { testimonios } from '../data';
import { ScrollReveal } from '../components/Animations';

// Imágenes de testimonios
const IMG = {
  customer1: 'https://image.qwenlm.ai/generated-images/a6ed3c56-f377-4892-b4d4-d1b1dd530bbf/_result.png',
  owner: 'https://image.qwenlm.ai/generated-images/e0f9423d-ddf5-401a-8c41-1a6cf10ac847/_result.png',
  mechanic: 'https://image.qwenlm.ai/generated-images/9b90cf1e-c5c4-4f71-8c2f-515a4ac8963a/_result.png',
};

const ResenasPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'clientes' | 'talleres'>('all');
  
  const photos = [IMG.customer1, IMG.owner, IMG.mechanic, IMG.customer1];

  const filteredTestimonios = testimonios.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'clientes') return t.rol.includes('Cliente');
    if (filter === 'talleres') return t.rol.includes('Taller') || t.rol.includes('Proveedor');
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-ember uppercase tracking-widest font-semibold mb-4">Reseñas y opiniones</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-bone mb-6">
            Lo que dice nuestra comunidad.
          </h1>
          <p className="text-lg text-ash max-w-2xl mx-auto">
            Opiniones reales de clientes y talleres que confían en TallerYa.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              filter === 'all'
                ? 'bg-ember text-bone'
                : 'bg-ink-soft text-ash hover:text-bone'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('clientes')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              filter === 'clientes'
                ? 'bg-ember text-bone'
                : 'bg-ink-soft text-ash hover:text-bone'
            }`}
          >
            Clientes
          </button>
          <button
            onClick={() => setFilter('talleres')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
              filter === 'talleres'
                ? 'bg-ember text-bone'
                : 'bg-ink-soft text-ash hover:text-bone'
            }`}
          >
            Talleres y proveedores
          </button>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonios.map((testimonio, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-ink-soft rounded-2xl border border-bone/5 p-8 card-hover">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-ember fill-ember" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-xl text-bone leading-relaxed mb-6">
                  "{testimonio.texto}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-line">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img 
                      src={photos[i % photos.length]} 
                      alt={testimonio.nombre} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-bone font-semibold">{testimonio.nombre}</p>
                    <p className="text-ash text-sm">{testimonio.rol}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-ash mb-6">¿Tienes una experiencia que compartir?</p>
          <a
            href="https://wa.me/51999999999?text=Quiero compartir mi experiencia con TallerYa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-ember text-bone font-semibold rounded-xl hover:bg-ember-hot transition-colors btn-hover"
          >
            Compartir mi experiencia
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResenasPage;
