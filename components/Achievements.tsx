
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Trophy, Star, Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Award } from '../types';
import { EditModal } from './EditModal';

export const Achievements: React.FC = () => {
  const { awards, setAwards, isEditing, profile, updateProfile } = useData();
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;
  const displayedAwards = showAll ? awards : awards.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm("Delete award?")) setAwards(awards.filter(a => a.id !== id));
  }

  const handleSave = (data: Award) => {
      if(isAdding) {
          setAwards([...awards, { ...data, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setAwards(awards.map(a => a.id === data.id ? data : a));
          setEditingAward(null);
      }
  }

  return (
    <section id="achievements" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="inline-flex items-center gap-3 justify-center mb-4">
                    <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.achievements.title}</h2>
                    {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                    )}
                </div>
                <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">{profile.sectionText.achievements.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedAwards.map((award) => (
                    <div key={award.id} className="relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4 rounded-xl hover:shadow-lg transition-all duration-300 group shadow-sm">
                        {isEditing && (
                            <div className="absolute top-2 right-2 flex gap-2 z-20">
                                <button onClick={() => setEditingAward(award)} className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Edit size={12}/></button>
                                <button onClick={() => handleDelete(award.id)} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash2 size={12}/></button>
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-2 bg-academic-gold/10 rounded-lg text-academic-gold group-hover:scale-110 transition-transform">
                                <Trophy size={18} />
                            </div>
                            <span className="text-[10px] font-bold text-academic-navy dark:text-gray-300 border border-gray-200 dark:border-slate-600 px-2 py-0.5 rounded-full bg-gray-50 dark:bg-slate-900">{award.year}</span>
                        </div>
                        
                        <h3 className="text-md font-bold text-academic-navy dark:text-white mb-1 group-hover:text-academic-gold transition-colors">{award.title}</h3>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                            <Star size={10} />
                            <span>{award.issuer}</span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                            {award.description}
                        </p>
                    </div>
                ))}

                {isEditing && (
                    <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-white/50 dark:bg-slate-800/50 border-2 border-dashed border-gray-300 dark:border-slate-700 p-6 rounded-xl hover:border-academic-gold transition-all flex flex-col items-center justify-center text-gray-400"
                    >
                        <Plus size={24} className="mb-2"/>
                        <span className="text-sm">Add Achievement</span>
                    </button>
                )}
            </div>

            {awards.length > INITIAL_DISPLAY_COUNT && (
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
        isOpen={!!editingAward || isAdding}
        onClose={() => { setEditingAward(null); setIsAdding(false); }}
        initialData={editingAward || { title: '', issuer: '', year: '', description: '' }}
        onSave={handleSave}
        title={isAdding ? "Add Award" : "Edit Award"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.achievements}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, achievements: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
