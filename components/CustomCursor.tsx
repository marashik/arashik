
import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      // Main dot follows instantly
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      
      // Follower has a slight delay/lag effect handled via CSS transition or requestAnimationFrame
      // For simple smooth effect, we just update position but rely on CSS transition
      follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('interactive-hover')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; 
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-3 h-3 bg-academic-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out ${hovered ? 'scale-0' : 'scale-100'}`}
      />
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-academic-gold rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-300 ease-out ${
          hovered ? 'w-16 h-16 bg-academic-ivory/20 border-transparent backdrop-blur-sm' : 'scale-100'
        }`} 
      />
    </>
  );
};
