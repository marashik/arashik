
import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { News } from './components/News';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { ResearchUniverse } from './components/ResearchUniverse';
import { ResearchDNA } from './components/ResearchDNA';
import { Publications } from './components/Publications';
import { Skills } from './components/Skills';
import { PersonalDevelopment } from './components/PersonalDevelopment';
import { Blog } from './components/Blog';
import { ImportantLinks } from './components/ImportantLinks';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Testimonials } from './components/Testimonials';
import { WorkAffiliations } from './components/WorkAffiliations';
import { CommandPalette } from './components/CommandPalette';
import { AdminDashboard } from './components/AdminDashboard';
import { PenTool, Check, Filter, X, BarChart, Layers } from 'lucide-react';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';
import { ReadingProgress } from './components/ReadingProgress';
import { ChatWidget } from './components/ChatWidget';
import { SectionVisibilityModal } from './components/SectionVisibilityModal';
import { SEOManager } from './components/SEOManager';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { TerminalMode } from './components/TerminalMode';

// Standard Divider
const Divider = () => (
  <div className="w-full h-px bg-gray-200 dark:bg-slate-800"></div>
);

const EditToggle = () => {
  const { isEditing, toggleEditing, isAuthenticated } = useData();
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSectionManager, setShowSectionManager] = useState(false);
  
  if (!isAuthenticated) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
         {/* Admin Dashboard Trigger */}
         <button
            onClick={() => setShowDashboard(true)}
            className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:text-academic-gold transition-all duration-300"
            title="Admin Dashboard"
         >
            <BarChart size={20} />
         </button>

         {/* Section Manager Trigger */}
         <button
            onClick={() => setShowSectionManager(true)}
            className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:text-academic-gold transition-all duration-300"
            title="Manage Sections"
         >
            <Layers size={20} />
         </button>

         {/* Edit Toggle */}
         <button
          onClick={toggleEditing}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 interactive-hover ${
            isEditing ? 'bg-green-500 text-white' : 'bg-academic-navy dark:bg-white text-white dark:text-academic-navy'
          }`}
          title={isEditing ? "Finish Editing" : "Edit Website"}
        >
          {isEditing ? <Check size={24} /> : <PenTool size={24} />}
        </button>
      </div>

      <AdminDashboard isOpen={showDashboard} onClose={() => setShowDashboard(false)} />
      <SectionVisibilityModal isOpen={showSectionManager} onClose={() => setShowSectionManager(false)} />
    </>
  );
}

const ActiveFilterBadge = () => {
  const { activeHighlight, setActiveHighlight } = useData();
  
  if (!activeHighlight) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[60] animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 bg-academic-gold text-academic-navy rounded-full shadow-xl font-bold border border-white/20">
        <Filter size={18} className="animate-pulse" />
        <span>Connected: "{activeHighlight}"</span>
        <button 
          onClick={() => setActiveHighlight(null)}
          className="ml-2 p-1 hover:bg-black/10 rounded-full transition-colors interactive-hover"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

const ToastContainer = () => {
  const { notification, clearNotification } = useData();
  
  if (!notification) return null;

  return (
    <Toast 
      message={notification.message} 
      type={notification.type} 
      onClose={clearNotification} 
    />
  );
};

function MainContent() {
  const { profile } = useData();
  const v = profile.sectionVisibility || {
      about: true, news: true, education: true, experience: true, research: true,
      publications: true, achievements: true, skills: true, blog: true,
      links: true, gallery: true, personalDev: true, dna: true,
      contact: true, testimonials: true, affiliations: true
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans relative">
      <SEOManager />
      
      {/* Accessibility Skip Link */}
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-academic-gold text-academic-navy px-4 py-2 font-bold rounded">
        Skip to Content
      </a>

      <ReadingProgress />
      <Navbar />
      <CommandPalette />
      <TerminalMode />
      <main>
        <Hero />
        
        {v.about && <About />}
        {v.about && v.news && <Divider />}

        {v.news && <News />}
        {v.news && v.education && <Divider />}
        
        {v.education && <Education />}
        {v.education && v.research && <Divider />}
        
        {v.research && <ResearchUniverse />}
        {v.research && v.dna && <Divider />}
        
        {v.dna && <ResearchDNA />}
        {v.dna && v.publications && <Divider />}
        
        {v.publications && <Publications />}
        {v.publications && v.experience && <Divider />}
        
        {v.experience && <Experience />}
        {v.experience && v.achievements && <Divider />}

        {v.achievements && <Achievements />}
        {v.achievements && v.skills && <Divider />}
        
        {v.skills && <Skills />}
        {v.skills && v.affiliations && <Divider />}

        {v.affiliations && <WorkAffiliations />}
        {v.affiliations && v.personalDev && <Divider />}
        
        {v.personalDev && <PersonalDevelopment />}
        {v.personalDev && v.blog && <Divider />}
        
        {v.blog && <Blog />}
        {v.blog && v.links && <Divider />}
        
        {v.links && <ImportantLinks />}
        {v.links && v.gallery && <Divider />}
        
        {v.gallery && <Gallery />}
        {v.gallery && v.testimonials && <Divider />}
        
        {v.testimonials && <Testimonials />}
        {v.testimonials && v.contact && <Divider />}
        
        {v.contact && <Contact />}
      </main>
      <Footer />
      <EditToggle />
      <AccessibilityPanel />
      <ActiveFilterBadge />
      <ToastContainer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}

export default App;
