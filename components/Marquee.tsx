
import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ items, direction = 'left', speed = 20 }) => {
  return (
    <div className="relative w-full overflow-hidden py-4 bg-academic-gold/5 border-y border-academic-gold/10">
      <div 
        className={`flex whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-4xl font-serif font-bold text-transparent stroke-text opacity-50 uppercase tracking-widest">
             {item} <span className="text-academic-gold">•</span>
          </span>
        ))}
      </div>
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(212, 175, 55, 0.4); 
          color: transparent;
        }
        .dark .stroke-text {
          -webkit-text-stroke: 1px rgba(212, 175, 55, 0.3);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
        }
      `}</style>
    </div>
  );
};
