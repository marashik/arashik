
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { X, Terminal, Maximize2, Minimize2 } from 'lucide-react';

export const TerminalMode: React.FC = () => {
  const { isTerminalOpen, setIsTerminalOpen, profile, projects, skills } = useData();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Welcome to AshikOS v1.0. Type "help" to start.']);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
    }
  }, [output, isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, `root@ashik:~$ ${input}`];

    switch(cmd) {
        case 'help':
            newOutput.push(
                'Available commands:',
                '  whoami     - Display profile info',
                '  ls projects - List research projects',
                '  ls skills   - List technical skills',
                '  contact    - Show contact details',
                '  clear      - Clear terminal',
                '  exit       - Close terminal'
            );
            break;
        case 'whoami':
            newOutput.push(
                `Name: ${profile.name}`,
                `Title: ${profile.titles[0]}`,
                `Bio: ${profile.about.slice(0, 100)}...`
            );
            break;
        case 'ls projects':
            newOutput.push('Research Projects:');
            projects.forEach(p => newOutput.push(`- ${p.title} [${p.category}]`));
            break;
        case 'ls skills':
            newOutput.push('Technical Arsenal:');
            skills.forEach(s => newOutput.push(`- ${s.name} (${s.level}%)`));
            break;
        case 'contact':
            newOutput.push(
                `Email: ${profile.email}`,
                `LinkedIn: ${profile.linkedin}`,
                `Github: ${profile.github}`
            );
            break;
        case 'clear':
            setOutput([]);
            setInput('');
            return;
        case 'exit':
            setIsTerminalOpen(false);
            return;
        default:
            newOutput.push(`Command not found: ${cmd}. Type "help" for options.`);
    }

    setOutput(newOutput);
    setInput('');
  };

  return (
    <div className={`fixed z-[200] flex flex-col bg-black/90 backdrop-blur-md border border-green-500/30 shadow-2xl font-mono text-green-400 transition-all duration-300 ${isMaximized ? 'inset-0' : 'bottom-4 right-4 w-[600px] h-[400px] rounded-lg'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-green-900/20 border-b border-green-500/30 handle cursor-move">
          <div className="flex items-center gap-2">
              <Terminal size={16} />
              <span className="text-xs font-bold">AshikOS_Terminal</span>
          </div>
          <div className="flex gap-2">
              <button onClick={() => setIsMaximized(!isMaximized)} className="hover:text-white">
                  {isMaximized ? <Minimize2 size={14}/> : <Maximize2 size={14}/>}
              </button>
              <button onClick={() => setIsTerminalOpen(false)} className="hover:text-red-400">
                  <X size={14} />
              </button>
          </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent">
          {output.map((line, i) => (
              <div key={i} className="break-words">{line}</div>
          ))}
          <div ref={bottomRef} />
      </div>

      {/* Input Line */}
      <form onSubmit={handleCommand} className="flex gap-2 p-4 bg-black/50 border-t border-green-500/20">
          <span className="text-green-600">root@ashik:~$</span>
          <input 
             ref={inputRef}
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="flex-1 bg-transparent outline-none text-green-400 font-bold"
             autoFocus
          />
      </form>
    </div>
  );
};