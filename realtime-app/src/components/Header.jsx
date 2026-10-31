import React, { useState } from 'react';
import { Zap, Activity, Volume2, VolumeX, Pause, Play, Flame, PlusCircle } from 'lucide-react';
import { sound } from '../utils/sound';

export default function Header({ speed, setSpeed, onTriggerSale, activeShoppers }) {
  const [isMuted, setIsMuted] = useState(sound.muted);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0C0D11]/90 backdrop-blur-xl border-b border-[#242633] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Live Pulse Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5A1F] to-[#FF8A50] flex items-center justify-center text-white shadow-lg shadow-[#FF5A1F]/20 font-black text-xl">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">SalesPulse Live</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>STREAM ACTIVE</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium">Real-time Global Commerce &amp; Revenue Telemetry</p>
          </div>
        </div>

        {/* Live Controls & Simulation Switcher */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Active Shoppers indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161722] border border-[#282B3B] text-xs font-semibold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span><strong className="text-white">{activeShoppers}</strong> Shoppers Browsing</span>
          </div>

          {/* Speed Selector (Segmented Pill) */}
          <div className="flex items-center bg-[#161722] border border-[#282B3B] rounded-lg p-1 text-xs font-bold">
            <button
              onClick={() => setSpeed('normal')}
              className={`px-3 py-1 rounded-md transition-all ${
                speed === 'normal'
                  ? 'bg-[#FF5A1F] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Normal Pace (Sale every ~3.5s)"
            >
              Normal
            </button>
            <button
              onClick={() => setSpeed('surge')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md transition-all ${
                speed === 'surge'
                  ? 'bg-amber-500 text-black shadow-sm font-extrabold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Surge / Black Friday Rush (Sale every ~1.2s)"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Surge</span>
            </button>
            <button
              onClick={() => setSpeed('paused')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                speed === 'paused'
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Pause Live Stream"
            >
              {speed === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-[#161722] border-[#282B3B] text-zinc-500 hover:text-zinc-300'
                : 'bg-[#161722] border-[#FF5A1F]/40 text-[#FF5A1F] hover:bg-[#FF5A1F]/10'
            }`}
            title={isMuted ? 'Unmute Sale Chimes' : 'Mute Sale Chimes'}
            aria-label="Toggle Audio Chimes"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Instant Trigger Sale Button */}
          <button
            onClick={() => onTriggerSale()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF5A1F] to-[#E0470E] hover:from-[#E0470E] hover:to-[#C03706] text-white font-bold text-xs shadow-md shadow-[#FF5A1F]/25 active:scale-95 transition-all"
            title="Simulate an instant incoming purchase"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Simulate Sale</span>
          </button>
        </div>

      </div>
    </header>
  );
}

