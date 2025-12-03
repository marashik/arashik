
import React, { useEffect, useRef } from 'react';

export const CollaborationGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 300;
    let height = canvas.height = canvas.parentElement?.clientHeight || 300;
    
    // Globe Parameters
    const GLOBE_RADIUS = width * 0.4;
    const DOT_DENSITY = 40;
    const ROTATION_SPEED = 0.005;
    
    let rotation = 0;
    let animationId: number;

    // Generate Points on a Sphere (Fibonacci Sphere Algorithm)
    const points: {x: number, y: number, z: number}[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const samples = 400;

    for (let i = 0; i < samples; i++) {
        const y = 1 - (i / (samples - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        points.push({ x: x * GLOBE_RADIUS, y: y * GLOBE_RADIUS, z: z * GLOBE_RADIUS });
    }

    const render = () => {
        ctx.clearRect(0, 0, width, height);
        
        const cx = width / 2;
        const cy = height / 2;
        
        const isDark = document.documentElement.classList.contains('dark');
        const color = isDark ? 'rgba(212, 175, 55, ' : 'rgba(10, 25, 49, ';

        // Rotate and Draw
        points.forEach(p => {
            // Rotate around Y axis
            const x1 = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
            const z1 = p.z * Math.cos(rotation) + p.x * Math.sin(rotation);
            
            // Perspective Projection
            const scale = 250 / (250 - z1);
            const x2d = cx + x1 * scale;
            const y2d = cy + p.y * scale;
            
            // Draw Point
            const alpha = (z1 + GLOBE_RADIUS) / (2 * GLOBE_RADIUS); // Fade back points
            const size = Math.max(0.5, 2 * scale * alpha);

            if (alpha > 0) {
                ctx.beginPath();
                ctx.fillStyle = `${color}${alpha})`;
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Connect random points for "Network" effect (Static connections rotating with globe)
        ctx.strokeStyle = `${color}0.1)`;
        ctx.beginPath();
        for(let i = 0; i < points.length; i+=5) {
             const p = points[i];
             const x1 = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
             const z1 = p.z * Math.cos(rotation) + p.x * Math.sin(rotation);
             const scale = 250 / (250 - z1);
             const x2d = cx + x1 * scale;
             const y2d = cy + p.y * scale;

             // Connect to neighbour
             if(i + 1 < points.length && z1 > -20) {
                 const pNext = points[i+1];
                 const x1n = pNext.x * Math.cos(rotation) - pNext.z * Math.sin(rotation);
                 const z1n = pNext.z * Math.cos(rotation) + pNext.x * Math.sin(rotation);
                 const scaleN = 250 / (250 - z1n);
                 const x2dN = cx + x1n * scaleN;
                 const y2dN = cy + pNext.y * scaleN;
                 
                 ctx.moveTo(x2d, y2d);
                 ctx.lineTo(x2dN, y2dN);
             }
        }
        ctx.stroke();

        rotation += ROTATION_SPEED;
        animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        width = canvas.width = canvas.parentElement?.clientWidth || 300;
        height = canvas.height = canvas.parentElement?.clientHeight || 300;
    }
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
