import React, { useRef, useEffect, useState } from 'react';
import { useInView } from '../hooks/useAnimations';

// ============================================
// TEXT REVEAL - Caracter por carácter
// ============================================
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  stagger = 0.02 
}) => {
  const { ref, isVisible } = useInView(0.2);

  return (
    <span ref={ref} className={className} aria-label={children}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="char-reveal inline-block"
          style={{
            animationDelay: isVisible ? `${delay + i * stagger}s` : '0s',
            animationPlayState: isVisible ? 'running' : 'paused',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

// ============================================
// WORD REVEAL - Palabra por palabra
// ============================================
interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, isVisible } = useInView(0.2);
  const words = children.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.08}s`
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

// ============================================
// LINE REVEAL - Línea por línea
// ============================================
interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const LineReveal: React.FC<LineRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, isVisible } = useInView(0.2);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div className="overflow-hidden">
          <div
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.1}s`
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// PARALLAX IMAGE
// ============================================
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = '',
  speed = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollPercent = rect.top / window.innerHeight;
      setOffset(scrollPercent * speed * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover"
        style={{ transform: `translateY(${offset}px)` }}
      />
    </div>
  );
};

// ============================================
// MAGNETIC BUTTON
// ============================================
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '',
  strength = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// ============================================
// SCROLL REVEAL
// ============================================
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up'
}) => {
  const { ref, isVisible } = useInView(0.15);

  const directions = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)'
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : directions[direction],
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};
