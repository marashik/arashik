
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ExternalLink, Plus, Edit, Trash2, Search, Filter, LayoutGrid, List, Link as LinkIcon, ChevronDown, ChevronUp, Layers, Folder, Dna, Shield, FlaskConical, Database, Activity, Box, Cpu, Bug, FileText as FileIcon, GitMerge, Bot, Brain, Microscope, Globe } from 'lucide-react';
import { Resource } from '../types';
import { EditModal } from './EditModal';
import { DynamicIcon } from './DynamicIcon';
import { RichText } from './RichText';

export const ImportantLinks: React.FC = () => {
  const { resources, setResources, isEditing, profile, updateProfile } = useData();
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filter State: 'All' means showing the Root Folder View
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Collapse State for Subcategories
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});

  // Parse Resources into Hierarchy: Root -> Subcategory -> Items
  const groupedResources = useMemo<Record<string, Record<string, Resource[]>>>(() => {
      const groups: Record<string, Record<string, Resource[]>> = {};

      resources.forEach(r => {
          const categoryString = r.category || 'Other';
          // Split by ' > ' to detect hierarchy (e.g. "Cancer > Databases")
          const parts = categoryString.split(' > ');
          const root = parts[0];
          const sub = parts.length > 1 ? parts[1] : 'General'; 

          if (!groups[root]) groups[root] = {};
          if (!groups[root][sub]) groups[root][sub] = [];
          groups[root][sub].push(r);
      });
      return groups;
  }, [resources]);

  // Get unique root categories - Strictly Alphabetical Order
  const availableRoots = useMemo(() => Object.keys(groupedResources).sort(), [groupedResources]);

  const filterCategories = ['All', ...availableRoots];

  // Logic to determine what to display based on filter and search
  const isRootView = selectedCategory === 'All' && !searchQuery;

  const displayData = useMemo(() => {
      // If "All" is selected and no search, we show the Folder Grid (handled in render)
      // If searching, we search across ALL roots regardless of selected category (global search)
      let rootsToRender = selectedCategory === 'All' ? availableRoots : [selectedCategory];
      
      if (searchQuery) {
          rootsToRender = availableRoots;
      }

      return rootsToRender.map(root => {
          const subCats = groupedResources[root] || {};
          const subs = Object.keys(subCats).sort(); // Sort subcategories alphabetically
          
          // Filter items within subcategories based on search query
          const filteredSubs = subs.map(sub => {
              const items = subCats[sub];
              const filteredItems = items.filter(r => 
                  searchQuery.trim() === '' ||
                  r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  r.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).sort((a, b) => a.title.localeCompare(b.title)); // Sort items alphabetically by title
              
              return { name: sub, items: filteredItems };
          }).filter(s => s.items.length > 0); 

          return { name: root, subs: filteredSubs };
      }).filter(r => r.subs.length > 0); 
  }, [selectedCategory, availableRoots, groupedResources, searchQuery]);

  const handleDelete = (id: string) => {
      if(confirm("Delete link?")) setResources(resources.filter(r => r.id !== id));
  }

  const handleSave = (data: Resource) => {
      if(isAdding) {
          setResources([...resources, { ...data, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setResources(resources.map(r => r.id === data.id ? data : r));
          setEditingResource(null);
      }
  }

  const toggleSub = (root: string, sub: string) => {
      const key = `${root} > ${sub}`;
      setCollapsedSubs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAll = (expand: boolean) => {
      if (expand) {
          setCollapsedSubs({});
      } else {
          const allCollapsed: Record<string, boolean> = {};
          displayData.forEach(root => {
              root.subs.forEach(sub => {
                  allCollapsed[`${root.name} > ${sub.name}`] = true;
              });
          });
          setCollapsedSubs(allCollapsed);
      }
  };

  // --- RENDER CARD (Grid View) - COMPACT ---
  const renderGridCard = (resource: Resource) => (
      <div key={resource.id} className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-academic-gold dark:hover:border-academic-gold hover:shadow-md transition-all p-3 h-full hover:-translate-y-1">
        <div className="flex justify-between items-start mb-2">
            <div className="p-1.5 bg-gray-50 dark:bg-slate-700/50 text-academic-navy dark:text-academic-gold rounded-md group-hover:scale-110 transition-transform">
                <DynamicIcon name={resource.icon} size={16} />
            </div>
            <a href={resource.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-academic-gold transition-colors p-1">
                <ExternalLink size={14} />
            </a>
        </div>
        
        <a href={resource.url} target="_blank" rel="noreferrer" className="block mb-1">
            <h4 className="font-bold text-academic-navy dark:text-gray-100 text-xs leading-snug group-hover:text-academic-gold transition-colors line-clamp-2">
                {resource.title}
            </h4>
        </a>
        
        <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mb-1 flex-1">
            {resource.description}
        </p>

        {isEditing && (
            <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 p-0.5 rounded border border-gray-200 dark:border-slate-600 shadow-sm z-20">
                <button onClick={() => setEditingResource(resource)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={10}/></button>
                <button onClick={() => handleDelete(resource.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={10}/></button>
            </div>
        )}
    </div>
  );

  // --- RENDER LIST ITEM (List View) - COMPACT ---
  const renderListItem = (resource: Resource) => (
      <div key={resource.id} className="group relative flex items-start gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-academic-gold transition-all hover:shadow-sm">
          <div className="p-2 bg-gray-50 dark:bg-slate-700/50 text-academic-navy dark:text-academic-gold rounded-md shrink-0">
              <DynamicIcon name={resource.icon} size={16} />
          </div>
          <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                  <a href={resource.url} target="_blank" rel="noreferrer" className="hover:underline decoration-academic-gold underline-offset-2">
                      <h4 className="font-bold text-academic-navy dark:text-gray-100 text-xs">{resource.title}</h4>
                  </a>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-academic-gold transition-colors ml-2">
                      <ExternalLink size={12} />
                  </a>
              </div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{resource.description}</p>
          </div>
          {isEditing && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingResource(resource)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={10}/></button>
                    <button onClick={() => handleDelete(resource.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={10}/></button>
                </div>
          )}
      </div>
  );

  const getRootIcon = (name: string) => {
      const n = name.toLowerCase();
      if (n.includes('cancer')) return "Dna";
      if (n.includes('vaccine')) return "Shield";
      if (n.includes('drug')) return "FlaskConical";
      if (n.includes('genomic')) return "GitMerge";
      if (n.includes('transcript')) return "FileIcon";
      if (n.includes('brain') || n.includes('neuro')) return "Brain";
      if (n.includes('ai') || n.includes('intelligence')) return "Bot";
      if (n.includes('structure')) return "Box";
      if (n.includes('infectious') || n.includes('microbio')) return "Bug";
      if (n.includes('metabol')) return "Activity";
      if (n.includes('proteom')) return "Layers";
      if (n.includes('cell')) return "Microscope";
      return "Folder";
  };

  return (
    <section id="links" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.links.title}</h2>
                        {isEditing && (
                            <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                                <Edit size={20}/>
                            </button>
                        )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 max-w-xl text-base md:text-lg">
                        <RichText text={profile.sectionText.links.description} />
                    </div>
                </div>
            </div>

            {/* Sticky Controls Bar */}
            <div className="sticky top-[70px] z-30 bg-academic-ivory/95 dark:bg-slate-900/95 backdrop-blur-md py-4 border-b border-gray-200 dark:border-slate-800 mb-8 flex flex-col lg:flex-row justify-between items-center gap-4 transition-all shadow-sm -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl">
                
                {/* Back Button / Navigation State */}
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    {!isRootView && (
                        <button 
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="flex items-center gap-2 px-4 py-2 bg-academic-navy text-white rounded-lg text-sm font-bold hover:bg-academic-gold hover:text-academic-navy transition-all shadow-sm"
                        >
                            <Layers size={16} /> <span className="hidden sm:inline">Collections</span>
                        </button>
                    )}
                    
                    {/* Current View Title */}
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="p-1.5 bg-academic-gold/10 rounded-md text-academic-gold shrink-0">
                            {isRootView ? <Layers size={18}/> : <DynamicIcon name={getRootIcon(selectedCategory)} size={18}/>}
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-academic-navy dark:text-white truncate">
                            {searchQuery ? `Search: "${searchQuery}"` : selectedCategory === 'All' ? 'Resource Collections' : selectedCategory}
                        </h3>
                    </div>
                </div>
                
                <div className="flex w-full lg:w-auto gap-4 items-center justify-between lg:justify-end">
                    {/* Search Input */}
                    <div className="relative group flex-1 lg:w-72 lg:flex-none">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-academic-gold transition-colors" />
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search across all resources..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-sm transition-all shadow-sm"
                        />
                    </div>

                    {/* View Toggles (Only visible when not in root view or searching) */}
                    {!isRootView && (
                        <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700 shrink-0">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                                title="Grid View"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 dark:bg-slate-700 text-academic-navy dark:text-white' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- VIEW 1: ROOT FOLDERS (Dashboard) --- */}
            {isRootView && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
                    {availableRoots.map(root => {
                        const subCats = groupedResources[root];
                        const totalItems = (Object.values(subCats) as Resource[][]).reduce((acc, arr) => acc + arr.length, 0);
                        
                        return (
                            <button 
                                key={root}
                                onClick={() => setSelectedCategory(root)}
                                className="group relative flex flex-col items-center text-center bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-academic-gold dark:hover:border-academic-gold shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-full group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-slate-700 text-academic-navy dark:text-academic-gold">
                                    <DynamicIcon name={getRootIcon(root)} size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-academic-navy dark:text-white mb-2">{root}</h3>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700/50 rounded-full text-xs font-mono font-bold text-gray-500 dark:text-gray-400 group-hover:bg-academic-gold/10 group-hover:text-academic-gold transition-colors">
                                    {totalItems} Resources
                                </span>
                                <span className="mt-4 text-xs font-medium text-academic-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to explore collection
                                </span>
                            </button>
                        );
                    })}

                    {isEditing && (
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-all bg-gray-50/50 dark:bg-slate-800/50"
                        >
                            <Plus size={40} className="mb-4" />
                            <span className="font-bold text-sm">New Category</span>
                        </button>
                    )}
                </div>
            )}

            {/* --- VIEW 2: DETAILED LIST (Inside Folder or Search) --- */}
            {!isRootView && (
                <div className="space-y-12 animate-in slide-in-from-right-4 duration-300">
                    
                    {/* Expand/Collapse Controls */}
                    <div className="flex justify-end mb-4 gap-4 px-1">
                        <button onClick={() => toggleAll(true)} className="text-xs font-bold text-gray-500 hover:text-academic-gold flex items-center gap-1">
                            <ChevronDown size={14} /> Expand All
                        </button>
                        <button onClick={() => toggleAll(false)} className="text-xs font-bold text-gray-500 hover:text-academic-gold flex items-center gap-1">
                            <ChevronUp size={14} /> Collapse All
                        </button>
                    </div>

                    {displayData.length > 0 ? (
                        displayData.map(rootData => (
                            <div key={rootData.name} className="relative">
                                {/* Root Category Header (Only if searching, otherwise we know where we are) */}
                                {searchQuery && (
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-2 bg-academic-gold/10 rounded-lg text-academic-gold">
                                            <DynamicIcon name={getRootIcon(rootData.name)} size={20}/>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-academic-navy dark:text-white">{rootData.name}</h3>
                                        <div className="h-px flex-1 bg-gray-200 dark:bg-slate-800 opacity-50"></div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {rootData.subs.map(subData => {
                                        const isCollapsed = collapsedSubs[`${rootData.name} > ${subData.name}`];
                                        return (
                                        <div key={subData.name} className="border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            {/* Subcategory Header - Clickable */}
                                            <button 
                                                onClick={() => toggleSub(rootData.name, subData.name)}
                                                className="w-full flex items-center justify-between p-3 bg-gray-50/50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left group"
                                            >
                                                <h4 className="text-xs font-bold text-academic-navy dark:text-gray-200 flex items-center gap-3">
                                                    {(subData.name !== 'General' || Object.keys(groupedResources[rootData.name]).length > 1) && (
                                                        <span className="w-1 h-4 bg-academic-gold rounded-full"></span>
                                                    )}
                                                    {subData.name}
                                                    <span className="text-[10px] font-normal text-gray-400 ml-2">({subData.items.length})</span>
                                                </h4>
                                                <div className="text-gray-400 group-hover:text-academic-gold transition-colors">
                                                    {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                                                </div>
                                            </button>
                                            
                                            {/* Content Area */}
                                            {!isCollapsed && (
                                                <div className="p-4 bg-white/50 dark:bg-slate-950/30 animate-in slide-in-from-top-2 duration-200">
                                                    <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                                        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" : "space-y-2"}>
                                                            {subData.items.map(item => 
                                                                viewMode === 'grid' ? renderGridCard(item) : renderListItem(item)
                                                            )}
                                                            
                                                            {isEditing && (
                                                                <button 
                                                                    onClick={() => { setEditingResource({ id: '', title: '', url: '', description: '', category: `${rootData.name} > ${subData.name}`, icon: 'Link' }); setIsAdding(true); }}
                                                                    className={`flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-colors ${viewMode === 'grid' ? 'flex-col p-3 min-h-[120px]' : 'p-3'}`}
                                                                >
                                                                    <Plus size={16} className={viewMode === 'grid' ? "mb-1" : "mr-2"} />
                                                                    <span className="text-[10px] font-bold">Add Link</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )})}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-400 bg-gray-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                            <p className="text-lg">No resources found matching your criteria.</p>
                        </div>
                    )}

                    {isEditing && (
                        <div className="mt-12 flex justify-center">
                            <button 
                                onClick={() => setIsAdding(true)}
                                className="flex items-center gap-2 px-8 py-3 bg-academic-navy text-white font-bold rounded-lg hover:bg-academic-gold hover:text-academic-navy transition-all shadow-lg"
                            >
                                <Plus size={20} /> Add New Resource Collection
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      <EditModal
         isOpen={!!editingResource || isAdding}
         onClose={() => { setEditingResource(null); setIsAdding(false); }}
         initialData={editingResource || { title: '', url: '', description: '', category: 'General Resources > Links', icon: 'Link' }}
         onSave={handleSave}
         title={isAdding ? "Add Resource" : "Edit Resource"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.links}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, links: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
