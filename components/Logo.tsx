
import React, { useId } from 'react';

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  const id = useId();
  const gradId = `goldGradientDeep-${id}`;
  const glowId = `glowDeep-${id}`;

  return (
    <svg viewBox="0 0 100 100" className={`${className} transition-transform group-hover:scale-110 duration-500 drop-shadow-xl`} fill="none" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
           <stop offset="0%" stopColor="#D4AF37" /> {/* Standard Gold */}
           <stop offset="40%" stopColor="#C5A028" /> {/* Rich Deep Gold */}
           <stop offset="100%" stopColor="#8B6508" /> {/* Dark Bronze/Brown for contrast */}
         </linearGradient>
         <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
         </filter>
       </defs>
       
       {/* Outer Hexagon Frame - Chemistry Symbol - Increased Opacity and Width */}
       <path 
          d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 Z" 
          stroke={`url(#${gradId})`}
          strokeWidth="2.5" 
          className="opacity-60" 
       />

       {/* Microscope Base - Solid Foundation */}
       <path d="M25 85 H75 L 70 75 H 30 Z" fill="currentColor" className="text-academic-navy dark:text-white" opacity="1" />

       {/* DNA Arm - The core concept: Microscope Arm formed by Double Helix */}
       {/* Strand 1 (Back/Structural) - Darker and Bolder */}
       <path d="M40 75 Q 25 55 45 35 T 55 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-academic-navy dark:text-gray-400 opacity-80" />
       
       {/* Strand 2 (Front - Deep Gold - The 'Discovery' Strand) */}
       <path d="M30 75 Q 55 55 35 30 T 60 15" stroke={`url(#${gradId})`} strokeWidth="5" strokeLinecap="round" filter={`url(#${glowId})`} />
       
       {/* Connecting Rungs (Base pairs linking structure) */}
       <line x1="32" y1="65" x2="40" y2="62" stroke="currentColor" strokeWidth="2.5" className="text-gray-600 dark:text-gray-300" />
       <line x1="38" y1="50" x2="32" y2="45" stroke="currentColor" strokeWidth="2.5" className="text-gray-600 dark:text-gray-300" />
       <line x1="40" y1="30" x2="48" y2="25" stroke="currentColor" strokeWidth="2.5" className="text-gray-600 dark:text-gray-300" />

       {/* Eyepiece / Head */}
       <rect x="52" y="10" width="18" height="6" rx="2" fill="currentColor" className="text-academic-navy dark:text-white" />
       <path d="M61 16 V 22" stroke="currentColor" strokeWidth="7" className="text-academic-navy dark:text-white" />

       {/* Objective Lens Turret */}
       <circle cx="61" cy="25" r="5" fill="currentColor" className="text-academic-navy dark:text-white" />
       
       {/* Objective Lenses - Bolder */}
       <path d="M59 28 L 57 36" stroke="currentColor" strokeWidth="3.5" className="text-academic-navy dark:text-white" />
       <path d="M63 28 L 65 34" stroke="currentColor" strokeWidth="3.5" className="text-academic-navy dark:text-white" />

       {/* Stage */}
       <path d="M45 55 H 75" stroke="currentColor" strokeWidth="3.5" className="text-academic-navy dark:text-white" />
       
       {/* Sample on Stage - Deep Gold */}
       <rect x="55" y="52" width="12" height="3" fill={`url(#${gradId})`} className="animate-pulse" />
       
       {/* Light Path - Distinct */}
       <path d="M61 36 L 61 52" stroke={`url(#${gradId})`} strokeWidth="2" strokeDasharray="3 2" className="opacity-70" />
    </svg>
  );
};