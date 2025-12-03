
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PROFILE, TIMELINE, PROJECTS, PUBLICATIONS, SKILLS, BLOGS, AWARDS, RESOURCES, GALLERY_IMAGES, PERSONAL_DEV, TESTIMONIALS, AFFILIATIONS, NEWS_ITEMS } from '../constants';
import { Profile, TimelineItem, Project, Publication, Skill, BlogPost, Award, Resource, PersonalDevItem, Testimonial, Affiliation, NewsItem } from '../types';
import { ToastType } from '../components/Toast';

interface DataContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  changePassword: (newPassword: string) => void;
  isEditing: boolean;
  toggleEditing: () => void;
  isCmdOpen: boolean;
  setIsCmdOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeHighlight: string | null;
  setActiveHighlight: (topic: string | null) => void;
  profile: Profile;
  updateProfile: (p: Profile) => void;
  timeline: TimelineItem[];
  setTimeline: (items: TimelineItem[]) => void;
  projects: Project[];
  setProjects: (items: Project[]) => void;
  publications: Publication[];
  setPublications: (items: Publication[]) => void;
  skills: Skill[];
  setSkills: (items: Skill[]) => void;
  blogs: BlogPost[];
  setBlogs: (items: BlogPost[]) => void;
  news: NewsItem[];
  setNews: (items: NewsItem[]) => void;
  awards: Award[];
  setAwards: (items: Award[]) => void;
  resources: Resource[];
  setResources: (items: Resource[]) => void;
  gallery: string[];
  setGallery: (items: string[]) => void;
  personalDev: PersonalDevItem[];
  setPersonalDev: (items: PersonalDevItem[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (items: Testimonial[]) => void;
  affiliations: Affiliation[];
  setAffiliations: (items: Affiliation[]) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  notification: { message: string; type: ToastType } | null;
  showNotification: (message: string, type: ToastType) => void;
  clearNotification: () => void;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
  isTerminalOpen: boolean;
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper hook for localStorage persistence with robust default merging
function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      if (stickyValue !== null) {
          const parsed = JSON.parse(stickyValue);
          
          // Special handling for Profile to ensure backward compatibility and missing fields
          if (key === 'profile_data') {
             return {
                 ...defaultValue,
                 ...parsed,
                 sectionVisibility: { ...(defaultValue as any).sectionVisibility, ...(parsed.sectionVisibility || {}) },
                 uiSettings: { ...(defaultValue as any).uiSettings, ...(parsed.uiSettings || {}) },
                 sectionText: { ...(defaultValue as any).sectionText, ...(parsed.sectionText || {}) },
                 customSocials: parsed.customSocials || []
             };
          }
          return parsed;
      }
      return defaultValue;
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage`, e);
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [notification, setNotification] = useState<{ message: string; type: ToastType } | null>(null);
  
  // Persistent State
  const [adminPassword, setAdminPassword] = useStickyState<string>('admin', 'admin_password_key');
  const [profile, setProfile] = useStickyState<Profile>(PROFILE, 'profile_data');
  const [timeline, setTimeline] = useStickyState<TimelineItem[]>(TIMELINE.map((t, i) => ({ ...t, id: `tl-${i}` })), 'timeline_data');
  const [projects, setProjects] = useStickyState<Project[]>(PROJECTS, 'projects_data');
  const [publications, setPublications] = useStickyState<Publication[]>(PUBLICATIONS, 'publications_data');
  const [skills, setSkills] = useStickyState<Skill[]>(SKILLS.map((s, i) => ({ ...s, id: `sk-${i}` })), 'skills_data');
  const [blogs, setBlogs] = useStickyState<BlogPost[]>(BLOGS, 'blogs_data');
  const [news, setNews] = useStickyState<NewsItem[]>(NEWS_ITEMS, 'news_data');
  const [awards, setAwards] = useStickyState<Award[]>(AWARDS, 'awards_data');
  const [resources, setResources] = useStickyState<Resource[]>(RESOURCES, 'resources_data');
  const [gallery, setGallery] = useStickyState<string[]>(GALLERY_IMAGES, 'gallery_data');
  const [personalDev, setPersonalDev] = useStickyState<PersonalDevItem[]>(PERSONAL_DEV, 'personal_dev_data');
  const [testimonials, setTestimonials] = useStickyState<Testimonial[]>(TESTIMONIALS, 'testimonials_data');
  const [affiliations, setAffiliations] = useStickyState<Affiliation[]>(AFFILIATIONS, 'affiliations_data');

  const login = (email: string, password: string) => {
    // Check email against profile email and password against stored admin password
    if (email.toLowerCase() === profile.email.toLowerCase() && password === adminPassword) {
      setIsAuthenticated(true);
      setIsEditing(true);
      showNotification("Welcome back, Admin!", "success");
      return true;
    }
    showNotification("Invalid Email or Password", "error");
    return false;
  };

  const changePassword = (newPassword: string) => {
      setAdminPassword(newPassword);
      showNotification("Admin password updated!", "success");
  };

  const toggleEditing = () => {
    if (isAuthenticated) {
      setIsEditing(!isEditing);
      showNotification(isEditing ? "Editing Mode Disabled" : "Editing Mode Enabled", "info");
    }
  };

  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const showNotification = (message: string, type: ToastType) => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  // Advanced Feature: Export Data
  const exportData = () => {
    const data = {
      profile, timeline, projects, publications, skills, blogs, news, awards, resources, gallery, personalDev, testimonials, affiliations,
      version: '1.0',
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification("Backup downloaded successfully", "success");
  };

  // Advanced Feature: Import Data with Deep Merge Logic
  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      
      // Deep merge profile to ensure all fields exist even if backup is old
      if (data.profile) {
          setProfile(prev => ({
              ...prev,
              ...data.profile,
              // Ensure nested objects are merged, not replaced, if keys are missing in backup
              sectionVisibility: { ...prev.sectionVisibility, ...(data.profile.sectionVisibility || {}) },
              uiSettings: { ...prev.uiSettings, ...(data.profile.uiSettings || {}) },
              sectionText: { ...prev.sectionText, ...(data.profile.sectionText || {}) },
              customSocials: data.profile.customSocials || []
          }));
      }

      if (data.timeline) setTimeline(data.timeline);
      if (data.projects) setProjects(data.projects);
      if (data.publications) setPublications(data.publications);
      if (data.skills) setSkills(data.skills);
      if (data.blogs) setBlogs(data.blogs);
      if (data.news) setNews(data.news);
      if (data.awards) setAwards(data.awards);
      if (data.resources) setResources(data.resources);
      if (data.gallery) setGallery(data.gallery);
      if (data.personalDev) setPersonalDev(data.personalDev);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.affiliations) setAffiliations(data.affiliations);
      
      showNotification("Data restored successfully! Page will reload.", "success");
      setTimeout(() => window.location.reload(), 1500);
      return true;
    } catch (error) {
      console.error("Import failed", error);
      showNotification("Invalid backup file.", "error");
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        login,
        changePassword,
        isEditing,
        toggleEditing,
        isCmdOpen,
        setIsCmdOpen,
        activeHighlight,
        setActiveHighlight,
        profile,
        updateProfile,
        timeline,
        setTimeline,
        projects,
        setProjects,
        publications,
        setPublications,
        skills,
        setSkills,
        blogs,
        setBlogs,
        news,
        setNews,
        awards,
        setAwards,
        resources,
        setResources,
        gallery,
        setGallery,
        personalDev,
        setPersonalDev,
        testimonials,
        setTestimonials,
        affiliations,
        setAffiliations,
        activeSection,
        setActiveSection,
        notification,
        showNotification,
        clearNotification,
        exportData,
        importData,
        isTerminalOpen,
        setIsTerminalOpen
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
