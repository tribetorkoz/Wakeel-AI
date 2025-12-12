
import React, { useEffect, useState } from 'react';

const GlobalGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* 1. Base Grid (Very Faint / Static) - Always slightly visible for context */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      {/* 2. Spotlight Grid (Bright / Interactive) - Revealed by Mouse */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
          maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        }}
      />

      {/* 3. Ambient Glow following mouse (Optional, adds 'heat') */}
      <div
        className="absolute w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full transition-transform duration-75 ease-out"
        style={{
            top: 0,
            left: 0,
            transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`
        }}
      />
    </div>
  );
};

export default GlobalGrid;
