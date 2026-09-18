import React from 'react';
import { useCursor } from '../hooks/useCursor';

const Cursor: React.FC = () => {
  const { dotRef, outlineRef, isHovering, isVisible } = useCursor();

  // Solo mostrar en desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={outlineRef}
        className={`cursor-outline ${isHovering ? 'hover' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default Cursor;
