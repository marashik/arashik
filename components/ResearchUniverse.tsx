
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ExternalLink, Code, FileText, Plus, Edit, Trash2, Grid, List, LayoutGrid, Terminal, Activity, Brain, Database, FlaskConical, Dna, Cpu, Hash, Globe, Atom, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../types';
import { EditModal } from './EditModal';
import { RichText } from './RichText';

export const ResearchUniverse: React.FC = () => {
  const { projects, setProjects, isEditing, activeHighlight, setActiveHighlight, profile, updateProfile } = useData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'universe'>('grid'); 
  const [editingSection, setEditingSection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 6;

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(confirm("Delete this research project?")) {
        setProjects(projects.filter(p => p.id !== id));
    }
  }

  const handleEdit = (e: React.MouseEvent, p: Project) => {
      e.stopPropagation();
      setEditingProject(p);
  }

  const handleSave = (data: Project) => {
      if(isAdding) {
          const newItem = { ...data, id: Date.now().toString(), technologies: Array.isArray(data.technologies) ? data.technologies : [] };
          setProjects([...projects, newItem]);
          setIsAdding(false);
      } else {
          setProjects(projects.map(p => p.id === data.id ? data : p));
          setEditingProject(null);
      }
  }

  const filteredProjects = projects.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesHighlight = !activeHighlight || 
             p.technologies.some(t => t.toLowerCase().includes(activeHighlight.toLowerCase())) || 
             p.category.toLowerCase().includes(activeHighlight.toLowerCase()) ||
             p.title.toLowerCase().includes(activeHighlight.toLowerCase());
      return matchesCategory && matchesHighlight;
  }).sort((a, b) => {
      if (a.category === 'Ongoing' && b.category !== 'Ongoing') return -1;
      if (a.category !== 'Ongoing' && b.category === 'Ongoing') return 1;
      return 0;
  });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_DISPLAY_COUNT);

  const getTechIcon = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('python') || t.includes('code')) return <Terminal size={10} />;
    if (t.includes('r') || t.includes('stat')) return <Activity size={10} />;
    if (t.includes('ai') || t.includes('learning')) return <Brain size={10} />;
    if (t.includes('data') || t.includes('sql')) return <Database size={10} />;
    if (t.includes('lab') || t.includes('blot')) return <FlaskConical size={10} />;
    if (t.includes('gene') || t.includes('crispr')) return <Dna size={10} />;
    return <Hash size={10} />;
  }

  return (
    <section id="research" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-academic-navy dark:text-white">{profile.sectionText.research.title}</h2>
                        {isEditing && (
                            <button onClick={() => setEditingSection(true)} className="mb-4 text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                                <Edit size={20} />
                            </button>
                        )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 max-w-xl text-base md:text-lg">
                        <RichText text={profile.sectionText.research.description} />
                    </div>
                </div>
            </div>

            {/* Sticky Controls Bar */}
            <div className="sticky top-[70px] z-30 bg-academic-ivory/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b border-gray-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-all shadow-sm -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl">
                
                {/* Filters - Horizontal Scroll on Mobile */}
                <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <div className="flex items-center gap-2 min-w-max">
                        <div className="flex items-center gap-2 mr-2 text-gray-400 shrink-0">
                            <Filter size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
                        </div>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
                                    selectedCategory === cat 
                                    ? 'bg-academic-navy text-white shadow-md' 
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 border border-transparent hover:border-gray-200 dark:hover:border-slate-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* View Toggles */}
                <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shrink-0 self-end md:self-auto">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                        title="Grid View"
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                        title="List View"
                    >
                        <List size={18} />
                    </button>
                    <button 
                        onClick={() => setViewMode('universe')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'universe' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                        title="Universe View"
                    >
                        <Atom size={18} />
                    </button>
                </div>
            </div>

            {viewMode === 'universe' && (
                <div className="relative w-full h-[400px] md:h-[700px] bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden flex items-center justify-center shadow-inner group/universe">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="absolute w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full border border-academic-navy dark:border-academic-gold"></div>
                        <div className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full border border-academic-navy dark:border-academic-gold"></div>
                    </div>
                    <div className="z-20 relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-academic-navy dark:bg-white flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)] animate-pulse-glow">
                        <div className="text-center text-white dark:text-academic-navy">
                            <Globe size={30} className="mx-auto mb-1 text-academic-gold" />
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{selectedCategory === 'All' ? 'Core' : selectedCategory}</span>
                        </div>
                    </div>
                    {displayedProjects.map((project, index) => {
                        const total = displayedProjects.length;
                        const angleStep = 360 / total;
                        const angle = index * angleStep;
                        // Responsive Radius calculation
                        const baseRadius = window.innerWidth < 768 ? 110 : 220; 
                        const radius = total > 6 ? (index % 2 === 0 ? baseRadius * 0.8 : baseRadius * 1.3) : baseRadius; 
                        
                        return (
                            <div 
                                key={project.id}
                                className="absolute z-10 top-1/2 left-1/2 w-0 h-0"
                                style={{ animation: `spin-slow 60s linear infinite`, animationDelay: `-${index * 5}s` }}
                            >
                                <div 
                                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/planet hover:z-[60]"
                                    style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)` }}
                                >
                                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-white dark:bg-slate-800 border-2 border-academic-gold/30 shadow-xl flex items-center justify-center hover:scale-125 transition-transform duration-300 z-20 cursor-pointer overflow-visible">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-full opacity-90 group-hover/planet:opacity-100"/>
                                        {/* Tooltip - Hidden on mobile usually, or tap to show */}
                                        <div className="absolute top-full mt-4 w-48 md:w-64 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 opacity-0 invisible group-hover/planet:opacity-100 group-hover/planet:visible transition-all duration-300 z-50 text-left pointer-events-none group-hover/planet:pointer-events-auto hidden md:block">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-academic-navy dark:text-white">{project.title}</h4>
                                            </div>
                                            <span className="text-xs font-bold text-academic-gold uppercase block mb-2">{project.category}</span>
                                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-3"><RichText text={project.description} /></div>
                                        </div>
                                        
                                        {/* Mobile Title Badge */}
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/50 text-white text-[9px] px-2 py-1 rounded md:hidden opacity-0 group-hover/planet:opacity-100 transition-opacity">
                                            {project.title.slice(0, 15)}...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedProjects.map((project) => {
                        return (
                            <div 
                                key={project.id}
                                className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Area - COMPACT */}
                                <div className="relative h-32 overflow-hidden bg-gray-200 group">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                            {project.links.paper && <a href={project.links.paper} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-academic-navy hover:bg-academic-gold transition-colors" title="Paper"><FileText size={16} /></a>}
                                            {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-academic-navy hover:bg-academic-gold transition-colors" title="Code"><Code size={16} /></a>}
                                            {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full text-academic-navy hover:bg-academic-gold transition-colors" title="Demo"><ExternalLink size={16} /></a>}
                                    </div>
                                    {isEditing && (
                                        <div className="absolute top-2 right-2 flex gap-2 z-20">
                                            <button onClick={(e) => handleEdit(e, project)} className="p-1 bg-blue-600 text-white rounded"><Edit size={12}/></button>
                                            <button onClick={(e) => handleDelete(e, project.id)} className="p-1 bg-red-600 text-white rounded"><Trash2 size={12}/></button>
                                        </div>
                                    )}
                                </div>

                                {/* Content - COMPACT */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-gray-200 dark:border-slate-700 px-2 py-0.5 rounded-full">{project.category}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[9px] font-mono text-gray-400">Cplx: {project.complexity}%</span>
                                        </div>
                                    </div>
                                    <h3 className="text-md font-bold text-academic-navy dark:text-white mb-1.5 group-hover:text-academic-gold transition-colors line-clamp-2 leading-tight">{project.title}</h3>
                                    <div className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed mb-3 line-clamp-3">
                                        <RichText text={project.description} />
                                    </div>
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-1.5">
                                        {project.technologies.slice(0, 4).map(t => (
                                            <span 
                                                key={t} 
                                                onClick={() => setActiveHighlight(activeHighlight === t ? null : t)}
                                                className={`flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full cursor-pointer transition-all duration-300 border ${
                                                    activeHighlight === t 
                                                    ? 'bg-academic-navy text-white border-academic-navy' 
                                                    : 'bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-academic-gold hover:text-academic-gold'
                                                }`}
                                            >
                                                {getTechIcon(t)}
                                                {t}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-400 border border-transparent">+{project.technologies.length - 4}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {viewMode === 'list' && (
                <div className="space-y-3">
                    {displayedProjects.map((project) => (
                        <div key={project.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 relative group hover:border-academic-gold transition-colors">
                            <div className="w-full md:w-32 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="text-md font-bold text-academic-navy dark:text-white mb-1 group-hover:text-academic-gold transition-colors">{project.title}</h3>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">{project.category}</span>
                                <div className="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-2">
                                    <RichText text={project.description} />
                                </div>
                                <div className="flex gap-3">
                                    {project.links.paper && <a href={project.links.paper} className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-academic-navy dark:hover:text-white transition-colors"><FileText size={10}/> Paper</a>}
                                    {project.links.code && <a href={project.links.code} className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-academic-navy dark:hover:text-white transition-colors"><Code size={10}/> Code</a>}
                                    {project.links.demo && <a href={project.links.demo} className="flex items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-academic-navy dark:hover:text-white transition-colors"><ExternalLink size={10}/> Demo</a>}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {project.technologies.slice(0, 5).map(t => (
                                        <span key={t} className="text-[9px] text-gray-400 bg-gray-50 dark:bg-slate-900 px-2 py-0.5 rounded border border-gray-100 dark:border-slate-700">{t}</span>
                                    ))}
                                </div>
                            </div>
                            {isEditing && (
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <button onClick={(e) => handleEdit(e, project)} className="p-1 bg-blue-600 text-white rounded"><Edit size={10}/></button>
                                    <button onClick={(e) => handleDelete(e, project.id)} className="p-1 bg-red-600 text-white rounded"><Trash2 size={10}/></button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {filteredProjects.length > INITIAL_DISPLAY_COUNT && (
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                    >
                        {showAll ? 'Show Less' : `Show More (${filteredProjects.length - INITIAL_DISPLAY_COUNT} hidden)`}
                        {showAll ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                    </button>
                </div>
            )}

            {isEditing && (
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-8 py-3 bg-academic-navy text-white font-bold rounded-lg hover:bg-academic-gold hover:text-academic-navy transition-all shadow-lg"
                    >
                        <Plus size={20} /> Add Research
                    </button>
                </div>
            )}
        </div>
      </div>

      <EditModal
        isOpen={!!editingProject || isAdding}
        onClose={() => { setEditingProject(null); setIsAdding(false); }}
        initialData={editingProject || { title: '', category: '', description: '', image: '', technologies: [], links: {code:'', paper:'', demo:''}, impact: '', complexity: 50 }}
        onSave={handleSave}
        title={isAdding ? "Add Research" : "Edit Research"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.research}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, research: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
