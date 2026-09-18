import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/buscar', label: 'Talleres' },
    { to: '/tienda', label: 'Tienda' },
    { to: '/dashboard', label: 'Mi taller' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-line-soft">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-display font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-bone'
                    : 'text-smoke hover:text-bone'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="block h-px bg-ember mt-1" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin"
              className="text-sm text-smoke hover:text-bone transition-colors"
            >
              Admin
            </Link>
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 px-4 py-2 bg-bone text-ink text-sm font-medium rounded-lg hover:bg-bone/90 transition-colors"
            >
              Registrar taller
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-smoke hover:text-bone transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-ink-soft border-t border-line-soft animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-bone bg-ink-muted'
                    : 'text-smoke hover:text-bone hover:bg-ink-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-line-soft">
              <Link
                to="/registro"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-bone text-ink text-sm font-medium rounded-lg"
              >
                Registrar mi taller
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
