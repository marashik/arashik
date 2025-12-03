
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Users, Globe, Heart, Award, Plus, Edit, Trash2, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { PersonalDevItem } from '../types';
import { EditModal } from './EditModal';
import { DynamicIcon } from './DynamicIcon';

export const PersonalDevelopment: React.FC = () => {
  const { personalDev, setPersonalDev, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<PersonalDevItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;
  const displayedItems = showAll ? personalDev : personalDev.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm("Delete item?")) setPersonalDev(personalDev.filter(p => p.id !== id));
  }

  const handleSave = (data: PersonalDevItem) => {
      if(isAdding) {
          setPersonalDev([...personalDev, { ...data, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setPersonalDev(personalDev.map(p => p.id === data.id ? data : p));
          setEditingItem(null);
      }
  }

  return (
    <section id="personal-dev" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="inline-flex items-center gap-3 justify-center mb-4">
                    <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.personalDev.title}</h2>
                    {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                    )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{profile.sectionText.personalDev.description}</p>
                <div className="w-24 h-1 bg-academic-gold mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedItems.map((item) => (
                    <div key={item.id} className="relative bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-700 group hover:-translate-y-1">
                        {isEditing && (
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingItem(item)} className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"><Edit size={12}/></button>
                                <button onClick={() => handleDelete(item.id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-600"><Trash2 size={12}/></button>
                            </div>
                        )}
                        
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-academic-gold/10 text-academic-gold rounded-full border border-academic-gold/20">
                                <DynamicIcon name={item.icon} size={18} />
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 bg-gray-100 dark:bg-slate-900 px-2 py-0.5 rounded-full uppercase tracking-wider">{item.category}</span>
                        </div>

                        <h3 className="text-md font-bold text-academic-navy dark:text-white mb-1 group-hover:text-academic-gold transition-colors">{item.title}</h3>
                        <p className="text-xs font-medium text-academic-gold mb-2">{item.subtitle}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-3 line-clamp-3">
                            {item.description}
                        </p>
                        <div className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-700"></span>
                            {item.year}
                        </div>
                    </div>
                ))}

                {isEditing && (
                    <button 
                    onClick={() => setIsAdding(true)}
                    className="min-h-[180px] bg-white/50 dark:bg-slate-900/50 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-all"
                    >
                        <Plus size={32} className="mb-2"/>
                        <span>Add Item</span>
                    </button>
                )}
            </div>

            {personalDev.length > INITIAL_DISPLAY_COUNT && (
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
        isOpen={!!editingItem || isAdding}
        onClose={() => { setEditingItem(null); setIsAdding(false); }}
        initialData={editingItem || { title: '', subtitle: '', category: 'Leadership', description: '', year: '', icon: 'Zap' }}
        onSave={handleSave}
        title={isAdding ? "Add Personal Development" : "Edit Item"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.personalDev}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, personalDev: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
