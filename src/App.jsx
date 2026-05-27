import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BrainCircuit, Globe2, Wallet, RefreshCw, BarChart2, Zap } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('markets');

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
              <span>ARC TESTNET: CONNECTED</span>
            </div>
            <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-lg border border-border">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-white font-medium">1,240.50 USDC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        
        {/* Left Column - Markets & Analysis */}
        <div className="space-y-6">
          
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-surface rounded-xl border border-border inline-flex">
            {['markets', 'positions', 'reasoning_logs'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-[#1a2332] text-white shadow-lg border border-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
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
                  <RefreshCw className="w-3 h-3" /> SCAN MARKETS
                </button>
              </div>

              {/* Sample Market Card */}
              <div className="glass-panel p-5 border border-primary/20 hover:border-primary/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-mono text-primary mb-1">MACRO / POLITICS</div>
                    <h3 className="text-xl font-medium text-white leading-tight">Will the US Federal Reserve cut rates by 25bps in June?</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">54¢</div>
                    <div className="text-xs text-gray-400">Current YES</div>
                  </div>
                </div>

                <div className="bg-[#0b1016] p-4 rounded-xl border border-white/5 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-100">Agent Reasoning Trace</span>
                  </div>
                  <p className="text-sm text-gray-400 font-mono leading-relaxed">
                    > Ingesting recent FOMC minutes...<br/>
                    > Analyzing CPI inflation data (print was 3.3% vs 3.4% exp).<br/>
                    > Polymarket price (54¢) underestimates dovish sentiment in recent Powell speech.<br/>
                    <span className="text-accent">> EV Calculation: +12.4% edge found.</span>
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button className="bg-green-500/10 text-green-400 border border-green-500/30 px-6 py-2 rounded-lg font-medium hover:bg-green-500/20 transition-colors flex items-center gap-2">
                      <Zap className="w-4 h-4" /> EXECUTE YES
                    </button>
                    <span className="text-sm text-gray-500 font-mono">Suggested Size: 150 USDC</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Settlement: ARC L1
                  </div>
                </div>
              </div>
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
                <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-mono border border-accent/20">AUTONOMOUS</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-gray-300">Confidence Threshold</span>
                <span className="text-sm font-mono text-white">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">USDC Exposure Limit</span>
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
              <div className="text-gray-400">
                <span className="text-gray-600">[14:32:01]</span> <span className="text-blue-400">SYS</span> Scanning Polymarket feeds...
              </div>
              <div className="text-gray-400">
                <span className="text-gray-600">[14:32:05]</span> <span className="text-purple-400">AI</span> Evaluated 124 markets. Found 1 anomaly.
              </div>
              <div className="text-gray-400">
                <span className="text-gray-600">[14:32:06]</span> <span className="text-green-400">EXEC</span> Placed limit BUY for 200 YES on 'ETH ETF Approval' @ 45¢.
              </div>
              <div className="text-gray-400">
                <span className="text-gray-600">[14:32:06]</span> <span className="text-accent">ARC</span> Transaction settled on L1. Hash: 0x8f2...9a1
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;
