
import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';

export const SEOManager: React.FC = () => {
  const { activeSection, profile } = useData();

  useEffect(() => {
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    
    // Map section IDs to nice titles
    const titles: Record<string, string> = {
        'home': 'Home',
        'about': 'About',
        'research': 'Research Universe',
        'publications': 'Publications',
        'experience': 'Experience',
        'skills': 'Skills',
        'contact': 'Contact'
    };

    const sectionTitle = titles[activeSection] || capitalize(activeSection);
    
    if (activeSection === 'home' || !activeSection) {
        document.title = `${profile.name} | ${profile.titles[0]}`;
    } else {
        document.title = `${sectionTitle} | ${profile.name}`;
    }
  }, [activeSection, profile.name, profile.titles]);

  return null;
};
