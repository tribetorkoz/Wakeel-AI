
import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Performance Optimization: Drastic reduction for mobile
    const isMobile = width < 768;
    const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.08)'; // Slightly more subtle
    const LINE_COLOR = 'rgba(99, 102, 241, 0.08)';
    
    // Use MUCH fewer particles on mobile for better battery life & less distraction
    // Desktop: ~130 particles (depending on res)
    // Mobile: ~30 particles
    const particleDivisor = isMobile ? 60000 : 20000; 
    const PARTICLE_COUNT = Math.floor((width * height) / particleDivisor);
    
    const CONNECTION_DISTANCE = isMobile ? 80 : 150;
    const MOUSE_DISTANCE = 200;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];

      // Don't render anything if screen is extremely small (watch size)
      if (width < 300) return;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.05 : 0.1), // Slower on mobile
          vy: (Math.random() - 0.5) * (isMobile ? 0.05 : 0.1),
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fill();

        // Mouse interaction (only if not scrolling heavily)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_DISTANCE) {
          ctx.beginPath();
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Gentle push
          p.x += dxMouse * 0.005; 
          p.y += dyMouse * 0.005;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            // Only draw line if mouse is somewhat close to one of them (Optimization)
            const p2DistMouse = Math.sqrt((mouse.x - p2.x)**2 + (mouse.y - p2.y)**2);
            
            if (distMouse < MOUSE_DISTANCE || p2DistMouse < MOUSE_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 - dist/CONNECTION_DISTANCE * 0.08})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
          }
        }
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    init();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default NeuralBackground;
