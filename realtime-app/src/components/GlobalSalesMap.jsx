import React from 'react';
import { Globe } from 'lucide-react';

export default function GlobalSalesMap({ sales }) {
  // Aggregate sales by country
  const countryCounts = sales.reduce((acc, s) => {
    acc[s.country] = (acc[s.country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const activeHubs = [
    { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: '35°N', status: 'High Volume' },
    { city: 'San Francisco', country: 'USA', flag: '🇺🇸', lat: '37°N', status: 'Surging' },
    { city: 'London', country: 'UK', flag: '🇬🇧', lat: '51°N', status: 'Active' },
    { city: 'Chennai', country: 'India', flag: '🇮🇳', lat: '13°N', status: 'Active' },
    { city: 'Berlin', country: 'Germany', flag: '🇩🇪', lat: '52°N', status: 'Active' }
  ];

  return (
    <div className="rounded-xl bg-white dark:bg-[#14151F] border border-slate-200 dark:border-[#262838] p-5 shadow-sm dark:shadow-lg flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Global Distribution Hubs</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            18+ Countries Live
          </span>
        </div>

        {/* Major Cities List with Radar Pings */}
        <div className="space-y-2.5">
          {activeHubs.map((hub, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 dark:bg-[#181926]/70 dark:border-[#272A3C] dark:hover:border-zinc-600 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{hub.flag}</span>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{hub.city}</div>
                  <div className="text-[10px] text-slate-600 dark:text-zinc-300 font-medium">{hub.country}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-semibold text-slate-800 dark:text-zinc-200">{hub.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Countries Summary */}
      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-[#262838]">
        <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-2">Live Order Origin Breakdown</h4>
        <div className="flex flex-wrap gap-1.5">
          {topCountries.map(([country, count], i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-800 dark:bg-[#1B1D2C] dark:border-[#2E3147] dark:text-zinc-200"
            >
              <span>{country}</span>
              <strong className="text-slate-900 dark:text-white font-mono">{count}</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
