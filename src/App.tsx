/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mic,
  Play,
  Pause,
  Video,
  Volume2,
  History,
  Award,
  UserPlus,
  ClipboardCheck,
  Download,
  Check,
  Settings,
  Layout,
  AlertTriangle,
  Info,
  ExternalLink,
  ChevronRight,
  Menu,
  Home,
  Monitor,
  Phone,
  LogOut,
  Clock,
  Sparkles,
  RefreshCw,
  Bell,
  Heart,
  MessageSquare,
  X,
  Share2,
  Send,
  MoreHorizontal,
  Paperclip,
  Smile,
  Briefcase,
  Plus,
  Trophy,
  Calendar,
  Users,
  Target,
  Zap, 
  Shield, 
  Cpu, 
  Terminal, 
  Layers, 
  Activity,
  ArrowRight,
  Code,
  User,
  Search,
  Filter,
  CheckCircle2,
  Github
} from "lucide-react";

type MicroLabelProps = {
  children: React.ReactNode;
};


const TeamAgreementBuilder = () => {
  const [agreement, setAgreement] = useState({
    title: "Project Phoenix Sprint",
    responsibilities: [
      { id: 1, task: "Cloud Infrastructure & CI/CD", owner: "Timur Akhmetov", category: "DevOps" },
      { id: 2, task: "Backend API and database", owner: "Daniyar Sadykov", category: "Backend" },
      { id: 3, task: "Motion Design & UI Components", owner: "Aruzhan Bekova", category: "Design" },
      { id: 4, task: "Pitch Deck & Presentation", owner: "Elena Kim", category: "Copy" },
      { id: 5, task: "Quality Assurance & Testing", owner: "", category: "Dev" },
    ]
  });

  const categories = [
    { name: "Dev", color: "#6366F1", icon: <Code className="w-4 h-4" /> },
    { name: "DevOps", color: "#10B981", icon: <Cpu className="w-4 h-4" /> },
    { name: "Design", color: "#F59E0B", icon: <Layers className="w-4 h-4" /> },
    { name: "Copy", color: "#EC4899", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const toggleOwner = (taskId: number) => {
    setAgreement(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map(r => 
        r.id === taskId ? { ...r, owner: r.owner ? "" : "Daniyar Sadykov" } : r
      )
    }));
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-brand-bg p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-primary/20 rounded-xl">
                 <ClipboardCheck className="w-6 h-6 text-brand-primary" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight ">Team Agreement Builder</h1>
            </div>
            <p className="text-brand-text-dim text-sm font-mono tracking-widest pl-11">Agree on who does what before the clock starts</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-brand-border rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-brand-primary/50 transition-all">
              <Download className="w-4 h-4" /> Download Kit
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
              <Send className="w-4 h-4" /> Team Sync
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checklist Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-surface/50 border border-brand-border rounded-[32px] p-8 space-y-8 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold text-white">Action items</h2>
                 <div className="flex items-center gap-2 text-[10px] font-mono text-brand-secondary uppercase bg-brand-bg px-3 py-1 rounded-full border border-brand-border">
                    <Check className="w-3 h-3" /> 4 of 5 done
                 </div>
              </div>

              <div className="space-y-4">
                {agreement.responsibilities.map((item) => (
                  <motion.div 
                    key={item.id}
                    onClick={() => toggleOwner(item.id)}
                    whileHover={{ x: 8 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      item.owner ? 'bg-brand-primary/5 border-brand-primary/30' : 'bg-brand-bg border-brand-border hover:border-brand-primary/20'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.owner ? 'bg-brand-primary border-brand-primary' : 'border-brand-border'
                    }`}>
                      {item.owner && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                       <span className={`text-sm font-medium ${item.owner ? 'text-white' : 'text-white/60'}`}>{item.task}</span>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-brand-bg border border-brand-border rounded text-brand-secondary">
                             {item.category}
                          </span>
                       </div>
                    </div>
                    {item.owner && (
                      <div className="flex items-center gap-3 pr-2">
                        <span className="text-[10px] font-mono text-brand-primary font-bold uppercase">{item.owner}</span>
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center text-[10px] font-bold">
                           {item.owner[0]}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Infographic Visualization */}
          <div className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-[40px] p-8 aspect-square relative flex flex-col items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
               
               {/* Central Radar-like Viz */}
               <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-brand-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />
                  <div className="absolute inset-[20%] border border-dashed border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
                  
                  <div className="z-10 bg-brand-bg border-2 border-brand-primary p-4 rounded-3xl text-center">
                    <div className="text-[10px] font-mono text-brand-primary font-bold mb-1">TEAM</div>
                    <div className="text-sm font-bold text-white ">PHOENIX</div>
                  </div>

                  {categories.map((cat, i) => {
                    const angle = (i * 360) / categories.length;
                    const radius = 120;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <motion.div 
                        key={cat.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="absolute flex flex-col items-center gap-2"
                        style={{ x, y }}
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2" style={{ backgroundColor: `${cat.color}20`, borderColor: cat.color }}>
                          <span style={{ color: cat.color }}>{cat.icon}</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-white uppercase tracking-widest">{cat.name}</span>
                        {agreement.responsibilities.filter(r => r.category === cat.name && r.owner).length > 0 && (
                          <div className="flex -space-x-2">
                            <div className="w-5 h-5 rounded-full bg-brand-primary border border-brand-bg" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
               </div>

               <div className="absolute bottom-8 left-8 right-8 text-center pt-6 border-t border-white/5">
                  <div className="text-[10px] font-mono text-brand-secondary font-bold uppercase mb-2">Roles assigned</div>
                  <div className="text-xs text-brand-text-dim px-4">Work is split between 4 people. Balance: <span className="text-brand-primary font-bold">OPTIMAL</span></div>
               </div>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/50">
                     <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase">Heads up</div>
                    <div className="text-[10px] text-brand-text-dim italic">1 unassigned task remaining</div>
                  </div>
               </div>
               <button className="px-4 py-2 bg-brand-bg border border-brand-border rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all">Clear Nodes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoiceWaveform = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const bars = [12, 18, 14, 22, 10, 16, 20, 14, 18, 12, 16, 24, 18, 14, 10, 16, 20, 12, 18, 14];

  return (
    <div className="flex items-center gap-3 bg-brand-bg/40 border border-brand-border rounded-2xl px-4 py-2.5 group/voice">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
      
      <div className="flex items-center gap-[2px] h-6 px-1">
        {bars.map((h, i) => (
          <motion.div 
            key={i}
            animate={isPlaying ? {
              height: [h, h * 0.5, h],
            } : { height: h }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className={`w-[2px] rounded-full ${isPlaying ? 'bg-brand-primary' : 'bg-white/20'}`}
          />
        ))}
      </div>
      
      <div className="flex flex-col">
        <span className="text-[9px] font-mono font-bold text-brand-secondary leading-none uppercase">Voice Intro</span>
        <span className="text-[10px] font-mono text-white/40 leading-none">0:12</span>
      </div>
    </div>
  );
};

const VideoPitch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 rounded-full bg-brand-primary p-[2px] cursor-pointer relative group"
      >
        <div className="w-full h-full rounded-full bg-brand-bg flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-brand-primary/40 transition-colors" />
          <Video className="w-5 h-5 text-white relative z-10" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-bg animate-pulse" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-[320px] aspect-[9/16] bg-brand-surface rounded-[40px] overflow-hidden border-2 border-brand-primary/30 shadow-2xl shadow-brand-primary/20"
            >
              {/* Dummy Video Preview */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              </div>
              
              <div className="absolute top-6 left-6 flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
                    <Mic className="w-3 h-3 text-white" />
                 </div>
                 <div className="px-3 py-1 bg-brand-primary/20 backdrop-blur-md rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                    Live Pitch
                 </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-10 left-6 right-6 space-y-4">
                 <div className="space-y-1">
                    <h4 className="text-xl font-bold text-white tracking-tight">"Ready to scale your UI"</h4>
                    <p className="text-xs text-white/60">Daniyar Sadykov • 15sec Intro</p>
                 </div>
                 
                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, ease: "linear" }}
                      className="h-full bg-brand-primary"
                    />
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- NEW COMPONENTS FOR POLISH ---

const Toast = ({ message, type = 'info', onClose }: { message: string, type?: 'success' | 'error' | 'info', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-xl border ${
        type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
        type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
        'bg-brand-primary/20 border-brand-primary/30 text-brand-primary'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
        {type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
         type === 'error' ? <AlertTriangle className="w-4 h-4" /> : 
         <Info className="w-4 h-4" />}
      </div>
      <span className="text-sm font-bold tracking-tight">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const EmptySearchIllustration = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
  >
    <div className="relative">
      <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full" />
      <div className="relative w-32 h-32 rounded-full border-2 border-brand-border bg-brand-bg flex items-center justify-center overflow-hidden">
         <Search className="w-12 h-12 text-brand-text-dim/40" />
         <motion.div 
           animate={{ x: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
           transition={{ repeat: Infinity, duration: 4 }}
           className="absolute top-1/4 right-1/4 w-1 h-1 bg-brand-primary rounded-full"
         />
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white uppercase tracking-tight">Nobody matches these filters</h3>
      <p className="text-sm text-brand-text-dim max-w-xs font-mono">
        Try a different role or level.
      </p>
    </div>
    <button className="px-6 py-2.5 bg-brand-surface border border-brand-border rounded-xl text-xs font-bold text-brand-primary uppercase tracking-widest hover:border-brand-primary transition-all">
      Reset Parameters
    </button>
  </motion.div>
);

const PullToRefreshIndicator = ({ isRefreshing }: { isRefreshing: boolean }) => (
  <AnimatePresence>
    {isRefreshing && (
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 60, opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="flex items-center justify-center w-full overflow-hidden"
      >
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
         >
           <RefreshCw className="w-5 h-5 text-brand-primary" />
         </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- END NEW COMPONENTS ---

const FuturisticCard = ({ children, className = "", delay = 0, isPanic = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -4, borderColor: isPanic ? "rgba(239, 68, 68, 0.6)" : "rgba(99, 102, 241, 0.4)" }}
    className={`bg-brand-surface border rounded-[24px] p-5 shadow-lg shadow-brand-primary/5 transition-all relative overflow-hidden group ${
      isPanic ? 'border-red-500/50 shadow-red-500/20' : 'border-brand-border shadow-brand-primary/5'
    } ${className}`}
  >
    {isPanic && (
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-red-500/10 pointer-events-none"
      />
    )}
    <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-16 -mt-16 group-hover:opacity-100 transition-colors ${
      isPanic ? 'bg-red-500/20' : 'bg-brand-primary/5 group-hover:bg-brand-primary/10'
    }`} />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const UserSkeleton = () => (
  <div className="bg-brand-surface border border-brand-border rounded-[24px] p-5 space-y-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-brand-bg/50" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-1/3 bg-brand-bg/50 rounded" />
        <div className="h-3 w-1/2 bg-brand-bg/50 rounded opacity-60" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 w-full bg-brand-bg/50 rounded opacity-30" />
      <div className="h-3 w-4/5 bg-brand-bg/50 rounded opacity-30" />
    </div>
    <div className="flex gap-2 pt-2">
      <div className="h-6 w-16 bg-brand-bg/50 rounded-full" />
      <div className="h-6 w-16 bg-brand-bg/50 rounded-full" />
    </div>
  </div>
);

const MicroLabel = ({ children }: MicroLabelProps) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-secondary/80 font-bold">
    {children}
  </span>
);

const MOCK_USERS = [
  { id: 1, name: "Daniyar Sadykov", role: "Senior Flutter Dev", stack: "Dart, Firebase", level: "Senior", bio: "Flutter apps for two startups in Almaty. Likes clean state management.", status: "online" },
  { id: 2, name: "Aruzhan Bekova", role: "UI/UX Designer", stack: "Figma, Framer", level: "Middle", bio: "Designs in Figma, tests with real users, hates lorem ipsum.", status: "online" },
  { id: 3, name: "Timur Akhmetov", role: "Backend Architect", stack: "Go, Kubernetes", level: "Lead", bio: "Go backends and Postgres. Two hackathon finals in 2025.", status: "offline" },
  { id: 4, name: "Elena Kim", role: "Web Enthusiast", stack: "React, Three.js", level: "Senior", bio: "Three.js and React. Makes things load fast on school laptops.", status: "online" },
  { id: 5, name: "Dias Nurlanov", role: "Mobile Engineer", stack: "Kotlin, Swift", level: "Middle", bio: "Native Android and iOS. Looking for a team for the next hackathon.", status: "online" },
  { id: 6, name: "Inkar Seitkali", role: "AI Researcher", stack: "Python, PyTorch", level: "PhD", bio: "ML student, works on recommendation models in PyTorch.", status: "offline" },
  { id: 7, name: "Zhanibek Omarov", role: "Frontend Dev", stack: "Next.js, Tailwind", level: "Senior", bio: "Next.js and Tailwind. Checks every page with a screen reader.", status: "online" },
  { id: 8, name: "Lana Tsoi", role: "DevOps Lead", stack: "AWS, Terraform", level: "Expert", bio: "Sets up CI, Docker and AWS so the team can demo on time.", status: "online" },
  { id: 9, name: "Raiymbek Ali", role: "Brand Identity", stack: "Adobe Suite", level: "Senior", bio: "Logos, pitch decks and slides that judges remember.", status: "offline" },
  { id: 10, name: "Kenzhe Bolat", role: "Blockchain Dev", stack: "Solidity, Rust", level: "Lead", bio: "Solana and Rust. Built two hackathon dApps on devnet.", status: "online" },
];

const FILTERS = [
  { id: 'all', label: 'All Roles' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'design', label: 'Design' },
  { id: 'backend', label: 'Backend' },
  { id: 'senior', label: 'Senior' },
];

const MOCK_EVENTS = [
  { id: 1, title: "Global Flutter Challenge", date: "Oct 12-14, 2026", prize: "$50,000", tags: ["Expert", "Mobile"], status: "upcoming", logo: "GF" },
  { id: 2, title: "AI Revolution Hack", date: "Nov 05, 2026", prize: "$25,000", tags: ["Middle", "Web3"], status: "upcoming", logo: "AR" },
  { id: 3, title: "Cybersecurity Sprint", date: "Sept 10, 2026", prize: "$15,000", tags: ["Senior", "Network"], status: "past", logo: "CS" },
  { id: 4, title: "GreenTech Hackathon", date: "Dec 20-22, 2026", prize: "$100,000", tags: ["Hard", "Energy"], status: "upcoming", logo: "GT" },
];

const EventCard = ({ event }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-brand-surface border border-brand-border rounded-[28px] p-6 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-brand-primary/40 transition-all"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-all" />
    
    <div className="w-16 h-16 shrink-0 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center text-xl font-bold text-brand-primary font-mono shadow-inner">
      {event.logo}
    </div>

    <div className="flex-1 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
            <span className="text-xs font-mono text-brand-secondary font-bold tracking-widest">{event.date}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{event.title}</h3>
        </div>
        <div className="flex sm:flex-col items-end gap-1">
          <span className="text-xs font-mono text-brand-text-dim uppercase tracking-wider">Prize Pool</span>
          <span className="text-lg font-bold text-green-400 tracking-tight">{event.prize}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {event.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-7 h-7 rounded-full border-2 border-brand-surface bg-brand-bg flex items-center justify-center overflow-hidden">
               <User className="w-3.5 h-3.5 text-white/40" />
             </div>
           ))}
           <div className="text-[9px] font-mono text-brand-text-dim ml-4 flex items-center">
             +12 looking for team
           </div>
        </div>
        <button className="px-5 py-2.5 bg-brand-surface border border-brand-primary/20 hover:border-brand-primary rounded-2xl text-xs font-bold text-brand-primary flex items-center gap-2 transition-all group/btn active:scale-95 shadow-lg shadow-brand-primary/5 cursor-pointer">
          <Users className="w-4 h-4" />
          Find Team
        </button>
      </div>
    </div>
  </motion.div>
);

const EventsView = () => {
  const [status, setStatus] = useState<'upcoming' | 'past'>('upcoming');
  const [search, setSearch] = useState('');

  const filteredEvents = MOCK_EVENTS.filter(e => 
    e.status === status && 
    (e.title.toLowerCase().includes(search.toLowerCase()) || search === '')
  );

  return (
    <div className="flex-1 overflow-y-auto bg-brand-bg">
      <header className="px-8 py-10 space-y-8 bg-gradient-to-b from-brand-primary/5 to-transparent border-b border-brand-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-brand-primary" />
              <MicroLabel>Arena Beta</MicroLabel>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Hackathon <span className="text-brand-primary">Explorer</span></h1>
            <p className="text-brand-text-dim text-sm font-medium">Connect, build, and win global prizes with the best squads.</p>
          </div>
          
          <div className="flex bg-brand-surface p-1 rounded-2xl border border-brand-border shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest shadow-inner">
             <button 
               onClick={() => setStatus('upcoming')}
               className={`px-6 py-3 rounded-xl transition-all cursor-pointer ${status === 'upcoming' ? 'bg-brand-primary text-white' : 'text-white/40 hover:text-white'}`}
             >
               Upcoming
             </button>
             <button 
               onClick={() => setStatus('past')}
               className={`px-6 py-3 rounded-xl transition-all cursor-pointer ${status === 'past' ? 'bg-brand-primary text-white' : 'text-white/40 hover:text-white'}`}
             >
               Past
             </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary group-focus-within:animate-pulse" />
          <input 
            type="text" 
            placeholder="Search by event title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border rounded-[24px] py-6 pl-16 pr-6 outline-none text-white font-mono text-sm placeholder:text-brand-text-dim focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all focus:"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-3 text-brand-secondary/40">
             <Target className="w-4 h-4" />
             <div className="w-px h-4 bg-brand-border" />
             <Activity className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 gap-6 pb-20">
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className="py-20 text-center border-2 border-dashed border-brand-border rounded-[32px]"
              >
                <div className="w-16 h-16 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center mx-auto mb-4 text-brand-text-dim">
                   <Target className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-white/60 font-mono tracking-widest uppercase">No Events Found</h3>
                <p className="text-xs text-brand-text-dim mt-2">Try adjusting your filters or search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const SOSWidget = ({ time = "23:59:59", message = "Need a Web3 pro ASAP!" }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-red-500/10 border border-red-500/30 rounded-[28px] p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20">
         <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        <div className="shrink-0 space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Clock className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">Time Remaining</span>
          </div>
          <div className="text-3xl font-mono font-bold text-white tracking-tight">
            {time}
          </div>
        </div>
        <div className="w-px h-12 bg-red-500/20 hidden sm:block" />
        <div className="flex-1 space-y-2">
           <div className="flex items-center gap-2">
             <div className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded uppercase tracking-tight">Panic SOS</div>
             <MicroLabel>Broadcast Message</MicroLabel>
           </div>
           <p className="text-sm font-bold text-white italic group-hover:text-red-400 transition-colors leading-relaxed">
             "{message}"
           </p>
        </div>
        <button className="px-6 py-3 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
          <Zap className="w-4 h-4" />
          Assist Now
        </button>
      </div>
    </motion.div>
  );
};

const AIMatchmakingView = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  const startSearch = () => {
    setIsSearching(true);
    setMatches([]);
    setTimeout(() => {
      setIsSearching(false);
      setMatches([
        { 
          id: 1, 
          name: "Aruzhan Bekova", 
          percentage: 98, 
          role: "UX Architect",
          reason: "You both have 3+ years in Flutter and have built Firebase-driven analytics. Her design focus perfectly fills your architectural style.",
          tags: ["Firebase", "Clean Arch", "Figma"]
        },
        { 
          id: 2, 
          name: "Timur Akhmetov", 
          percentage: 92, 
          role: "Backend Specialist",
          reason: "Both of you are active in the Rust-Dart FFI community. He solves your need for low-level performance optimization.",
          tags: ["Rust", "FFI", "PostgreSQL"]
        }
      ]);
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-brand-bg relative">
      <header className="px-8 py-10 border-b border-brand-border bg-gradient-to-r from-brand-primary/10 to-transparent">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              <MicroLabel>Team matching</MicroLabel>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Find <span className="text-brand-primary">teammates</span></h1>
          </div>
          <button 
            onClick={startSearch}
            disabled={isSearching}
            className="flex items-center gap-2 px-6 py-3 bg-brand-surface border border-brand-primary/20 hover:border-brand-primary rounded-2xl text-xs font-bold font-mono uppercase tracking-widest text-brand-primary transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
            Find matches
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-12 flex flex-col items-center">
        {isSearching || matches.length === 0 ? (
          <div className="relative w-80 h-80 flex items-center justify-center my-12">
            {/* Pulsating Sphere */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute inset-0 bg-brand-primary/20 rounded-full blur-[60px]"
            />
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                scale: { repeat: Infinity, duration: 2 }
              }}
              className="relative z-10 w-48 h-48 border-2 border-dashed border-brand-primary/40 rounded-full flex items-center justify-center"
            >
              <div className="w-40 h-40 border-2 border-brand-primary/20 rounded-full flex items-center justify-center animate-ping" />
              <div className="absolute w-32 h-32 bg-brand-primary rounded-full blur-xl opacity-40" />
              <Sparkles className="w-12 h-12 text-white relative z-20" />
            </motion.div>

            {/* Radar Rings */}
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ 
                  scale: [1, 2],
                  opacity: [0.5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5, 
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute w-40 h-40 border border-brand-primary/30 rounded-full"
              />
            ))}

            <div className="absolute -bottom-20 text-center">
               <h3 className="text-sm font-bold font-mono tracking-[0.2em] text-brand-primary uppercase animate-pulse">
                 {isSearching ? 'Looking for people...' : 'Ready'}
               </h3>
               <p className="text-[10px] text-brand-text-dim mt-2 uppercase tracking-widest">Matches by role, stack and level</p>
            </div>
          </div>
        ) : null}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-8 pb-32">
          <AnimatePresence>
            {matches.map((match, idx) => (
              <motion.div 
                key={match.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-brand-surface border border-brand-border rounded-[40px] p-8 space-y-6 relative overflow-hidden group hover:border-brand-primary/40 transition-all shadow-xl shadow-brand-primary/5"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -mr-16 -mt-16" />
                
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[24px] bg-brand-bg border border-brand-border p-1">
                       <div className="w-full h-full rounded-[20px] bg-brand-primary flex items-center justify-center text-xl font-bold">
                         {match.name[0]}
                       </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{match.name}</h3>
                      <p className="text-xs text-brand-primary font-mono font-bold uppercase tracking-widest">{match.role}</p>
                    </div>
                  </div>
                  <div className="bg-brand-primary/10 border border-brand-primary/30 px-4 py-2 rounded-2xl">
                    <span className="text-lg font-bold text-brand-primary font-mono tracking-tight">{match.percentage}%</span>
                    <span className="text-[8px] block font-mono text-brand-primary uppercase font-bold text-center">Match</span>
                  </div>
                </div>

                <div className="bg-brand-bg/50 border border-brand-border rounded-[24px] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-brand-primary/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2.5 h-2.5 text-brand-primary" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.1em]">AI Insights</span>
                  </div>
                  <p className="text-xs text-brand-text-dim leading-relaxed font-medium italic">
                    "{match.reason}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {match.tags.map((tag: any) => (
                    <span key={tag} className="px-3 py-1 bg-brand-bg border border-brand-border rounded-lg text-[9px] font-mono font-bold text-white/40 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-4 bg-brand-surface border border-brand-primary/20 hover:border-brand-primary hover:bg-brand-primary/5 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-brand-primary transition-all flex items-center justify-center gap-2 group/btn cursor-pointer">
                  Initialize Connection
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const MatchOverlay = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/80 backdrop-blur-xl p-6 overflow-hidden"
  >
    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight,
          opacity: 0 
        }}
        animate={{ 
          y: [null, Math.random() * -500],
          opacity: [0, 0.4, 0],
          scale: [0, 1, 0]
        }}
        transition={{ 
          duration: Math.random() * 5 + 3, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-1 h-1 bg-brand-primary rounded-full"
      />
    ))}

    <motion.div 
      initial={{ scale: 0.8, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 12 }}
      className="max-w-md w-full bg-brand-surface border border-brand-primary/30 rounded-[40px] p-10 text-center relative shadow-2xl shadow-brand-primary/20"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-brand-text-dim hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-brand-bg border-2 border-brand-primary p-1 overflow-hidden">
            <div className="w-full h-full rounded-[28px] bg-brand-primary flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-2 -right-2 bg-brand-primary p-2 rounded-full border-4 border-brand-surface"
          >
            <Heart className="w-4 h-4 text-white fill-white" />
          </motion.div>
        </div>
        
        <Zap className="w-6 h-6 text-brand-secondary animate-pulse" />

        <div className="w-24 h-24 rounded-[32px] bg-brand-bg border-2 border-brand-secondary p-1 overflow-hidden">
           <div className="w-full h-full rounded-[28px] bg-brand-surface flex items-center justify-center">
              <User className="w-10 h-10 text-brand-secondary" />
           </div>
        </div>
      </div>

      <div className="space-y-3 mb-10">
        <h2 className="text-4xl font-bold tracking-tight text-white">Team Found!</h2>
        <p className="text-brand-text-dim text-sm leading-relaxed">
          You and <span className="text-white font-bold">Aruzhan Bekova</span> just matched. 
          Ready to build something amazing together?
        </p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Message Sarah
        </button>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-brand-bg border border-brand-border text-brand-text-dim font-bold rounded-2xl hover:text-white transition-all cursor-pointer"
        >
          Keep Browsing
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const NotificationsView = ({ onMatchDemo }: { onMatchDemo: () => void }) => {
  const NOTIFICATIONS = [
    { id: 1, type: 'request', user: 'Timur Akhmetov', content: 'requested to join StudyBuddy Mobile', time: '2m ago', active: true },
    { id: 2, type: 'like', user: 'Aruzhan Bekova', content: 'liked your Terminal Stack project', time: '15m ago' },
    { id: 3, type: 'system', user: 'System', content: 'Your verification was approved!', time: '1h ago' },
    { id: 4, type: 'match', user: 'Aruzhan Bekova', content: 'Match Found! Click to see.', time: 'Just now', isMatch: true },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-brand-bg">
      <header className="px-8 py-10 border-b border-brand-border bg-gradient-to-b from-brand-secondary/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-brand-secondary" />
            <MicroLabel>Inbox Status: Active</MicroLabel>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Notifications</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-8 py-10 space-y-4">
        {NOTIFICATIONS.map((notif) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-5 rounded-[24px] border transition-all cursor-pointer hover:border-brand-primary/30 ${
              notif.isMatch ? 'bg-brand-primary/10 border-brand-primary shadow-lg shadow-brand-primary/10' : 'bg-brand-surface border-brand-border'
            }`}
            onClick={notif.isMatch ? onMatchDemo : undefined}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                notif.type === 'request' ? 'bg-brand-primary/20 text-brand-primary' :
                notif.type === 'like' ? 'bg-brand-secondary/20 text-brand-secondary' :
                notif.type === 'match' ? 'bg-brand-primary text-white' :
                'bg-brand-surface border border-brand-border text-brand-text-dim'
              }`}>
                {notif.type === 'request' && <Share2 className="w-5 h-5" />}
                {notif.type === 'like' && <Heart className="w-5 h-5" />}
                {notif.type === 'system' && <Zap className="w-5 h-5" />}
                {notif.type === 'match' && <Users className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-white">{notif.user}</h4>
                  <span className="text-[10px] font-mono text-brand-text-dim">{notif.time}</span>
                </div>
                <p className="text-xs text-brand-text-dim leading-relaxed">
                  {notif.content}
                </p>
                {notif.type === 'request' && (
                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded-lg shadow-md shadow-brand-primary/20">Accept</button>
                    <button className="px-4 py-1.5 bg-brand-bg border border-brand-border text-white/40 text-[10px] font-bold uppercase rounded-lg">Ignore</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ChatView = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const CONTACTS = [
    { id: 1, name: "Aruzhan Bekova", lastMsg: "Let's sync up on the bento grid...", status: "online", time: "12:45" },
    { id: 2, name: "Timur Akhmetov", lastMsg: "The backend is ready for migration.", status: "offline", time: "10:20" },
    { id: 3, name: "Elena Kim", lastMsg: "Check out this Three.js experiment!", status: "online", time: "Yesterday" },
  ];

  const MESSAGES = [
    { id: 1, sender: "Aruzhan Bekova", text: "Hey! I saw your recent projects. Really impressive work on StudyBuddy.", time: "12:10 PM", type: "text" },
    { id: 2, sender: "me", text: "Thanks Sarah! It was a tough challenge but we managed to optimize the state flow.", time: "12:12 PM", type: "text" },
    { 
      id: 3, 
      sender: "Aruzhan Bekova", 
      type: "invite", 
      projectName: "Eco Shymkent Dashboard", 
      role: "Lead Architect",
      time: "12:15 PM"
    },
    { id: 4, sender: "me", text: "Wow, that sounds interesting. Tell me more about the goals.", time: "12:16 PM", type: "text" },
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-brand-bg">
      {/* Dialogs List */}
      <div className="w-80 border-r border-brand-border flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand-border">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-dim" />
            <input 
              type="text" 
              placeholder="Search dialogues..." 
              className="w-full bg-brand-surface border border-brand-border rounded-xl py-2 pl-10 pr-4 text-xs font-mono outline-none focus:border-brand-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`p-4 flex items-center gap-4 cursor-pointer transition-all border-l-2 ${
                activeChat === contact.id 
                ? 'bg-brand-primary/5 border-brand-primary' 
                : 'border-transparent hover:bg-brand-surface/50'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary font-bold">
                  {contact.name[0]}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-brand-bg rounded-full ${
                  contact.status === 'online' ? 'bg-green-500' : 'bg-zinc-600'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-bold text-white truncate">{contact.name}</h4>
                  <span className="text-[10px] font-mono text-brand-text-dim">{contact.time}</span>
                </div>
                <p className="text-xs text-brand-text-dim truncate">{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-16 border-b border-brand-border px-6 flex items-center justify-between shrink-0 bg-brand-bg/50 backdrop-blur-md">
           <div className="flex items-center gap-4">
              <div className="md:hidden w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary font-bold">
                S
              </div>
              <div>
                 <h3 className="text-sm font-bold text-white">Aruzhan Bekova</h3>
                 <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-brand-secondary font-bold">
                    <span className="w-1 h-1 bg-green-500 rounded-full" />
                    Good match
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4 text-brand-text-dim">
              <button className="hover:text-white transition-colors cursor-pointer"><Search className="w-4 h-4" /></button>
              <button className="hover:text-white transition-colors cursor-pointer"><MoreHorizontal className="w-4 h-4" /></button>
           </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col no-scrollbar">
           {MESSAGES.map((msg) => (
             <div 
               key={msg.id} 
               className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
             >
               {msg.type === 'invite' ? (
                 <div className="bg-brand-surface border border-brand-primary/30 rounded-[32px] p-6 max-w-sm w-full space-y-4 shadow-xl shadow-brand-primary/10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-brand-primary animate-pulse" />
                       </div>
                       <div>
                          <MicroLabel>Team Initiative</MicroLabel>
                          <h4 className="text-sm font-bold text-white">Invite: {msg.projectName}</h4>
                       </div>
                    </div>
                    <p className="text-[11px] text-brand-text-dim leading-relaxed">
                       You have been selected for the <span className="text-brand-secondary">{msg.role}</span> position. 
                       Your stack compatibility is rated at <span className="text-green-400">98%</span>.
                    </p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                       <button className="py-2.5 bg-brand-primary text-white text-[10px] font-bold uppercase rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
                          Accept
                       </button>
                       <button className="py-2.5 bg-brand-bg border border-brand-border text-white/60 text-[10px] font-bold uppercase rounded-xl hover:text-white transition-all">
                          Decline
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm relative group ${
                   msg.sender === 'me' 
                   ? 'bg-brand-primary text-white rounded-tr-none' 
                   : 'bg-brand-surface border border-brand-border text-white/90 rounded-tl-none'
                 }`}>
                   {msg.text}
                   <div className={`absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono whitespace-nowrap ${
                     msg.sender === 'me' ? 'right-0 text-brand-primary/80' : 'left-0 text-brand-text-dim'
                   }`}>
                     {msg.time} • delivered
                   </div>
                 </div>
               )}
             </div>
           ))}
        </div>

        {/* Input */}
        <div className="p-6 pt-0 bg-brand-bg">
           <div className="bg-brand-surface border border-brand-border rounded-2xl p-2 flex items-center gap-2 shadow-inner focus-within:border-brand-primary/50 transition-all">
              <button className="p-2 text-brand-text-dim hover:text-brand-primary transition-colors cursor-pointer"><Paperclip className="w-4 h-4" /></button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..." 
                className="flex-1 bg-transparent border-none outline-none text-xs font-mono py-2 text-white placeholder:text-brand-text-dim/50"
              />
              <button className="p-2 text-brand-text-dim hover:text-brand-primary transition-colors cursor-pointer"><Smile className="w-4 h-4" /></button>
              <button className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                <Send className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const MyProjectsView = () => {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, name: "StudyBuddy Mobile", roles: ["Flutter Dev", "Backend", "UI Designer", "QA"], filled: 2, total: 4, desc: "Building the next-gen state management app." },
    { id: 2, name: "Flutter Hub Platform", roles: ["Lead", "Contributor", "DevOps"], filled: 3, total: 3, desc: "Community platform for Flutter architects." }
  ]);

  const [formData, setFormData] = useState({ name: '', desc: '', roles: [] as string[] });
  const AVAILABLE_ROLES = ["Flutter Dev", "Backend", "Frontend", "UI/UX", "Project Manager", "QA", "DevOps"];

  const toggleRole = (role: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role) 
        ? prev.roles.filter(r => r !== role) 
        : [...prev.roles, role]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    const newProj = {
      id: Date.now(),
      name: formData.name,
      desc: formData.desc,
      roles: formData.roles,
      filled: 1,
      total: formData.roles.length || 1
    };
    setProjects([newProj, ...projects]);
    setFormData({ name: '', desc: '', roles: [] });
    setShowForm(false);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-brand-bg">
      <header className="px-8 py-10 border-b border-brand-border bg-gradient-to-r from-brand-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-brand-primary" />
              <MicroLabel>Project Management</MicroLabel>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">My <span className="text-brand-primary">Projects</span></h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {showForm ? 'Cancel' : 'New Project'}
          </motion.button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-8 py-12 space-y-12">
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-surface border border-brand-primary/30 rounded-[32px] p-8 shadow-2xl shadow-brand-primary/10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">Project Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-4 outline-none focus:border-brand-primary transition-colors text-sm"
                        placeholder="e.g. Campus Food Finder"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">Description</label>
                      <textarea 
                        value={formData.desc}
                        onChange={(e) => setFormData({...formData, desc: e.target.value})}
                        className="w-full bg-brand-bg border border-brand-border rounded-xl p-4 outline-none focus:border-brand-primary transition-colors text-sm h-32 resize-none"
                        placeholder="Tell about your vision..."
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-mono font-bold text-brand-secondary uppercase tracking-widest">Required Roles</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_ROLES.map(role => (
                        <button
                          type="button"
                          key={role}
                          onClick={() => toggleRole(role)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                            formData.roles.includes(role)
                            ? 'bg-brand-primary border-brand-primary text-white'
                            : 'bg-brand-bg border-brand-border text-brand-text-dim hover:border-brand-primary/40'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-xl shadow-brand-primary/40 flex items-center gap-3 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Zap className="w-4 h-4" />
                    <span>Publish Vacancy</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-secondary" />
            <h2 className="text-xl font-bold">Current Active Teams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                className="bg-brand-surface border border-brand-border rounded-[28px] p-6 space-y-6 relative overflow-hidden group hover:border-brand-primary/30 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-xs text-brand-text-dim line-clamp-2">{project.desc}</p>
                  </div>
                  <div className="bg-brand-bg border border-brand-border rounded-xl px-3 py-1.5 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="text-xs font-mono font-bold">{project.filled}/{project.total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase font-mono font-bold text-brand-text-dim">
                    <span>Squad Density</span>
                    <span>{Math.round((project.filled/project.total)*100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-brand-bg rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(project.filled/project.total)*100}%` }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.roles.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-brand-bg/50 border border-brand-border rounded-lg">
                      <div className={`w-1.5 h-1.5 rounded-full ${idx < project.filled ? 'bg-green-500' : 'bg-brand-primary/40 animate-pulse'}`} />
                      <span className="text-[9px] font-mono font-bold uppercase text-white/60">{role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const HackathonTimeline = () => {
  const HISTORY = [
    {
      id: 1,
      event: "Global Flutter Challenge 2024",
      date: "March 2024",
      rank: "1st Place",
      stack: ["Flutter", "Rust", "Firebase"],
      partners: [
        { name: "Aruzhan Bekova", role: "Designer" },
        { name: "Timur Akhmetov", role: "Backend" }
      ]
    },
    {
      id: 2,
      event: "AI for Good Hackathon",
      date: "Jan 2024",
      rank: "Top 5",
      stack: ["React", "Three.js", "Go"],
      partners: [
        { name: "Elena Kim", role: "Web Dev" }
      ]
    },
    {
      id: 3,
      event: "Open Source Days",
      date: "Nov 2023",
      rank: "Finalist",
      stack: ["Dart", "C++", "GitHub Actions"],
      partners: [
        { name: "Dias Nurlanov", role: "DevOps" }
      ]
    }
  ];

  return (
    <div className="relative space-y-12">
      {/* Vertical Line */}
      <div className="absolute left-[23px] top-6 bottom-0 w-px bg-gradient-to-b from-brand-primary via-brand-secondary/40 to-transparent" />

      {HISTORY.map((item, idx) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative pl-16 group"
        >
          {/* Dot */}
          <div className="absolute left-[16px] top-4 w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-primary z-10 group-hover:scale-125 transition-transform" />
          
          <div className="bg-brand-surface border border-brand-border rounded-[32px] p-6 space-y-4 hover:border-brand-primary/30 transition-all shadow-xl shadow-black/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="text-[10px] font-mono text-brand-secondary font-bold uppercase tracking-widest mb-1">{item.date}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{item.event}</h3>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-xl">
                 <Trophy className="w-4 h-4 text-brand-primary" />
                 <span className="text-sm font-bold text-brand-primary">{item.rank}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.stack.map(s => (
                <span key={s} className="px-2 py-1 bg-brand-bg border border-brand-border rounded-lg text-[9px] font-mono font-bold text-white/40 uppercase">
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-brand-text-dim uppercase tracking-widest">Squad Team:</span>
                <div className="flex -space-x-3">
                  {item.partners.map((p, i) => (
                    <div 
                      key={i} 
                      className="relative group/avatar"
                      title={`${p.name} (${p.role})`}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-bg overflow-hidden flex items-center justify-center hover:z-20 hover:scale-110 transition-all cursor-pointer shadow-lg shadow-black/40">
                         <div className="w-full h-full bg-brand-primary/40 flex items-center justify-center text-xs font-bold font-mono">
                           {p.name[0]}
                         </div>
                      </div>
                      {/* Synergy Invite Overlay */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-primary text-[9px] font-bold text-white rounded-lg opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        RE-INVITE PARTNER
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => alert(`Invited team from ${item.event} to your new squad!`)}
                className="flex items-center gap-2 px-5 py-2 bg-brand-surface border border-brand-border hover:border-brand-primary/50 text-[10px] font-bold text-white uppercase tracking-widest rounded-xl transition-all group/invite cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-brand-secondary group-hover/invite:scale-110 transition-transform" />
                Invite Team
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const SkillRadarChart = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const SKILLS = [
    { label: "Frontend", value: 0.9, sub: ["Flutter", "React", "Next.js", "Vue"] },
    { label: "Backend", value: 0.8, sub: ["Node.js", "Rust", "Go", "Firebase"] },
    { label: "Design", value: 0.75, sub: ["Figma", "Motion", "UI/UX", "Spline"] },
    { label: "DevOps", value: 0.65, sub: ["Docker", "K8s", "CI/CD", "AWS"] },
    { label: "Soft Skills", value: 0.85, sub: ["Coaching", "Leadership", "Speaking"] },
  ];

  const size = 300;
  const center = size / 2;
  const radius = center - 40;
  const angleStep = (Math.PI * 2) / SKILLS.length;

  const points = SKILLS.map((s, i) => {
    const x = center + Math.cos(angleStep * i - Math.PI / 2) * radius * s.value;
    const y = center + Math.sin(angleStep * i - Math.PI / 2) * radius * s.value;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="bg-brand-surface border border-brand-border rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl shadow-brand-primary/5">
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/5 blur-[60px] -mr-24 -mt-24" />
      
      <div className="relative group shrink-0">
        <svg width={size} height={size} className="">
          {/* Grid Circles/Polygons */}
          {[1.0, 0.75, 0.5, 0.25].map(tick => {
            const gridPoints = SKILLS.map((_, i) => {
              const x = center + Math.cos(angleStep * i - Math.PI / 2) * radius * tick;
              const y = center + Math.sin(angleStep * i - Math.PI / 2) * radius * tick;
              return `${x},${y}`;
            }).join(" ");
            return (
              <polygon 
                key={tick} 
                points={gridPoints} 
                className="fill-none stroke-brand-border stroke-1 opacity-40" 
              />
            );
          })}

          {/* Spokes */}
          {SKILLS.map((_, i) => {
            const x = center + Math.cos(angleStep * i - Math.PI / 2) * radius;
            const y = center + Math.sin(angleStep * i - Math.PI / 2) * radius;
            return (
              <line 
                key={i} 
                x1={center} y1={center} x2={x} y2={y} 
                className="stroke-brand-border stroke-1 opacity-40" 
              />
            );
          })}

          {/* Area */}
          <motion.polygon 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            points={points} 
            className="fill-brand-secondary/20 stroke-brand-secondary stroke-2"
          />

          {/* Vertices/Buttons */}
          {SKILLS.map((s, i) => {
            const x = center + Math.cos(angleStep * i - Math.PI / 2) * radius;
            const y = center + Math.sin(angleStep * i - Math.PI / 2) * radius;
            const labelX = center + Math.cos(angleStep * i - Math.PI / 2) * (radius + 25);
            const labelY = center + Math.sin(angleStep * i - Math.PI / 2) * (radius + 20);
            
            return (
              <g 
                key={s.label} 
                className="cursor-pointer group/vertex"
                onClick={() => setSelectedCategory(s.label === selectedCategory ? null : s.label)}
              >
                <motion.circle 
                  whileHover={{ scale: 1.5, r: 6 }}
                  cx={center + Math.cos(angleStep * i - Math.PI / 2) * radius * s.value} 
                  cy={center + Math.sin(angleStep * i - Math.PI / 2) * radius * s.value} 
                  r="4" 
                  className={`fill-brand-secondary ${selectedCategory === s.label ? 'ring-4 ring-brand-secondary/40' : ''}`} 
                />
                <text 
                  x={labelX} 
                  y={labelY} 
                  textAnchor="middle" 
                  className={`text-[9px] font-mono font-bold uppercase tracking-widest fill-white transition-colors ${selectedCategory === s.label ? 'fill-brand-secondary' : 'group-hover/vertex:fill-brand-primary'}`}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex-1 space-y-6 w-full">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-secondary" />
            <MicroLabel>Skill Distribution Analysis</MicroLabel>
          </div>
          <h3 className="text-2xl font-bold">Technological Balance</h3>
          <p className="text-sm text-brand-text-dim">Skills by area. Click a category to see details.</p>
        </div>

        <div className="h-[120px]">
          <AnimatePresence mode="wait">
            {selectedCategory ? (
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-brand-primary" />
                   <h4 className="text-lg font-bold text-white uppercase tracking-tight">{selectedCategory} STACK</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.find(s => s.label === selectedCategory)?.sub.map(item => (
                    <span key={item} className="px-4 py-2 bg-brand-bg border border-brand-primary/20 rounded-xl text-xs font-bold text-brand-primary font-mono lowercase tracking-tight hover:border-brand-primary transition-all">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full border border-dashed border-brand-border rounded-2xl text-xs text-brand-text-dim/80 font-mono italic"
              >
                SELECT A NODE ON THE RADAR TO INITIALIZE DEEP SCAN...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => {
  const [scrollY, setScrollY] = useState(0);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const headerHeight = Math.max(80, 300 - scrollY);
  const opacity = Math.max(0, 1 - scrollY / 200);
  const titleScale = Math.max(0.8, 1 - scrollY / 1000);

  return (
    <div className="flex-1 overflow-y-auto relative no-scrollbar bg-brand-bg" onScroll={handleScroll}>
      {/* SliverAppBar Hero Section */}
      <div 
        className="sticky top-0 z-30 w-full overflow-hidden border-b border-brand-border bg-brand-bg"
        style={{ height: `${headerHeight}px` }}
      >
        <div 
          className="absolute inset-0 bg-brand-primary/20"
          style={{ opacity }}
        />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 pb-6">
          <motion.div 
            style={{ scale: titleScale }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[32px] bg-brand-surface border-4 border-brand-bg shadow-2xl relative">
                <div className="w-full h-full rounded-[28px] bg-brand-primary flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-brand-bg" />
              </div>
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-white tracking-tight">Daniyar Sadykov</h1>
                  <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
                  <VideoPitch />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-1">
                   <p className="text-brand-secondary font-mono text-sm tracking-widest font-bold">@senior_flutter_architect</p>
                   <div className="hidden sm:block text-white/10">•</div>
                   <VoiceWaveform />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-2" style={{ opacity }}>
              <button className="p-3 bg-brand-surface rounded-2xl border border-brand-border hover:border-brand-primary/50 transition-all">
                <Github className="w-5 h-5" />
              </button>
              <button className="px-6 py-3 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/30 active:scale-95 transition-all">
                Hire Me
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12 space-y-16">
        {/* Bento Grid Achievements */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold">Ecosystem Contributions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[400px]">
            <div className="md:col-span-2 md:row-span-2 bg-brand-surface border border-brand-border rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[80px] -mr-32 -mt-32 group-hover:bg-brand-primary/20 transition-all" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold leading-tight">Master Level Architecture</h3>
                <p className="text-brand-text-dim text-sm leading-relaxed">Certified Google Developer Expert with 120+ published packages in the Flutter ecosystem.</p>
              </div>
              <div className="flex items-center gap-2 text-brand-secondary font-mono text-xs font-bold uppercase tracking-widest">
                Verified
              </div>
            </div>
            
            <div className="bg-brand-surface border border-brand-border rounded-[24px] p-6 flex flex-col justify-center items-center text-center gap-2 group hover:border-brand-secondary/30 transition-all">
               <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                 <Shield className="w-5 h-5 text-brand-secondary" />
               </div>
               <div className="text-2xl font-bold tracking-tight">840</div>
               <MicroLabel>PRs Merged</MicroLabel>
            </div>

            <div className="bg-brand-secondary/10 border border-brand-secondary/20 rounded-[24px] p-6 flex flex-col justify-center items-center text-center gap-2">
               <Activity className="w-6 h-6 text-brand-secondary animate-pulse" />
               <div className="text-2xl font-bold tracking-tight">Top 1%</div>
               <MicroLabel>Ranked Global</MicroLabel>
            </div>

            <div className="md:col-span-2 bg-brand-surface border border-brand-border rounded-[24px] p-6 flex items-center justify-between group overflow-hidden">
               <div className="space-y-1">
                 <div className="text-lg font-bold">Community Leader</div>
                 <p className="text-xs text-brand-text-dim">Host of "Mobile Future" Conf</p>
               </div>
               <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform">
                 <Zap className="w-8 h-8 text-brand-primary" />
               </div>
            </div>
          </div>
        </section>

        {/* Portfolio - Horizontal List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-secondary" />
              <h2 className="text-xl font-bold">Featured Projects</h2>
            </div>
            <MicroLabel>Show all</MicroLabel>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-8 px-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="shrink-0 w-[320px] bg-brand-surface border border-brand-border rounded-[28px] overflow-hidden group shadow-xl shadow-black/20"
              >
                <div className="h-44 bg-brand-bg relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <div className="absolute top-4 right-4 px-3 py-1 bg-brand-primary rounded-lg text-[10px] font-bold uppercase">Public</div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold group-hover:text-brand-primary transition-colors">Open-source package #{i}</h4>
                    <p className="text-xs text-brand-secondary font-mono uppercase tracking-widest font-bold">Lead Developer • Mobile</p>
                  </div>
                  <p className="text-xs text-brand-text-dim leading-relaxed">
                    A high-performance state management library for React and Flutter with zero overhead.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-brand-bg rounded border border-brand-border text-[9px] font-mono">DART</span>
                    <span className="px-2 py-1 bg-brand-bg rounded border border-brand-border text-[9px] font-mono">RUST</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skill Radar Chart */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold">Skills</h2>
          </div>
          <SkillRadarChart />
        </section>

        {/* Hackathon History Timeline */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-brand-secondary" />
              <h2 className="text-xl font-bold">Hackathon Odyssey</h2>
            </div>
            <MicroLabel>View Archive</MicroLabel>
          </div>
          <HackathonTimeline />
        </section>

        {/* Skills - Wrap Chips */}
        <section className="space-y-6 pb-20">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold">Terminal Stack</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {["Flutter", "Dart", "Firebase", "Rust", "Go", "Kubernetes", "Google Cloud", "Clean Architecture", "Riverpod", "BLoC", "Terraform", "CI/CD"].map(skill => (
              <motion.div 
                key={skill}
                whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.5)" }}
                className="px-5 py-2.5 bg-brand-surface border border-brand-border rounded-2xl flex items-center gap-3 transition-colors cursor-default"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                <span className="text-sm font-medium tracking-tight whitespace-nowrap">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'profile' | 'events' | 'my-projects' | 'chat' | 'notifications' | 'ai-match' | 'team-agreement'
  const [showMatch, setShowMatch] = useState(false);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' | 'info' }[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API fetch delay
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Feed updated", "success");
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-bg selection:bg-brand-primary/30 text-white">
      {/* Sidebar - Geometric Balance Pattern */}
      <aside className="w-64 border-r border-brand-border bg-brand-bg p-6 flex flex-col justify-between shrink-0 hidden lg:flex">
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
              <MicroLabel>FLUTTER HUB</MicroLabel>
            </div>
            <nav className="space-y-2">
              <div 
                onClick={() => setIsPanicMode(!isPanicMode)}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-bold transition-all cursor-pointer border ${
                  isPanicMode 
                  ? 'bg-red-500/10 text-red-500 border-red-500/20' 
                  : 'text-white/40 hover:text-white border-transparent'
                }`}
              >
                <div className="relative">
                  <AlertTriangle className={`w-4 h-4 ${isPanicMode ? 'animate-bounce' : ''}`} />
                  {isPanicMode && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />}
                </div> 
                PANIC MODE
              </div>
              <div className="h-px bg-brand-border my-4 opacity-50" />
              <div 
                onClick={() => setActiveTab('feed')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'feed' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <Layers className="w-4 h-4" /> User Feed
              </div>
              <div 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'profile' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <User className="w-4 h-4" /> User Profile
              </div>
              <div 
                onClick={() => setActiveTab('ai-match')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'ai-match' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <div className="relative">
                  <Sparkles className="w-4 h-4" />
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-brand-primary blur-sm rounded-full"
                  />
                </div> AI Matchmaking
              </div>
              <div 
                onClick={() => setActiveTab('events')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'events' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <Trophy className="w-4 h-4" /> Hackathons
              </div>
              <div 
                onClick={() => setActiveTab('my-projects')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'my-projects' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <Briefcase className="w-4 h-4" /> My Projects
              </div>
              <div 
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'chat' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <Zap className="w-4 h-4" /> Global Chat
              </div>
              <div 
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'notifications' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <div className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-secondary rounded-full border border-brand-bg" />
                </div> Notifications
              </div>
              <div 
                onClick={() => setActiveTab('team-agreement')}
                className={`flex items-center gap-3 p-2 rounded-xl text-sm font-medium transition-all cursor-pointer border ${
                  activeTab === 'team-agreement' 
                  ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                  : 'opacity-40 hover:opacity-100 border-transparent'
                }`}
              >
                <ClipboardCheck className="w-4 h-4" /> Team Agreement
              </div>
            </nav>
          </div>
          <div className="pt-8 border-t border-brand-border">
            <p className="text-[10px] font-mono opacity-30 leading-relaxed uppercase tracking-wider">
              Hack Searcher<br/>student prototype
            </p>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border shadow-inner">
          <div className="text-[11px] font-mono text-brand-secondary mb-1 uppercase tracking-widest">Server</div>
          <div className="text-xs font-medium text-white/80 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Online
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'feed' && (
          <>
            <header className={`h-16 border-b transition-colors duration-500 flex items-center justify-between px-6 sm:px-8 shrink-0 z-20 ${
              isPanicMode ? 'bg-red-500/5 border-red-500/20' : 'bg-brand-bg border-brand-border'
            }`}>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 bg-brand-surface border border-brand-border rounded-xl text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className={`hidden sm:flex items-center px-3 py-1.5 rounded-xl border transition-colors duration-500 text-xs font-mono gap-2 ${
                  isPanicMode ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-brand-surface border-brand-border text-brand-primary'
                }`}>
                  <Search className="w-3 h-3" />
                  <span>Search people</span>
                </div>
                <h1 className="text-lg font-bold tracking-tight text-white/90 font-sans uppercase">
                  {isPanicMode ? 'Urgent' : 'Hub'}
                </h1>
              </div>
              <div className="flex items-center gap-6">
                 {isPanicMode ? (
                   <motion.div 
                     animate={{ opacity: [0.4, 1, 0.4] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                     className="hidden md:flex items-center gap-2 text-red-500 font-mono text-[10px] font-bold"
                   >
                     <div className="w-2 h-2 bg-red-500 rounded-full" />
                     Urgent mode on
                   </motion.div>
                 ) : (
                   <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
                         <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                         <span className="text-[10px] font-mono font-bold text-brand-primary tracking-wide">Online</span>
                      </div>
                   </div>
                 )}
              </div>
            </header>

            <div className={`flex-1 overflow-y-auto transition-colors duration-500 scroll-smooth no-scrollbar ${isPanicMode ? 'bg-red-500/5' : 'bg-brand-bg/50'}`}>
              <PullToRefreshIndicator isRefreshing={isRefreshing} />
              
              <div className={`sticky top-0 z-10 backdrop-blur-md border-b px-6 sm:px-8 py-4 flex items-center justify-between gap-4 transition-colors duration-500 ${
                isPanicMode ? 'bg-red-950/40 border-red-500/20' : 'bg-brand-bg/80 border-brand-border'
              }`}>
                <div className="max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                    <button 
                      onClick={handleRefresh}
                      className="p-2 bg-brand-surface border border-brand-border rounded-xl text-white/40 hover:text-brand-primary transition-all hover:scale-110 active:rotate-180 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    {FILTERS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setActiveFilter(f.id);
                          showToast(`Filter: ${f.label}`);
                        }}
                        className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${
                          activeFilter === f.id 
                          ? (isPanicMode ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/30')
                          : (isPanicMode ? 'bg-red-500/10 border-red-500/20 text-red-500/60' : 'bg-brand-surface border-brand-border text-white/40 hover:text-white/80 hover:border-brand-primary/30')
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto px-6 sm:px-8 py-10 space-y-8">
                {isPanicMode && <SOSWidget />}

                <AnimatePresence mode="popLayout" initial={false}>
                  {isLoading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
                      {[1, 2, 3, 4].map((i) => <UserSkeleton key={i} />)}
                    </motion.div>
                  ) : (
                    <motion.div key="feed" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pb-32">
                      
                      {/* Priority Panic Card */}
                      {isPanicMode && activeFilter === 'all' && (
                        <div className="relative mb-12">
                          <div className="absolute -inset-1 bg-red-500/20 blur-xl rounded-[32px] animate-pulse" />
                          <FuturisticCard isPanic={true} delay={0} className="!bg-red-950/20 border-red-500/40 shadow-2xl shadow-red-500/10">
                            <div className="flex flex-col sm:flex-row gap-6">
                              <div className="shrink-0 relative">
                                <div className="w-20 h-20 rounded-[24px] bg-red-500 flex items-center justify-center border-4 border-brand-bg shadow-xl">
                                  <User className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-brand-bg p-1.5 rounded-xl border border-red-500/50">
                                  <AlertTriangle className="w-4 h-4 text-red-500" />
                                </div>
                              </div>
                              <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-xl font-bold text-white tracking-tight uppercase">Daniyar Sadykov</h3>
                                      <span className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded uppercase">Critical</span>
                                    </div>
                                    <p className="text-xs font-mono font-bold text-red-400 tracking-[0.2em] uppercase">Web3 developer</p>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-[10px] font-mono text-red-500 font-bold uppercase mb-1">SOS Active</div>
                                     <div className="text-lg font-mono font-bold text-white leading-none">18:42:04</div>
                                  </div>
                                </div>
                                <p className="text-sm text-brand-text-dim leading-relaxed italic">
                                  "Urgently seeking a Senior React/Web3 dev for a 24-hour sprint. Scaling bottleneck on L2 bridge. High bounty."
                                </p>
                                <div className="flex gap-3 pt-2">
                                  <button className="flex-1 py-3 bg-red-500 text-white text-xs font-bold uppercase rounded-xl hover:bg-red-400 transition-colors shadow-lg shadow-red-500/20">Init Response</button>
                                  <button className="px-6 py-3 bg-brand-bg border border-red-500/20 text-red-500 text-xs font-bold uppercase rounded-xl hover:bg-red-500/10 transition-colors">Details</button>
                                </div>
                              </div>
                            </div>
                          </FuturisticCard>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h2 className="text-xl font-bold text-white tracking-tight">{isPanicMode ? 'Urgent requests' : 'Active Contributors'}</h2>
                          <p className="text-xs text-brand-text-dim font-mono">
                            {isPanicMode ? 'Sorted by urgency' : '10 people looking for a team'}
                          </p>
                        </div>
                      </div>

                      {MOCK_USERS.filter(user => {
                        if (activeFilter === 'all') return true;
                        if (activeFilter === 'senior') return user.level === 'Senior' || user.level === 'Lead' || user.level === 'Expert';
                        return user.role.toLowerCase().includes(activeFilter.toLowerCase()) || 
                               user.stack.toLowerCase().includes(activeFilter.toLowerCase());
                      }).length > 0 ? (
                        MOCK_USERS.filter(user => {
                          if (activeFilter === 'all') return true;
                          if (activeFilter === 'senior') return user.level === 'Senior' || user.level === 'Lead' || user.level === 'Expert';
                          return user.role.toLowerCase().includes(activeFilter.toLowerCase()) || 
                                 user.stack.toLowerCase().includes(activeFilter.toLowerCase());
                        }).map((user, idx) => (
                          <div key={user.id} onClick={() => { setActiveTab('profile'); showToast(`Redirecting to ${user.name}`); }} className="cursor-pointer">
                            <FuturisticCard delay={idx * 0.05}>
                              <div className="flex flex-col sm:flex-row gap-6">
                                <div className="shrink-0 relative">
                                  <div className="w-16 h-16 rounded-[20px] bg-brand-primary/20 flex items-center justify-center border border-brand-primary/10">
                                    <User className="w-7 h-7 text-brand-primary" />
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 bg-brand-surface p-1 rounded-lg border border-brand-border">
                                    <CheckCircle2 className="w-3 h-3 text-brand-secondary" />
                                  </div>
                                </div>
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">{user.name}</h3>
                                      <div className="flex items-center gap-2 text-brand-secondary">
                                        <span className="text-xs font-mono font-bold tracking-widest uppercase">{user.role}</span>
                                        <span className="text-xs text-white/20">•</span>
                                        <span className="text-xs text-white/60">{user.level}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                       <VideoPitch />
                                    </div>
                                  </div>
                                  <p className="text-sm text-brand-text-dim leading-relaxed max-w-lg">{user.bio}</p>
                                  
                                  <div className="pt-2">
                                     <VoiceWaveform />
                                  </div>
                                </div>
                              </div>
                            </FuturisticCard>
                          </div>
                        ))
                      ) : (
                        <EmptySearchIllustration />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}

        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'events' && <EventsView />}
        {activeTab === 'my-projects' && <MyProjectsView />}
        {activeTab === 'chat' && <ChatView />}
        {activeTab === 'notifications' && <NotificationsView onMatchDemo={() => setShowMatch(true)} />}
        {activeTab === 'ai-match' && <AIMatchmakingView />}
        {activeTab === 'team-agreement' && <TeamAgreementBuilder />}
      </main>

      <AnimatePresence>
        {showMatch && <MatchOverlay onClose={() => setShowMatch(false)} />}
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-brand-bg/80 backdrop-blur-xl border-t border-brand-border px-6 flex items-center justify-between z-[50]">
        {[
          { id: 'feed', icon: <Layers className="w-5 h-5" /> },
          { id: 'ai-match', icon: <Sparkles className="w-5 h-5" /> },
          { id: 'events', icon: <Trophy className="w-5 h-5" /> },
          { id: 'chat', icon: <MessageSquare className="w-5 h-5" /> },
          { id: 'profile', icon: <User className="w-5 h-5" /> },
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`p-2 transition-all ${activeTab === item.id ? 'text-brand-primary scale-110' : 'text-white/40'}`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
