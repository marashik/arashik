
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Github, Linkedin, Mail, BookOpen, Edit, Image as ImageIcon, Plus, Trash2, Facebook, Instagram, Youtube, Volume2, Mic, X } from 'lucide-react';
import { EditModal } from './EditModal';
import { DynamicIcon } from './DynamicIcon';
import { SocialLink } from '../types';
import { BioNeuralBackground } from './BioNeuralBackground';

// ResearchGate Icon Component (Official SimpleIcons Path)
const ResearchGateIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>ResearchGate</title>
    <path d="M19.538 6.38h-2.654v3.125h2.5c1.452 0 2.366.928 2.366 2.313 0 1.397-1.025 2.313-2.366 2.313h-2.5v-4.625h-2.793v12.302h2.842v-4.833h1.896l2.342 4.833h3.156l-2.483-5.026c1.388-.604 2.252-1.932 2.252-3.65 0-2.932-2.104-4.843-5.141-4.843h-.434zm-17.436 0H0v12.302h5.422c3.872 0 6.392-2.542 6.392-6.151 0-3.61-2.52-6.151-6.392-6.151zm2.842 2.628h2.235c2.251 0 3.591 1.373 3.591 3.523 0 2.133-1.34 3.523-3.591 3.523H4.944v-7.046z" />
  </svg>
);

// Skype Icon Component (Official SimpleIcons Path)
const SkypeIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Skype</title>
    <path d="M22.923 16.488c-.283-1.464-1.077-2.614-2.197-3.238.272-.796.406-1.579.406-2.261 0-3.376-2.996-6.118-6.684-6.118-1.558 0-3.003.498-4.168 1.353-1.071-.47-2.197-.733-3.328-.733-4.329 0-7.85 3.193-7.85 7.121 0 .762.112 1.493.315 2.188-1.047.88-1.722 2.138-1.722 3.551 0 3.141 2.925 5.768 6.643 5.768 1.558 0 3.004-.498 4.168-1.353 1.071.47 2.197.733 3.328.733 4.329 0 7.85-3.193 7.85-7.121 0-.69-.092-1.357-.261-1.99zM8.56 16.03c0-1.879 2.508-2.031 2.508-3.088 0-.422-.381-.722-1.025-.722-.67 0-1.096.346-1.121.99H6.606c.051-1.849 1.635-2.639 3.136-2.639 1.777 0 3.136 1.055 3.136 2.518 0 1.909-2.583 2.115-2.583 3.099 0 .427.35.733 1.054.733.723 0 1.251-.432 1.291-1.125h2.316c-.055 2.05-1.924 2.823-3.607 2.823-1.914 0-3.368-1.095-3.368-2.589z" />
  </svg>
);

// ORCID Icon Component (Custom SVG)
const ORCIDIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.306v7.444h2.297c3.325 0 3.325-5.069 0-5.069H11.653z" />
  </svg>
);

// X (Twitter) Icon Component (Custom SVG)
const XIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, icon, label }) => {
  if (!href) return null;
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="group relative flex flex-col items-center"
      aria-label={label}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-academic-gold hover:text-academic-navy hover:bg-academic-gold/10 transition-all duration-200">
          {icon}
      </div>
      <span className="absolute top-full mt-2 text-[10px] uppercase tracking-widest font-bold text-academic-navy dark:text-academic-gold opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 bg-white dark:bg-slate-900 px-2 py-1 rounded shadow-sm md:bg-transparent md:shadow-none">
        {label}
      </span>
    </a>
  );
};

