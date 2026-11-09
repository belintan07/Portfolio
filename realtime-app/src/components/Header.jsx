import React, { useState } from 'react';
import { Zap, Activity, Volume2, VolumeX, Pause, Play, Flame, PlusCircle, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/sound';
import RotatingText from './RotatingText';

export default function Header({ speed, setSpeed, onTriggerSale, activeShoppers, theme, toggleTheme }) {
  const [isMuted, setIsMuted] = useState(sound.muted);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0C0D11]/90 backdrop-blur-xl border-b border-slate-200 dark:border-[#242633] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Live Pulse Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#BB271A] to-[#FF8A50] flex items-center justify-center text-white shadow-lg shadow-[#BB271A]/20 font-black text-xl">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">SalesPulse Live</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>STREAM ACTIVE</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-semibold">
              <span>Real-time Telemetry:</span>
              <RotatingText
                texts={['Stripe Webhooks', 'WebSocket Streams', 'Sub-15ms Latency', 'PostgreSQL Pipeline', 'Kafka Event Bus']}
                effect="flip"
                direction="up"
                highlight={true}
                highlightColor="#BB271A"
                staggerDuration={0.02}
                rotationInterval={2200}
                splitLevelClassName="overflow-hidden"
                mainClassName="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm inline-flex"
              />
            </div>
          </div>
        </div>

        {/* Live Controls & Simulation Switcher */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Active Shoppers indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#161722] border border-slate-200 dark:border-[#282B3B] text-xs font-semibold text-slate-800 dark:text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span><strong className="text-slate-900 dark:text-white">{activeShoppers}</strong> Shoppers Browsing</span>
          </div>

          {/* Speed Selector (Segmented Pill) */}
          <div className="flex items-center bg-slate-100 dark:bg-[#161722] border border-slate-200 dark:border-[#282B3B] rounded-lg p-1 text-xs font-bold">
            <button
              onClick={() => setSpeed('normal')}
              className={`px-3 py-1 rounded-md transition-all ${
                speed === 'normal'
                  ? 'bg-[#BB271A] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white font-bold'
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
                  : 'text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white font-bold'
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
                  ? 'bg-slate-300 text-slate-900 dark:bg-zinc-700 dark:text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white font-bold'
              }`}
              title="Pause Live Stream"
            >
              {speed === 'paused' ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Audio Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600 dark:bg-[#161722] dark:border-[#282B3B] dark:text-zinc-500 dark:hover:text-zinc-300'
                : 'bg-orange-50 border-orange-200 text-[#BB271A] dark:bg-[#161722] dark:border-[#BB271A]/40 hover:bg-orange-100 dark:hover:bg-[#BB271A]/10'
            }`}
            title={isMuted ? 'Unmute Sale Chimes' : 'Mute Sale Chimes'}
            aria-label="Toggle Audio Chimes"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Switcher Toggle (Light / Dark Mode) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border transition-all bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 dark:bg-[#161722] dark:border-[#282B3B] dark:text-zinc-300 dark:hover:text-white"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Instant Trigger Sale Button */}
          <button
            onClick={() => onTriggerSale()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#BB271A] to-[#E0470E] hover:from-[#E0470E] hover:to-[#C03706] text-white font-bold text-xs shadow-md shadow-[#BB271A]/25 active:scale-95 transition-all"
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
