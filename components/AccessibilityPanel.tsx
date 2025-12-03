
import React, { useState, useEffect } from 'react';
import { Eye, Type, Minus, Plus, ZapOff, Sun } from 'lucide-react';

export const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Apply settings
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    if (reduceMotion) {
        document.documentElement.classList.add('reduce-motion');
    } else {
        document.documentElement.classList.remove('reduce-motion');
    }

    if (highContrast) {
        document.documentElement.classList.add('high-contrast');
    } else {
        document.documentElement.classList.remove('high-contrast');
    }
  }, [fontSize, reduceMotion, highContrast]);

  return (
    <div className="fixed bottom-24 left-6 z-[60]">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="p-3 bg-academic-navy text-white rounded-full shadow-lg border border-academic-gold/20 hover:scale-110 transition-transform"
         title="Accessibility Settings"
       >
         <Eye size={20} />
       </button>

       {isOpen && (
         <div className="absolute bottom-full left-0 mb-4 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-4 animate-in slide-in-from-bottom-2 duration-200">
             <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">
                 <h3 className="font-bold text-academic-navy dark:text-white text-sm">Accessibility</h3>
                 <button onClick={() => { setFontSize(100); setReduceMotion(false); setHighContrast(false); }} className="text-xs text-academic-gold hover:underline">Reset</button>
             </div>

             <div className="space-y-4">
                 {/* Font Size */}
                 <div>
                     <label className="text-xs text-gray-500 mb-1 block">Text Size</label>
                     <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                         <button onClick={() => setFontSize(Math.max(80, fontSize - 10))} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded"><Minus size={14}/></button>
                         <span className="flex-1 text-center text-xs font-mono">{fontSize}%</span>
                         <button onClick={() => setFontSize(Math.min(150, fontSize + 10))} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded"><Plus size={14}/></button>
                     </div>
                 </div>

                 {/* Toggles */}
                 <button 
                    onClick={() => setReduceMotion(!reduceMotion)}
                    className={`w-full flex items-center justify-between p-2 rounded text-sm ${reduceMotion ? 'bg-academic-navy text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300'}`}
                 >
                    <span className="flex items-center gap-2"><ZapOff size={14} /> Reduce Motion</span>
                    <div className={`w-3 h-3 rounded-full ${reduceMotion ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                 </button>

                 <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-full flex items-center justify-between p-2 rounded text-sm ${highContrast ? 'bg-academic-navy text-white' : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300'}`}
                 >
                    <span className="flex items-center gap-2"><Sun size={14} /> High Contrast</span>
                    <div className={`w-3 h-3 rounded-full ${highContrast ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                 </button>
             </div>
             
             {/* Invisible style injection for high contrast/motion */}
             <style>{`
                 .reduce-motion *, .reduce-motion *::before, .reduce-motion *::after {
                     animation-duration: 0.01ms !important;
                     animation-iteration-count: 1 !important;
                     transition-duration: 0.01ms !important;
                     scroll-behavior: auto !important;
                 }
                 .high-contrast {
                     filter: contrast(150%);
                 }
             `}</style>
         </div>
       )}
    </div>
  );
};
