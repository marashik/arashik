
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { EditModal } from './EditModal';

export const Gallery: React.FC = () => {
  const { gallery, setGallery, isEditing, profile, updateProfile } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 6;

  const handleDelete = (index: number) => {
      if(confirm("Remove image?")) {
          const newGallery = [...gallery];
          newGallery.splice(index, 1);
          setGallery(newGallery);
      }
  }

  const handleAdd = (data: { url: string }) => {
      if(data.url) {
          setGallery([...gallery, data.url]);
          setShowAll(true); // Auto expand to show new image
      }
      setIsAdding(false);
  }

  const displayedGallery = showAll ? gallery : gallery.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section id="gallery" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="inline-flex items-center gap-3 justify-center mb-4">
                    <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.gallery.title}</h2>
                    {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                    )}
                </div>
                <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">{profile.sectionText.gallery.description}</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {displayedGallery.map((img, idx) => (
                    <div key={idx} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-lg">
                        <img 
                            src={img} 
                            alt={`Gallery ${idx + 1}`} 
                            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-academic-gold font-serif italic">Snapshot {idx + 1}</p>
                            </div>
                        </div>
                        {isEditing && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}
                                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white z-20 hover:bg-red-700"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                
                {isEditing && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-colors bg-white/50 dark:bg-slate-800/50 break-inside-avoid"
                    >
                        <Plus size={32} className="mb-2"/> Add Photo
                    </button>
                )}
            </div>

            {gallery.length > INITIAL_DISPLAY_COUNT && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                    >
                        {showAll ? 'Show Less' : `View More (${gallery.length - INITIAL_DISPLAY_COUNT} hidden)`}
                        {showAll ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                    </button>
                </div>
            )}
        </div>
      </div>

      <EditModal
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        initialData={{ url: '' }}
        onSave={handleAdd}
        title="Add Image URL"
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.gallery}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, gallery: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />
    </section>
  );
};
