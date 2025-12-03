
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, Lock, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      onClose();
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
           <h3 className="text-lg font-bold text-academic-navy dark:text-white flex items-center gap-2">
             <Lock size={18} className="text-academic-gold"/> Admin Access
           </h3>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
             <X size={20} />
           </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
           {error && (
             <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg text-center animate-in slide-in-from-top-2">
               {error}
             </div>
           )}
           
           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-academic-gold text-academic-navy dark:text-white transition-colors text-sm"
                    placeholder="Enter profile email"
                    required
                  />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-academic-gold text-academic-navy dark:text-white transition-colors text-sm"
                    placeholder="Enter admin password"
                    required
                  />
              </div>
           </div>

           <button type="submit" className="w-full py-3 bg-academic-navy text-white font-bold rounded-xl hover:bg-academic-gold hover:text-academic-navy transition-all shadow-lg transform active:scale-95 flex justify-center items-center gap-2">
              <Lock size={16} /> Secure Login
           </button>
           
           <p className="text-center text-xs text-gray-400 mt-4">
               Default: Email (from profile) & Password: 'admin'
           </p>
        </form>
      </div>
    </div>
  );
};
