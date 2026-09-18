import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' }
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Logo: llave inglesa + estrella + gota de aceite */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TallerYa Logo"
      >
        {/* Llave inglesa estilizada */}
        <path
          d="M20 44L44 20"
          stroke="#FF6B00"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M16 40C14 42 14 46 18 48C22 50 26 48 28 46L20 38C18 40 16 40 16 40Z"
          fill="#FF6B00"
        />
        <path
          d="M48 24C50 22 50 18 46 16C42 14 38 16 36 18L44 26C46 24 48 24 48 24Z"
          fill="#FF6B00"
        />
        {/* Estrella de calificación */}
        <path
          d="M32 8L34.5 13.5L40.5 14.2L36 18.5L37.2 24.5L32 21.5L26.8 24.5L28 18.5L23.5 14.2L29.5 13.5L32 8Z"
          fill="#FFD700"
          stroke="#FF6B00"
          strokeWidth="0.5"
        />
        {/* Gota de aceite */}
        <path
          d="M50 38C50 38 54 44 54 48C54 51 52 53 50 53C48 53 46 51 46 48C46 44 50 38 50 38Z"
          fill="#FF6B00"
          opacity="0.8"
        />
      </svg>
      {showText && (
        <span className={`font-heading font-black ${s.text} tracking-tight`}>
          <span className="text-white">Taller</span>
          <span className="text-[#FF6B00]">Ya</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