export const Hero: React.FC = () => {
  const { profile, updateProfile, isEditing } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState<'profile' | 'background' | 'photo' | 'audio' | 'titles' | 'name'>('profile');
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewPhoto, setViewPhoto] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getEditableProfileData = () => {
      const { sectionText, customSocials, neuralSettings, dnaSettings, stats, ...editableData } = profile;
      return editableData;
  };

  const handleSocialSave = (data: SocialLink) => {
      const currentSocials = profile.customSocials || [];
      if (isAddingSocial) {
          const newSocial = { ...data, id: Date.now().toString() };
          updateProfile({ ...profile, customSocials: [...currentSocials, newSocial] });
          setIsAddingSocial(false);
      } else {
          updateProfile({
              ...profile,
              customSocials: currentSocials.map(s => s.id === data.id ? data : s)
          });
          setEditingSocial(null);
      }
  };

  const handleDeleteSocial = (id: string) => {
      if(confirm("Delete this social link?")) {
          const currentSocials = profile.customSocials || [];
          updateProfile({ ...profile, customSocials: currentSocials.filter(s => s.id !== id) });
      }
  };

  const playGreeting = () => {
    if (!profile.audioGreeting) return;
    const audio = new Audio(profile.audioGreeting);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  }

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* --- Advanced Bio-Neural Background --- */}
      <div className="absolute inset-0 z-0">
        <BioNeuralBackground />
        
        {/* User uploaded background with heavy overlay for readability */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-10 transition-transform duration-1000 ease-out"
            style={{ 
              backgroundImage: `url('${profile.heroBackground}')`,
              transform: `translateY(${scrollY * 0.2}px)` // Subtle parallax
            }}
        ></div>
        
        {/* Gradient Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-slate-900/40 dark:to-slate-900"></div>

        {isEditing && (
          <button 
             onClick={() => { setEditMode('background'); setShowModal(true); }}
             className="absolute top-24 left-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 flex items-center gap-2 text-xs pointer-events-auto"
             title="Edit Background Image"
          >
             <ImageIcon size={16} /> Edit Background
          </button>
        )}
      </div>
      
      {isEditing && (
        <button 
          onClick={() => { setEditMode('profile'); setShowModal(true); }}
          className="absolute top-24 right-6 z-50 bg-white/80 dark:bg-slate-800/80 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-academic-navy dark:text-white transition-all shadow-md border border-gray-200 dark:border-slate-700"
          title="Edit Profile Information"
        >
          <Edit size={20} />
        </button>
      )}

      <div className="z-10 container mx-auto px-4 md:px-6 text-center relative max-w-4xl">
        
        {/* Clean Profile Photo with LinkedIn/Instagram style Focus */}
        <div className="mb-8 relative inline-block group">
            <div 
                className="relative rounded-full shadow-2xl cursor-pointer"
                onClick={() => !isEditing && setViewPhoto(true)}
            >
                <img 
                    src={profile.photo} 
                    alt={profile.name}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-[5px] border-white dark:border-slate-900 shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
                {/* Edit Overlay or Focus Hint */}
                {isEditing && (
                    <div 
                        onClick={(e) => { e.stopPropagation(); setEditMode('photo'); setShowModal(true); }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full z-10"
                    >
                        <div className="text-white flex flex-col items-center">
                            <ImageIcon size={24} />
                            <span className="text-xs mt-1 font-bold">Edit</span>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center gap-2 mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-3 relative group/name w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight text-academic-navy dark:text-white drop-shadow-sm whitespace-nowrap">
                {profile.name}
                </h1>
                {profile.audioGreeting && (
                    <button 
                        onClick={playGreeting}
                        className={`p-2 rounded-full border border-gray-200 dark:border-slate-700 text-academic-navy dark:text-academic-gold hover:bg-academic-gold hover:text-academic-navy transition-all ${isPlaying ? 'animate-pulse' : ''}`}
                        title="Pronunciation"
                    >
                        <Volume2 size={20} />
                    </button>
                )}
                {isEditing && (
                    <div className="flex gap-2">
                      {!profile.audioGreeting && (
                        <button onClick={() => { setEditMode('audio'); setShowModal(true); }} className="text-gray-400 hover:text-academic-gold">
                            <Mic size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => { setEditMode('name'); setShowModal(true); }}
                        className="text-gray-400 hover:text-academic-gold opacity-50 group-hover/name:opacity-100 transition-opacity"
                        title="Edit Name"
                      >
                          <Edit size={20} />
                      </button>
                    </div>
                )}
            </div>
        </div>
        
        {/* Static Professional Titles */}
        <div className="mb-8 md:mb-12 min-h-[4rem] relative group/titles flex flex-col justify-center items-center gap-2">
           {profile.titles.map((title, idx) => (
             <React.Fragment key={idx}>
               <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide px-2 text-center ${idx === 0 ? 'text-academic-gold font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                 {title}
               </span>
               {idx < profile.titles.length - 1 && (
                  <span className="text-gray-300 dark:text-slate-700 text-sm py-1 hidden md:inline">•</span>
               )}
             </React.Fragment>
           ))}
           
           {isEditing && (
               <button 
                  onClick={() => { setEditMode('titles'); setShowModal(true); }}
                  className="absolute right-0 top-0 p-2 text-gray-400 hover:text-academic-gold transition-colors opacity-50 group-hover/titles:opacity-100"
                  title="Edit Titles"
               >
                   <Edit size={18} />
               </button>
           )}
        </div>

        {/* Social Icons Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16 px-4">
            <SocialButton href={profile.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" />
            <SocialButton href={profile.researchGate} icon={<ResearchGateIcon size={18} />} label="ResearchGate" />
            <SocialButton href={profile.orcid} icon={<ORCIDIcon size={18} />} label="ORCID" />
            <SocialButton href={profile.scholar} icon={<BookOpen size={18} />} label="Scholar" />
            <SocialButton href={profile.github} icon={<Github size={18} />} label="GitHub" />
            <SocialButton href={profile.facebook} icon={<Facebook size={18} />} label="Facebook" />
            <SocialButton href={profile.instagram} icon={<Instagram size={18} />} label="Instagram" />
            <SocialButton href={profile.x} icon={<XIcon size={18} />} label="X" />
            <SocialButton href={profile.skype} icon={<SkypeIcon size={18} />} label="Skype" />
            <SocialButton href={profile.youtube} icon={<Youtube size={18} />} label="Youtube" />
            <SocialButton href={`mailto:${profile.email}`} icon={<Mail size={18} />} label="Email" />
            
            {/* Custom Socials */}
            {profile.customSocials && profile.customSocials.map(social => (
                <div key={social.id} className="relative group">
                    <SocialButton 
                        href={social.url} 
                        icon={<DynamicIcon name={social.icon} size={18} />} 
                        label={social.platform} 
                    />
                    {isEditing && (
                        <div className="absolute -top-2 -right-2 z-50 flex gap-1">
                            <button onClick={() => setEditingSocial(social)} className="p-0.5 bg-blue-500 rounded text-white"><Edit size={8}/></button>
                            <button onClick={() => handleDeleteSocial(social.id)} className="p-0.5 bg-red-500 rounded text-white"><Trash2 size={8}/></button>
                        </div>
                    )}
                </div>
            ))}

            {isEditing && (
                <button 
                  onClick={() => setIsAddingSocial(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:text-academic-gold hover:border-academic-gold transition-all"
                  title="Add Social Link"
                >
                    <Plus size={18} />
                </button>
            )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-[-40px] md:bottom-[-80px] left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 animate-bounce cursor-pointer">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </div>

      {/* Photo Lightbox (Focus View) */}
      {viewPhoto && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setViewPhoto(false)}
        >
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                onClick={() => setViewPhoto(false)}
            >
                <X size={32} />
            </button>
            <img 
                src={profile.photo} 
                alt={profile.name}
                className="max-w-full max-h-[80vh] rounded-full border-[8px] border-white shadow-2xl scale-100 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
      )}

      <EditModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialData={(() => {
            if (editMode === 'background') return { heroBackground: profile.heroBackground };
            if (editMode === 'photo') return { photo: profile.photo };
            if (editMode === 'audio') return { audioGreeting: profile.audioGreeting };
            if (editMode === 'titles') return { titles: profile.titles };
            if (editMode === 'name') return { name: profile.name };
            return getEditableProfileData();
        })()}
        onSave={(data) => {
          updateProfile({...profile, ...data});
          setShowModal(false);
        }}
        title={(() => {
            if (editMode === 'background') return "Edit Background Image";
            if (editMode === 'photo') return "Edit Profile Photo";
            if (editMode === 'audio') return "Edit Voice Greeting URL";
            if (editMode === 'titles') return "Edit Professional Titles";
            if (editMode === 'name') return "Edit Full Name";
            return "Edit Profile Info";
        })()}
      />

      <EditModal
        isOpen={!!editingSocial || isAddingSocial}
        onClose={() => { setEditingSocial(null); setIsAddingSocial(false); }}
        initialData={editingSocial || { platform: '', url: '', icon: '' }}
        onSave={handleSocialSave}
        title={isAddingSocial ? "Add Social Link" : "Edit Social Link"}
      />
    </section>
  );
};