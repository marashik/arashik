
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Briefcase, Edit, Trash2, Plus, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { TimelineItem } from '../types';
import { EditModal } from './EditModal';
import { GithubHeatmap } from './GithubHeatmap';
import { RichText } from './RichText';

export const Experience: React.FC = () => {
  const { timeline, setTimeline, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;

  const experienceItems = timeline.filter(item => item.type === 'experience');
  const displayedItems = showAll ? experienceItems : experienceItems.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm('Delete this experience?')) {
        setTimeline(timeline.filter(t => t.id !== id));
    }
  };

  const handleSave = (item: TimelineItem) => {
      if(isAdding) {
          const newItem = { ...item, id: Date.now().toString(), type: 'experience' as const };
          setTimeline([...timeline, newItem]);
          setIsAdding(false);
      } else {
          setTimeline(timeline.map(t => t.id === item.id ? item : t));
          setEditingItem(null);
      }
  };

  return (
    <section id="experience" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
         <div className="text-center mb-20 relative">
            <div className="inline-flex items-center gap-3 justify-center mb-4">
                <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.experience.title}</h2>
                {isEditing && (
                   <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                       <Edit size={20}/>
                   </button>
                )}
            </div>
            <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{profile.sectionText.experience.description}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {displayedItems.map((item, index) => (
            <div key={item.id} className="relative pl-12 pb-12 last:pb-0 group">
               {/* Connector Line */}
               {index !== displayedItems.length - 1 && (
                 <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700 group-hover:bg-academic-gold/50 transition-colors duration-500"></div>
               )}
               
               {/* Timeline Dot */}
               <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-academic-gold border-4 border-white dark:border-slate-900 shadow-md z-10 group-hover:scale-125 transition-transform duration-300"></div>
               
               <div className="relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {isEditing && (
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={() => setEditingItem(item)} className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(item.id!)} className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><Trash2 size={16}/></button>
                      </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                     <div>
                        <h3 className="text-xl font-bold text-academic-navy dark:text-white group-hover:text-academic-gold transition-colors">
                            {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-academic-gold font-medium mt-1">
                            <Briefcase size={16} />
                            <span>{item.institution}</span>
                        </div>
                     </div>
                     <span className="flex items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-gray-100 dark:border-slate-700 whitespace-nowrap">
                        <Calendar size={14}/>
                        {item.year}
                     </span>
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <RichText text={item.description} />
                  </div>
               </div>
            </div>
          ))}

          {experienceItems.length > INITIAL_DISPLAY_COUNT && (
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

          {isEditing && (
             <button 
                onClick={() => setIsAdding(true)}
                className="mt-12 w-full py-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-gray-500 hover:border-academic-gold hover:text-academic-gold transition-colors bg-white/50 dark:bg-slate-800/50"
             >
                <Plus size={24} className="mr-2"/> Add Experience
             </button>
          )}

          {/* GitHub Style Heatmap Visualization */}
          <GithubHeatmap />
        </div>
      </div>

      <EditModal
        isOpen={!!editingItem || isAdding}
        onClose={() => { setEditingItem(null); setIsAdding(false); }}
        initialData={editingItem || { title: '', institution: '', year: '', description: '', type: 'experience' }}
        onSave={handleSave}
        title={isAdding ? "Add Experience" : "Edit Experience"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.experience}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, experience: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
