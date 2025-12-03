
import React, { useEffect, useRef } from 'react';

export const BioNeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationId: number;

    // Configuration
    const particleCount = 60; // Neural Nodes
    const cellCount = 15; // Biological Cells
    const connectionDistance = 180;
    const speedBase = 0.3; // Moderate speed

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: 'neuron' | 'cell';
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];

    // Initialize Particles
    const init = () => {
      particles.length = 0;
      
      // Create Neural Nodes (Sharp, connected)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speedBase,
          vy: (Math.random() - 0.5) * speedBase,
          radius: Math.random() * 2 + 1,
          type: 'neuron',
          pulse: 0,
          pulseSpeed: 0
        });
      }

      // Create Biological Cells (Soft, large, background)
      for (let i = 0; i < cellCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (speedBase * 0.5), // Cells move slower
          vy: (Math.random() - 0.5) * (speedBase * 0.5),
          radius: Math.random() * 40 + 20,
          type: 'cell',
          pulse: Math.random() * Math.PI,
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      
      // Colors based on theme
      // Gold/Blue for molecules, Navy/White for neurons
      const cellColor = isDark ? 'rgba(56, 189, 248, ' : 'rgba(56, 189, 248, '; // Blue-ish for biology
      const neuronColor = isDark ? 'rgba(212, 175, 55, ' : 'rgba(10, 25, 49, '; // Gold/Navy for neurons

      // 1. Draw Biological Cells (Background Layer)
      particles.filter(p => p.type === 'cell').forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around screen
        if (p.x < -100) p.x = width + 100;
        if (p.x > width + 100) p.x = -100;
        if (p.y < -100) p.y = height + 100;
        if (p.y > height + 100) p.y = -100;

        // Breathing effect
        const breathingRadius = p.radius + Math.sin(p.pulse) * 5;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, breathingRadius);
        gradient.addColorStop(0, `${cellColor} 0.05)`);
        gradient.addColorStop(0.5, `${cellColor} 0.02)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, breathingRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Cell Nucleus
        ctx.beginPath();
        ctx.arc(p.x + Math.sin(p.pulse)*5, p.y + Math.cos(p.pulse)*5, p.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `${cellColor} 0.1)`;
        ctx.fill();
      });

      // 2. Draw Neural Network (Foreground Layer)
      const neurons = particles.filter(p => p.type === 'neuron');
      neurons.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Connections
        for (let j = i + 1; j < neurons.length; j++) {
          const p2 = neurons[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - (dist / connectionDistance);
            ctx.strokeStyle = `${neuronColor} ${opacity * 0.2})`;
            ctx.lineWidth = isDark ? 0.8 : 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw Neuron Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${neuronColor} 0.8)`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
