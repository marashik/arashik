
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, Edit, ArrowRight, Github, Linkedin, Mail, Facebook } from 'lucide-react';
import { Logo } from './Logo';
import { EditModal } from './EditModal';
import { LoginModal } from './LoginModal';
import { RichText } from './RichText';

// Custom X Icon for Footer
const XIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
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

// ResearchGate Icon for Footer
const ResearchGateIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.538 6.38h-2.654v3.125h2.5c1.452 0 2.366.928 2.366 2.313 0 1.397-1.025 2.313-2.366 2.313h-2.5v-4.625h-2.793v12.302h2.842v-4.833h1.896l2.342 4.833h3.156l-2.483-5.026c1.388-.604 2.252-1.932 2.252-3.65 0-2.932-2.104-4.843-5.141-4.843h-.434zm-17.436 0H0v12.302h5.422c3.872 0 6.392-2.542 6.392-6.151 0-3.61-2.52-6.151-6.392-6.151zm2.842 2.628h2.235c2.251 0 3.591 1.373 3.591 3.523 0 2.133-1.34 3.523-3.591 3.523H4.944v-7.046z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { isAuthenticated, isEditing, profile, updateProfile, projects, blogs } = useData();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleAdminClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if(email) {
          alert(`Subscribed ${email} to newsletter! (Mock)`);
          setEmail('');
      }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-academic-navy dark:text-white pt-20 pb-10 border-t border-gray-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-300">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Bio */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Logo className="w-12 h-12" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-serif font-bold tracking-tight text-academic-navy dark:text-white leading-none">
                        {profile.initials}
                        <span className="text-academic-gold text-3xl">.</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">
                        {profile.navbarSubtitle}
                        </span>
                    </div>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    <RichText text="Bridging the gap between wet-lab biology and computational intelligence to solve complex problems in cancer systems biology." />
                </div>
                <div className="flex gap-4 flex-wrap">
                    {/* Facebook */}
                    <a href={profile.facebook} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <Facebook size={18}/>
                    </a>
                    {/* LinkedIn */}
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <Linkedin size={18}/>
                    </a>
                    {/* ResearchGate */}
                    <a href={profile.researchGate} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <ResearchGateIcon size={18}/>
                    </a>
                    {/* X (Twitter) */}
                    <a href={profile.x} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <XIcon size={18}/>
                    </a>
                    {/* GitHub */}
                    <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <Github size={18}/>
                    </a>
                    {/* Email */}
                    <a href={`mailto:${profile.email}`} className="p-2 bg-gray-100 dark:bg-slate-900 rounded-full hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        <Mail size={18}/>
                    </a>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h3 className="font-bold text-lg mb-6 text-academic-navy dark:text-white">Quick Links</h3>
                <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                    <li><a href="#about" className="hover:text-academic-gold transition-colors flex items-center gap-2"><ArrowRight size={12}/> About Me</a></li>
                    <li><a href="#research" className="hover:text-academic-gold transition-colors flex items-center gap-2"><ArrowRight size={12}/> Research</a></li>
                    <li><a href="#publications" className="hover:text-academic-gold transition-colors flex items-center gap-2"><ArrowRight size={12}/> Publications</a></li>
                    <li><a href="#experience" className="hover:text-academic-gold transition-colors flex items-center gap-2"><ArrowRight size={12}/> Experience</a></li>
                    <li><a href="#contact" className="hover:text-academic-gold transition-colors flex items-center gap-2"><ArrowRight size={12}/> Contact</a></li>
                </ul>
            </div>

            {/* Column 3: Latest Research */}
            <div>
                <h3 className="font-bold text-lg mb-6 text-academic-navy dark:text-white">Latest Research</h3>
                <div className="space-y-4">
                    {projects.slice(0, 2).map(project => (
                        <a key={project.id} href="#research" className="block group">
                            <h4 className="text-sm font-bold group-hover:text-academic-gold transition-colors line-clamp-1">{project.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                        </a>
                    ))}
                    {blogs.length > 0 && (
                        <div className="pt-2 border-t border-gray-100 dark:border-slate-900 mt-2">
                             <span className="text-xs font-bold text-academic-gold uppercase tracking-wider">Latest Post</span>
                             <a href="#blog" className="block mt-1 text-sm font-medium hover:text-academic-gold transition-colors">{blogs[0].title}</a>
                        </div>
                    )}
                </div>
            </div>

            {/* Column 4: Newsletter */}
            <div>
                <h3 className="font-bold text-lg mb-6 text-academic-navy dark:text-white">Stay Updated</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Subscribe to receive updates on my latest research, publications, and tools.</p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-academic-gold"
                    />
                    <button type="submit" className="w-full px-4 py-3 bg-academic-navy text-white text-sm font-bold rounded-lg hover:bg-academic-gold hover:text-academic-navy transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row items-center gap-2">
                <span className="relative group cursor-default">
                    <RichText text={profile.footerText} />
                    {isEditing && (
                        <button 
                            onClick={() => setShowModal(true)} 
                            className="ml-2 text-academic-gold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Edit size={12} />
                        </button>
                    )}
                </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href={profile.privacyUrl} className="hover:text-academic-gold transition-colors">Privacy</a>
                <a href={profile.termsUrl} className="hover:text-academic-gold transition-colors">Terms</a>
                <button onClick={handleAdminClick} className={`transition-all duration-300 ${isAuthenticated ? 'text-green-500' : 'text-gray-300 hover:text-academic-gold'}`} title="Admin Access">
                    <Lock size={14} />
                </button>
            </div>
        </div>

        <EditModal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            initialData={{ footerText: profile.footerText, privacyUrl: profile.privacyUrl, termsUrl: profile.termsUrl }}
            onSave={(data) => {
                updateProfile({ ...profile, footerText: data.footerText, privacyUrl: data.privacyUrl, termsUrl: data.termsUrl });
                setShowModal(false);
            }}
            title="Edit Footer Text & Links"
        />

        <LoginModal 
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
        />
    </footer>
  );
};
