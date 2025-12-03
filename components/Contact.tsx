
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, MapPin, Copy, Check, Edit, Send, Calendar, ArrowRight } from 'lucide-react';
import { EditModal } from './EditModal';

export const Contact: React.FC = () => {
  const { profile, updateProfile, isEditing, showNotification } = useData();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', interest: 'Research Collaboration', message: '' });

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showNotification("Email copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formState.message || !formState.email) {
          showNotification("Please fill in required fields", "error");
          return;
      }
      
      const subject = encodeURIComponent(`${formState.interest} - ${formState.name}`);
      const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
      
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      showNotification("Opening your email client...", "info");
      setFormState({ name: '', email: '', interest: 'Research Collaboration', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-academic-ivory dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden group">
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-academic-ivory dark:from-slate-900 to-transparent z-0"></div>

      {isEditing && (
         <button 
            onClick={() => setShowModal(true)}
            className="absolute top-4 right-4 z-20 bg-academic-navy text-white p-2 rounded-full hover:bg-academic-gold transition-all shadow-md"
            title="Edit Contact Info & Availability"
         >
            <Edit size={16} />
         </button>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-academic-navy dark:text-white">{profile.sectionText.contact.title}</h2>
            <div className="w-24 h-1 bg-academic-gold mx-auto mb-6"></div>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              {profile.sectionText.contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info & Availability */}
            <div className="lg:col-span-1 space-y-6">
              {/* Info Card */}
              <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 rounded-2xl shadow-sm h-full flex flex-col">
                  <h3 className="text-xl font-bold text-academic-navy dark:text-white mb-6">Contact Details</h3>
                  
                  <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                        <div className="bg-academic-navy/5 dark:bg-white/5 p-3 rounded-lg text-academic-navy dark:text-academic-gold">
                            <Mail size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email</p>
                            <p className="font-medium text-academic-navy dark:text-white truncate">{profile.email}</p>
                        </div>
                        <button onClick={handleCopy} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-400 transition-colors">
                            {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
                        </button>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-academic-navy/5 dark:bg-white/5 p-3 rounded-lg text-academic-navy dark:text-academic-gold">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Location</p>
                            <p className="font-medium text-academic-navy dark:text-white">{profile.location}</p>
                        </div>
                    </div>
                  </div>

                  {/* Availability Indicator */}
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                      <div className="flex items-center gap-3">
                          <span className="relative flex h-3 w-3">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${profile.availability?.available ? 'bg-green-400' : 'bg-red-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${profile.availability?.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          </span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{profile.availability?.status}</span>
                      </div>
                  </div>
              </div>

              {/* Schedule Card */}
              <a 
                 href={profile.calendly}
                 target="_blank"
                 rel="noreferrer"
                 className="block bg-academic-gold text-academic-navy p-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group"
              >
                  <div className="flex justify-between items-start mb-4">
                      <Calendar size={32} />
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Schedule a Meeting</h3>
                  <p className="opacity-80 text-sm">Book a 30-min slot for research discussion.</p>
              </a>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-8 md:p-10 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-academic-navy dark:text-white mb-6">Send a Message</h3>
                <form className="space-y-6" onSubmit={handleSend}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-academic-navy dark:text-white transition-all" 
                                placeholder="Dr. Jane Doe" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Email</label>
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-academic-navy dark:text-white transition-all" 
                                placeholder="jane@university.edu" 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Topic of Interest</label>
                        <select 
                            value={formState.interest}
                            onChange={(e) => setFormState({...formState, interest: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-academic-navy dark:text-white transition-all appearance-none"
                        >
                        <option>Research Collaboration</option>
                        <option>PhD Opportunity</option>
                        <option>Code/Data Request</option>
                        <option>Speaking Invitation</option>
                        <option>Other</option>
                        </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                        <textarea 
                            rows={5} 
                            required
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4 focus:outline-none focus:border-academic-gold focus:ring-1 focus:ring-academic-gold text-academic-navy dark:text-white transition-all" 
                            placeholder="I'd like to discuss your recent paper on..."
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-academic-navy text-white font-bold py-4 rounded-lg hover:bg-academic-gold hover:text-academic-navy transition-all duration-300 shadow-md flex items-center justify-center gap-2 transform hover:-translate-y-1">
                        <Send size={20} /> Send Message
                    </button>
                </form>
            </div>

          </div>
        </div>
      </div>

      <EditModal
         isOpen={showModal}
         onClose={() => setShowModal(false)}
         initialData={{
             title: profile.sectionText.contact.title,
             description: profile.sectionText.contact.description,
             calendly: profile.calendly,
             availability: profile.availability || { status: "Open to opportunities", available: true }
         }}
         onSave={(data) => {
            updateProfile({
                ...profile, 
                calendly: data.calendly,
                availability: data.availability,
                sectionText: {
                    ...profile.sectionText,
                    contact: {
                        title: data.title,
                        description: data.description
                    }
                }
            });
            setShowModal(false);
         }}
         title="Edit Contact & Availability"
      />
    </section>
  );
};
