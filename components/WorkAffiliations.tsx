
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Briefcase, Building, Calendar, Users, Edit, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Affiliation } from '../types';
import { EditModal } from './EditModal';

export const WorkAffiliations: React.FC = () => {
  const { affiliations, setAffiliations, timeline, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<Affiliation | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState<string | null>(null);
  const [showAllWork, setShowAllWork] = useState(false);
  const [showAllAff, setShowAllAff] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;

  // Filter existing timeline data for work experience to display here as well
  const workHistory = timeline.filter(item => item.type === 'experience');
  
  const displayedWork = showAllWork ? workHistory : workHistory.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedAffiliations = showAllAff ? affiliations : affiliations.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm("Delete affiliation?")) {
        setAffiliations(affiliations.filter(a => a.id !== id));
    }
  };

  const handleSave = (item: Affiliation) => {
      if(isAdding) {
          setAffiliations([...affiliations, { ...item, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setAffiliations(affiliations.map(a => a.id === item.id ? item : a));
          setEditingItem(null);
      }
  };

  return (
    <section id="affiliations" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="inline-flex items-center gap-3 justify-center mb-4">
                    <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.affiliations.title}</h2>
                    {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                    )}
                </div>
                <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{profile.sectionText.affiliations.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Column 1: Detailed Work History (Read-only view of Experience) */}
                <div>
                    <div className="flex items-center gap-2 mb-8 border-b pb-4 border-gray-200 dark:border-slate-800 group">
                        <h3 className="text-2xl font-bold text-academic-navy dark:text-white">
                            {profile.sectionText.affiliations.subtitle1 || "Work History"}
                        </h3>
                        {isEditing && (
                            <button 
                                onClick={() => setEditingSubtitle('subtitle1')} 
                                className="text-gray-400 hover:text-academic-gold opacity-50 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                    </div>
                    <div className="space-y-8">
                        {displayedWork.map((job) => (
                            <div key={job.id} className="relative pl-8 border-l-2 border-academic-gold/30">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-academic-gold border-4 border-white dark:border-slate-900"></span>
                                <h4 className="text-xl font-bold text-academic-navy dark:text-white">{job.title}</h4>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 mb-2">
                                    <Building size={14} /> <span>{job.institution}</span>
                                    <span className="mx-1">•</span>
                                    <Calendar size={14} /> <span>{job.year}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{job.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    {workHistory.length > INITIAL_DISPLAY_COUNT && (
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => setShowAllWork(!showAllWork)}
                                className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                            >
                                {showAllWork ? 'Show Less' : 'Show More'}
                                {showAllWork ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                            </button>
                        </div>
                    )}
                </div>

                {/* Column 2: Affiliations & Memberships */}
                <div>
                    <div className="flex items-center gap-2 mb-8 border-b pb-4 border-gray-200 dark:border-slate-800 group">
                        <h3 className="text-2xl font-bold text-academic-navy dark:text-white">
                            {profile.sectionText.affiliations.subtitle2 || "Memberships & Affiliations"}
                        </h3>
                        {isEditing && (
                            <button 
                                onClick={() => setEditingSubtitle('subtitle2')} 
                                className="text-gray-400 hover:text-academic-gold opacity-50 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                    </div>
                    <div className="space-y-4">
                        {displayedAffiliations.map((item) => (
                            <div key={item.id} className="group relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-slate-700 transition-all">
                                {isEditing && (
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setEditingItem(item)} className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Edit size={14}/></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash2 size={14}/></button>
                                    </div>
                                )}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-academic-gold/10 text-academic-gold rounded-lg">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-academic-navy dark:text-white">{item.role}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{item.organization}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-500 rounded-full">{item.type}</span>
                                            <span className="text-xs text-gray-400">{item.period}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isEditing && (
                            <button 
                                onClick={() => setIsAdding(true)}
                                className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-colors"
                            >
                                <Plus size={20} className="mr-2"/> Add Affiliation
                            </button>
                        )}
                    </div>

                    {affiliations.length > INITIAL_DISPLAY_COUNT && (
                        <div className="mt-8 flex justify-center">
                            <button 
                                onClick={() => setShowAllAff(!showAllAff)}
                                className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                            >
                                {showAllAff ? 'Show Less' : 'Show More'}
                                {showAllAff ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
      </div>

      <EditModal
        isOpen={!!editingItem || isAdding}
        onClose={() => { setEditingItem(null); setIsAdding(false); }}
        initialData={editingItem || { role: '', organization: '', period: '', type: 'Membership' }}
        onSave={handleSave}
        title={isAdding ? "Add Affiliation" : "Edit Affiliation"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.affiliations}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, affiliations: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />

      <EditModal
        isOpen={!!editingSubtitle}
        onClose={() => setEditingSubtitle(null)}
        initialData={{ [editingSubtitle as string]: profile.sectionText.affiliations[editingSubtitle as keyof typeof profile.sectionText.affiliations] || '' }}
        onSave={(data) => {
            const key = editingSubtitle as string;
            updateProfile({
                ...profile,
                sectionText: {
                    ...profile.sectionText,
                    affiliations: {
                        ...profile.sectionText.affiliations,
                        [key]: data[key]
                    }
                }
            });
            setEditingSubtitle(null);
        }}
        title="Edit Subtitle"
      />
    </section>
  );
};
