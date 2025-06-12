
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

    // Stripe's exact gradient colors with missing cyan added
    const colors = [
      '#ff61ab', // Pink
      '#00d3fe', // Bright Cyan - ADDED MISSING COLOR
      '#6ec3f4', // Light Blue  
      '#3a3aff', // Purple
      '#ff333d', // Red
      '#ffba27'  // Orange
    ];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawOrganicFlow = () => {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create multiple flowing organic gradients
      for (let i = 0; i < colors.length; i++) {
        // Organic flowing positions
        const centerX = width * (0.2 + 0.6 * Math.sin(timeRef.current * 0.3 + i * 1.2));
        const centerY = height * (0.1 + 0.8 * Math.cos(timeRef.current * 0.4 + i * 0.8));
        const radius = width * (0.4 + 0.3 * Math.sin(timeRef.current * 0.5 + i * 0.6));

        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, radius
        );
        
        // More transparent for layering effect
        const alphaStart = Math.abs(Math.sin(timeRef.current * 0.2 + i * 0.5)) * 0.4 + 0.1;
        const alphaEnd = 0;
        
        gradient.addColorStop(0, `${colors[i]}${Math.floor(alphaStart * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${colors[i]}${Math.floor(alphaStart * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${colors[i]}00`);
        
        // Use screen blend mode for organic color mixing
        ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Add subtle noise texture for organic feel
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      
      ctx.putImageData(imageData, 0, 0);

      timeRef.current += 0.008; // Slower, more organic movement
    };

    const animate = () => {
      drawOrganicFlow();
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
    <>
      {/* Organic curved background shape */}
      <div className="organic-background-shape"></div>
      
      {/* Flowing canvas animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
      />
    </>
  );
};

export default GradientBackground;
