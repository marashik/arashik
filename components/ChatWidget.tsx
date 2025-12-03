
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const { profile, skills, projects, publications } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
        id: '1',
        text: `Hi! I'm ${profile.initials}'s virtual research assistant. Ask me about my research, skills, or publications!`,
        sender: 'bot',
        timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
      const q = query.toLowerCase();
      
      if (q.includes('hello') || q.includes('hi')) return `Hello! How can I assist you with ${profile.name}'s portfolio today?`;
      
      if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
          return `You can reach ${profile.name} at ${profile.email}. Use the Contact form below for collaborations!`;
      }
      
      if (q.includes('skill') || q.includes('technology') || q.includes('stack')) {
          const topSkills = skills.slice(0, 5).map(s => s.name).join(", ");
          return `My technical arsenal includes ${topSkills}, and more. I specialize in both wet-lab and computational biology.`;
      }
      
      if (q.includes('research') || q.includes('project')) {
          const count = projects.length;
          const categories = Array.from(new Set(projects.map(p => p.category))).join(", ");
          return `I have worked on ${count} major research projects spanning ${categories}. Check out the Research Universe section!`;
      }

      if (q.includes('publication') || q.includes('paper')) {
          return `I have published ${publications.length} papers. My latest work focuses on ${publications[0]?.title || 'Systems Biology'}.`;
      }

      if (q.includes('location') || q.includes('where')) {
          return `I am currently based in ${profile.location}.`;
      }

      return "I'm focusing on answering questions about my research and background. Try asking about my skills, projects, or publications!";
  };

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim()) return;

      const userMsg: ChatMessage = {
          id: Date.now().toString(),
          text: inputValue,
          sender: 'user',
          timestamp: new Date()
      };

      setMessages(prev => [...prev, userMsg]);
      setInputValue('');

      // Simulate network delay
      setTimeout(() => {
          const responseText = generateResponse(inputValue);
          const botMsg: ChatMessage = {
              id: (Date.now() + 1).toString(),
              text: responseText,
              sender: 'bot',
              timestamp: new Date()
          };
          setMessages(prev => [...prev, botMsg]);
      }, 600);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full bg-academic-navy text-white shadow-2xl hover:scale-110 transition-transform duration-300 border border-academic-gold/20 ${isOpen ? 'hidden' : 'flex items-center gap-2'}`}
      >
        <Bot size={24} className="text-academic-gold" />
        <span className="font-bold text-sm hidden md:inline">Ask AI</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
           {/* Header */}
           <div className="bg-academic-navy p-4 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/10 rounded-full">
                       <Bot size={20} className="text-academic-gold" />
                   </div>
                   <div>
                       <h3 className="font-bold text-sm">Research Assistant</h3>
                       <p className="text-[10px] text-gray-300 flex items-center gap-1">
                           <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                       </p>
                   </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                   <X size={20} />
               </button>
           </div>

           {/* Messages */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950">
               {messages.map((msg) => (
                   <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-gray-200 dark:bg-slate-800' : 'bg-academic-gold/20'}`}>
                           {msg.sender === 'user' ? <User size={14} className="text-gray-600 dark:text-gray-300"/> : <Bot size={14} className="text-academic-gold"/>}
                       </div>
                       <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                           msg.sender === 'user' 
                           ? 'bg-academic-navy text-white rounded-tr-none' 
                           : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-slate-700 rounded-tl-none shadow-sm'
                       }`}>
                           {msg.text}
                       </div>
                   </div>
               ))}
               <div ref={messagesEndRef} />
           </div>

           {/* Input */}
           <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-2">
               <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about research..." 
                  className="flex-1 bg-gray-100 dark:bg-slate-800 text-academic-navy dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-academic-gold"
               />
               <button type="submit" className="p-2 bg-academic-gold text-academic-navy rounded-full hover:bg-academic-navy hover:text-academic-gold transition-colors">
                   <Send size={18} />
               </button>
           </form>
        </div>
      )}
    </>
  );
};