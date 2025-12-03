
import React, { useState, useEffect } from 'react';
import { X, Upload, Link } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  title: string;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData, title }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, value: string) => {
    const arr = value.split(',').map((s) => s.trim());
    setFormData((prev: any) => ({ ...prev, [key]: arr }));
  };

  const getInputType = (key: string, value: any) => {
      if (typeof value === 'number') return 'number';
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes('email')) return 'email';
      if (lowerKey.includes('url') || lowerKey.includes('link') || lowerKey.includes('href') || lowerKey.includes('src')) return 'url';
      if (lowerKey.includes('date') || lowerKey.includes('year')) return 'text'; 
      return 'text';
  };

  const isImageKey = (key: string) => {
    const lower = key.toLowerCase();
    return lower.includes('photo') || lower.includes('image') || lower.includes('background') || lower.includes('cover');
  };

  const renderInput = (key: string, value: any) => {
    if (key === 'id') return null;

    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    const isIcon = key.toLowerCase() === 'icon';

    // Handle Image Inputs specially with file upload
    if (isImageKey(key)) {
        return (
            <div key={key} className="mb-6">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                <div className="flex flex-col gap-3">
                    {/* Preview */}
                    {value && typeof value === 'string' && (
                        <div className="relative w-full h-32 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 group shrink-0">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                Current Image
                            </div>
                        </div>
                    )}
                    
                    {/* Inputs */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            placeholder="Paste image URL..."
                            className="flex-1 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none text-sm"
                        />
                        <label className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors border border-gray-200 dark:border-slate-600 shrink-0">
                            <Upload size={18} className="text-gray-600 dark:text-gray-300" />
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            handleChange(key, reader.result);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <p className="text-[10px] text-gray-400">Supported: JPG, PNG, WebP, GIF. Max 5MB recommended.</p>
                </div>
            </div>
        )
    }

    // Special Dropdown for Publication Type
    if (key === 'type' && (title.toLowerCase().includes('publication'))) {
        const options = ['Journal', 'Conference', 'Preprint', 'Under Review', 'Literature Review'];
        return (
            <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                <select
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all appearance-none"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        )
    }

    // Special Dropdown for Resource Category
    if (key === 'category' && (title.toLowerCase().includes('resource') || title.toLowerCase().includes('link'))) {
        const options = ['Database', 'Tools & Software', 'Journals & Literature', 'Organizations', 'Other'];
        return (
            <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                <div className="flex gap-2">
                    <select
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all appearance-none"
                    >
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <input 
                        type="text"
                        placeholder="Custom"
                        className="w-1/2 p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold outline-none"
                        onChange={(e) => handleChange(key, e.target.value)}
                    />
                </div>
            </div>
        )
    }
    
    // Explicit handlers for DOI, PDF, Impact Factor
    if (key === 'doi') {
        return (
            <div key={key} className="mb-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">DOI (Digital Object Identifier)</label>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="e.g. 10.1016/j.imu.2024.101488"
                    className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1">Providing a valid DOI allows automatic citation fetching.</p>
            </div>
        );
    }

    if (key === 'citations') {
        return (
             <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Manual Citation Count</label>
                <input
                    type="number"
                    value={value || 0}
                    onChange={(e) => handleChange(key, Number(e.target.value))}
                    className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1">Used as fallback if automated fetching fails.</p>
             </div>
        )
    }

    if (key === 'impactFactor') {
        return (
             <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Impact Factor / Metric</label>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="e.g. 6.2, Q1, Top 10%"
                    className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
                />
             </div>
        )
    }

    if (key === 'pdfUrl') {
        return (
            <div key={key} className="mb-4">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">PDF Download Link</label>
                <input
                    type="url"
                    value={value || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="https://..."
                    className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
                />
            </div>
        );
    }


    if (Array.isArray(value)) {
       if(value.length > 0 && typeof value[0] !== 'string') return null; 
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{label} (comma separated)</label>
          <input
            type="text"
            value={value.join(', ')}
            onChange={(e) => handleArrayChange(key, e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
          />
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div key={key} className="mb-6 border p-4 rounded-lg border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                <p className="font-bold text-sm mb-3 uppercase tracking-wider text-gray-500">{label}</p>
                <div className="space-y-3">
                    {Object.keys(value).map(subKey => (
                        <div key={`${key}-${subKey}`}>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{subKey}</label>
                            <input
                                type={typeof value[subKey] === 'number' ? 'number' : 'text'}
                                value={formData[key][subKey] || ''}
                                onChange={(e) => {
                                    const newVal = typeof value[subKey] === 'number' ? Number(e.target.value) : e.target.value;
                                    setFormData((prev:any) => ({
                                        ...prev,
                                        [key]: {
                                            ...prev[key],
                                            [subKey]: newVal
                                        }
                                    }))
                                }}
                                className="w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm focus:border-academic-gold outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (key === 'description' || key === 'about' || key === 'excerpt' || key === 'text' || (typeof value === 'string' && value.length > 60)) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{label}</label>
          <textarea
            value={value || ''}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={5}
            className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all resize-y"
          />
          <div className="flex items-center gap-1 mt-1 text-xs text-academic-gold font-medium">
             <Link size={10} />
             <span>Tip: Add links using brackets: [Link Text](https://example.com)</span>
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
            {label} 
            {isIcon && <span className="text-xs text-gray-400 font-normal ml-2">(Lucide Icon Name)</span>}
        </label>
        <input
          type={getInputType(key, value)}
          value={value || ''}
          onChange={(e) => handleChange(key, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:border-academic-gold focus:ring-1 focus:ring-academic-gold outline-none transition-all"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all">
        <div className="flex justify-between items-center p-5 border-b dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
          <h3 className="text-xl font-bold dark:text-white text-academic-navy">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {Object.keys(formData).map((key) => renderInput(key, formData[key]))}
        </div>

        <div className="p-5 border-t dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2.5 rounded-lg bg-academic-navy text-white font-bold hover:bg-academic-gold hover:text-academic-navy transition-all shadow-md transform active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
