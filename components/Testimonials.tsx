
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Quote, Edit, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Testimonial } from '../types';
import { EditModal } from './EditModal';
import { LazyImage } from './LazyImage';

export const Testimonials: React.FC = () => {
  const { testimonials, setTestimonials, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 2;
  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm("Delete this testimonial?")) {
        setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleSave = (item: Testimonial) => {
      if(isAdding) {
          setTestimonials([...testimonials, { ...item, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setTestimonials(testimonials.map(t => t.id === item.id ? item : t));
          setEditingItem(null);
      }
  };

  return (
    <section id="testimonials" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
           <Quote size={300} className="text-academic-gold transform rotate-12" />
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-3 justify-center mb-4">
                <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.testimonials.title}</h2>
                {isEditing && (
                   <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                       <Edit size={20}/>
                   </button>
                )}
            </div>
            <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">{profile.sectionText.testimonials.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayedTestimonials.map((item) => (
                <div key={item.id} className="relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all group">
                    {isEditing && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button onClick={() => setEditingItem(item)} className="p-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"><Edit size={12}/></button>
                            <button onClick={() => handleDelete(item.id)} className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><Trash2 size={12}/></button>
                        </div>
                    )}
                    
                    <div className="flex gap-4 items-start mb-4">
                        <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border-2 border-academic-gold/20 shadow-sm">
                            <LazyImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base text-academic-navy dark:text-white leading-tight mb-1">{item.name}</h3>
                            <p className="text-xs text-academic-gold font-bold uppercase tracking-wide mb-1">{item.role}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight font-medium">{item.institution}</p>
                        </div>
                        <Quote size={20} className="text-academic-gold/10 shrink-0" />
                    </div>
                    
                    <div className="relative pl-4 border-l-2 border-academic-gold/20">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic text-sm relative z-10">
                            "{item.text}"
                        </p>
                    </div>
                </div>
            ))}

            {isEditing && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="min-h-[150px] bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-colors"
                >
                    <Plus size={24} className="mb-2"/>
                    <span className="text-sm">Add Testimonial</span>
                </button>
            )}
        </div>

        {testimonials.length > INITIAL_DISPLAY_COUNT && (
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

      <EditModal
        isOpen={!!editingItem || isAdding}
        onClose={() => { setEditingItem(null); setIsAdding(false); }}
        initialData={editingItem || { name: '', role: '', institution: '', text: '', image: '' }}
        onSave={handleSave}
        title={isAdding ? "Add Testimonial" : "Edit Testimonial"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.testimonials}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, testimonials: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
