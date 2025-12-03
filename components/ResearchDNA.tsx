

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Sliders, Edit, Save, Dna, Cpu, Activity, Microscope, FileCode, Database, Download, Crosshair, Zap, Box, BarChart3, X, ChevronRight, Network, Share2, Lock, Unlock, RefreshCw,  Flame, Atom, Brain, Shield, Layers } from 'lucide-react';
import { EditModal } from './EditModal';
import { AreaChart, Area, ResponsiveContainer, YAxis, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

type DomainMode = 'DNA' | 'ONCO' | 'STRUCT' | 'NEURO' | 'QUANTUM' | 'IMMUNO';

export const ResearchDNA: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects, isEditing, profile, updateProfile, showNotification } = useData();
  
  // Interactive State
  const [speed, setSpeed] = useState(profile.dnaSettings?.speed || 50);
  const [curvature, setCurvature] = useState(profile.dnaSettings?.curvature || 50);
  const [density, setDensity] = useState(profile.dnaSettings?.density || 50);
  const [showControls, setShowControls] = useState(false);
  const [editingSection, setEditingSection] = useState(false);
  
  // Hover & Lock State
  const [hoveredNode, setHoveredNode] = useState<{x: number, y: number, project: any} | null>(null);
  const [lockedNode, setLockedNode] = useState<{x: number, y: number, project: any} | null>(null);
  
  // Advanced Filters & Modes
  const [highlightCategory, setHighlightCategory] = useState<'ALL' | 'WET' | 'DRY'>('ALL');
  const [domainMode, setDomainMode] = useState<DomainMode>('DNA');
  
  // HUD Panel States
  const [activePanel, setActivePanel] = useState<'metrics' | 'genome' | null>(null);

  // Refs for animation loop
  const speedRef = useRef(speed);
  const curvatureRef = useRef(curvature);
  const densityRef = useRef(density);
  const highlightRef = useRef(highlightCategory);
  const domainModeRef = useRef(domainMode);
  const nodesRef = useRef<any[]>([]);
  const isPausedRef = useRef(false);

  useEffect(() => {
    speedRef.current = speed;
    curvatureRef.current = curvature;
    densityRef.current = density;
    highlightRef.current = highlightCategory;
    domainModeRef.current = domainMode;
  }, [speed, curvature, density, highlightCategory, domainMode]);

  const saveSettings = () => {
    updateProfile({
      ...profile,
      dnaSettings: { speed, curvature, density }
    });
    showNotification("Visual Engine settings saved!", "success");
  };

  useEffect(() => {
    if (isEditing) setShowControls(true);
  }, [isEditing]);

  // --- ADVANCED ANALYSIS CALCULATIONS ---
  const analysis = useMemo(() => {
      if (!projects.length) return null;
      
      const totalComplexity = projects.reduce((acc, p) => acc + p.complexity, 0);
      const avgComplexity = Math.round(totalComplexity / projects.length);
      
      // Domain Specific Metrics Simulation
      const tumorHeterogeneity = (Math.random() * 40 + 60).toFixed(1); // Onco
      const angstromRes = (Math.random() * 2 + 1.5).toFixed(2); // Struct
      const synapticPlasticity = (Math.random() * 100).toFixed(1); // Neuro
      const coherenceTime = (Math.random() * 50 + 10).toFixed(2); // Quantum
      const cytokineLevel = (Math.random() * 1000 + 500).toFixed(0); // Immuno
      
      // Entropy Calculation
      const categories: Record<string, number> = {};
      projects.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1; });
      const totalProjects = projects.length;
      let entropy = 0;
      Object.values(categories).forEach(count => {
          const p = count / totalProjects;
          entropy -= p * Math.log2(p);
      });
      const entropyScore = (entropy * 10).toFixed(2);

      const dominantCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "General";
      
      // Heuristic for Wet vs Dry
      let wetCount = 0;
      let dryCount = 0;
      projects.forEach(p => {
          const cat = p.category.toLowerCase();
          const techs = p.technologies.join(' ').toLowerCase();
          const isDry = cat.includes('bioinfo') || cat.includes('silico') || cat.includes('computational') || techs.includes('python');
          if (isDry) dryCount++; else wetCount++;
      });
      const total = wetCount + dryCount || 1;
      const composition = {
          wet: Math.round((wetCount / total) * 100),
          dry: Math.round((dryCount / total) * 100)
      };

      // Projection Data
      const projectionData = Array.from({length: 10}, (_, i) => ({
          year: `Y${i+1}`,
          impact: Math.round(avgComplexity * (1 + i * 0.15) + (Math.random() * 20))
      }));

      return { 
          avgComplexity, dominantCategory, composition, entropyScore, 
          tumorHeterogeneity, angstromRes, synapticPlasticity, coherenceTime, cytokineLevel,
          projectionData
      };
  }, [projects]);

  const handleExportFASTA = () => {
      let content = `>RES_GENOME_${domainMode}_REF | ${profile.name}\n`;
      projects.forEach(p => {
          const seq = p.title.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 50);
          content += `${seq}... [${p.category}] -> Mode: ${domainMode}\n`;
      });
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `research_genome_${domainMode.toLowerCase()}.fasta`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showNotification("Sequence exported!", "success");
  };

  // Canvas Logic
  const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
    const oneMinusT = 1 - t;
    return Math.pow(oneMinusT, 3) * p0 + 3 * Math.pow(oneMinusT, 2) * t * p1 + 3 * oneMinusT * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = nodesRef.current.find(node => {
          const dist = Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2));
          return dist < 30; 
      });
      if (hit) {
          setHoveredNode({ x: hit.x, y: hit.y, project: hit.project });
          isPausedRef.current = true;
      } else {
          if (!lockedNode) {
              setHoveredNode(null);
              isPausedRef.current = false;
          }
      }
  };

  const handleCanvasClick = () => {
      if (hoveredNode) {
          if (lockedNode && lockedNode.project.id === hoveredNode.project.id) {
              setLockedNode(null);
          } else {
              setLockedNode(hoveredNode);
          }
      } else {
          setLockedNode(null);
      }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 700;
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      if (!isPausedRef.current && !lockedNode) {
          const speedMult = 0.005 + (speedRef.current / 100) * 0.025;
          time += speedMult;
      }
      
      ctx.clearRect(0, 0, width, height);
      nodesRef.current = []; 
      const frameNodes: any[] = [];
      
      const centerX = width / 2;
      const isDark = document.documentElement.classList.contains('dark');
      const mode = domainModeRef.current;
      
      // --- MODE SPECIFIC PARAMS (VIBRANT COLORS) ---
      let primaryColor = isDark ? '255, 255, 255' : '10, 25, 49'; // Navy/White
      let secondaryColor = '255, 215, 0'; // Bright Gold
      let bondWidth = 1.5;
      
      if (mode === 'ONCO') {
          secondaryColor = '255, 80, 80'; // Bright Red
          bondWidth = 0.8;
      } else if (mode === 'STRUCT') {
          secondaryColor = '0, 191, 255'; // Deep Sky Blue
          bondWidth = 2.5;
      } else if (mode === 'NEURO') {
          secondaryColor = '190, 100, 255'; // Bright Purple
      } else if (mode === 'QUANTUM') {
          secondaryColor = '0, 255, 150'; // Spring Green
      } else if (mode === 'IMMUNO') {
          secondaryColor = '255, 105, 180'; // Hot Pink
      }

      const curveAmp = 20 + (curvatureRef.current / 100) * 150;
      const p0 = centerX;
      const p1 = centerX + Math.sin(time * (mode === 'ONCO' ? 0.8 : 0.5)) * curveAmp;
      const p2 = centerX + Math.cos(time * (mode === 'ONCO' ? 1.2 : 0.7)) * curveAmp;
      const p3 = centerX;

      const stepSize = 2.0 - (densityRef.current / 100) * 1.8;
      const totalSteps = height / stepSize;

      // 1. Draw Strand Backbone
      if (mode !== 'QUANTUM') {
          for (let i = 0; i < totalSteps; i += 1) {
            const y = i * stepSize;
            if (y > height) break;
            const t = y / height;
            const spineX = cubicBezier(t, p0, p1, p2, p3);
            
            const complexity = projects[Math.min(Math.floor(t * projects.length), projects.length - 1)]?.complexity || 50;
            const radius = 40 + ((complexity / 100) * 30);
            const phase = y * (0.03 + (complexity * 0.0002)) - time * 2;

            const x1 = spineX + Math.sin(phase) * radius;
            const x2 = spineX + Math.sin(phase + Math.PI) * radius;
            const scale1 = (Math.cos(phase) + 2.5) / 3.5; 
            
            // Connectors
            if (Math.floor(y) % (mode === 'STRUCT' ? 40 : 25) === 0) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${secondaryColor}, ${0.15 * scale1})`; 
                ctx.lineWidth = bondWidth * scale1;
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.stroke();
            }
            
            // Strand Dots
            if (mode === 'DNA' || mode === 'STRUCT') {
                ctx.beginPath();
                ctx.fillStyle = `rgba(${primaryColor}, ${scale1 * 0.6})`;
                ctx.arc(x1, y, 2 * scale1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = `rgba(${secondaryColor}, ${scale1 * 0.6})`;
                ctx.arc(x2, y, 2 * scale1, 0, Math.PI * 2);
                ctx.fill();
            }
          }
      }

      // 2. Calculate Nodes
      projects.forEach((proj, idx) => {
          const t = (idx + 0.5) / projects.length;
          const y = t * height;
          const currentP1 = centerX + Math.sin(time * (mode === 'ONCO' ? 0.8 : 0.5)) * curveAmp;
          const currentP2 = centerX + Math.cos(time * (mode === 'ONCO' ? 1.2 : 0.7)) * curveAmp;
          const spineX = cubicBezier(t, centerX, currentP1, currentP2, centerX);
          
          const phase = y * 0.04 - time * 2;
          const radius = 60 + ((proj.complexity / 100) * 40);
          const angle = idx % 2 === 0 ? phase : phase + Math.PI;
          
          // Quantum Jitter
          const jitterX = mode === 'QUANTUM' ? (Math.random() - 0.5) * 10 : 0;
          
          const z = Math.cos(angle);
          const nodeX = spineX + Math.sin(angle) * radius + jitterX;
          const scale = (z + 2.5) / 3.5;
          const isFront = z > -0.2;

          const cat = proj.category.toLowerCase();
          const techs = proj.technologies.join(' ').toLowerCase();
          const isDry = cat.includes('bioinfo') || cat.includes('silico') || techs.includes('python');
          const type = isDry ? 'DRY' : 'WET';
          const isDimmed = highlightRef.current !== 'ALL' && highlightRef.current !== type;

          frameNodes.push({ x: nodeX, y, z, spineX, scale, isFront, project: proj, isDimmed });
      });

      // 3. Connections (Tech Bonds / Synapses / Molecular)
      frameNodes.forEach((n1, i) => {
          if (n1.isDimmed) return;
          frameNodes.forEach((n2, j) => {
              if (i >= j || n2.isDimmed) return;
              const shared = n1.project.technologies.filter((t: string) => n2.project.technologies.includes(t));
              
              // Neuro mode connects everything close like a neural net
              const isNeuroConnect = mode === 'NEURO'; 
              
              if (shared.length > 0 || (isNeuroConnect && Math.abs(i-j) < 3)) {
                  const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
                  if (dist < 300) {
                      ctx.beginPath();
                      const avgScale = (n1.scale + n2.scale) / 2;
                      // Increased alpha for better visibility
                      let alpha = Math.max(0.1, (1 - dist/300) * 0.6 * avgScale);
                      
                      if (mode === 'NEURO' && Math.random() > 0.95) {
                          // Firing synapse effect
                          ctx.strokeStyle = '#fff';
                          ctx.lineWidth = 2;
                          alpha = 1;
                      } else {
                          ctx.strokeStyle = `rgba(${secondaryColor}, ${alpha})`;
                          ctx.lineWidth = (mode === 'STRUCT' ? 3 : 1.5) * avgScale;
                      }
                      
                      ctx.moveTo(n1.x, n1.y);
                      ctx.lineTo(n2.x, n2.y);
                      ctx.stroke();
                  }
              }
          });
      });

      // 4. Draw Nodes & Text
      frameNodes.forEach((node) => {
          const { x: nodeX, y, spineX, scale, isFront, project, isDimmed } = node;
          const alpha = isDimmed ? 0.2 : 1;

          // Connector to Spine
          if (mode !== 'QUANTUM' && mode !== 'NEURO') {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryColor}, ${0.3 * scale * alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodeX, y);
            ctx.lineTo(spineX, y);
            ctx.stroke();
          }

          // Glow Effect for Foreground Nodes
          if (scale > 0.8 && !isDimmed) {
              ctx.shadowBlur = 15 * scale;
              ctx.shadowColor = `rgba(${secondaryColor}, 0.8)`;
          } else {
              ctx.shadowBlur = 0;
          }

          // Node Shape
          ctx.beginPath();
          const isHighlighted = (hoveredNode?.project.id === project.id) || (lockedNode?.project.id === project.id);
          let fillStyle = isHighlighted ? '#FFFFFF' : `rgba(${mode === 'DNA' ? primaryColor : secondaryColor}, ${alpha})`;
          
          if (mode === 'ONCO') {
              // Pulsing tumor cells
              const pulse = Math.sin(time * 5 + y);
              const r = (isHighlighted ? 10 : 6) * scale + pulse;
              ctx.fillStyle = isHighlighted ? '#FFFFFF' : `rgba(255, 80, 80, ${alpha})`; 
              ctx.arc(nodeX, y, Math.max(1, r), 0, Math.PI * 2);
              ctx.fill();
          } else if (mode === 'STRUCT') {
              // Tetrahedrons / Squares
              const size = (isHighlighted ? 14 : 10) * scale;
              ctx.fillStyle = `rgba(${secondaryColor}, ${alpha})`;
              ctx.rect(nodeX - size/2, y - size/2, size, size);
              ctx.fill();
          } else if (mode === 'QUANTUM') {
              // Ghosting
              ctx.fillStyle = `rgba(${secondaryColor}, ${alpha * 0.5})`;
              ctx.arc(nodeX - 2, y, 4 * scale, 0, Math.PI*2);
              ctx.fill();
              ctx.fillStyle = `rgba(${secondaryColor}, ${alpha * 0.5})`;
              ctx.arc(nodeX + 2, y, 4 * scale, 0, Math.PI*2);
              ctx.fill();
          } else if (mode === 'IMMUNO') {
              // Swarm particles around node
              const r = (isHighlighted ? 9 : 6) * scale;
              ctx.fillStyle = `rgba(${secondaryColor}, ${alpha})`;
              ctx.arc(nodeX, y, r, 0, Math.PI * 2);
              ctx.fill();
              // Cytokines
              for(let k=0; k<3; k++) {
                  ctx.fillStyle = `rgba(${secondaryColor}, ${alpha * 0.6})`;
                  ctx.beginPath();
                  ctx.arc(nodeX + (Math.random()-0.5)*25, y + (Math.random()-0.5)*25, 1.5, 0, Math.PI*2);
                  ctx.fill();
              }
          } else {
              // Standard DNA
              const r = (isHighlighted ? 9 : 6) * scale;
              ctx.fillStyle = fillStyle;
              ctx.arc(nodeX, y, r, 0, Math.PI * 2);
              ctx.fill();
          }

          if (isFront && !isDimmed) {
              nodesRef.current.push({ x: nodeX, y, project: project });
          }

          // Text Labels - ENHANCED VISIBILITY
          if (!hoveredNode && !lockedNode && scale > 0.7 && !isDimmed) {
              ctx.font = `800 ${12 * scale}px Inter`; 
              ctx.textAlign = nodeX > spineX ? 'left' : 'right';
              const label = project.title.substring(0, 15) + '..';
              const textX = nodeX + (nodeX > spineX ? 15 : -15);
              
              // Text Outline (Stroke) for high contrast
              ctx.shadowBlur = 0; // Reset glow for text
              ctx.lineWidth = 3;
              ctx.strokeStyle = isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)';
              ctx.strokeText(label, textX, y + 4);
              
              // Text Fill
              ctx.fillStyle = isDark ? '#FFFFFF' : '#0A1931';
              ctx.fillText(label, textX, y + 4);
          }
          
          // Reset Shadow for next elements
          ctx.shadowBlur = 0;
      });

      if (!isPausedRef.current && mode === 'NEURO') {
        // Scan line for Neuro
        const scanY = (time * 150) % height;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(190, 100, 255, 0.4)';
        ctx.lineWidth = 4;
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
    }
  }, [projects, hoveredNode, lockedNode]);

  const activeNode = lockedNode || hoveredNode;

  // --- DOMAIN MODE SELECTOR ---
  const renderDomainSelector = () => (
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {[
              { id: 'DNA', icon: Dna, label: 'Standard DNA' },
              { id: 'ONCO', icon: Flame, label: 'Oncology' },
              { id: 'STRUCT', icon: Box, label: 'Structural' },
              { id: 'NEURO', icon: Brain, label: 'Neuro' },
              { id: 'QUANTUM', icon: Atom, label: 'Quantum' },
              { id: 'IMMUNO', icon: Shield, label: 'Immunology' },
          ].map((mode) => (
              <button
                  key={mode.id}
                  onClick={() => setDomainMode(mode.id as DomainMode)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all border ${
                      domainMode === mode.id
                      ? 'bg-academic-navy text-white border-academic-gold shadow-lg scale-105'
                      : 'bg-white dark:bg-slate-800 text-gray-500 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
              >
                  <mode.icon size={14} className={domainMode === mode.id ? 'text-academic-gold' : ''} />
                  <span className="hidden md:inline">{mode.label}</span>
              </button>
          ))}
      </div>
  );

  return (
    <div ref={containerRef} className="relative w-full bg-academic-ivory dark:bg-slate-950 overflow-hidden py-24 border-b border-gray-100 dark:border-slate-900 transition-colors duration-300 cursor-crosshair">
        
        {/* --- SEQUENCE STREAM VISUAL --- */}
        <div className="absolute top-0 left-0 w-full h-8 bg-academic-navy/5 dark:bg-white/5 overflow-hidden flex items-center justify-center">
            <div className="text-[10px] font-mono text-academic-gold/50 whitespace-nowrap animate-pulse">
                {Array.from({length: 20}).map((_, i) => (
                    <span key={i} className="mx-2">
                        {['G','A','T','C'][Math.floor(Math.random()*4)]}
                        -
                        {projects[i % projects.length]?.technologies[0]?.toUpperCase() || 'SEQ'}
                        -
                        {domainMode}
                    </span>
                ))}
            </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center justify-center text-center mb-6 relative">
                <div className="flex items-center gap-3">
                   <h2 className="text-3xl md:text-4xl font-serif font-bold text-academic-navy dark:text-white mb-2">
                       {profile.sectionText.dna.title}
                   </h2>
                   {isEditing && (
                       <button onClick={() => setEditingSection(true)} className="mb-2 text-academic-gold hover:text-academic-navy dark:hover:text-white transition-colors">
                           <Edit size={20}/>
                       </button>
                   )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6 font-mono text-xs tracking-widest uppercase">
                    Active Lens: {domainMode} Analysis Protocol
                </p>

                {/* Domain Selector */}
                {renderDomainSelector()}

                {/* Control Buttons */}
                <div className="flex gap-4 justify-center mb-4">
                    <button 
                        onClick={() => setShowControls(!showControls)}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white/10 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded text-xs font-bold uppercase tracking-wider hover:border-academic-gold transition-colors text-academic-navy dark:text-gray-300 backdrop-blur-sm"
                    >
                        <Sliders size={14} />
                        {showControls ? 'Hide Params' : 'Params'}
                    </button>
                    <button 
                        onClick={handleExportFASTA}
                        className="flex items-center gap-2 px-4 py-1.5 bg-academic-navy/90 text-white border border-transparent rounded text-xs font-bold uppercase tracking-wider hover:bg-academic-gold hover:text-academic-navy transition-colors backdrop-blur-sm"
                    >
                        <Download size={14} />
                        FASTA Export
                    </button>
                </div>

                {/* --- CONTROLS PANEL --- */}
                {showControls && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-academic-gold/30 shadow-2xl w-full max-w-lg animate-in fade-in slide-in-from-top-4 duration-300 z-30">
                     <div className="flex justify-between items-center mb-4 border-b border-gray-200 dark:border-slate-700 pb-2">
                         <h4 className="text-xs font-bold text-academic-navy dark:text-white uppercase tracking-widest flex items-center gap-2"><Zap size={14}/> Engine Parameters</h4>
                         {isEditing && (
                             <button onClick={saveSettings} className="text-xs flex items-center gap-1 text-academic-gold font-bold hover:text-academic-navy dark:hover:text-white">
                                 <Save size={14}/> Save
                             </button>
                         )}
                     </div>
                     <div className="grid grid-cols-1 gap-6">
                        {[
                            { label: 'Flow Velocity', val: speed, set: setSpeed },
                            { label: 'Structure Curvature', val: curvature, set: setCurvature },
                            { label: 'Node Density', val: density, set: setDensity }
                        ].map((ctrl, i) => (
                            <div key={i}>
                               <div className="flex justify-between items-center mb-2">
                                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{ctrl.label}</label>
                                  <span className="text-xs font-mono text-academic-gold">{ctrl.val}%</span>
                               </div>
                               <input 
                                  type="range" min="0" max="100" value={ctrl.val} 
                                  onChange={(e) => ctrl.set(Number(e.target.value))}
                                  className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-academic-gold"
                               />
                            </div>
                        ))}
                     </div>
                  </div>
                )}
            </div>
        </div>
        
        {/* --- CANVAS --- */}
        <canvas 
            ref={canvasRef} 
            className="w-full h-[700px] relative z-0" 
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
            onMouseLeave={() => { 
                if(!lockedNode) {
                    setHoveredNode(null); 
                    isPausedRef.current = false; 
                }
            }}
        />

        {/* --- HUD 1: METRICS CORE (Collapsible Left Panel) --- */}
        {analysis && (
            <div className={`absolute top-48 left-4 md:left-8 z-30 transition-all duration-500 ease-in-out ${activePanel === 'metrics' ? 'w-80' : 'w-auto'}`}>
                <div 
                    className={`
                        bg-white/20 dark:bg-slate-950/80 backdrop-blur-md border border-white/30 dark:border-white/10 
                        shadow-2xl rounded-2xl overflow-hidden transition-all duration-300
                        ${activePanel === 'metrics' ? 'p-6 border-l-4 border-l-academic-gold' : 'p-3 cursor-pointer hover:bg-white/30 dark:hover:bg-slate-900 hover:scale-110'}
                    `}
                    onClick={() => activePanel !== 'metrics' && setActivePanel('metrics')}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${activePanel === 'metrics' ? 'bg-academic-gold text-academic-navy' : 'text-academic-gold bg-academic-navy/50'}`}>
                                <Cpu size={20} />
                            </div>
                            {activePanel === 'metrics' && (
                                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <h3 className="text-xs font-bold text-academic-navy dark:text-white uppercase tracking-widest">Metrics Core</h3>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{domainMode} Quantified</p>
                                </div>
                            )}
                        </div>
                        {activePanel === 'metrics' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setActivePanel(null); }}
                                className="text-gray-400 hover:text-academic-gold transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Expanded Content */}
                    {activePanel === 'metrics' && (
                        <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Metric Switches based on Domain Mode */}
                            
                            {domainMode === 'DNA' && (
                                <>
                                    <div>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1"><Zap size={10}/> Research Entropy</span>
                                            <span className="text-lg font-mono font-bold text-academic-navy dark:text-white">{analysis.entropyScore}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${Math.min(Number(analysis.entropyScore) * 10, 100)}%` }}></div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {domainMode === 'ONCO' && (
                                <>
                                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                                        <h4 className="text-xs font-bold text-red-400 uppercase mb-2">Tumor Microenvironment</h4>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Heterogeneity</span>
                                            <span className="font-mono text-white">{analysis.tumorHeterogeneity}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
                                            <div className="h-full bg-red-500 animate-pulse" style={{ width: `${analysis.tumorHeterogeneity}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Metastatic Potential</span>
                                            <span className="font-mono text-red-400">HIGH</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {domainMode === 'STRUCT' && (
                                <>
                                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                                        <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Protein Analysis</h4>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Angstrom Resolution</span>
                                            <span className="font-mono text-white">{analysis.angstromRes} Å</span>
                                        </div>
                                        <div className="flex justify-between text-xs mt-2">
                                            <span>Folding Stability (ΔG)</span>
                                            <span className="font-mono text-green-400">-12.4 kcal/mol</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {domainMode === 'QUANTUM' && (
                                <>
                                    <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-800/30">
                                        <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">Quantum State</h4>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Coherence Time</span>
                                            <span className="font-mono text-white">{analysis.coherenceTime} ms</span>
                                        </div>
                                        <div className="flex justify-between text-xs mt-2">
                                            <span>Tunneling Prob.</span>
                                            <span className="font-mono text-emerald-400">0.84</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Dominant Trait (Always visible) */}
                            <div className="flex items-center justify-between bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dominant Trait</span>
                                <span className="text-xs font-serif font-bold text-academic-navy dark:text-academic-gold">{analysis.dominantCategory}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- HUD 2: GENOME DECODER (Collapsible Right Panel) --- */}
        {analysis && (
            <div className={`absolute top-48 right-4 md:right-8 z-30 transition-all duration-500 ease-in-out ${activePanel === 'genome' ? 'w-80' : 'w-auto'}`}>
                <div 
                    className={`
                        bg-white/20 dark:bg-slate-950/80 backdrop-blur-md border border-white/30 dark:border-white/10 
                        shadow-2xl rounded-2xl overflow-hidden transition-all duration-300
                        ${activePanel === 'genome' ? 'p-6 border-r-4 border-r-academic-gold' : 'p-3 cursor-pointer hover:bg-white/30 dark:hover:bg-slate-900 hover:scale-110'}
                    `}
                    onClick={() => activePanel !== 'genome' && setActivePanel('genome')}
                >
                    <div className="flex items-center justify-between flex-row-reverse">
                        <div className="flex items-center gap-3 flex-row-reverse">
                            <div className={`p-2 rounded-lg ${activePanel === 'genome' ? 'bg-academic-gold text-academic-navy' : 'text-academic-gold bg-academic-navy/50'}`}>
                                <Activity size={20} />
                            </div>
                            {activePanel === 'genome' && (
                                <div className="animate-in fade-in slide-in-from-right-2 duration-300 text-right">
                                    <h3 className="text-xs font-bold text-academic-navy dark:text-white uppercase tracking-widest">Genome Decoder</h3>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Evolutionary Analysis</p>
                                </div>
                            )}
                        </div>
                        {activePanel === 'genome' && (
                            <button 
                                onClick={(e) => { e.stopPropagation(); setActivePanel(null); }}
                                className="text-gray-400 hover:text-academic-gold transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Expanded Content */}
                    {activePanel === 'genome' && (
                        <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* Interactive Filter: Molecular Composition */}
                            <div>
                                <p className="text-[10px] font-bold uppercase text-gray-500 mb-2 tracking-wider flex justify-between">
                                    <span>Composition Filter</span>
                                    <span className="text-academic-gold text-[9px]">{highlightCategory === 'ALL' ? 'SHOWING ALL' : `FILTER: ${highlightCategory}`}</span>
                                </p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setHighlightCategory(highlightCategory === 'WET' ? 'ALL' : 'WET') }}
                                        className={`flex-1 rounded-lg p-2 border flex flex-col items-center transition-all ${highlightCategory === 'WET' ? 'bg-blue-500/20 border-blue-500 ring-1 ring-blue-500' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/40'}`}
                                    >
                                        <Microscope size={16} className="text-blue-500 mb-1" />
                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{analysis.composition.wet}%</span>
                                        <span className="text-[8px] uppercase text-gray-400">Wet Lab</span>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setHighlightCategory(highlightCategory === 'DRY' ? 'ALL' : 'DRY') }}
                                        className={`flex-1 rounded-lg p-2 border flex flex-col items-center transition-all ${highlightCategory === 'DRY' ? 'bg-purple-500/20 border-purple-500 ring-1 ring-purple-500' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30 hover:bg-purple-100 dark:hover:bg-purple-900/40'}`}
                                    >
                                        <Cpu size={16} className="text-purple-500 mb-1" />
                                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{analysis.composition.dry}%</span>
                                        <span className="text-[8px] uppercase text-gray-400">In Silico</span>
                                    </button>
                                </div>
                            </div>

                            {/* Domain Specific Stat */}
                            <div className="flex items-center justify-between bg-white/50 dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/5">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    {domainMode === 'NEURO' ? <Brain size={12}/> : domainMode === 'IMMUNO' ? <Shield size={12}/> : <Layers size={12}/>} 
                                    {domainMode === 'NEURO' ? 'Firing Rate' : domainMode === 'IMMUNO' ? 'Cytokine Lvl' : 'Biophysics ΔS'}
                                </span>
                                <span className="text-xs font-mono font-bold text-academic-navy dark:text-white">
                                    {domainMode === 'NEURO' ? `${analysis.synapticPlasticity} Hz` : domainMode === 'IMMUNO' ? `${analysis.cytokineLevel} pg/ml` : '14.2 J/K'}
                                </span>
                            </div>

                            {/* Impact Projection Chart */}
                            <div className="pt-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <BarChart3 size={12} className="text-gray-400"/>
                                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Impact Projection (Sim)</span>
                                </div>
                                <div className="h-24 w-full bg-white/50 dark:bg-black/20 rounded-lg border border-gray-100 dark:border-white/5 overflow-hidden p-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={analysis.projectionData}>
                                            <defs>
                                                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="impact" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorImpact)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- SCROLLING TICKER (BOTTOM) --- */}
        <div className="absolute bottom-0 w-full bg-academic-navy/5 dark:bg-black/40 border-t border-gray-200 dark:border-white/5 py-2 overflow-hidden backdrop-blur-sm">
            <div className="flex whitespace-nowrap animate-marquee text-[10px] font-mono text-gray-500 dark:text-gray-400">
                <span className="mx-4">SYSTEM_STATUS: ONLINE</span>
                <span className="mx-4 text-green-500">● SEQUENCING_ACTIVE</span>
                <span className="mx-4">MODE: {domainMode}</span>
                <span className="mx-4">BIOPHYSICS: ΔG_STABLE</span>
                <span className="mx-4">INFECTIOUS_DISEASE_MODEL: R0=1.4</span>
                <span className="mx-4">LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
                <span className="mx-4">/// END OF STREAM ///</span>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </div>
        
        <EditModal 
            isOpen={editingSection}
            onClose={() => setEditingSection(false)}
            initialData={profile.sectionText.dna}
            onSave={(data) => {
                updateProfile({ ...profile, sectionText: { ...profile.sectionText, dna: data } });
                setEditingSection(false);
            }}
            title="Edit Section Text"
        />
    </div>
  );
};
