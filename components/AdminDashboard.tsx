
import React, { useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Eye, MousePointer, Globe, Download, Upload, ShieldCheck, Layout, Settings, Database, FileText, Edit, Lock, Link, Image } from 'lucide-react';
import { SectionText } from '../types';

// Reusable ImageInput component for Admin Dashboard
const ImageInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
        <div className="flex gap-2">
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                placeholder="https://..."
            />
            <label className="flex items-center justify-center px-3 bg-gray-100 dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                <Upload size={14} className="text-gray-500 dark:text-gray-300" />
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                         const file = e.target.files?.[0];
                         if (file) {
                             const reader = new FileReader();
                             reader.onloadend = () => onChange(reader.result as string);
                             reader.readAsDataURL(file);
                         }
                    }}
                />
            </label>
        </div>
        {value && <div className="mt-2 h-16 w-16 rounded overflow-hidden border border-gray-200"><img src={value} className="w-full h-full object-cover"/></div>}
    </div>
);

export const AdminDashboard: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { exportData, importData, profile, updateProfile, changePassword } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'settings' | 'backup'>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        importData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSectionUpdate = (key: string, field: 'title' | 'description', value: string) => {
      const sectionKey = key as keyof typeof profile.sectionText;
      updateProfile({
          ...profile,
          sectionText: {
              ...profile.sectionText,
              [sectionKey]: {
                  ...profile.sectionText[sectionKey],
                  [field]: value
              }
          }
      });
  };

  const handleProfileUpdate = (field: string, value: any) => {
      updateProfile({ ...profile, [field]: value });
  };

  const handleArrayUpdate = (field: string, value: string) => {
      const arr = value.split(',').map(s => s.trim());
      updateProfile({ ...profile, [field]: arr });
  };

  const handlePasswordChange = () => {
      if (newPassword.trim().length < 4) {
          alert("Password must be at least 4 characters.");
          return;
      }
      changePassword(newPassword);
      setNewPassword('');
  };

  // Mock Data for Analytics
  const visitsData = [
    { name: 'Mon', visits: 120 },
    { name: 'Tue', visits: 150 },
    { name: 'Wed', visits: 200 },
    { name: 'Thu', visits: 180 },
    { name: 'Fri', visits: 250 },
    { name: 'Sat', visits: 300 },
    { name: 'Sun', visits: 280 },
  ];

  const tabs = [
      { id: 'overview', label: 'Overview', icon: <BarChart size={18} /> },
      { id: 'content', label: 'Content Manager', icon: <FileText size={18} /> },
      { id: 'settings', label: 'Global Settings', icon: <Settings size={18} /> },
      { id: 'backup', label: 'Data & Backup', icon: <Database size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur shrink-0">
           <div>
               <h2 className="text-2xl font-bold text-academic-navy dark:text-white">CMS Dashboard</h2>
               <p className="text-sm text-gray-500">Manage content, settings, and analytics.</p>
           </div>
           <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
               Close
           </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-gray-50 dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 flex flex-col p-4 gap-2 shrink-0">
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-academic-gold text-academic-navy shadow-sm font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-800'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-slate-900">
                
                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* KPI Cards */}
                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                <div className="flex justify-between items-start mb-2">
                                    <Users className="text-blue-500" />
                                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">+12%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-academic-navy dark:text-white">1,245</h3>
                                <p className="text-xs text-gray-500">Total Visitors</p>
                            </div>
                            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                                <div className="flex justify-between items-start mb-2">
                                    <Eye className="text-green-500" />
                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">+5%</span>
                                </div>
                                <h3 className="text-2xl font-bold text-academic-navy dark:text-white">4,890</h3>
                                <p className="text-xs text-gray-500">Page Views</p>
                            </div>
                            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                                <div className="flex justify-between items-start mb-2">
                                    <MousePointer className="text-purple-500" />
                                    <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded">3.2m</span>
                                </div>
                                <h3 className="text-2xl font-bold text-academic-navy dark:text-white">2m 45s</h3>
                                <p className="text-xs text-gray-500">Avg. Session</p>
                            </div>
                            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
                                <div className="flex justify-between items-start mb-2">
                                    <Globe className="text-orange-500" />
                                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">Global</span>
                                </div>
                                <h3 className="text-2xl font-bold text-academic-navy dark:text-white">18</h3>
                                <p className="text-xs text-gray-500">Countries</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                                <h3 className="font-bold text-lg mb-6 text-academic-navy dark:text-white">Weekly Traffic</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={visitsData}>
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }} cursor={{fill: 'rgba(212, 175, 55, 0.1)'}} />
                                            <Bar dataKey="visits" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                                <h3 className="font-bold text-lg mb-6 text-academic-navy dark:text-white">Engagement Trend</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={visitsData}>
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                            <Line type="monotone" dataKey="visits" stroke="#38BDF8" strokeWidth={3} dot={{r: 4}} activeDot={{r: 8}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CONTENT CMS TAB --- */}
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-academic-navy dark:text-white">Section Content Manager</h3>
                            <span className="text-xs text-gray-500">Edit titles and descriptions for all sections</span>
                        </div>
                        
                        <div className="grid gap-4">
                            {Object.entries(profile.sectionText).map(([key, val]) => {
                                const text = val as SectionText;
                                return (
                                <div key={key} className="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                                    <button 
                                        onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                                        className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
                                    >
                                        <span className="font-bold uppercase text-sm tracking-wider text-gray-600 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-academic-gold text-sm">{expandedSection === key ? 'Close' : 'Edit'}</span>
                                    </button>
                                    
                                    {expandedSection === key && (
                                        <div className="p-6 space-y-4 border-t border-gray-200 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Section Title</label>
                                                <input 
                                                    type="text" 
                                                    value={text.title}
                                                    onChange={(e) => handleSectionUpdate(key, 'title', e.target.value)}
                                                    className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:border-academic-gold outline-none dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Section Description</label>
                                                <textarea 
                                                    value={text.description}
                                                    rows={3}
                                                    onChange={(e) => handleSectionUpdate(key, 'description', e.target.value)}
                                                    className="w-full p-2 rounded border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:border-academic-gold outline-none dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )})}
                        </div>
                    </div>
                )}

                {/* --- SETTINGS TAB --- */}
                {activeTab === 'settings' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 pb-20">
                        <h3 className="text-xl font-bold text-academic-navy dark:text-white mb-6">Global Site Settings</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Core Identity */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2">Core Identity</h4>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={profile.name}
                                        onChange={(e) => handleProfileUpdate('name', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Initials (Brand)</label>
                                    <input 
                                        type="text" 
                                        value={profile.initials}
                                        onChange={(e) => handleProfileUpdate('initials', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Titles (Comma Separated)</label>
                                    <input 
                                        type="text" 
                                        value={profile.titles.join(', ')}
                                        onChange={(e) => handleArrayUpdate('titles', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                            </div>

                            {/* Content Strings */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2">Content Strings</h4>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Navbar Subtitle</label>
                                    <input 
                                        type="text" 
                                        value={profile.navbarSubtitle}
                                        onChange={(e) => handleProfileUpdate('navbarSubtitle', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">About Quote</label>
                                    <input 
                                        type="text" 
                                        value={profile.aboutQuote}
                                        onChange={(e) => handleProfileUpdate('aboutQuote', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Footer Copyright Text</label>
                                    <input 
                                        type="text" 
                                        value={profile.footerText}
                                        onChange={(e) => handleProfileUpdate('footerText', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                            </div>

                            {/* Important URLs */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                    <Link size={14}/> Important URLs
                                </h4>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">CV / Resume URL</label>
                                    <input 
                                        type="text" 
                                        value={profile.cvLink}
                                        onChange={(e) => handleProfileUpdate('cvLink', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Calendly URL (Meeting Scheduler)</label>
                                    <input 
                                        type="text" 
                                        value={profile.calendly}
                                        onChange={(e) => handleProfileUpdate('calendly', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Privacy Policy URL</label>
                                    <input 
                                        type="text" 
                                        value={profile.privacyUrl}
                                        onChange={(e) => handleProfileUpdate('privacyUrl', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Terms of Service URL</label>
                                    <input 
                                        type="text" 
                                        value={profile.termsUrl}
                                        onChange={(e) => handleProfileUpdate('termsUrl', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                    />
                                </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Audio Greeting URL (.mp3)</label>
                                    <input 
                                        type="text" 
                                        value={profile.audioGreeting}
                                        onChange={(e) => handleProfileUpdate('audioGreeting', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                    />
                                </div>
                            </div>

                            {/* Contact & Security */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2">Contact Info</h4>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Email Address (Also Admin ID)</label>
                                    <input 
                                        type="email" 
                                        value={profile.email}
                                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Location</label>
                                    <input 
                                        type="text" 
                                        value={profile.location}
                                        onChange={(e) => handleProfileUpdate('location', e.target.value)}
                                        className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                    />
                                </div>

                                {/* Security Settings */}
                                <div className="space-y-4 pt-4">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-red-500 border-b border-gray-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                        <Lock size={14}/> Admin Security
                                    </h4>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Change Password</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="password" 
                                                placeholder="New password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="flex-1 p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                                            />
                                            <button 
                                                onClick={handlePasswordChange}
                                                className="px-4 py-2 bg-academic-navy text-white rounded hover:bg-academic-gold text-xs font-bold transition-colors"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                    <Globe size={14}/> Social Profiles
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['linkedin', 'github', 'scholar', 'researchGate', 'skype', 'orcid', 'twitter', 'facebook', 'instagram', 'youtube', 'x'].map(platform => (
                                        <div key={platform}>
                                            <label className="block text-xs font-bold text-gray-500 mb-1 capitalize">{platform.replace(/([A-Z])/g, ' $1')}</label>
                                            <input 
                                                type="url" 
                                                value={(profile as any)[platform] || ''}
                                                onChange={(e) => handleProfileUpdate(platform, e.target.value)}
                                                className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none text-sm"
                                                placeholder={`https://${platform}.com/...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Images - Enhanced with File Upload */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-academic-gold border-b border-gray-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                                    <Image size={14}/> Visual Assets
                                </h4>
                                <ImageInput 
                                    label="Profile Photo URL" 
                                    value={profile.photo} 
                                    onChange={(val) => handleProfileUpdate('photo', val)} 
                                />
                                <ImageInput 
                                    label="About Section Photo URL" 
                                    value={profile.aboutPhoto} 
                                    onChange={(val) => handleProfileUpdate('aboutPhoto', val)} 
                                />
                                <ImageInput 
                                    label="Hero Background URL" 
                                    value={profile.heroBackground} 
                                    onChange={(val) => handleProfileUpdate('heroBackground', val)} 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* --- BACKUP TAB --- */}
                {activeTab === 'backup' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 h-full flex flex-col justify-center">
                        <div className="bg-gradient-to-r from-academic-navy to-slate-800 rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck size={200} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">Data Backup & Restoration</h3>
                                <p className="text-gray-300 mb-8 max-w-xl text-lg leading-relaxed">
                                    Your portfolio currently runs entirely in the browser. All your edits are saved to Local Storage. 
                                    To prevent data loss when clearing cache or switching devices, periodically download a backup file.
                                </p>
                                
                                <div className="flex flex-wrap gap-6">
                                    <button 
                                        onClick={exportData}
                                        className="flex items-center gap-3 px-8 py-4 bg-academic-gold text-academic-navy font-bold text-lg rounded-xl hover:bg-white transition-colors shadow-lg"
                                    >
                                        <Download size={24} /> Download Backup (.json)
                                    </button>
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-colors"
                                    >
                                        <Upload size={24} /> Restore Data
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept=".json" 
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};
