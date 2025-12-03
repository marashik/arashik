
import React from 'react';
import { useData } from '../context/DataContext';
import { X, Eye, EyeOff } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SectionVisibilityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useData();

  if (!isOpen) return null;

  const toggleSection = (key: keyof typeof profile.sectionVisibility) => {
    if (!profile.sectionVisibility) return;
    updateProfile({
      ...profile,
      sectionVisibility: {
        ...profile.sectionVisibility,
        [key]: !profile.sectionVisibility[key]
      }
    });
  };

  // Default empty object fallback to prevent crash
  const visibility = profile.sectionVisibility || {};
  const sections = Object.keys(visibility) as Array<keyof typeof profile.sectionVisibility>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b dark:border-slate-800">
          <h3 className="text-xl font-bold dark:text-white">Manage Sections</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          <div className="space-y-2">
            {sections.length > 0 ? sections.map(key => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <span className="capitalize font-medium text-gray-700 dark:text-gray-200">
                  {(key as string).replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => toggleSection(key)}
                  className={`p-2 rounded-full transition-colors ${
                    visibility[key]
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                  title={visibility[key] ? "Visible" : "Hidden"}
                >
                  {visibility[key] ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            )) : (
                <p className="text-center text-gray-500">No configurable sections found.</p>
            )}
          </div>
        </div>
        <div className="p-4 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-900 text-right">
           <button onClick={onClose} className="px-4 py-2 bg-academic-navy text-white rounded hover:bg-academic-gold transition-colors">Done</button>
        </div>
      </div>
    </div>
  );
};