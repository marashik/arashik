
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Edit, Image as ImageIcon, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { EditModal } from './EditModal';
import { RichText } from './RichText';

export const About: React.FC = () => {
  const { profile, updateProfile, isEditing } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState<'text' | 'image' | 'section' | 'cv'>('text');
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 500;
  const text = profile.about || "";
  const shouldTruncate = text.length > MAX_LENGTH;
  const displayedText = isExpanded || !shouldTruncate ? text : text.slice(0, MAX_LENGTH) + "...";

  return (
    <section id="about" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative group">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Photo */}
            <div className="lg:w-5/12 relative group/image">
                <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-academic-navy to-academic-gold rounded-xl blur opacity-25 group-hover/image:opacity-75 transition duration-1000 group-hover/image:duration-200"></div>
                <img 
                    src={profile.aboutPhoto} 
                    alt={profile.name} 
                    className="relative rounded-xl shadow-2xl w-full object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-academic-navy/90 backdrop-blur px-6 py-3 rounded-lg shadow-lg border-l-4 border-academic-gold">
                    <p className="font-serif italic text-academic-navy dark:text-academic-gold text-lg">
                    {profile.aboutQuote}
                    </p>
                </div>
                
                {isEditing && (
                    <button 
                        onClick={() => { setEditType('image'); setShowModal(true); }}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur transition-all"
                        title="Change About Photo"
                    >
                        <ImageIcon size={20} />
                    </button>
                )}
                </div>
            </div>

            {/* Bio */}
            <div className="lg:w-7/12 relative group/text">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white relative inline-block">
                    {profile.sectionText.about.title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-academic-gold"></span>
                    </h2>
                    {isEditing && (
                        <button 
                            onClick={() => { setEditType('section'); setShowModal(true); }}
                            className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors opacity-50 group-hover/text:opacity-100"
                            title="Edit Title & Description"
                        >
                            <Edit size={20}/>
                        </button>
                    )}
                </div>
                
                <div className="prose dark:prose-invert max-w-none relative">
                {isEditing && (
                    <button 
                        onClick={() => { setEditType('text'); setShowModal(true); }}
                        className="absolute -top-2 right-0 bg-academic-navy/10 dark:bg-white/10 p-2 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-all opacity-0 group-hover/text:opacity-100"
                        title="Edit Biography Text"
                    >
                        <Edit size={16} />
                    </button>
                )}
                
                <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify font-light whitespace-pre-wrap">
                    <RichText text={displayedText} />
                </div>

                {shouldTruncate && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-1 text-sm font-bold text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors uppercase tracking-wider mt-2"
                    >
                        {isExpanded ? 'Read Less' : 'Read More'}
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                )}
                </div>

                {/* CV Section - Single Icon Style */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-800 flex items-center gap-4">
                    <a 
                        href={profile.cvLink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="group relative flex flex-col items-center"
                        aria-label="Download CV"
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-academic-gold hover:text-academic-navy hover:bg-academic-gold/10 transition-all duration-200">
                            <FileText size={18} />
                        </div>
                        <span className="absolute top-full mt-2 text-[10px] uppercase tracking-widest font-bold text-academic-navy dark:text-academic-gold opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                            CV
                        </span>
                    </a>
                    
                    {isEditing && (
                        <button 
                            onClick={() => { setEditType('cv'); setShowModal(true); }}
                            className="p-2 text-gray-400 hover:text-academic-gold transition-colors"
                            title="Edit CV Link"
                        >
                            <Edit size={18} />
                        </button>
                    )}
                </div>

            </div>
            </div>
        </div>
      </div>

      <EditModal
         isOpen={showModal}
         onClose={() => setShowModal(false)}
         initialData={(() => {
             if (editType === 'section') return profile.sectionText.about;
             if (editType === 'image') return {aboutPhoto: profile.aboutPhoto};
             if (editType === 'cv') return {cvLink: profile.cvLink};
             return {about: profile.about, aboutQuote: profile.aboutQuote};
         })()}
         onSave={(data) => {
            if (editType === 'section') {
                updateProfile({ ...profile, sectionText: { ...profile.sectionText, about: data } });
            } else {
                updateProfile({...profile, ...data});
            }
            setShowModal(false);
         }}
         title={(() => {
             if (editType === 'section') return "Edit Section Header";
             if (editType === 'image') return "Edit About Photo";
             if (editType === 'cv') return "Update CV Link";
             return "Edit Bio & Quote";
         })()}
      />
    </section>
  );
};
