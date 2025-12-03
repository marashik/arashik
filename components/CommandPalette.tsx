
import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Code, Briefcase, Image, MessageSquare, X, ArrowRight, Zap, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';

export const CommandPalette: React.FC = () => {
  const { isCmdOpen, setIsCmdOpen, projects, publications, blogs, skills, setActiveHighlight } = useData();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // --- SEARCH LOGIC ---
  // We filter content instead of static navigation commands
  const getResults = () => {
      if (!query.trim()) return [];
      
      const q = query.toLowerCase();
      
      const projectResults = projects.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q) ||
          p.technologies.some(t => t.toLowerCase().includes(q))
      ).map(p => ({ ...p, type: 'Project', icon: <Code size={16}/>, href: '#research' }));

      const pubResults = publications.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.venue.toLowerCase().includes(q)
      ).map(p => ({ ...p, description: p.venue, type: 'Publication', icon: <FileText size={16}/>, href: '#publications' }));

      const blogResults = blogs.filter(b => 
          b.title.toLowerCase().includes(q) || 
          b.excerpt.toLowerCase().includes(q)
      ).map(b => ({ ...b, description: b.excerpt, type: 'Blog', icon: <MessageSquare size={16}/>, href: '#blog' }));

      const skillResults = skills.filter(s => 
          s.name.toLowerCase().includes(q)
      ).map(s => ({ ...s, title: s.name, description: `${s.category} skill`, type: 'Skill', icon: <Zap size={16}/>, href: '#skills' }));

      return [...projectResults, ...pubResults, ...blogResults, ...skillResults];
  };

  const filteredResults = getResults();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCmdOpen]);

  useEffect(() => {
    if (isCmdOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isCmdOpen]);

  const handleSelect = (index: number) => {
    const item = filteredResults[index];
    if (item) {
      setIsCmdOpen(false);
      const targetId = item.href.substring(1); // remove #
      const element = document.getElementById(targetId);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Highlight the item if it has a title/name that can be matched by the global filter
      if (item.type === 'Skill') {
          setActiveHighlight(item.title);
      }
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  if (!isCmdOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-gray-200 dark:border-slate-800 p-4">
          <Search className="text-gray-400 mr-3 shrink-0" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, publications, skills..."
            className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-lg"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleListKeyDown}
          />
          <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={() => setIsCmdOpen(false)}
                className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-800 dark:hover:text-white rounded-full transition-colors"
                title="Close"
              >
                  <X size={18} />
              </button>
          </div>
        </div>
        
        <ul ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <li
                key={`${item.type}-${index}`}
                onClick={() => handleSelect(index)}
                className={`px-4 py-4 border-b border-gray-50 dark:border-slate-800/50 cursor-pointer transition-colors flex items-center gap-4 group ${
                  index === selectedIndex ? 'bg-academic-gold/10 dark:bg-slate-800' : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className={`p-3 rounded-lg shrink-0 ${
                    index === selectedIndex 
                    ? 'bg-academic-gold text-academic-navy shadow-sm' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400'
                }`}>
                   {item.icon}
                </div>
                
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className={`font-semibold truncate ${index === selectedIndex ? 'text-academic-navy dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {item.title}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 uppercase tracking-wide font-bold">
                            {item.type}
                        </span>
                    </div>
                    {item.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {item.description}
                        </p>
                    )}
                </div>

                <ArrowRight size={16} className={`shrink-0 transition-opacity ${index === selectedIndex ? 'opacity-100 text-academic-gold' : 'opacity-0'}`} />
              </li>
            ))
          ) : (
            <div className="px-4 py-12 text-center text-gray-400 flex flex-col items-center">
               {query ? (
                   <>
                     <p>No matches found for "{query}".</p>
                     <p className="text-sm mt-2">Try searching for keywords like "Cancer", "Python", or "Awards".</p>
                   </>
               ) : (
                   <>
                     <Search size={40} className="mb-4 opacity-20" />
                     <p>Type to search...</p>
                   </>
               )}
            </div>
          )}
        </ul>
        
        <div className="bg-gray-50 dark:bg-slate-950 px-4 py-2 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-xs text-gray-400">
           <div className="flex gap-4">
              <span><strong>↑↓</strong> to navigate</span>
              <span><strong>↵</strong> to select</span>
              <span><strong>ESC</strong> to close</span>
           </div>
        </div>
      </div>
    </div>
  );
};