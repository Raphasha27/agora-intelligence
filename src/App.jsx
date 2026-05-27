import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BrainCircuit, Globe2, Wallet, RefreshCw, BarChart2, Zap } from 'lucide-react';

const MOCK_MARKETS = [
  { id: 'M-101', title: 'Will the US Federal Reserve cut rates by 25bps in June?', currentOdds: 0.54, type: 'MACRO', expectedEdge: '+12.4%' },
  { id: 'M-102', title: 'Will Ethereum ETF be approved by July?', currentOdds: 0.45, type: 'CRYPTO', expectedEdge: '+18.1%' },
  { id: 'M-103', title: 'Will SpaceX land Starship on Mars by 2026?', currentOdds: 0.22, type: 'TECH', expectedEdge: '+8.7%' },
];

function App() {
  const [activeTab, setActiveTab] = useState('markets');
  const [walletBalance, setWalletBalance] = useState(1240.50);
  const [logs, setLogs] = useState([]);
  const [activeMarket, setActiveMarket] = useState(MOCK_MARKETS[0]);
  const [reasoning, setReasoning] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const logEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulation Loop
  useEffect(() => {
    let step = 0;
    
    const addLog = (source, message, color) => {
      setLogs(prev => [...prev, {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour12: false }),
        source,
        message,
        color
      }].slice(-50)); // Keep last 50 logs
    };

    const runSimulation = async () => {
      while (true) {
        addLog('SYS', 'Scanning Polymarket feeds...', 'text-blue-400');
        await new Promise(r => setTimeout(r, 2000));
        
        const market = MOCK_MARKETS[Math.floor(Math.random() * MOCK_MARKETS.length)];
        setActiveMarket(market);
        
        addLog('AI', `Evaluated market: "${market.title.slice(0, 20)}..."`, 'text-purple-400');
        setReasoning([
          '> Ingesting recent data points...',
          '> Contextualizing with Gemini LLM...',
          `> EV Calculation: ${market.expectedEdge} edge found.`
        ]);

        await new Promise(r => setTimeout(r, 3000));

        if (Math.random() > 0.3) {
          setIsExecuting(true);
          addLog('EXEC', `Placed limit BUY for 200 YES on anomaly.`, 'text-green-400');
          
          await new Promise(r => setTimeout(r, 1500));
          
          const txHash = '0x' + Math.random().toString(16).substr(2, 8);
          setWalletBalance(prev => prev - 100);
          addLog('ARC', `Transaction settled on L1. Hash: ${txHash}`, 'text-accent');
          setIsExecuting(false);
        } else {
           addLog('AI', `Efficiently priced. Skipping.`, 'text-gray-400');
        }

        await new Promise(r => setTimeout(r, 5000));
      }
    };

    runSimulation();
  }, []);

  return (
    <div className="min-h-screen bg-background text-gray-200 font-sans selection:bg-accent/30 selection:text-white flex flex-col">
      {/* Navbar */}
      <header className="border-b border-border bg-[#03070b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight flex items-center gap-2">
                AgoraBot <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/20 text-primary border border-primary/20 uppercase tracking-widest font-mono">Agent v1.0</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-mono text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">ARC TESTNET: CONNECTED</span>
            </div>
            <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-border">
              <Wallet className="w-4 h-4 text-primary" />
              <motion.span 
                key={walletBalance}
                initial={{ color: '#00ffcc' }}
                animate={{ color: '#ffffff' }}
                className="text-white font-medium"
              >
                {walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDC
              </motion.span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        
        {/* Left Column - Markets & Analysis */}
        <div className="space-y-6">
          
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-surface rounded-xl border border-border inline-flex overflow-x-auto max-w-full">
            {['markets', 'positions', 'reasoning_logs'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#1a2332] text-white shadow-lg border border-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Market View */}
          {activeTab === 'markets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-gray-400" /> Live Opportunities
                </h2>
                <button className="text-xs font-mono text-accent flex items-center gap-1 hover:underline">
                  <RefreshCw className={`w-3 h-3 ${isExecuting ? 'animate-spin text-green-400' : ''}`} /> SCAN MARKETS
                </button>
              </div>

              {/* Active Market Card */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeMarket.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="glass-panel p-5 border border-primary/20 hover:border-primary/40 transition-colors relative overflow-hidden"
                >
                  {isExecuting && (
                     <motion.div 
                       initial={{ opacity: 0 }} 
                       animate={{ opacity: 0.1 }} 
                       className="absolute inset-0 bg-green-500" 
                     />
                  )}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <div className="text-xs font-mono text-primary mb-1">{activeMarket.type}</div>
                      <h3 className="text-xl font-medium text-white leading-tight">{activeMarket.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{Math.floor(activeMarket.currentOdds * 100)}¢</div>
                      <div className="text-xs text-gray-400">Current YES</div>
                    </div>
                  </div>

                  <div className="bg-[#0b1016] p-4 rounded-xl border border-white/5 mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-semibold text-purple-100">Agent Reasoning Trace</span>
                    </div>
                    <div className="text-sm text-gray-400 font-mono leading-relaxed space-y-1">
                      {reasoning.map((r, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.4 }}
                          className={r.includes('EV Calculation') ? 'text-accent' : ''}
                        >
                          {r}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border relative z-10">
                    <div className="flex items-center gap-4">
                      <button className="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-2 rounded-lg font-medium hover:bg-green-500/20 transition-colors flex items-center gap-2">
                        <Zap className="w-4 h-4" /> EXECUTE YES
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      Settlement: ARC L1
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right Column - Status & Activity */}
        <div className="space-y-6">
          {/* Agent Status */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" /> Agent Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-gray-300">Operational Mode</span>
                <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-mono border border-accent/20 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  AUTONOMOUS
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-gray-300">Confidence Threshold</span>
                <span className="text-sm font-mono text-white">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Exposure Limit</span>
                <span className="text-sm font-mono text-white">500 USDC / trade</span>
              </div>
            </div>
          </div>

          {/* Realtime Execution Log */}
          <div className="glass-panel p-0 flex flex-col h-[400px]">
            <div className="p-4 border-b border-border bg-[#0a0f16]">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-primary" /> Execution Log
              </h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs space-y-3">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-gray-400"
                  >
                    <span className="text-gray-600">[{log.time}]</span>{' '}
                    <span className={`${log.color}`}>{log.source}</span>{' '}
                    <span className={log.source === 'EXEC' ? 'text-white' : ''}>{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
