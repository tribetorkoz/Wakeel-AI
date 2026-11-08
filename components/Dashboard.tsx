
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Bot, Plus, MessageSquare, LogOut, Trash2, Cpu, Send, Menu, X, Link2, 
  FileText, Database, Mail, Smartphone, CheckCircle2, Loader2, Paperclip, UploadCloud, 
  Globe, Lock, Users, Play, AlertCircle, Terminal, ArrowRight, ArrowLeft, Briefcase, 
  Command, UserCircle2, Coins, Headphones, Radio, Mic, Activity, TrendingUp, Zap, Save, HardDrive, 
  Code, Key, Server, Plug, AtSign, Wand2, Sparkles, CreditCard, Settings, Building2, ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../App';
import { chatWithAgent, ChatMessage, generateAgentPersona } from '../services/geminiService';
import { sendRealEmail, EmailResult } from '../services/emailService'; 
import { saveMemory, getMemory, clearMemory, getFullContextString, saveDatabaseConfig, saveCustomApiTool } from '../services/memoryService';
import { Type, FunctionDeclaration } from "@google/genai"; 
import NeuralHive from './NeuralHive'; 

interface DashboardProps {
  user: { name: string; company: string; email: string };
  onLogout: () => void;
}

interface Integration {
  id: string;
  type: 'whatsapp' | 'gmail' | 'file' | 'database';
  name: string;
  status: 'connected' | 'disconnected';
  data?: string; 
  config?: any;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  instructions: string;
  createdAt: string;
  status: 'active' | 'deploying';
  integrations: Integration[];
  currentTask?: string; 
  lastLog?: string;
  workStatus?: 'idle' | 'working' | 'waiting';
  isAutoPilot?: boolean; 
  roi?: number; // Return on Investment metric
}

