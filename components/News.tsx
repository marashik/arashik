
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Bell, Calendar, ChevronRight, Edit, ExternalLink, Filter, Grid, LayoutList, List, Mic2, Newspaper, Plus, Search, Tag, Trash2, Award, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { NewsItem } from '../types';
import { EditModal } from './EditModal';
import { RichText } from './RichText';

export const News: React.FC = () => {
  const { news, setNews, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;

  const categories = ['All', 'Conference', 'Award', 'Publication', 'Grant', 'Position', 'General'];

  // Filter Logic
  const filteredNews = news.filter(item => {
      const matchesCategory = filter === 'All' || item.category === filter;
      const matchesSearch = searchQuery === '' || 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.find(n => n.featured);
  const otherNews = filteredNews.filter(n => n.id !== featuredNews?.id);
  const displayedNews = showAll ? otherNews : otherNews.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
      if(confirm("Delete this news item?")) setNews(news.filter(n => n.id !== id));
  }

  const handleSave = (data: NewsItem) => {
      // Ensure only one featured item if the new one is featured
      let updatedNews = news;
      if (data.featured) {
          updatedNews = news.map(n => ({ ...n, featured: false }));
      }

      if(isAdding) {
          setNews([...updatedNews, { ...data, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setNews(updatedNews.map(n => n.id === data.id ? data : n));
          setEditingItem(null);
      }
  }

  const getCategoryIcon = (category: string) => {
      switch(category) {
          case 'Conference': return <Mic2 size={16} />;
          case 'Award': return <Award size={16} />;
          case 'Publication': return <BookOpen size={16} />;
          case 'Position': return <Briefcase size={16} />;
          default: return <Newspaper size={16} />;
      }
  };

  const getCategoryColor = (category: string) => {
      switch(category) {
          case 'Conference': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
          case 'Award': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
          case 'Publication': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
          case 'Position': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
          default: return 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300';
      }
  };

  return (
    <section id="news" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.news.title}</h2>
                        {isEditing && (
                            <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                                <Edit size={20}/>
                            </button>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg">
                        {profile.sectionText.news.description}
                    </p>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="sticky top-[70px] z-30 bg-academic-ivory/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b border-gray-200 dark:border-slate-800 mb-8 flex flex-col xl:flex-row justify-between items-center gap-4 transition-all shadow-sm -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl">
                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar gap-2">
                    <div className="flex items-center gap-2 mr-2 text-gray-400 shrink-0">
                        <Filter size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                filter === cat 
                                ? 'bg-academic-navy text-white shadow-md' 
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto">
                    {/* Search */}
                    <div className="relative group flex-1 md:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-academic-gold transition-colors" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search news..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-sm transition-all shadow-sm"
                        />
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shrink-0">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                            title="Grid View"
                        >
                            <Grid size={18} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                            title="List View"
                        >
                            <LayoutList size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured Item */}
            {featuredNews && !searchQuery && filter === 'All' && (
                <div className="mb-12 relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-academic-navy to-blue-900 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-10"></div>
                    <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-academic-gold text-academic-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2">
                                    <Bell size={12} /> Featured
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
                                    <Calendar size={14} /> {featuredNews.date}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-academic-navy dark:text-white mb-4 leading-tight">
                                {featuredNews.title}
                            </h3>
                            <div className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                <RichText text={featuredNews.summary} />
                            </div>
                            <div className="flex items-center gap-4">
                                {featuredNews.link && (
                                    <a href={featuredNews.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-academic-navy dark:text-white font-bold hover:text-academic-gold transition-colors border-b-2 border-academic-gold pb-0.5">
                                        Read More <ArrowRight size={16} />
                                    </a>
                                )}
                                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getCategoryColor(featuredNews.category)}`}>
                                    {getCategoryIcon(featuredNews.category)} {featuredNews.category}
                                </span>
                            </div>
                        </div>
                        {isEditing && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => setEditingItem(featuredNews)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit size={16}/></button>
                                <button onClick={() => handleDelete(featuredNews.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 size={16}/></button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* News Grid/List */}
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                {displayedNews.map(item => (
                    <div 
                        key={item.id} 
                        className={`relative group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${viewMode === 'list' ? 'p-6 flex flex-col md:flex-row gap-6 items-start' : 'p-6 flex flex-col'}`}
                    >
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 ${getCategoryColor(item.category)}`}>
                                        {getCategoryIcon(item.category)} {item.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                        <Calendar size={12} /> {item.date}
                                    </span>
                                </div>
                            </div>
                            
                            <h4 className="text-xl font-bold text-academic-navy dark:text-white mb-3 group-hover:text-academic-gold transition-colors leading-tight">
                                {item.title}
                            </h4>
                            
                            <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                <RichText text={item.summary} />
                            </div>

                            {item.link && (
                                <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-academic-navy dark:hover:text-white uppercase tracking-wider transition-colors">
                                    Details <ExternalLink size={12} />
                                </a>
                            )}
                        </div>

                        {isEditing && (
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                                <button onClick={() => setEditingItem(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded"><Edit size={14}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                            </div>
                        )}
                    </div>
                ))}

                {isEditing && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className={`border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-all bg-white/50 dark:bg-slate-900/50 ${viewMode === 'grid' ? 'min-h-[250px]' : 'p-8'}`}
                    >
                        <Plus size={32} className="mb-2"/>
                        <span className="font-bold text-sm">Post Update</span>
                    </button>
                )}
            </div>

            {/* Show More */}
            {otherNews.length > INITIAL_DISPLAY_COUNT && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-8 py-3 bg-academic-navy text-white font-bold rounded-lg hover:bg-academic-gold hover:text-academic-navy transition-all shadow-lg"
                    >
                        {showAll ? 'Show Less' : `View All Updates (${otherNews.length - INITIAL_DISPLAY_COUNT} more)`}
                    </button>
                </div>
            )}
        </div>
      </div>

      <EditModal
         isOpen={!!editingItem || isAdding}
         onClose={() => { setEditingItem(null); setIsAdding(false); }}
         initialData={editingItem || { title: '', date: '', category: 'General', summary: '', link: '', featured: false }}
         onSave={handleSave}
         title={isAdding ? "Add News Item" : "Edit News Item"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.news}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, news: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
