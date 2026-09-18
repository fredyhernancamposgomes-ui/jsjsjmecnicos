import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo size="md" />
            <p className="mt-5 text-sm text-smoke leading-relaxed max-w-xs">
              La plataforma que conecta clientes con talleres de confianza en todo el Perú.
            </p>
            <p className="mt-4 text-sm text-ember italic font-display">
              "Llegamos hasta donde más lo necesites"
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs text-smoke uppercase tracking-widest font-medium mb-5">Plataforma</h4>
            <ul className="space-y-3">
              <li><Link to="/buscar" className="text-ash hover:text-bone text-sm transition-colors">Talleres</Link></li>
              <li><Link to="/registro" className="text-ash hover:text-bone text-sm transition-colors">Para talleres</Link></li>
              <li><Link to="/repuestos" className="text-ash hover:text-bone text-sm transition-colors">Repuestos</Link></li>
              <li><Link to="/admin" className="text-ash hover:text-bone text-sm transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs text-smoke uppercase tracking-widest font-medium mb-5">Servicios</h4>
            <ul className="space-y-3">
              <li><span className="text-ash text-sm">Frenos</span></li>
              <li><span className="text-ash text-sm">Motor</span></li>
              <li><span className="text-ash text-sm">Eléctrico</span></li>
              <li><span className="text-ash text-sm">Auxilio 24/7</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs text-smoke uppercase tracking-widest font-medium mb-5">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-bone text-sm transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  +51 999 999 999
                </a>
              </li>
              <li>
                <a href="mailto:contacto@tallerya.pe" className="text-ash hover:text-bone text-sm transition-colors">
                  contacto@tallerya.pe
                </a>
              </li>
            </ul>
            {/* Social */}
            <div className="flex gap-2 mt-6">
              {['Facebook', 'Instagram', 'TikTok'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-smoke hover:text-bone hover:border-bone transition-colors text-xs"
                  aria-label={s}
                >
                  {s.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-line-soft flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-smoke">
            © 2024 TallerYa — Llegamos hasta donde más lo necesites
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-smoke hover:text-bone transition-colors">Términos</a>
            <a href="#" className="text-xs text-smoke hover:text-bone transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
