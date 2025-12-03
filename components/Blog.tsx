
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, Clock, Plus, Edit, Trash2, Tag, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { BlogPost } from '../types';
import { EditModal } from './EditModal';

export const Blog: React.FC = () => {
  const { blogs, setBlogs, isEditing, profile, updateProfile } = useData();
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;

  // Derive unique categories from blogs
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  // Filter blogs based on selection and search query
  const filteredBlogs = blogs.filter(b => {
      const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
                            b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  const displayedBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
      if(confirm("Delete post?")) setBlogs(blogs.filter(b => b.id !== id));
  }

  const handleSave = (data: BlogPost) => {
      if(isAdding) {
          setBlogs([...blogs, { ...data, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setBlogs(blogs.map(b => b.id === data.id ? data : b));
          setEditingBlog(null);
      }
  }

  return (
    <section id="blog" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white mb-2">{profile.sectionText.blog.title}</h2>
                        {isEditing && (
                            <button onClick={() => setEditingSection(true)} className="mb-2 text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                                <Edit size={20}/>
                            </button>
                        )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl">{profile.sectionText.blog.description}</p>
                </div>
                
                <div className="flex flex-col items-end gap-4">
                    <a href="#" className="hidden md:flex items-center gap-2 text-academic-gold font-medium hover:gap-3 transition-all">
                        View All Posts <ArrowRight size={18} />
                    </a>
                </div>
            </div>

            {/* Controls Bar: Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 pb-4 border-b border-gray-200 dark:border-slate-800">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <div className="flex items-center gap-2 mr-2 text-gray-400">
                        <Filter size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Filter:</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                selectedCategory === cat
                                ? 'bg-academic-navy text-white shadow-md dark:bg-academic-gold dark:text-academic-navy'
                                : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative group w-full md:w-64 shrink-0">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-academic-gold transition-colors" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-sm transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.length > 0 ? (
                    displayedBlogs.map((blog) => (
                        <article key={blog.id} className="relative group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col h-full hover:-translate-y-1">
                            {isEditing && (
                                <div className="absolute top-2 right-2 z-20 flex gap-2">
                                    <button onClick={() => setEditingBlog(blog)} className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={14}/></button>
                                    <button onClick={() => handleDelete(blog.id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={14}/></button>
                                </div>
                            )}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-academic-navy/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                                    <Tag size={10} className="text-academic-gold"/>
                                    {blog.category}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                                    <span>{blog.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                                    <span className="flex items-center gap-1"><Clock size={12}/> {blog.readTime}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-academic-navy dark:text-white mb-3 group-hover:text-academic-gold transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                                    {blog.excerpt}
                                </p>
                                
                                <a href="#" className="inline-flex items-center gap-1 text-academic-navy dark:text-white font-semibold text-sm group-hover:text-academic-gold transition-colors mt-auto">
                                    Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                        <p>No posts found matching your search.</p>
                    </div>
                )}

                {isEditing && (
                    <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-all min-h-[300px]"
                    >
                        <Plus size={32} className="mb-2"/>
                        <span>New Blog Post</span>
                    </button>
                )}
            </div>

            {filteredBlogs.length > INITIAL_DISPLAY_COUNT && (
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                        {showAll ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                    </button>
                </div>
            )}
        </div>
      </div>

      <EditModal
        isOpen={!!editingBlog || isAdding}
        onClose={() => { setEditingBlog(null); setIsAdding(false); }}
        initialData={editingBlog || { title: '', date: '', excerpt: '', category: '', readTime: '', image: '' }}
        onSave={handleSave}
        title={isAdding ? "Add Blog Post" : "Edit Blog Post"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.blog}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, blog: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