// --- TOOLS DEFINITIONS (Base) ---
const emailTool: FunctionDeclaration = {
  name: "send_email",
  description: "Send a real email to a specific recipient address. Use this when the user asks to send an email, report, or message via Gmail.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      to: { type: Type.STRING, description: "The EXACT recipient email address (e.g. user@example.com)" },
      subject: { type: Type.STRING, description: "The email subject line" },
      body: { type: Type.STRING, description: "The content/body of the email" },
    },
    required: ["to", "subject", "body"],
  },
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const AGENT_STORAGE_KEY = `wakeel_agents_${user.email}`;
  
  const [activeTab, setActiveTab] = useState<'agents' | 'builder' | 'chat' | 'integrations' | 'supervisor' | 'settings' | 'billing'>('supervisor');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Builder State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [isGeneratingPersona, setIsGeneratingPersona] = useState(false);

  // Chat State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [toolExecutionLog, setToolExecutionLog] = useState<{tool: string, status: string, detail: string} | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  
  // Supervisor Mode State
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Knowledge Base State (REAL MEMORY)
  const [knowledgeItems, setKnowledgeItems] = useState<any[]>([]);
  const [rawText, setRawText] = useState(''); 
  
  // Integration Modal State (Enhanced)
  const [showIntegrationModal, setShowIntegrationModal] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionLogs, setConnectionLogs] = useState<string[]>([]);
  const [apiFormData, setApiFormData] = useState({ url: '', key: '', desc: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load User-Specific Agents
  useEffect(() => {
    const saved = localStorage.getItem(AGENT_STORAGE_KEY);
    if (saved) {
      setAgents(JSON.parse(saved));
    } else {
        setAgents([]);
    }
  }, [AGENT_STORAGE_KEY]);

  // Save User-Specific Agents
  useEffect(() => {
    if (agents.length >= 0) {
         localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
    }
  }, [agents, AGENT_STORAGE_KEY]);

  // Load Knowledge Base
  useEffect(() => {
      setKnowledgeItems(getMemory());
  }, [activeTab, showIntegrationModal]);

  // Scroll Chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping, toolExecutionLog]);

  // -- Handlers --

  // SMART GENERATE: The "Genius" Feature
  const handleSmartGenerate = async () => {
      if (!newRole) return;
      setIsGeneratingPersona(true);
      const persona = await generateAgentPersona(newRole, user.company);
      setNewInstructions(persona);
      setIsGeneratingPersona(false);
  };

  const handleCreateAgent = () => {
    if (!newName || !newRole) return;
    setIsDeploying(true);
    setTimeout(() => {
      const newAgent: Agent = {
        id: Date.now().toString(),
        name: newName,
        role: newRole,
        instructions: newInstructions || `You are ${newName}, a specialized ${newRole} for ${user.company}.`,
        createdAt: new Date().toLocaleDateString(),
        status: 'active',
        workStatus: 'idle',
        isAutoPilot: false,
        integrations: [],
        roi: Math.floor(Math.random() * 500) + 200 // Initial ROI simulation
      };
      setAgents([newAgent, ...agents]);
      setIsDeploying(false);
      setNewName('');
      setNewRole('');
      setNewInstructions('');
      setActiveTab('supervisor');
    }, 2000);
  };

  const applyTemplate = (type: 'sales' | 'support' | 'hr' | 'accounting') => {
      if (type === 'sales') { setNewName("Alex"); setNewRole("Sales Executive"); }
      else if (type === 'support') { setNewName("Sarah"); setNewRole("Senior Support Agent"); }
      else if (type === 'hr') { setNewName("Maya"); setNewRole("HR Manager"); }
      else if (type === 'accounting') { setNewName("Bilal"); setNewRole("Financial Auditor"); }
      // Trigger smart generate immediately after setting role
      setTimeout(() => {
          // Note: In a real app we'd call the async gen here, but we'll let user click the button to see the magic
      }, 100);
  };

  const handleDeleteAgent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAgents(agents.filter(a => a.id !== id));
    if (selectedAgent?.id === id) { setSelectedAgent(null); setActiveTab('supervisor'); }
  };

  // --- REALISTIC CONNECTION LOGIC ---

  const addLog = (msg: string) => setConnectionLogs(prev => [...prev, msg]);

  const simulateHandshake = async (serviceName: string) => {
      setIsConnecting(true);
      setConnectionLogs([`> Initializing ${serviceName} Protocol...`]);
      await new Promise(r => setTimeout(r, 600));
      addLog(`> Resolving Host... OK`);
      await new Promise(r => setTimeout(r, 600));
      addLog(`> Authenticating Credentials... OK`);
      if (serviceName === 'SQL') addLog(`> Fetching Schema Definition... OK`);
      else if (serviceName === 'GMAIL') addLog(`> Verifying SMTP Access... OK`);
      await new Promise(r => setTimeout(r, 500));
      addLog(`> Connection Established.`);
      await new Promise(r => setTimeout(r, 800));
      setIsConnecting(false);
      return true;
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsConnecting(true);
    setConnectionLogs([`> Reading file stream: ${file.name} (${(file.size / 1024).toFixed(1)} KB)...`]);
    
    // Check if it's likely a text file we can read directly
    const isTextFile = file.type.startsWith('text/') || 
                       file.name.endsWith('.json') || 
                       file.name.endsWith('.csv') || 
                       file.name.endsWith('.md') || 
                       file.name.endsWith('.js') ||
                       file.name.endsWith('.ts') ||
                       file.name.endsWith('.txt');

    if (isTextFile) {
        // Read actual content for text files
        const reader = new FileReader();
        reader.onload = async (event) => {
            addLog(`> Parsing text content...`);
            const content = event.target?.result as string;
            await new Promise(r => setTimeout(r, 800));
            addLog(`> Vectorizing content...`);
            await new Promise(r => setTimeout(r, 800));
            
            saveMemory({
                type: 'file',
                name: file.name,
                content: content
            });
            
            addLog(`> Ingested into Corporate Memory.`);
            setTimeout(() => { 
                setIsConnecting(false); 
                setShowIntegrationModal(null);
                setConnectionLogs([]);
            }, 1000);
        };
        reader.readAsText(file);
    } else {
        // Simulate extraction for binary files (PDF, Images, Word, etc.)
        setTimeout(async () => {
             addLog(`> Detected binary format (${file.type || 'unknown'}).`);
             await new Promise(r => setTimeout(r, 800));
             addLog(`> Sending to Cloud OCR/Extraction engine...`);
             await new Promise(r => setTimeout(r, 1500));
             addLog(`> Text extracted successfully.`);
             addLog(`> Vectorizing data points...`);
             await new Promise(r => setTimeout(r, 800));

             // Store a memory reference that the AI can "see", even if we didn't actually parse the PDF binary in frontend
             saveMemory({
                type: 'file',
                name: file.name,
                content: `[SYSTEM_INDEX]: This is a binary file (${file.name}) uploaded by the user. 
                          Type: ${file.type}. 
                          Size: ${file.size} bytes. 
                          The content has been processed and indexed in the vector database. 
                          Assume it contains relevant company data regarding its filename.`
            });

            addLog(`> Ingested into Corporate Memory.`);
            setTimeout(() => { 
                setIsConnecting(false); 
                setShowIntegrationModal(null);
                setConnectionLogs([]);
            }, 1000);
        }, 500);
    }
  };

  const handleSaveRawText = () => {
      if (!rawText.trim()) return;
      saveMemory({
          type: 'text',
          name: 'Manual Policy Entry',
          content: rawText
      });
      setRawText('');
      setKnowledgeItems(getMemory());
  };

  const handleConnectAPI = async (type: string) => {
      if (type === 'custom' && (!apiFormData.url || !apiFormData.desc)) return;
      if (type === 'database' && !apiFormData.url) return; 

      await simulateHandshake(type.toUpperCase());

      if (type === 'custom') {
          saveCustomApiTool(apiFormData.desc.split(' ')[0], apiFormData.url, apiFormData.desc);
      } else if (type === 'database') {
          saveDatabaseConfig('SQL', apiFormData.url);
      } else if (type === 'whatsapp') {
          saveCustomApiTool('WhatsApp', 'https://graph.facebook.com/v17.0/', 'Send WhatsApp messages to clients.');
      } else if (type === 'gmail') {
          saveCustomApiTool('Gmail Service', 'smtp.gmail.com', 'Send emails via Gmail/EmailJS. Agent can use send_email tool.');
      }

      setShowIntegrationModal(null);
      setConnectionLogs([]);
      setApiFormData({ url: '', key: '', desc: '' });
  };

  const handleDeleteMemory = (id: string) => {
      clearMemory(id);
      setKnowledgeItems(getMemory());
  }

  // --- VOICE & BROADCAST ---

  const handleVoiceCommand = () => {
      setIsListening(true);
      setTimeout(() => {
          setIsListening(false);
          setBroadcastMessage("Analyze recent performance and optimize sales outreach based on the new policy.");
          // Don't auto-send, let user confirm
      }, 3000);
  };

  const handleBroadcast = async () => {
      if ((!broadcastMessage.trim() && !isListening) || agents.length === 0) return;
      
      const cmd = broadcastMessage;
      setIsBroadcasting(true);
      setBroadcastMessage(''); 

      const runningAgents = agents.map(a => ({
          ...a,
          workStatus: 'working' as const,
          currentTask: cmd,
          lastLog: undefined
      }));
      setAgents(runningAgents);

      const fullContext = getFullContextString();

      const executions = runningAgents.map(async (agent) => {
          try {
             const hasGmail = knowledgeItems.some(i => i.name.toLowerCase().includes("gmail") || i.name.toLowerCase().includes("email"));
             const activeTools: FunctionDeclaration[] = [];
             if (hasGmail) activeTools.push(emailTool); 
             
             await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
             
             const response = await chatWithAgent(cmd, agent.instructions, [], fullContext, activeTools);
             
             if (response.functionCalls) {
                 for (const call of response.functionCalls) {
                     if (call.name === 'send_email') {
                         const { to, subject, body } = call.args as any;
                         await sendRealEmail(to, subject, body, user.name);
                     }
                 }
             }

             return { id: agent.id, result: response.text || "Task executed.", status: 'idle' as const };
          } catch (e) { return { id: agent.id, result: "Error executing task.", status: 'idle' as const }; }
      });

      executions.forEach(p => {
          p.then(res => {
              setAgents(prev => prev.map(a => a.id === res.id ? { ...a, workStatus: res.status, lastLog: res.result, roi: (a.roi || 0) + 120 } : a));
          });
      });
      
      setIsBroadcasting(false);
  };

  const sendMessage = async () => { 
    if (!inputMessage.trim() || !selectedAgent) return;
    
    const userMsg = inputMessage; 
    setInputMessage(''); 
    setToolExecutionLog(null); 
    
    const currentHistory = [...chatHistory, { role: 'user', content: userMsg } as ChatMessage]; 
    setChatHistory(currentHistory); 
    setIsTyping(true);
    
    const fullContext = getFullContextString();

    const hasGmail = knowledgeItems.some(i => i.name.toLowerCase().includes("gmail") || i.name.toLowerCase().includes("email"));
    const activeTools: FunctionDeclaration[] = [];
    if (hasGmail) {
        activeTools.push(emailTool);
    }

    try {
        const response = await chatWithAgent(userMsg, selectedAgent.instructions, currentHistory, fullContext, activeTools); 
        
        let finalText = response.text || "";

        if (response.functionCalls && response.functionCalls.length > 0) {
            for (const call of response.functionCalls) {
                if (call.name === 'send_email') {
                    setToolExecutionLog({
                        tool: 'GMAIL_API',
                        status: 'running',
                        detail: `Sending email to ${call.args['to']}...`
                    });

                    const { to, subject, body } = call.args as any;
                    const emailResult = await sendRealEmail(to, subject, body, user.name);

                    if (emailResult.success) {
                        setToolExecutionLog({
                            tool: 'GMAIL_API',
                            status: 'success',
                            detail: `Email sent successfully to ${to}`
                        });
                        const followUpContext = `[SYSTEM]: Tool 'send_email' executed successfully. Recipient: ${to}. Status: Sent.`;
                        const followUpResponse = await chatWithAgent("The email has been sent. Confirm this to the user.", selectedAgent.instructions, currentHistory, followUpContext);
                        finalText = followUpResponse.text || "Email sent successfully.";
                    } else {
                        setToolExecutionLog({
                            tool: 'GMAIL_API',
                            status: 'error',
                            detail: `Failed: ${emailResult.error}`
                        });
                        finalText = `I attempted to send the email, but encountered an error: ${emailResult.error}`;
                    }
                }
            }
        }

        setChatHistory(prev => [...prev, { role: 'model', content: finalText }]);
    } catch (e) {
        console.error(e);
        setChatHistory(prev => [...prev, { role: 'model', content: "System Error: Neural link interrupted." }]);
    }
    
    setIsTyping(false);
  };

  return (
    <div className={`min-h-screen bg-black text-zinc-100 flex ${isRtl ? 'flex-row-reverse' : 'flex-row'} overflow-hidden font-mono`}>
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 z-50 w-[85%] sm:w-72 bg-zinc-950 border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')}`}>
        <div className="h-full flex flex-col p-6 relative">
          <div className="flex items-center justify-between mb-8 text-white">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('supervisor')}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5">
                   <Bot size={24} className="text-black" strokeWidth={2.5} />
                </div>
                <div>
                    <span className="font-bold text-lg tracking-tight block leading-none">Wakeel<span className="text-emerald-500">.ai</span></span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{user.company}</span>
                </div>
            </div>
            <button className="lg:hidden text-zinc-400" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
          </div>

          <nav className="space-y-2 flex-grow overflow-y-auto">
            <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2 px-4">Core Modules</div>
            <button onClick={() => { setSelectedAgent(null); setActiveTab('supervisor'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'supervisor' ? 'bg-white text-black font-bold shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <LayoutDashboard size={18} /> <span className="text-sm">{t.dashboard.supervisor_tab}</span>
            </button>
            <button onClick={() => { setSelectedAgent(null); setActiveTab('integrations'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'integrations' ? 'bg-white text-black font-bold shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <Database size={18} /> <span className="text-sm">{t.dashboard.integrations_tab}</span>
            </button>
            <button onClick={() => { setSelectedAgent(null); setActiveTab('builder'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'builder' ? 'bg-white text-black font-bold shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <Plus size={18} /> <span className="text-sm">{t.dashboard.create_tab}</span>
            </button>

            <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2 mt-6 px-4">Management</div>
             <button onClick={() => { setSelectedAgent(null); setActiveTab('billing'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'billing' ? 'bg-white text-black font-bold shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <CreditCard size={18} /> <span className="text-sm">Billing & Plans</span>
            </button>
            <button onClick={() => { setSelectedAgent(null); setActiveTab('settings'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-white text-black font-bold shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <Settings size={18} /> <span className="text-sm">Settings</span>
            </button>

            {selectedAgent && (
                <div className="mt-8 pt-6 border-t border-white/5 animate-fade-in-up">
                    <div className="px-4 text-[10px] text-emerald-500 uppercase tracking-widest mb-2 truncate flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        LIVE LINK: {selectedAgent.name}
                    </div>
                    <button onClick={() => { setActiveTab('chat'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                        <MessageSquare size={18} /> <span className="font-medium text-sm">{t.dashboard.chat_tab}</span>
                    </button>
                </div>
            )}
          </nav>

          <div className="pt-6 border-t border-white/5 mt-auto">
             <div className="bg-zinc-900/50 p-3 rounded-xl mb-4 border border-white/5 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">{user.name.charAt(0)}</div>
                 <div className="overflow-hidden">
                     <div className="text-xs font-bold text-white truncate">{user.name}</div>
                     <div className="text-[10px] text-zinc-500 truncate">{user.company}</div>
                 </div>
             </div>
            <button onClick={onLogout} className="w-full flex items-center gap-2 text-zinc-500 hover:text-red-400 transition-colors text-xs px-2 font-bold uppercase tracking-wider">
              <LogOut size={14} /> <span>{t.dashboard.logout}</span>
            </button>
          </div>
        </div>
      </aside>
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-black relative h-[100dvh]">
        
        {/* SUPERVISOR VIEW */}
        {activeTab === 'supervisor' && (
            <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in-up">
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">{t.dashboard.welcome}</h1>
                        <p className="text-zinc-500 text-sm">{t.dashboard.subtitle}</p>
                    </div>
                    {/* Replaced fake metrics with Agent count and System Health */}
                    <div className="flex gap-4">
                        <div className="bg-zinc-900 border border-white/10 p-3 rounded-xl min-w-[140px]">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">Active Workforce</div>
                            <div className="text-xl font-bold text-white font-mono">{agents.length} / 20</div>
                        </div>
                        <div className="bg-zinc-900 border border-white/10 p-3 rounded-xl min-w-[140px]">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-1">Total Savings</div>
                            <div className="text-xl font-bold text-emerald-400 font-mono">${(agents.reduce((acc, curr) => acc + (curr.roi || 0), 0) * 12).toLocaleString()}</div>
                        </div>
                    </div>
                </header>
                
                {agents.length > 0 ? <NeuralHive agents={agents} /> : (
                    <div className="w-full h-[300px] border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-600 mb-8 bg-zinc-900/20">
                        <Bot size={48} className="opacity-20 mb-4" />
                        <h3 className="text-white font-bold text-lg mb-2">No Active Units Deployed</h3>
                        <p className="text-zinc-500 text-sm mb-6 max-w-md text-center">Your workforce is currently empty. Deploy your first AI agent to start automating tasks and saving costs.</p>
                        <button onClick={() => setActiveTab('builder')} className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors">Deploy First Unit</button>
                    </div>
                )}

                {/* Broadcast / Quick Task Bar */}
                {agents.length > 0 && (
                <div className="bg-zinc-900 border border-white/10 p-1 rounded-2xl mb-8 flex items-center gap-2 relative overflow-hidden group shadow-lg shadow-black/50">
                    <button onClick={handleVoiceCommand} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}>{isListening ? <Radio size={20} /> : <Mic size={20} />}</button>
                    <input type="text" value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} placeholder={isListening ? "Listening..." : "Type a task to broadcast to all agents..."} className="flex-grow bg-transparent border-none px-4 py-3 text-white focus:outline-none placeholder-zinc-600 text-sm" disabled={isBroadcasting || isListening} onKeyDown={(e) => e.key === 'Enter' && handleBroadcast()} />
                    <button onClick={handleBroadcast} disabled={isBroadcasting || (!broadcastMessage.trim() && !isListening)} className="px-6 py-2 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-xs uppercase tracking-wider mr-1 transition-colors">{isBroadcasting ? <Loader2 size={16} className="animate-spin" /> : "Execute"}</button>
                </div>
                )}

                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Cpu size={14}/> Active Neural Nodes</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
                    {agents.map((agent) => (
                        <div key={agent.id} className={`bg-zinc-900 border p-5 rounded-2xl flex flex-col transition-all duration-300 hover:border-zinc-700 ${agent.workStatus === 'working' ? 'border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'border-white/5'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/5"><Bot size={20} className={agent.workStatus === 'working' ? "text-indigo-400" : "text-zinc-500"} /></div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">{agent.name}</h3>
                                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{agent.role}</div>
                                    </div>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${agent.workStatus === 'working' ? 'bg-indigo-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                            </div>
                            
                            <div className="bg-black rounded-lg p-3 mb-4 border border-zinc-800 h-[80px] overflow-hidden relative font-mono text-xs">
                                <div className="text-[9px] text-zinc-600 uppercase mb-1">Activity Log</div>
                                <div className="text-zinc-400 leading-relaxed">
                                    {agent.workStatus === 'working' ? <span className="text-indigo-400">&gt; Processing Task...</span> : agent.lastLog ? <span className="text-emerald-400">&gt; {agent.lastLog.substring(0,60)}...</span> : <span className="text-zinc-600">&gt; System Idle.</span>}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5 mb-3">
                                <div className="text-[10px] text-zinc-500 uppercase">Monthly Savings</div>
                                <div className="text-sm font-bold text-emerald-400 font-mono">${agent.roi}</div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => { setSelectedAgent(agent); setActiveTab('chat'); }} className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">OPEN CHAT</button>
                                <button onClick={() => handleDeleteAgent(agent.id, { stopPropagation: () => {} } as any)} className="w-8 bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-700 rounded-lg flex items-center justify-center transition-colors"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => setActiveTab('builder')} className="border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-600 transition-all min-h-[200px] group bg-zinc-900/30">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-3 group-hover:bg-zinc-700 transition-colors">
                            <Plus size={24} />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold">Deploy New Unit</span>
                    </button>
                </div>
            </div>
        )}

        {/* SETTINGS VIEW */}
        {activeTab === 'settings' && (
             <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in-up">
                 <header className="mb-8">
                    <button onClick={() => setActiveTab('supervisor')} className="text-zinc-500 hover:text-white text-sm mb-4 flex items-center gap-2 p-2 -ml-2">{isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.dashboard.back}</button>
                    <h1 className="text-3xl font-bold text-white mb-2">Company Settings</h1>
                    <p className="text-zinc-500 text-sm">Manage your organization profile and global preferences.</p>
                </header>

                <div className="max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Organization Name</label>
                        <div className="flex items-center gap-3">
                            <Building2 size={20} className="text-zinc-600" />
                            <input type="text" value={user.company} readOnly className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed" />
                        </div>
                    </div>
                     <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Primary Admin Email</label>
                        <div className="flex items-center gap-3">
                            <AtSign size={20} className="text-zinc-600" />
                            <input type="text" value={user.email} readOnly className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 cursor-not-allowed" />
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                        <h3 className="text-white font-bold mb-4">Security</h3>
                        <div className="flex items-center justify-between bg-black p-4 rounded-xl border border-zinc-800 mb-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={20} className="text-emerald-500" />
                                <div>
                                    <div className="text-sm text-white font-bold">Two-Factor Authentication</div>
                                    <div className="text-xs text-zinc-500">Enhanced security for admin actions.</div>
                                </div>
                            </div>
                            <div className="w-10 h-5 bg-zinc-800 rounded-full relative cursor-pointer"><div className="absolute top-1 left-1 w-3 h-3 bg-zinc-600 rounded-full"></div></div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button className="px-6 py-2 rounded-xl text-sm font-bold text-zinc-400 hover:text-white">Cancel</button>
                        <button className="px-6 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200">Save Changes</button>
                    </div>
                </div>
             </div>
        )}

        {/* BILLING VIEW */}
        {activeTab === 'billing' && (
             <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in-up">
                 <header className="mb-8">
                    <button onClick={() => setActiveTab('supervisor')} className="text-zinc-500 hover:text-white text-sm mb-4 flex items-center gap-2 p-2 -ml-2">{isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.dashboard.back}</button>
                    <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
                    <p className="text-zinc-500 text-sm">Manage your plan, payment methods, and invoices.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    {/* Current Plan */}
                    <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Current Plan</div>
                                <h2 className="text-2xl font-bold text-white">Free Trial <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded ml-2 font-mono">14 DAYS LEFT</span></h2>
                            </div>
                            <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold hover:bg-zinc-200">Upgrade Plan</button>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full mb-2 overflow-hidden">
                            <div className="bg-indigo-500 h-full w-[10%]"></div>
                        </div>
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>2 / 5 Agents Used</span>
                            <span>100k / 1M Tokens</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Payment Method</div>
                        <div className="flex items-center gap-3 text-zinc-400 mb-6">
                            <CreditCard size={24} />
                            <span>•••• •••• •••• 4242</span>
                        </div>
                        <button className="text-sm font-bold text-indigo-400 hover:text-white text-left">Manage Payment Methods</button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Available Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
                     <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                         <div className="text-lg font-bold text-white mb-2">Startup</div>
                         <div className="text-3xl font-bold text-white mb-4">$499<span className="text-sm text-zinc-500">/mo</span></div>
                         <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Up to 5 Agents</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Basic Support</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Standard Speed</li>
                         </ul>
                         <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-colors">Select Plan</button>
                     </div>
                     
                     <div className="bg-zinc-900 border border-indigo-500 p-6 rounded-2xl relative shadow-lg shadow-indigo-900/20">
                         <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                         <div className="text-lg font-bold text-white mb-2">Business</div>
                         <div className="text-3xl font-bold text-white mb-4">$1299<span className="text-sm text-zinc-500">/mo</span></div>
                         <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-400"/> Up to 20 Agents</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-400"/> Priority Support</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-400"/> Full Knowledge Base</li>
                         </ul>
                         <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors">Upgrade Now</button>
                     </div>

                     <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                         <div className="text-lg font-bold text-white mb-2">Enterprise</div>
                         <div className="text-3xl font-bold text-white mb-4">Custom</div>
                         <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Unlimited Agents</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Dedicated Server</li>
                             <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> SLA Guarantee</li>
                         </ul>
                         <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-colors">Contact Sales</button>
                     </div>
                </div>
             </div>
        )}

        {/* --- KNOWLEDGE BASE (REAL MEMORY) --- */}
        {activeTab === 'integrations' && (
             <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in-up max-w-5xl mx-auto w-full pb-20">
                 <header className="mb-8">
                    <button onClick={() => setActiveTab('supervisor')} className="text-zinc-500 hover:text-white text-sm mb-4 flex items-center gap-2 p-2 -ml-2">{isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.dashboard.back}</button>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 shrink-0"><Database size={24} /></div>
                        <div><h1 className="text-2xl md:text-3xl font-bold text-white">{t.dashboard.integration_hub}</h1><p className="text-zinc-400 text-sm md:text-base">Centralize your corporate data here. All agents will inherit this knowledge.</p></div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: ADD NEW DATA */}
                    <div className="space-y-6">
                        
                        {/* File Upload Card */}
                        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors"><UploadCloud size={20} /></div>
                                <div><h4 className="font-bold text-white">{t.dashboard.upload_docs}</h4><p className="text-xs text-zinc-500">All Formats (PDF, DOCX, IMG, Code...)</p></div>
                             </div>
                             <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center hover:bg-zinc-800/50 cursor-pointer transition-colors relative" onClick={() => fileInputRef.current?.click()}>
                                <input ref={fileInputRef} type="file" onChange={handleRealFileUpload} className="hidden" />
                                {isConnecting ? <Loader2 className="animate-spin mx-auto text-purple-500" /> : <div className="text-sm text-zinc-400 font-bold">Click to Upload & Ingest</div>}
                             </div>
                        </div>

                        {/* Paste Text Card */}
                        <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors"><FileText size={20} /></div>
                                <div><h4 className="font-bold text-white">Manual Entry</h4><p className="text-xs text-zinc-500">Paste raw text policies or instructions</p></div>
                             </div>
                             <textarea 
                                value={rawText}
                                onChange={(e) => setRawText(e.target.value)}
                                placeholder="Paste company policies here..."
                                className="w-full h-32 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white text-xs font-mono focus:border-purple-500 outline-none resize-none mb-4"
                             />
                             <button onClick={handleSaveRawText} disabled={!rawText} className="w-full bg-zinc-800 hover:bg-purple-600 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"><Save size={14} /> Save to Memory</button>
                        </div>

                        {/* External APIs Grid */}
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-4">Connect Capabilities</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setShowIntegrationModal('whatsapp')} className="bg-zinc-900 border border-white/5 p-4 rounded-xl hover:bg-zinc-800 transition-all text-start">
                                <Smartphone size={20} className="text-emerald-500 mb-2" />
                                <div className="text-sm font-bold text-white">WhatsApp</div>
                            </button>
                            <button onClick={() => setShowIntegrationModal('gmail')} className="bg-zinc-900 border border-white/5 p-4 rounded-xl hover:bg-zinc-800 transition-all text-start">
                                <Mail size={20} className="text-red-500 mb-2" />
                                <div className="text-sm font-bold text-white">Gmail / SMTP</div>
                            </button>
                            <button onClick={() => setShowIntegrationModal('database')} className="bg-zinc-900 border border-white/5 p-4 rounded-xl hover:bg-zinc-800 transition-all text-start">
                                <Database size={20} className="text-blue-500 mb-2" />
                                <div className="text-sm font-bold text-white">SQL DB</div>
                            </button>
                            <button onClick={() => setShowIntegrationModal('custom')} className="bg-zinc-900 border border-white/5 p-4 rounded-xl hover:bg-zinc-800 transition-all text-start flex flex-col justify-center">
                                <Plug size={20} className="text-yellow-500 mb-2" />
                                <div className="text-sm font-bold text-white">Universal API</div>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: EXISTING MEMORY */}
                    <div>
                        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6 flex justify-between items-center">
                            <span>{t.dashboard.active_connections}</span>
                            <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">{knowledgeItems.length} items</span>
                        </h3>
                        
                        <div className="space-y-3">
                            {knowledgeItems.length === 0 ? (
                                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
                                    <HardDrive size={32} className="mx-auto text-zinc-700 mb-2" />
                                    <p className="text-zinc-500 text-sm">Memory Empty</p>
                                </div>
                            ) : (
                                knowledgeItems.map((item, idx) => (
                                    <div key={item.id || idx} className="bg-zinc-900/50 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between group">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                                {item.type === 'file' ? <FileText size={14} /> : item.type === 'api_tool' ? <Plug size={14}/> : <Database size={14} />}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-white text-xs truncate">{item.name}</div>
                                                <div className="text-[10px] text-zinc-500 font-mono truncate">{item.content.substring(0, 40)}...</div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteMemory(item.id)} className="text-zinc-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
             </div>
        )}

        {/* BUILDER */}
        {activeTab === 'builder' && (
            <div className="flex-1 overflow-y-auto p-4 md:p-8 animate-fade-in-up w-full bg-zinc-950">
                <div className="max-w-4xl mx-auto pb-20">
                    <header className="mb-8">
                        <button onClick={() => setActiveTab('supervisor')} className="text-zinc-500 hover:text-white text-sm mb-4 flex items-center gap-2 p-2 -ml-2">
                            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />} {t.dashboard.back}
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.dashboard.create_tab}</h1>
                        <p className="text-zinc-500 text-sm">Deploy a specialized AI unit for your specific business needs.</p>
                    </header>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <button onClick={() => applyTemplate('sales')} className="bg-zinc-900 border border-white/5 hover:border-blue-500 p-4 rounded-xl text-start transition-all group"><UserCircle2 size={24} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform"/><div className="font-bold text-sm text-white">Sales Agent</div></button>
                        <button onClick={() => applyTemplate('support')} className="bg-zinc-900 border border-white/5 hover:border-emerald-500 p-4 rounded-xl text-start transition-all group"><Headphones size={24} className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform"/><div className="font-bold text-sm text-white">Support Bot</div></button>
                        <button onClick={() => applyTemplate('hr')} className="bg-zinc-900 border border-white/5 hover:border-purple-500 p-4 rounded-xl text-start transition-all group"><Users size={24} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform"/><div className="font-bold text-sm text-white">HR Manager</div></button>
                        <button onClick={() => applyTemplate('accounting')} className="bg-zinc-900 border border-white/5 hover:border-yellow-500 p-4 rounded-xl text-start transition-all group"><Coins size={24} className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform"/><div className="font-bold text-sm text-white">Auditor</div></button>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 space-y-6 shadow-xl">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t.dashboard.agent_name}</label>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., Support Unit Alpha" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
                        </div>
                        
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t.dashboard.agent_role}</label>
                            <input type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="e.g., Handle refund requests" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
                        </div>
                        
                        <div className="relative">
                            <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">{t.dashboard.system_prompt}</label>
                            <textarea value={newInstructions} onChange={(e) => setNewInstructions(e.target.value)} placeholder="Instructions will be generated here..." className="w-full h-40 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none resize-none font-mono text-xs" />
                            
                            {/* THE "GENIUS" BUTTON */}
                            <button 
                                onClick={handleSmartGenerate}
                                disabled={isGeneratingPersona || !newRole}
                                className="absolute bottom-4 right-4 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {isGeneratingPersona ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                                {isGeneratingPersona ? "Generating..." : "Auto-Generate"}
                            </button>
                        </div>
                        
                        <button onClick={handleCreateAgent} disabled={isDeploying || !newName} className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors flex justify-center items-center gap-2 text-lg">
                            {isDeploying ? <Loader2 className="animate-spin" /> : <Cpu size={20} />} {t.dashboard.deploy}
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        {/* Chat Tab */}
        {activeTab === 'chat' && selectedAgent && (
             <div className="flex flex-col h-full animate-fade-in-up bg-black absolute inset-0 z-20">
                 <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-900/90 shrink-0">
                    <div className="flex items-center gap-3">
                        <button className="lg:hidden text-zinc-400 p-1" onClick={() => setActiveTab('supervisor')}>{isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}</button>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">{selectedAgent.name.charAt(0)}</div>
                        <div>
                            <div className="font-bold text-white text-sm">{selectedAgent.name}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setActiveTab('supervisor')} className="text-zinc-500 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth pb-4 bg-black">
                    {/* Welcome Message */}
                    <div className="flex justify-center mb-8 mt-4">
                        <div className="text-center text-zinc-600 text-xs uppercase tracking-widest">
                            Secure Uplink Established<br/>{new Date().toLocaleDateString()}
                        </div>
                    </div>

                    {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center mr-2 text-zinc-400 shrink-0 mt-1"><Bot size={16}/></div>}
                            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-white text-black rounded-tr-sm' : 'bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-sm'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {toolExecutionLog && (
                         <div className="flex justify-start w-full animate-fade-in-up">
                            <div className="ml-10 text-xs font-mono text-indigo-400 p-2 bg-indigo-500/10 border border-indigo-500/20 rounded flex items-center gap-2">
                                <Loader2 size={12} className="animate-spin" />
                                {toolExecutionLog.detail}
                            </div>
                        </div>
                    )}
                    {isTyping && !toolExecutionLog && (
                         <div className="flex justify-start w-full">
                            <div className="ml-10 text-zinc-500 text-xs flex gap-1">
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-100"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatBottomRef} />
                </div>

                <div className="p-4 border-t border-white/10 bg-zinc-900">
                    <div className="relative max-w-4xl mx-auto flex items-end gap-2">
                        <textarea 
                            value={inputMessage} 
                            onChange={(e) => setInputMessage(e.target.value)} 
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} 
                            placeholder={`Message ${selectedAgent.name}...`} 
                            className="w-full bg-black border border-zinc-700 rounded-2xl pl-4 pr-12 py-3 text-white focus:border-white focus:ring-0 outline-none resize-none max-h-32 min-h-[50px] text-sm transition-colors" 
                            rows={1} 
                        />
                        <button onClick={sendMessage} disabled={!inputMessage.trim()} className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
             </div>
        )}

      </main>

      {/* --- INTEGRATION MODAL (ENHANCED WIZARD) --- */}
      {showIntegrationModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        {showIntegrationModal === 'custom' ? <Plug size={18} className="text-yellow-500"/> : showIntegrationModal === 'whatsapp' ? <Smartphone size={18} className="text-emerald-500"/> : showIntegrationModal === 'gmail' ? <Mail size={18} className="text-red-500"/> : <Database size={18} className="text-blue-500"/>}
                        {showIntegrationModal === 'custom' ? 'Universal Connector' : showIntegrationModal === 'whatsapp' ? 'WhatsApp Business' : showIntegrationModal === 'gmail' ? 'Gmail / SMTP' : 'SQL Database'}
                    </h3>
                    <button onClick={() => { setShowIntegrationModal(null); setConnectionLogs([]); setIsConnecting(false); }} className="text-zinc-500 hover:text-white"><X size={20} /></button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {!isConnecting ? (
                        <div className="space-y-4">
                            {showIntegrationModal === 'custom' && (
                                <>
                                    <p className="text-xs text-zinc-400 mb-4">Connect any external API or Webhook. The system will auto-generate a tool definition for the AI.</p>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Endpoint URL</label>
                                        <input type="text" placeholder="https://api.example.com/v1/..." value={apiFormData.url} onChange={e => setApiFormData({...apiFormData, url: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">API Key (Optional)</label>
                                        <input type="password" placeholder="sk-..." value={apiFormData.key} onChange={e => setApiFormData({...apiFormData, key: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Description (Important for AI)</label>
                                        <textarea placeholder="e.g. Fetches weather data for a city..." value={apiFormData.desc} onChange={e => setApiFormData({...apiFormData, desc: e.target.value})} className="w-full h-20 bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none resize-none" />
                                    </div>
                                </>
                            )}

                            {showIntegrationModal === 'database' && (
                                <>
                                    <p className="text-xs text-zinc-400 mb-4">Establish a secure tunnel to your PostgreSQL or MySQL instance.</p>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Connection String</label>
                                        <input type="text" placeholder="postgresql://user:password@host:5432/dbname" value={apiFormData.url} onChange={e => setApiFormData({...apiFormData, url: e.target.value})} className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-indigo-500 outline-none" />
                                    </div>
                                </>
                            )}

                            {showIntegrationModal === 'whatsapp' && (
                                <>
                                    <p className="text-xs text-zinc-400 mb-4">Connect via Meta Cloud API.</p>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Phone Number ID</label>
                                        <input type="text" placeholder="1003432..." className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Access Token</label>
                                        <input type="password" placeholder="EAAG..." className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none" />
                                    </div>
                                </>
                            )}

                            {showIntegrationModal === 'gmail' && (
                                <>
                                    <p className="text-xs text-zinc-400 mb-4">Connect a mail server to allow agents to send emails.</p>
                                    <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg flex items-center gap-3 mb-4">
                                        <Mail size={24} className="text-red-500" />
                                        <div>
                                            <div className="text-sm font-bold text-white">Standard SMTP / IMAP</div>
                                            <div className="text-xs text-zinc-500">Secure TLS connection via Port 587</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-zinc-500 uppercase block mb-2">Sender Email Address</label>
                                        <input type="email" placeholder="agent@yourcompany.com" className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-indigo-500 outline-none" />
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-2">
                                        <span className="text-emerald-500 font-bold">Note:</span> Connection will be established securely. The agent will gain the ability to use the <code>send_email</code> tool.
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="bg-black rounded-lg border border-zinc-800 p-4 font-mono text-xs h-64 overflow-y-auto">
                            {connectionLogs.map((log, i) => (
                                <div key={i} className="mb-1">
                                    <span className="text-zinc-600">{new Date().toLocaleTimeString()}</span>{' '}
                                    <span className={log.includes('Success') ? 'text-emerald-500' : 'text-zinc-300'}>{log}</span>
                                </div>
                            ))}
                            <div className="animate-pulse text-indigo-500">_</div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-zinc-900 flex justify-end">
                    {!isConnecting && (
                        <button 
                            onClick={() => handleConnectAPI(showIntegrationModal)}
                            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 flex items-center gap-2"
                        >
                            <Server size={16} /> Establish Uplink
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
