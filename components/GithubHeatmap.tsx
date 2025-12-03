
import React from 'react';

export const GithubHeatmap: React.FC = () => {
  // Generate mock contribution data (Last 365 days -> 52 weeks * 7 days)
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 364; i++) {
        // Random activity level 0-4
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0; 
        data.push(level);
    }
    return data;
  };

  const contributions = generateData();
  
  const getColor = (level: number) => {
      // Academic Gold Theme Shades
      switch(level) {
          case 1: return 'bg-[#F9E79F]'; // Lightest
          case 2: return 'bg-[#F1C40F]';
          case 3: return 'bg-[#D4AF37]'; // Brand
          case 4: return 'bg-[#9A7D0A]'; // Darkest
          default: return 'bg-gray-100 dark:bg-slate-800';
      }
  };

  return (
    <div className="mt-12 p-8 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="flex justify-between items-end mb-6">
            <h3 className="text-lg font-bold text-academic-navy dark:text-white">Research & Code Contributions</h3>
            <span className="text-xs text-gray-500">Last 12 Months</span>
        </div>
        
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {/* Create 52 columns (weeks) */}
            {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                    {/* Create 7 rows (days) */}
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const index = weekIndex * 7 + dayIndex;
                        const level = contributions[index] || 0;
                        return (
                            <div 
                                key={dayIndex} 
                                className={`w-3 h-3 rounded-sm ${getColor(level)} transition-colors duration-500 hover:ring-2 ring-blue-400`}
                                title={`${level > 0 ? level + ' contributions' : 'No contributions'}`}
                            ></div>
                        );
                    })}
                </div>
            ))}
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-100 dark:bg-slate-800 rounded-sm"></div>
                <div className="w-3 h-3 bg-[#F9E79F] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#F1C40F] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#D4AF37] rounded-sm"></div>
                <div className="w-3 h-3 bg-[#9A7D0A] rounded-sm"></div>
            </div>
            <span>More</span>
        </div>
    </div>
  );
};
