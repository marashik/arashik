
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { GraduationCap, Calendar, Plus, Edit, Trash2, FileText, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { TimelineItem } from '../types';
import { EditModal } from './EditModal';

export const Education: React.FC = () => {
  const { timeline, setTimeline, isEditing, profile, updateProfile } = useData();
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 3;

  const educationItems = timeline.filter(item => item.type === 'education');
  const displayedItems = showAll ? educationItems : educationItems.slice(0, INITIAL_DISPLAY_COUNT);

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this item?')) {
        setTimeline(timeline.filter(t => t.id !== id));
    }
  };

  const handleSave = (item: TimelineItem) => {
      if (isAdding) {
          const newItem = { ...item, id: Date.now().toString(), type: 'education' as const };
          setTimeline([...timeline, newItem]);
          setIsAdding(false);
      } else {
          setTimeline(timeline.map(t => t.id === item.id ? item : t));
          setEditingItem(null);
      }
  };

  return (
    <section id="education" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 relative group">
            <div className="inline-flex items-center gap-3 justify-center mb-4">
               <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.education.title}</h2>
               {isEditing && (
                   <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                       <Edit size={20}/>
                   </button>
               )}
            </div>
            <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{profile.sectionText.education.description}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {displayedItems.map((item, index) => (
            <div key={item.id} className="relative pl-12 pb-12 last:pb-0 group">
                {/* Connector Line */}
                {index !== displayedItems.length - 1 && (
                  <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700 group-hover:bg-academic-navy/30 dark:group-hover:bg-academic-gold/50 transition-colors duration-500"></div>
                )}

                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-academic-navy dark:bg-academic-gold border-4 border-white dark:border-slate-900 shadow-md z-10 group-hover:scale-125 transition-transform duration-300"></div>

                <div className="relative md:flex flex-col bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {isEditing && (
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button onClick={() => setEditingItem(item)} className="p-1.5 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(item.id!)} className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><Trash2 size={16}/></button>
                        </div>
                    )}
                    
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-academic-navy dark:text-white mb-2 group-hover:text-academic-gold transition-colors">{item.title}</h3>
                            <div className="flex items-center gap-2 text-academic-navy/70 dark:text-academic-gold font-medium mb-3">
                                <GraduationCap size={18} />
                                <span>{item.institution}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light whitespace-pre-line">{item.description}</p>
                            
                            {/* Passing Year and Held In Badges */}
                            {(item.passingYear || item.heldIn) && (
                                <div className="flex gap-2 mt-2">
                                    {item.passingYear && (
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded font-medium border border-gray-200 dark:border-slate-600">
                                            Passing Year: {item.passingYear}
                                        </span>
                                    )}
                                    {item.heldIn && (
                                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded font-medium border border-gray-200 dark:border-slate-600">
                                            Held In: {item.heldIn}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex flex-col items-end gap-3 shrink-0">
                             <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">
                                <Calendar size={16} />
                                {item.year}
                            </div>
                            
                            {/* Syllabus Button */}
                            {item.syllabusUrl && (
                                <a 
                                    href={item.syllabusUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm text-academic-navy dark:text-academic-gold hover:underline font-bold"
                                    title="Download Syllabus PDF"
                                >
                                    <FileText size={16} /> Syllabus
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Major Courses Section */}
                    {item.majorCourses && item.majorCourses.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                             <h4 className="flex items-center gap-2 text-sm font-bold text-academic-navy dark:text-white mb-3 uppercase tracking-wider">
                                 <BookOpen size={14} /> Major Courses
                             </h4>
                             <div className="flex flex-wrap gap-2">
                                 {item.majorCourses.map((course, idx) => (
                                     <span 
                                        key={idx}
                                        className="text-xs px-3 py-1 bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-slate-700"
                                     >
                                         {course}
                                     </span>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
            </div>
          ))}

          {educationItems.length > INITIAL_DISPLAY_COUNT && (
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
                className="mt-12 w-full py-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-gray-500 hover:border-academic-gold hover:text-academic-gold transition-colors bg-white/50 dark:bg-slate-900/50"
              >
                  <Plus size={24} className="mr-2" /> Add Education
              </button>
          )}
        </div>
      </div>

      <EditModal 
        isOpen={!!editingItem || isAdding}
        onClose={() => { setEditingItem(null); setIsAdding(false); }}
        initialData={editingItem || { title: '', institution: '', year: '', description: '', type: 'education', majorCourses: [], syllabusUrl: '' }}
        onSave={handleSave}
        title={isAdding ? "Add Education" : "Edit Education"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.education}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, education: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
