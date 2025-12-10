
import React, { useEffect } from 'react';

const MobileScrollEnhancer: React.FC = () => {
  useEffect(() => {
    // Only run on mobile/tablet devices
    if (window.innerWidth > 768) return;

    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let skew = 0;
    let rafId: number;
    
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    // Force hardware acceleration
    mainContent.style.willChange = 'transform';
    mainContent.style.transformStyle = 'preserve-3d';

    const update = () => {
      targetScroll = window.scrollY;
      
      // Calculate velocity
      const velocity = targetScroll - currentScroll;
      
      // Update current scroll for next frame
      currentScroll = targetScroll;

      // Calculate Skew based on velocity
      // Cap the skew to avoid breaking the layout too much
      const maxSkew = 3; 
      const targetSkew = Math.max(Math.min(velocity * 0.1, maxSkew), -maxSkew);
      
      // Smooth out the skew (Interpolation)
      skew = skew * 0.9 + targetSkew * 0.1;

      // Apply transforms
      // We translateZ(0) to ensure GPU usage
      if (Math.abs(skew) > 0.01) {
         mainContent.style.transform = `perspective(1000px) skewY(${skew}deg) translateZ(0)`;
      } else {
         mainContent.style.transform = 'none';
      }

      rafId = requestAnimationFrame(update);
    };

    const onScroll = () => {
       // Just to ensure rAF loop is relevant, though we run it continuously for physics
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      mainContent.style.transform = 'none';
    };
  }, []);

  return null;
};

export default MobileScrollEnhancer;
