
import React, { useEffect, useRef, useState } from 'react';

/**
 * VisualEngine
 * A unified, high-performance background renderer.
 * Combines: Neural Network Particles + Interactive Grid + Static Noise
 * Replaces: NeuralBackground.tsx, GlobalGrid.tsx, NoiseOverlay.tsx
 */

const VisualEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for Grid Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Canvas Animation (Neural Network)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // Optimized context
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Config
    const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.08)'; 
    const LINE_COLOR = 'rgba(99, 102, 241, 0.08)';
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 80; // Optimized counts
    const CONNECTION_DISTANCE = isMobile ? 80 : 150;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update & Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    canvas.width = width;
    canvas.height = height;
    initParticles();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      
      {/* Layer 1: Base Grid (Static) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Layer 2: Neural Network (Canvas) */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Layer 3: Spotlight Grid (Dynamic) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
          maskImage: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, black, transparent)`,
        }}
      />

      {/* Layer 4: Noise Grain (Texture) */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Layer 5: Ambient Glow */}
      <div
        className="absolute w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
            top: 0,
            left: 0,
            transform: `translate(${mouse.x - 300}px, ${mouse.y - 300}px)`
        }}
      />
    </div>
  );
};

export default VisualEngine;
