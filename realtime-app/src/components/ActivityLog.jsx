import React from 'react';
import { Terminal, ShoppingCart, Sparkles } from 'lucide-react';

export default function ActivityLog({ activityLogs }) {
  return (
    <div className="rounded-xl bg-white dark:bg-[#14151F] border border-slate-200 dark:border-[#262838] p-5 shadow-sm dark:shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Live Event Log</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">Real-time webhook events</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 font-mono text-xs">
        {activityLogs.length === 0 ? (
          <div className="text-slate-400 dark:text-zinc-600 text-center py-4">Listening for incoming events...</div>
        ) : (
          activityLogs.map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded-md border flex items-center justify-between gap-3 text-[11px] transition-colors ${
                log.type === 'high-value'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-zinc-900/60 dark:border-zinc-800 dark:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {log.type === 'high-value' ? (
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                ) : (
                  <ShoppingCart className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                )}
                <span className="truncate">{log.text}</span>
              </div>
              <span className="text-slate-400 dark:text-zinc-500 flex-shrink-0">{log.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
