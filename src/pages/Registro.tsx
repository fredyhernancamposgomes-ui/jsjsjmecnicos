import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICIOS, DISTRITOS_LIMA } from '../data';

// ============================================
// REGISTRO DE TALLERES - Premium
// ============================================
const RegistroPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '', ruc: '', direccion: '', distrito: '',
    telefono: '', whatsapp: '', horario: '', descripcion: '',
    servicios: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
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
    if (!formData.nombre.trim()) newErrors.nombre = 'Requerido';
    if (!formData.ruc.trim() || formData.ruc.length !== 11) newErrors.ruc = 'RUC inválido (11 dígitos)';
    if (!formData.direccion.trim()) newErrors.direccion = 'Requerido';
    if (!formData.distrito) newErrors.distrito = 'Requerido';
    if (!formData.telefono.trim()) newErrors.telefono = 'Requerido';
    if (formData.servicios.length === 0) newErrors.servicios = 'Selecciona al menos uno';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
            <Check size={28} className="text-success" />
          </div>
          <h2 className="font-display text-3xl font-semibold text-bone mb-4 tracking-tight">
            Registro exitoso.
          </h2>
          <p className="text-ash leading-relaxed mb-8">
            Tu taller está en estado <span className="text-ember font-medium">pendiente de verificación</span>. 
            Nuestro equipo revisará tu información en 24-48 horas.
          </p>
          <div className="bg-ink-soft rounded-2xl border border-line-soft p-6 text-left mb-8">
            <p className="text-sm text-smoke mb-1">Taller</p>
            <p className="text-bone font-medium mb-3">{formData.nombre}</p>
            <p className="text-sm text-smoke mb-1">RUC</p>
            <p className="text-bone font-mono text-sm mb-3">{formData.ruc}</p>
            <p className="text-sm text-smoke mb-1">Ubicación</p>
            <p className="text-bone text-sm">{formData.distrito}</p>
          </div>
          <p className="text-sm text-smoke">
            Te contactaremos al {formData.telefono} para confirmar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-ember uppercase tracking-widest font-medium mb-4">
            Para talleres
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-bone leading-tight mb-4">
            Registra tu taller.
          </h1>
          <p className="text-lg text-ash">
            Únete a la red de talleres de confianza de TallerYa.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Información básica */}
          <section>
            <h2 className="text-xs text-ember uppercase tracking-widest font-medium mb-6">Información básica</h2>
            <div className="space-y-4">
              <InputField
                label="Nombre del taller"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: AutoService Pro"
                error={errors.nombre}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="RUC"
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleChange}
                  placeholder="20XXXXXXXXX"
                  maxLength={11}
                  error={errors.ruc}
                  required
                />
                <InputField
                  label="Teléfono / WhatsApp"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  error={errors.telefono}
                  required
                />
              </div>
              <InputField
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Av. Industrial 1234"
                error={errors.direccion}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-smoke mb-2">Distrito *</label>
                  <select
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-ink-soft border rounded-xl text-bone text-sm appearance-none focus:outline-none focus:border-ember transition-colors ${errors.distrito ? 'border-danger' : 'border-line'}`}
                  >
                    <option value="">Seleccionar</option>
                    {DISTRITOS_LIMA.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.distrito && <p className="text-danger text-xs mt-1.5">{errors.distrito}</p>}
                </div>
                <InputField
                  label="Horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                  placeholder="Lun-Sáb 8:00-18:00"
                />
              </div>
              <div>
                <label className="block text-sm text-smoke mb-2">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu taller..."
                  rows={3}
                  className="w-full px-4 py-3 bg-ink-soft border border-line rounded-xl text-bone text-sm placeholder-fog resize-none focus:outline-none focus:border-ember transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Servicios */}
          <section>
            <h2 className="text-xs text-ember uppercase tracking-widest font-medium mb-2">Servicios</h2>
            <p className="text-sm text-smoke mb-6">Selecciona los servicios que ofrece tu taller</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICIOS.map((servicio) => (
                <label
                  key={servicio}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    formData.servicios.includes(servicio)
                      ? 'bg-ember-glow border-ember/30 text-ember'
                      : 'bg-ink-soft border-line text-ash hover:border-smoke'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.servicios.includes(servicio)}
                    onChange={() => handleServicioChange(servicio)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                    formData.servicios.includes(servicio) ? 'bg-ember border-ember' : 'border-line'
                  }`}>
                    {formData.servicios.includes(servicio) && (
                      <Check size={10} className="text-ink" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-sm">{servicio}</span>
                </label>
              ))}
            </div>
            {errors.servicios && <p className="text-danger text-xs mt-2">{errors.servicios}</p>}
          </section>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bone text-ink font-medium rounded-xl hover:bg-bone/90 transition-colors group"
            >
              Registrar taller
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Input component
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, placeholder, error, required, maxLength, type = 'text' }) => (
  <div>
    <label className="block text-sm text-smoke mb-2">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full px-4 py-3 bg-ink-soft border rounded-xl text-bone text-sm placeholder-fog focus:outline-none focus:border-ember transition-colors ${error ? 'border-danger' : 'border-line'}`}
    />
    {error && <p className="text-danger text-xs mt-1.5">{error}</p>}
  </div>
);

export default RegistroPage;
