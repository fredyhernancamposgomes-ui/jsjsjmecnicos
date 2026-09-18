import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light'
}) => {
  const sizes = {
    sm: { icon: 24, text: 'text-base', gap: 'gap-1.5' },
    md: { icon: 32, text: 'text-lg', gap: 'gap-2' },
    lg: { icon: 40, text: 'text-2xl', gap: 'gap-2.5' },
    xl: { icon: 56, text: 'text-3xl', gap: 'gap-3' }
  };

  const s = sizes[size];
  const textColor = variant === 'light' ? 'text-bone' : 'text-ink';

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Símbolo: Y estilizada como llave - minimalista, geométrico */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TallerYa"
        className="flex-shrink-0"
      >
        {/* Contenedor circular sutil */}
        <circle cx="16" cy="16" r="15" fill="rgba(249, 115, 22, 0.08)" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="0.5" />
        {/* Y estilizada - forma de llave inglesa */}
        <path
          d="M10 8L16 16L22 8"
          stroke="#F97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16V24"
          stroke="#F97316"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Punto de precisión */}
        <circle cx="16" cy="16" r="1.5" fill="#F97316" />
      </svg>

          {showText && (
            <span className={`font-grotesk font-semibold tracking-tight ${s.text} ${textColor}`}>
              Taller<span className="text-ember">Ya</span>
            </span>
          )}    </div>
  );
};

export default Logo;
