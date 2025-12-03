
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Plus, Edit, Trash2, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { Skill } from '../types';
import { EditModal } from './EditModal';

export const Skills: React.FC = () => {
  const { skills, setSkills, isEditing, activeHighlight, setActiveHighlight, profile, updateProfile } = useData();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  const [editingSubtitle, setEditingSubtitle] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 6;

  // Helper to sort by level descending to ensure top skills are shown first
  const sortSkills = (list: Skill[]) => [...list].sort((a, b) => b.level - a.level);

  // Categories Mapping with sorting
  const compSkills = sortSkills(skills.filter(s => s.category === 'computational'));
  const labSkills = sortSkills(skills.filter(s => s.category === 'lab'));
  const softSkills = sortSkills(skills.filter(s => s.category === 'soft'));
  const toolsSkills = sortSkills(skills.filter(s => s.category === 'tools'));

  // Slicing logic
  const displayedCompSkills = showAll ? compSkills : compSkills.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedLabSkills = showAll ? labSkills : labSkills.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedToolsSkills = showAll ? toolsSkills : toolsSkills.slice(0, INITIAL_DISPLAY_COUNT);
  const displayedSoftSkills = showAll ? softSkills : softSkills.slice(0, INITIAL_DISPLAY_COUNT);

  const hasMore = compSkills.length > INITIAL_DISPLAY_COUNT || 
                  labSkills.length > INITIAL_DISPLAY_COUNT || 
                  toolsSkills.length > INITIAL_DISPLAY_COUNT || 
                  softSkills.length > INITIAL_DISPLAY_COUNT;

  const handleDelete = (id: string) => {
    if(confirm("Delete skill?")) setSkills(skills.filter(s => s.id !== id));
  };

  const handleSave = (skill: Skill) => {
      if(isAdding) {
          setSkills([...skills, { ...skill, id: Date.now().toString() }]);
          setIsAdding(false);
      } else {
          setSkills(skills.map(s => s.id === skill.id ? skill : s));
          setEditingSkill(null);
      }
  };

  // Helper to check match
  const matches = (name: string) => {
      if (!activeHighlight) return false;
      return name.toLowerCase().includes(activeHighlight.toLowerCase());
  }

  const renderSubtitleEdit = (key: 'subtitle1' | 'subtitle2' | 'subtitle3' | 'subtitle4') => (
      isEditing && (
          <button 
            onClick={() => setEditingSubtitle(key)} 
            className="absolute right-4 top-4 text-gray-400 hover:text-academic-gold opacity-50 hover:opacity-100 transition-opacity"
            title="Edit Header"
          >
              <Edit size={14} />
          </button>
      )
  );

  return (
    <section id="skills" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-3 justify-center mb-4">
                <h2 className="text-4xl font-serif font-bold text-academic-navy dark:text-white">{profile.sectionText.skills.title}</h2>
                {isEditing && (
                    <button onClick={() => setEditingSection(true)} className="text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                        <Edit size={20}/>
                    </button>
                )}
            </div>
            <div className="w-24 h-1 bg-academic-gold mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">{profile.sectionText.skills.description}</p>
            </div>

            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* QUADRANT 1: Dry Lab Expertise (Radar Chart) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 relative group/quad">
                {renderSubtitleEdit('subtitle1')}
                <h3 className="text-xl font-bold text-center text-academic-navy dark:text-academic-gold mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
                    {profile.sectionText.skills.subtitle1 || "Dry Lab Expertise"}
                </h3>
                <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {/* Note: Using full data for chart to maintain shape, or displayed for consistency? Using displayed to match list. */}
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={displayedCompSkills}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                        name="Proficiency"
                        dataKey="level"
                        stroke="#D4AF37"
                        fill="#D4AF37"
                        fillOpacity={0.4}
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#D4AF37' }}
                    />
                    </RadarChart>
                </ResponsiveContainer>
                </div>

                {/* Interactive List for Comp Skills */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {displayedCompSkills.map(s => (
                    <button 
                        key={s.id}
                        onClick={() => setActiveHighlight(matches(s.name) ? null : s.name)}
                        className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded border transition-all ${
                            matches(s.name) 
                            ? 'bg-academic-gold text-academic-navy border-academic-gold font-bold shadow-md' 
                            : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-slate-700'
                        }`}
                    >
                        {s.name}
                        {isEditing && (
                            <span onClick={(e) => {e.stopPropagation(); setEditingSkill(s)}} className="ml-2 text-blue-500 cursor-pointer">✎</span>
                        )}
                    </button>
                ))}
                </div>
                {isEditing && (
                    <div className="absolute top-4 left-4 opacity-0 group-hover/quad:opacity-100 transition-opacity">
                        <button onClick={() => setIsAdding(true)} className="text-xs flex items-center gap-1 text-academic-gold font-bold"><Plus size={12}/> Add Skill</button>
                    </div>
                )}
            </div>

            {/* QUADRANT 2: Wet Lab Expertise (Progress Bars) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 relative group/quad">
                {renderSubtitleEdit('subtitle2')}
                <h3 className="text-xl font-bold text-center text-academic-navy dark:text-academic-gold mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
                    {profile.sectionText.skills.subtitle2 || "Wet Lab Expertise"}
                </h3>
                <div className="space-y-5">
                {displayedLabSkills.map((skill) => (
                    <div 
                        key={skill.id} 
                        onClick={() => setActiveHighlight(matches(skill.name) ? null : skill.name)}
                        className={`relative group cursor-pointer p-2 rounded-lg transition-all ${matches(skill.name) ? 'bg-academic-gold/10 ring-2 ring-academic-gold' : 'hover:bg-gray-50 dark:hover:bg-slate-900'}`}
                    >
                    <div className="flex justify-between mb-2">
                        <span className={`font-medium text-sm ${matches(skill.name) ? 'text-academic-gold' : 'text-academic-navy dark:text-gray-200'}`}>{skill.name}</span>
                        <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full relative ${matches(skill.name) ? 'bg-academic-gold' : 'bg-academic-navy dark:bg-academic-gold'}`}
                        style={{ width: `${skill.level}%` }}
                        >
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="absolute -right-8 top-0 flex gap-1">
                            <button onClick={(e) => {e.stopPropagation(); setEditingSkill(skill)}} className="p-1 text-blue-500"><Edit size={12}/></button>
                            <button onClick={(e) => {e.stopPropagation(); handleDelete(skill.id!)}} className="p-1 text-red-500"><Trash2 size={12}/></button>
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>

            {/* QUADRANT 3: Tools & Software (Badges Grid) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 relative group/quad">
                {renderSubtitleEdit('subtitle3')}
                <h3 className="text-xl font-bold text-center text-academic-navy dark:text-academic-gold mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
                    {profile.sectionText.skills.subtitle3 || "Tools & Software"}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {displayedToolsSkills.map(skill => (
                        <button
                            key={skill.id}
                            onClick={() => setActiveHighlight(matches(skill.name) ? null : skill.name)}
                            className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                                matches(skill.name)
                                ? 'bg-academic-navy text-white border-academic-gold shadow-lg scale-105'
                                : 'bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-slate-700 hover:border-academic-gold/50 hover:shadow'
                            }`}
                        >
                            <Terminal size={14} className={matches(skill.name) ? 'text-academic-gold' : 'text-gray-400'} />
                            <span className="text-sm font-semibold">{skill.name}</span>
                            
                            {/* Mini Level Indicator */}
                            <div className="w-1 h-1 rounded-full bg-academic-gold opacity-50 group-hover:opacity-100"></div>

                            {isEditing && (
                                <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 rounded-full shadow p-0.5 flex z-10">
                                    <span onClick={(e) => {e.stopPropagation(); setEditingSkill(skill)}}><Edit size={10} className="text-blue-500"/></span>
                                    <span onClick={(e) => {e.stopPropagation(); handleDelete(skill.id!)}}><Trash2 size={10} className="text-red-500"/></span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* QUADRANT 4: Soft Skills (Pills) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 relative group/quad">
                {renderSubtitleEdit('subtitle4')}
                <h3 className="text-xl font-bold text-center text-academic-navy dark:text-academic-gold mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
                    {profile.sectionText.skills.subtitle4 || "Soft Skills"}
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {displayedSoftSkills.map(skill => (
                    <button 
                        key={skill.id} 
                        onClick={() => setActiveHighlight(matches(skill.name) ? null : skill.name)}
                        className={`group relative px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-all ${
                            matches(skill.name) 
                            ? 'bg-academic-gold text-academic-navy scale-105 shadow-md' 
                            : 'bg-blue-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-slate-700'
                        }`}
                    >
                        {skill.name}
                        {isEditing && (
                            <div className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 rounded-full shadow p-0.5 flex z-10">
                                <span onClick={(e) => {e.stopPropagation(); setEditingSkill(skill)}}><Edit size={10} className="text-blue-500"/></span>
                                <span onClick={(e) => {e.stopPropagation(); handleDelete(skill.id!)}}><Trash2 size={10} className="text-red-500"/></span>
                            </div>
                        )}
                    </button>
                    ))}
                </div>
            </div>

            </div>

            {/* Show More Button - Global for the section */}
            {hasMore && (
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-sm font-bold text-academic-navy dark:text-white hover:border-academic-gold hover:text-academic-gold transition-all shadow-sm hover:shadow-md group"
                    >
                        {showAll ? 'Show Less' : 'Show More Skills'}
                        {showAll ? <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/> : <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/>}
                    </button>
                </div>
            )}
        </div>
      </div>

      <EditModal 
        isOpen={!!editingSkill || isAdding}
        onClose={() => { setEditingSkill(null); setIsAdding(false); }}
        initialData={editingSkill || { name: '', level: 80, category: 'computational' }}
        onSave={handleSave}
        title={isAdding ? "Add Skill" : "Edit Skill"}
      />
      
      <EditModal 
        isOpen={editingSection}
        onClose={() => setEditingSection(false)}
        initialData={profile.sectionText.skills}
        onSave={(data) => {
            updateProfile({ ...profile, sectionText: { ...profile.sectionText, skills: data } });
            setEditingSection(false);
        }}
        title="Edit Section Text"
      />

      <EditModal
        isOpen={!!editingSubtitle}
        onClose={() => setEditingSubtitle(null)}
        initialData={{ [editingSubtitle as string]: profile.sectionText.skills[editingSubtitle as keyof typeof profile.sectionText.skills] || '' }}
        onSave={(data) => {
            const key = editingSubtitle as string;
            updateProfile({
                ...profile,
                sectionText: {
                    ...profile.sectionText,
                    skills: {
                        ...profile.sectionText.skills,
                        [key]: data[key]
                    }
                }
            });
            setEditingSubtitle(null);
        }}
        title="Edit Subtitle"
      />
    </section>
  );
};
