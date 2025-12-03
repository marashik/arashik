
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { BookOpen, Quote, Download, Plus, Edit, Trash2, BarChart2, List, Filter, Link as LinkIcon, RefreshCw, AlertCircle, TrendingUp, ExternalLink, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Publication } from '../types';
import { EditModal } from './EditModal';
import { PublicationAnalytics } from './PublicationAnalytics';

const MetricsDisplay: React.FC<{ doi?: string; manualCitations: number }> = ({ doi, manualCitations }) => {
    const [citationCount, setCitationCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState<'Manual' | 'Semantic Scholar' | 'CrossRef'>('Manual');

    useEffect(() => {
        if (!doi) return;
        let isMounted = true;
        const fetchMetrics = async () => {
            setLoading(true);
            try {
                await new Promise(r => setTimeout(r, Math.random() * 1000));
                const ssRes = await fetch(`https://api.semanticscholar.org/graph/v1/paper/DOI:${doi}?fields=citationCount`);
                if (ssRes.ok && isMounted) {
                    const data = await ssRes.json();
                    if (typeof data.citationCount === 'number') {
                        setCitationCount(data.citationCount);
                        setSource('Semantic Scholar');
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) { console.warn("SS failed"); }

            try {
                const crRes = await fetch(`https://api.crossref.org/works/${doi}`);
                if (crRes.ok && isMounted) {
                    const data = await crRes.json();
                    const crCount = data.message?.['is-referenced-by-count'];
                    if (typeof crCount === 'number') {
                        setCitationCount(crCount);
                        setSource('CrossRef');
                        setLoading(false);
                        return;
                    }
                }
            } catch (e) { console.warn("CR failed"); }
            if (isMounted) setLoading(false);
        };
        fetchMetrics();
        return () => { isMounted = false; };
    }, [doi]);

    const displayCitations = citationCount !== null ? citationCount : manualCitations;
    const isLive = citationCount !== null;

    return (
        <div className="flex flex-col items-center md:items-end group/cite cursor-help" title={`Source: ${source}`}>
            <div className="flex items-start gap-1">
                {loading ? (
                    <RefreshCw size={12} className="animate-spin text-academic-gold mt-1" />
                ) : (
                    <span className="text-xl font-serif font-bold text-academic-navy dark:text-white leading-none tracking-tight">
                        {displayCitations}
                    </span>
                )}
                {isLive && !loading && (
                    <span className="relative flex h-1.5 w-1.5 mt-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                )}
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Citations</span>
        </div>
    );
};

export const Publications: React.FC = () => {
  const { publications, setPublications, isEditing, activeHighlight, setActiveHighlight, profile, updateProfile } = useData();
  const [filter, setFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;
  
  const uniqueYears = Array.from(new Set(publications.map(p => Number(p.year)))).sort((a: number, b: number) => b - a);
  const years = ['All', ...uniqueYears.map(String)];

  const filteredPubs = publications.filter(p => {
    const matchesType = filter === 'All' || p.type === filter;
    const matchesYear = yearFilter === 'All' || p.year.toString() === yearFilter;
    const matchesSearch = searchQuery === '' || 
                          p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (Array.isArray(p.authors) && p.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                          p.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesYear && matchesSearch;
  });

  const displayedPubs = showAll ? filteredPubs : filteredPubs.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
      if(confirm("Delete this publication?")) {
          setPublications(publications.filter(p => p.id !== id));
      }
  }

  const handleSave = (pub: Publication) => {
      if(isAdding) {
          const newPub = { ...pub, id: Date.now().toString(), authors: Array.isArray(pub.authors) ? pub.authors : [], tags: Array.isArray(pub.tags) ? pub.tags : [] };
          setPublications([...publications, newPub]);
          setIsAdding(false);
      } else {
          setPublications(publications.map(p => p.id === pub.id ? pub : p));
          setEditingPub(null);
      }
  }

  const matchesGlobalFilter = (pub: Publication) => {
      if (!activeHighlight) return true;
      const term = activeHighlight.toLowerCase();
      return pub.title.toLowerCase().includes(term) || pub.tags.some(t => t.toLowerCase().includes(term));
  }

  return (
    <section id="publications" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
            <div>
                <div className="flex items-center gap-4 mb-3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.publications.title}</h2>
                {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl text-base md:text-lg font-light">{profile.sectionText.publications.description}</p>
            </div>
            </div>

            {/* Sticky Controls Bar */}
            <div className="sticky top-[70px] z-30 bg-academic-ivory/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b border-gray-200 dark:border-slate-800 mb-8 flex flex-col xl:flex-row items-start xl:items-center gap-4 transition-all shadow-sm -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl">
            
            {/* View Toggle */}
            <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm shrink-0 w-full md:w-auto">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'list' ? 'bg-academic-navy text-white shadow' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                >
                    <List size={16} /> List
                </button>
                <button 
                    onClick={() => setViewMode('analytics')}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'analytics' ? 'bg-academic-navy text-white shadow' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                >
                    <BarChart2 size={16} /> Analytics
                </button>
            </div>

            {viewMode === 'list' && (
                <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-start xl:justify-end w-full">
                    
                    {/* Search */}
                    <div className="relative group w-full md:w-64 flex-1 md:flex-none">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-academic-gold transition-colors" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:border-academic-gold outline-none text-sm transition-all"
                        />
                    </div>
                    
                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                        {/* Year Filter */}
                        <div className="relative group min-w-[100px]">
                            <select 
                                value={yearFilter}
                                onChange={(e) => setYearFilter(e.target.value)}
                                className="w-full appearance-none bg-white dark:bg-slate-800 py-2.5 pl-3 pr-8 text-sm font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-academic-gold cursor-pointer focus:outline-none transition-colors"
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year === 'All' ? 'All Years' : year}</option>
                                ))}
                            </select>
                            <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Type Filter Pills */}
                        <div className="flex gap-2 items-center">
                            {['All', 'Journal', 'Conference', 'Literature Review'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border ${
                                        filter === type 
                                        ? 'bg-academic-navy text-white border-academic-navy' 
                                        : 'bg-white dark:bg-slate-800 text-gray-500 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            </div>

            {viewMode === 'analytics' ? (
                <PublicationAnalytics />
            ) : (
                <div className="space-y-4">
                {displayedPubs.length > 0 ? (
                    displayedPubs.map((pub) => {
                        const isDimmed = activeHighlight && !matchesGlobalFilter(pub);
                        const isHighlighted = activeHighlight && matchesGlobalFilter(pub);

                        return (
                            <div 
                                key={pub.id} 
                                className={`group relative bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 transition-all hover:shadow-xl hover:border-academic-gold/30
                                    ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'}
                                    ${isHighlighted ? 'ring-2 ring-academic-gold shadow-lg' : ''}
                                `}
                            >
                            {isEditing && (
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <button onClick={() => setEditingPub(pub)} className="p-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"><Edit size={12}/></button>
                                    <button onClick={() => handleDelete(pub.id)} className="p-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><Trash2 size={12}/></button>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Main Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300`}>
                                            {pub.type}
                                        </span>
                                        <span className="text-[10px] font-medium text-academic-gold">{pub.year}</span>
                                    </div>
                                    
                                    <h3 className="text-md md:text-lg font-serif font-bold text-academic-navy dark:text-white mb-1 group-hover:text-academic-gold transition-colors leading-tight">
                                        {pub.url ? (
                                            <a href={pub.url} target="_blank" rel="noreferrer" className="hover:underline decoration-academic-gold underline-offset-4">{pub.title}</a>
                                        ) : (
                                            pub.title
                                        )}
                                    </h3>
                                    
                                    <p className="text-gray-600 dark:text-gray-400 mb-2 font-light text-xs">
                                        {Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors}
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1.5 font-medium italic">
                                            <BookOpen size={12} />
                                            {pub.venue}
                                        </div>
                                    </div>

                                    {/* Minimalist Actions - COMPACT */}
                                    <div className="flex items-center gap-3 mt-3">
                                        {pub.doi && (
                                            <a 
                                                href={`https://doi.org/${pub.doi}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-400 hover:text-academic-navy dark:hover:text-white transition-colors"
                                            >
                                                <ExternalLink size={10} /> DOI
                                            </a>
                                        )}
                                        {(pub.pdfUrl || pub.url) && (
                                            <a 
                                                href={pub.pdfUrl || pub.url} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-400 hover:text-academic-navy dark:hover:text-white transition-colors"
                                            >
                                                <Download size={10} /> PDF
                                            </a>
                                        )}
                                        <button className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-gray-400 hover:text-academic-navy dark:hover:text-white transition-colors">
                                            <Quote size={10} /> Cite
                                        </button>
                                    </div>
                                </div>

                                {/* Minimalist Metrics Column - COMPACT */}
                                <div className="flex flex-row md:flex-col items-center md:items-end justify-start md:justify-center gap-6 md:gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700 pt-3 md:pt-0 md:pl-4 min-w-[80px] shrink-0">
                                    <MetricsDisplay doi={pub.doi} manualCitations={pub.citations} />
                                    {pub.impactFactor && (
                                        <div className="flex flex-col items-center md:items-end">
                                            <span className="text-xl font-serif font-bold text-academic-navy dark:text-academic-gold leading-none tracking-tight">
                                                {pub.impactFactor}
                                            </span>
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Impact Factor</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                        <p className="text-sm">No publications found matching your filters.</p>
                    </div>
                )}

                {filteredPubs.length > INITIAL_DISPLAY_COUNT && (
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                        >
                            {showAll ? 'Show Less' : `Show More (${filteredPubs.length - INITIAL_DISPLAY_COUNT} hidden)`}
                            {showAll ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                        </button>
                    </div>
                )}

                {isEditing && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-gray-400 hover:border-academic-gold hover:text-academic-gold transition-all bg-white dark:bg-slate-900 group mt-6"
                    >
                        <Plus size={20} className="mr-2 group-hover:scale-110 transition-transform" /> 
                        <span className="font-bold text-sm">Add New Publication</span>
                    </button>
                )}
                </div>
            )}
        </div>
      </div>

      <EditModal 
        isOpen={!!editingPub || isAdding}
        onClose={() => { setEditingPub(null); setIsAdding(false); }}
        initialData={editingPub || { title: '', authors: [], venue: '', year: new Date().getFullYear(), type: 'Journal', citations: 0, url: '', doi: '', pdfUrl: '', impactFactor: '', tags: [] }}
        onSave={handleSave}
        title={isAdding ? "Add Publication" : "Edit Publication"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.publications}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, publications: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
