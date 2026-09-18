import React, { useState } from 'react';
import { CheckCircle, Upload, Wrench } from 'lucide-react';
import { SERVICIOS, DISTRITOS_LIMA } from '../data';

// ============================================
// PÁGINA DE REGISTRO DE TALLERES
// ============================================
const RegistroPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    ruc: '',
    direccion: '',
    distrito: '',
    telefono: '',
    whatsapp: '',
    horario: '',
    descripcion: '',
    servicios: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleServicioChange = (servicio: string) => {
    setFormData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.ruc.trim() || formData.ruc.length !== 11) newErrors.ruc = 'RUC inválido (11 dígitos)';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    if (!formData.distrito) newErrors.distrito = 'Selecciona un distrito';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (formData.servicios.length === 0) newErrors.servicios = 'Selecciona al menos un servicio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // En producción, aquí se enviaría a la API:
      // await fetch('/api/talleres', { method: 'POST', body: JSON.stringify(formData) });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-[#1F1F1F] rounded-2xl p-8 border border-white/10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2E7D32]/10 flex items-center justify-center">
              <CheckCircle size={40} className="text-[#2E7D32]" />
            </div>
            <h2 className="font-heading text-2xl font-black text-white mb-3">
              ¡Registro exitoso!
            </h2>
            <p className="text-gray-400 mb-6">
              Tu taller ha sido registrado y está en estado <span className="text-[#FF6B00] font-semibold">"pendiente de verificación"</span>. 
              Nuestro equipo revisará tu información en las próximas 24-48 horas.
            </p>
            <div className="bg-[#0A0A0A] rounded-xl p-4 mb-6 text-left">
              <h4 className="text-white font-semibold text-sm mb-2">Datos registrados:</h4>
              <p className="text-gray-400 text-sm">• Nombre: {formData.nombre}</p>
              <p className="text-gray-400 text-sm">• RUC: {formData.ruc}</p>
              <p className="text-gray-400 text-sm">• Distrito: {formData.distrito}</p>
              <p className="text-gray-400 text-sm">• Servicios: {formData.servicios.join(', ')}</p>
            </div>
            <p className="text-gray-500 text-sm">
              Te contactaremos por WhatsApp al número {formData.telefono} para confirmar la verificación.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white mb-2">
            Registra tu Taller
          </h1>
          <p className="text-gray-400">
            Completa el formulario para unirte a la red de talleres de confianza de TallerYa
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Wrench size={20} className="text-[#FF6B00]" />
              Información del Taller
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Nombre del taller *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: AutoService Pro"
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${errors.nombre ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>

              {/* RUC */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">RUC *</label>
                <input
                  type="text"
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleChange}
                  placeholder="20XXXXXXXXX"
                  maxLength={11}
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${errors.ruc ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.ruc && <p className="text-red-400 text-xs mt-1">{errors.ruc}</p>}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${errors.telefono ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono}</p>}
              </div>

              {/* Dirección */}
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Av. Industrial 1234"
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors ${errors.direccion ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.direccion && <p className="text-red-400 text-xs mt-1">{errors.direccion}</p>}
              </div>

              {/* Distrito */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Distrito *</label>
                <select
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white appearance-none focus:outline-none focus:border-[#FF6B00] transition-colors ${errors.distrito ? 'border-red-500' : 'border-white/10'}`}
                >
                  <option value="">Seleccionar distrito</option>
                  {DISTRITOS_LIMA.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.distrito && <p className="text-red-400 text-xs mt-1">{errors.distrito}</p>}
              </div>

              {/* Horario */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Horario de atención</label>
                <input
                  type="text"
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                  placeholder="Lun-Sáb 8:00-18:00"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>

              {/* Descripción */}
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">Descripción del taller</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu taller, experiencia, especialidades..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-600 resize-none focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Servicios que ofrece *</h2>
            <p className="text-gray-500 text-sm mb-4">Selecciona todos los servicios que tu taller puede realizar</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICIOS.map((servicio) => (
                <label
                  key={servicio}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    formData.servicios.includes(servicio)
                      ? 'bg-[#FF6B00]/10 border-[#FF6B00] text-[#FF6B00]'
                      : 'bg-[#0A0A0A] border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.servicios.includes(servicio)}
                    onChange={() => handleServicioChange(servicio)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    formData.servicios.includes(servicio) ? 'bg-[#FF6B00] border-[#FF6B00]' : 'border-gray-600'
                  }`}>
                    {formData.servicios.includes(servicio) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">{servicio}</span>
                </label>
              ))}
            </div>
            {errors.servicios && <p className="text-red-400 text-xs mt-2">{errors.servicios}</p>}
          </div>

          {/* Photos */}
          <div className="bg-[#1F1F1F] rounded-2xl p-6 border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Fotos del taller</h2>
            <p className="text-gray-500 text-sm mb-4">Sube hasta 5 fotos de tu taller (opcional)</p>
            
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#0A0A0A] border border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#FF6B00]/50 transition-colors"
                >
                  <Upload size={20} className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold text-lg rounded-xl hover:bg-[#E55E00] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#FF6B00]/25"
            >
              <CheckCircle size={20} />
              Registrar Taller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroPage;
