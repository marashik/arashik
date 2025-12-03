
import React, { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

export const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { profile } = useData();

  // Use values from profile if available, else defaults
  const speed = profile.neuralSettings?.speed ?? 2.5;
  const particleDensity = profile.neuralSettings?.density ?? 15000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    let animationId: number;

    const particles: {x: number, y: number, vx: number, vy: number}[] = [];
    
    // Adjust count based on area and density setting
    const particleCount = Math.min(Math.floor((width * height) / particleDensity), 150); 
    const connectionDistance = 150;

    // Initialize particles
    for(let i=0; i<particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed
        });
    }

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Check theme for colors dynamically every frame to support toggle
        const isDark = document.documentElement.classList.contains('dark');
        const r = isDark ? 212 : 10;
        const g = isDark ? 175 : 25;
        const b = isDark ? 55 : 49;
        
        // Update and Draw Particles
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;

            // Draw Node
            ctx.beginPath();
            ctx.arc(p.x, p.y, isDark ? 2 : 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.6 : 0.4})`;
            ctx.fill();

            // Draw Connections
            for(let j=i+1; j<particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < connectionDistance) {
                    ctx.beginPath();
                    const opacity = 1 - (dist / connectionDistance);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * (isDark ? 0.2 : 0.1)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    }

    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
    }
  }, [speed, particleDensity]); // Re-run effect if settings change

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}