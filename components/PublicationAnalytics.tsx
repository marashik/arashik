
import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, Legend, AreaChart, Area, ScatterChart, Scatter, ZAxis, BarChart
} from 'recharts';
import { useData } from '../context/DataContext';
import { TrendingUp, BookOpen, Award, Users, Hash, Activity, Tag } from 'lucide-react';

export const PublicationAnalytics: React.FC = () => {
  const { publications, profile } = useData();

  // --- Advanced Statistics Calculation ---
  const stats = useMemo(() => {
      const totalPubs = publications.length;
      
      // Citations
      const allCitations = publications.map(p => p.citations);
      const totalCitations = allCitations.reduce((a, b) => a + b, 0);
      const avgCitations = totalPubs > 0 ? (totalCitations / totalPubs).toFixed(1) : 0;

      // h-index
      const sortedCitations = [...allCitations].sort((a, b) => b - a);
      let hIndex = 0;
      for (let i = 0; i < sortedCitations.length; i++) {
          if (sortedCitations[i] >= i + 1) hIndex = i + 1;
          else break;
      }

      // i10-index
      const i10Index = allCitations.filter(c => c >= 10).length;

      // Impact Factor (Parsing)
      const impactFactors = publications
        .map(p => {
             const match = p.impactFactor?.match(/[\d.]+/);
             return match ? parseFloat(match[0]) : 0;
        })
        .filter(ifVal => ifVal > 0);
      
      const avgImpactFactor = impactFactors.length > 0 
          ? (impactFactors.reduce((a, b) => a + b, 0) / impactFactors.length).toFixed(1)
          : "N/A";
      
      const maxImpactFactor = impactFactors.length > 0 
          ? Math.max(...impactFactors).toFixed(1) 
          : "N/A";

      // First Author Count (Heuristic: Check if user's last name or initial is first)
      const userLastName = profile.name.split(' ').pop() || "";
      const firstAuthorCount = publications.filter(p => {
          if(p.authors.length === 0) return false;
          const first = p.authors[0];
          return first.includes(userLastName) || first.includes(profile.initials);
      }).length;

      return {
          totalPubs,
          totalCitations,
          avgCitations,
          hIndex,
          i10Index,
          avgImpactFactor,
          maxImpactFactor,
          firstAuthorCount
      };
  }, [publications, profile.name, profile.initials]);

  // --- Graph Data Preparation ---
  
  // 1. Yearly Trends (Pubs & Citations)
  const yearlyData = useMemo(() => {
      const data: Record<string, { year: string, pubs: number, citations: number, cumulativePubs: number }> = {};
      
      // Sort pubs by year
      const sortedPubs = [...publications].sort((a, b) => a.year - b.year);
      const years = Array.from(new Set(sortedPubs.map(p => p.year))).sort();
      
      if (years.length === 0) return [];

      let runningTotalPubs = 0;

      // Initialize all years in range
      const minYear = years[0];
      const maxYear = years[years.length - 1];

      for (let y = minYear; y <= maxYear; y++) {
          data[y.toString()] = { year: y.toString(), pubs: 0, citations: 0, cumulativePubs: 0 };
      }

      sortedPubs.forEach(p => {
          const y = p.year.toString();
          if (data[y]) {
              data[y].pubs += 1;
              data[y].citations += p.citations;
          }
      });

      // Calculate cumulative
      Object.keys(data).sort().forEach(y => {
          runningTotalPubs += data[y].pubs;
          data[y].cumulativePubs = runningTotalPubs;
      });

      return Object.values(data).sort((a, b) => Number(a.year) - Number(b.year));
  }, [publications]);

  // 2. Publication Types (Pie)
  const typeData = useMemo(() => {
      const counts: Record<string, number> = {};
      publications.forEach(p => {
          counts[p.type] = (counts[p.type] || 0) + 1;
      });
      return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
  }, [publications]);

  // 3. Impact Factor vs Citations (Scatter)
  const impactData = useMemo(() => {
      return publications
          .filter(p => p.impactFactor && p.citations !== undefined)
          .map(p => {
               const ifVal = parseFloat(p.impactFactor?.match(/[\d.]+/)?.[0] || "0");
               return {
                   name: p.title,
                   x: ifVal, // Impact Factor
                   y: p.citations, // Citations
                   z: 1 // Size
               };
          })
          .filter(d => d.x > 0);
  }, [publications]);

  // 4. Research Areas / Topics (From Tags)
  const topicData = useMemo(() => {
      const counts: Record<string, number> = {};
      publications.forEach(p => {
          if (p.tags && Array.isArray(p.tags)) {
              p.tags.forEach(tag => {
                  // Normalize tag key
                  const key = tag.trim();
                  if (key) {
                    counts[key] = (counts[key] || 0) + 1;
                  }
              });
          }
      });
      
      return Object.keys(counts)
          .map(k => ({ name: k, value: counts[k] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8); // Top 8 topics
  }, [publications]);


  const COLORS = ['#D4AF37', '#0A1931', '#38BDF8', '#94A3B8', '#F472B6', '#10B981', '#6366F1', '#EC4899'];

  const KPICard = ({ title, value, sub, icon: Icon }: any) => (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-start justify-between group hover:border-academic-gold/50 transition-colors">
          <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{title}</p>
              <h3 className="text-3xl font-serif font-bold text-academic-navy dark:text-white mb-1">{value}</h3>
              {sub && <p className="text-xs text-academic-gold font-medium">{sub}</p>}
          </div>
          <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-gray-400 group-hover:text-academic-gold transition-colors">
              <Icon size={20} />
          </div>
      </div>
  );

  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard 
                title="h-index" 
                value={stats.hIndex} 
                sub={`i10-index: ${stats.i10Index}`}
                icon={Hash} 
            />
            <KPICard 
                title="Total Citations" 
                value={stats.totalCitations} 
                sub={`${stats.avgCitations} avg / paper`}
                icon={TrendingUp} 
            />
            <KPICard 
                title="Total Publications" 
                value={stats.totalPubs} 
                sub={`${stats.firstAuthorCount} as First Author`}
                icon={BookOpen} 
            />
            <KPICard 
                title="Max Impact Factor" 
                value={stats.maxImpactFactor} 
                sub={`Avg IF: ${stats.avgImpactFactor}`}
                icon={Award} 
            />
        </div>

        {/* Top Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Trend Chart (Spans 2 cols) */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-academic-navy dark:text-white">Research Productivity & Impact</h4>
                    <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-academic-navy dark:bg-white rounded-sm"></span> Publications</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-academic-gold rounded-full"></span> Citations</span>
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#D4AF37" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar yAxisId="left" dataKey="pubs" fill="#0A1931" radius={[4, 4, 0, 0]} barSize={30} className="dark:fill-white" />
                            <Line yAxisId="right" type="monotone" dataKey="citations" stroke="#D4AF37" strokeWidth={3} dot={{r:4, fill: '#D4AF37', strokeWidth: 0}} activeDot={{r:6}} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Type Distribution */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <h4 className="font-bold text-academic-navy dark:text-white mb-6">Publication Types</h4>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={typeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {typeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Middle Section: Research Areas & Impact Scatter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Research Areas (Donut Chart) */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <h4 className="font-bold text-academic-navy dark:text-white mb-6 flex items-center gap-2">
                    <Tag size={20} className="text-academic-gold"/> Top Research Areas
                </h4>
                <div className="h-[300px] w-full">
                    {topicData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topicData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {topicData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 italic">
                            No research topics found. Add tags to your publications.
                        </div>
                    )}
                </div>
            </div>

            {/* Impact Factor vs Citations */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <h4 className="font-bold text-academic-navy dark:text-white mb-2">Impact Factor vs. Citations</h4>
                <p className="text-xs text-gray-500 mb-6">Correlation between journal impact factor and paper citations.</p>
                <div className="h-[250px] w-full">
                    {impactData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                                <XAxis type="number" dataKey="x" name="Impact Factor" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Impact Factor', position: 'insideBottom', offset: -5, fill: '#94a3b8', fontSize: 10 }} />
                                <YAxis type="number" dataKey="y" name="Citations" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Citations', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-academic-navy text-white text-xs p-2 rounded shadow-lg">
                                                <p className="font-bold mb-1">{data.name}</p>
                                                <p>IF: {data.x}</p>
                                                <p>Citations: {data.y}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />
                                <Scatter name="Publications" data={impactData} fill="#D4AF37" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                            Not enough data with Impact Factors.
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Bottom Section: Cumulative Growth */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-academic-navy dark:text-white mb-6">Cumulative Research Output</h4>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={yearlyData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                            <linearGradient id="colorPubs" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0A1931', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Area type="monotone" dataKey="cumulativePubs" stroke="#38BDF8" fillOpacity={1} fill="url(#colorPubs)" strokeWidth={3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};
