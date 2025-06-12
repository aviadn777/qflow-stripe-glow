
import React, { useEffect, useRef } from 'react';

const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Stripe's exact gradient colors
    const colors = ['#ff61ab', '#6ec3f4', '#3a3aff', '#ffba27'];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Create animated gradient
      const gradient = ctx.createLinearGradient(
        0, 
        0, 
        width + Math.sin(timeRef.current * 0.5) * 100, 
        height + Math.cos(timeRef.current * 0.3) * 100
      );

      // Animated color stops
      const offset1 = (Math.sin(timeRef.current * 0.8) + 1) * 0.5;
      const offset2 = (Math.sin(timeRef.current * 0.6 + Math.PI / 3) + 1) * 0.5;
      const offset3 = (Math.sin(timeRef.current * 0.4 + Math.PI / 2) + 1) * 0.5;

      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(offset1 * 0.4 + 0.1, colors[1]);
      gradient.addColorStop(offset2 * 0.4 + 0.4, colors[2]);
      gradient.addColorStop(offset3 * 0.4 + 0.6, colors[3]);
      gradient.addColorStop(1, colors[0]);

      // Clear and fill
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default GradientBackground;
