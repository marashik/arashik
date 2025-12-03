
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Moon, Sun, Menu, X, ChevronDown, QrCode, Terminal, Search, Edit } from 'lucide-react';
import { Logo } from './Logo';
import { ConferenceCard } from './ConferenceCard';
import { EditModal } from './EditModal';

export const Navbar: React.FC = () => {
  const { profile, updateProfile, setIsCmdOpen, setIsTerminalOpen, isEditing } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -50% 0px' });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Visibility Fallback
  const v = profile.sectionVisibility || {
      about: true, news: true, education: true, experience: true, research: true,
      publications: true, achievements: true, skills: true, blog: true,
      links: true, gallery: true, personalDev: true, dna: true,
      contact: true, testimonials: true, affiliations: true
  };

  // Primary Navigation Links
  const mainLinks = [
    { name: 'Home', href: '#home', visible: true },
    { name: profile.sectionText.about.title, href: '#about', visible: v.about },
    { name: profile.sectionText.news.title, href: '#news', visible: v.news },
    { name: profile.sectionText.education.title, href: '#education', visible: v.education },
    { name: profile.sectionText.research.title, href: '#research', visible: v.research },
    { name: profile.sectionText.publications.title, href: '#publications', visible: v.publications },
  ].filter(link => link.visible);

  // Secondary Links for "More" Dropdown
  const moreLinks = [
    { name: profile.sectionText.experience.title, href: '#experience', visible: v.experience },
    { name: profile.sectionText.achievements.title, href: '#achievements', visible: v.achievements },
    { name: profile.sectionText.skills.title, href: '#skills', visible: v.skills },
    { name: profile.sectionText.affiliations.title, href: '#affiliations', visible: v.affiliations },
    { name: profile.sectionText.personalDev.title, href: '#personal-dev', visible: v.personalDev },
    { name: profile.sectionText.blog.title, href: '#blog', visible: v.blog },
    { name: profile.sectionText.links.title, href: '#links', visible: v.links },
    { name: profile.sectionText.gallery.title, href: '#gallery', visible: v.gallery },
    { name: profile.sectionText.testimonials.title, href: '#testimonials', visible: v.testimonials },
    { name: profile.sectionText.contact.title, href: '#contact', visible: v.contact },
  ].filter(link => link.visible);

  const allLinks = [...mainLinks, ...moreLinks];

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-academic-navy/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-slate-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        
        {/* Brand */}
        <div className="flex items-center group relative z-50">
          <a href="#home" className="flex items-center">
            <div className="mr-3">
              <Logo className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-serif font-bold tracking-tight leading-none ${scrolled ? 'text-academic-navy dark:text-white' : 'text-academic-navy dark:text-white'}`}>
                {profile.initials}
                <span className="text-academic-gold">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium group-hover:text-academic-gold transition-colors">
                {profile.navbarSubtitle}
              </span>
            </div>
          </a>
          {isEditing && (
             <button 
                onClick={() => setShowEditModal(true)}
                className="ml-2 p-1 text-gray-400 hover:text-academic-gold transition-colors opacity-50 group-hover:opacity-100"
                title="Edit Brand & Subtitle"
             >
                <Edit size={14} />
             </button>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6">
          {mainLinks.map(link => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.href} 
                href={link.href} 
                className={`text-sm font-medium transition-all duration-300 relative group/link ${
                    isActive 
                        ? 'text-academic-gold'
                        : scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-academic-gold' : 'text-gray-600 dark:text-gray-300 hover:text-academic-gold'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-academic-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/link:w-full'}`}></span>
              </a>
            );
          })}

          {/* More Dropdown */}
          {moreLinks.length > 0 && (
            <div className="relative group/more h-full flex items-center">
                <button 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-600 dark:text-gray-300'} hover:text-academic-gold`}
                >
                    More <ChevronDown size={14} className="group-hover/more:rotate-180 transition-transform" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-4 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transform opacity-0 scale-95 translate-y-2 invisible group-hover/more:visible group-hover/more:opacity-100 group-hover/more:scale-100 group-hover/more:translate-y-0 transition-all duration-200 origin-top-right z-50">
                    <div className="py-2">
                    {moreLinks.map(link => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <a 
                            key={link.href}
                            href={link.href}
                            className={`block px-5 py-3 text-sm font-medium transition-colors border-l-2 ${
                                isActive 
                                ? 'border-academic-gold bg-academic-gold/5 text-academic-navy dark:text-academic-gold' 
                                : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-academic-navy dark:hover:text-white'
                            }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                    </div>
                </div>
                {/* Bridge to prevent closing when moving mouse to dropdown */}
                <div className="absolute top-full right-0 h-4 w-full bg-transparent"></div>
            </div>
          )}
          
          {/* --- SEPARATION START --- */}
          
          <div className={`h-6 w-px mx-2 ${scrolled ? 'bg-gray-200 dark:bg-slate-700' : 'bg-gray-200 dark:bg-slate-700'}`}></div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsCmdOpen(true)}
                className="p-2 text-gray-500 hover:text-academic-gold transition-colors"
                title="Search (Cmd+K)"
                >
                <Search size={18} />
              </button>

             <button 
                onClick={() => setShowCard(true)}
                className="p-2 text-gray-500 hover:text-academic-gold transition-colors"
                title="Conference Mode"
            >
                <QrCode size={18} /> 
            </button>
            
            <button 
                onClick={() => setIsTerminalOpen(true)}
                className="p-2 text-gray-500 hover:text-academic-gold transition-colors"
                title="Open Terminal (Alt+T)"
            >
                <Terminal size={18} /> 
            </button>

            <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-academic-gold transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden flex items-center gap-4 z-[60]">
          <button 
            onClick={() => setIsCmdOpen(true)} 
            className="text-academic-navy dark:text-white"
          >
             <Search size={20} />
          </button>
          <button onClick={() => setShowCard(true)} className="text-academic-navy dark:text-white">
             <QrCode size={20} />
          </button>
          <button onClick={toggleTheme} className="text-academic-navy dark:text-white">
             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-academic-navy dark:text-white transition-transform duration-300 hover:scale-110">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`xl:hidden fixed inset-0 bg-white/95 dark:bg-academic-navy/95 backdrop-blur-xl transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto z-50`}>
        <div className="flex flex-col items-center justify-center min-h-full gap-6 py-10">
            {allLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-xl font-serif font-bold transition-colors ${activeSection === link.href.substring(1) ? 'text-academic-gold' : 'text-academic-navy dark:text-gray-200 hover:text-academic-gold'}`}
              >
                {link.name}
              </a>
            ))}
        </div>
      </div>
    </nav>
    <ConferenceCard isOpen={showCard} onClose={() => setShowCard(false)} />
    
    <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        initialData={{ initials: profile.initials, navbarSubtitle: profile.navbarSubtitle }}
        onSave={(data) => {
            updateProfile({ ...profile, ...data });
            setShowEditModal(false);
        }}
        title="Edit Brand Identity"
    />
    </>
  );
};
