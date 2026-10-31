import React from 'react';
import { ShoppingCart, ExternalLink, ShieldCheck } from 'lucide-react';

export default function LiveSalesStream({ sales, filterType, setFilterType }) {
  return (
    <div className="rounded-xl bg-[#14151F] border border-[#262838] p-5 shadow-lg flex flex-col h-[520px]">
      
      {/* Header & Persona / Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#242636] mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          <h3 className="font-extrabold text-sm text-white">Live Sales Stream</h3>
        </div>

        {/* Business vs Personal Category Switcher */}
        <div className="flex items-center bg-[#181926] border border-[#2B2F44] rounded-lg p-0.5 text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              filterType === 'all'
                ? 'bg-[#FF5A1F] text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All ({sales.length})
          </button>
          <button
            onClick={() => setFilterType('business')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              filterType === 'business'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>💼</span> Business
          </button>
          <button
            onClick={() => setFilterType('personal')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              filterType === 'personal'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>🎨</span> Personal
          </button>
        </div>
      </div>

      {/* Scrollable Order Cards Feed */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
        {sales.length === 0 ? (
          <div className="text-zinc-500 text-xs text-center py-12">
            No transactions in this category yet. New orders arriving soon...
          </div>
        ) : (
          sales.map((sale, idx) => (
            <div
              key={sale.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                idx === 0
                  ? 'bg-gradient-to-r from-[#FF5A1F]/15 via-[#191A26] to-[#14151F] border-[#FF5A1F]/40 shadow-lg shadow-[#FF5A1F]/5 animate-slide-in'
                  : 'bg-[#181926]/60 border-[#26293B] hover:border-[#3A3E59]'
              }`}
            >
              {/* Buyer Avatar & Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={sale.avatar}
                    alt={sale.buyer}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 text-xs">{sale.flag}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white truncate">{sale.buyer}</h4>
                    <span className="text-[10px] text-zinc-500 font-mono">{sale.timestamp}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      sale.type === 'business'
                        ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                        : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                    }`}>
                      {sale.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 truncate font-medium">
                    {sale.icon} {sale.product}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-400">
                    <span>{sale.city}, {sale.country}</span>
                    <span>&middot;</span>
                    <span className="text-zinc-500 font-mono">{sale.payment}</span>
                  </div>
                </div>
              </div>

              {/* Price Tag & Action */}
              <div className="text-right flex-shrink-0">
                <div className="font-mono text-sm font-extrabold text-emerald-400">
                  +${sale.amount.toFixed(2)}
                </div>
                <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 mt-1">
                  Settled ✓
                </span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
