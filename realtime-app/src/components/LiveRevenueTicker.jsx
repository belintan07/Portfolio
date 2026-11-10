import React from 'react';
import { TrendingUp, Target } from 'lucide-react';

export default function LiveRevenueTicker({ totalRevenue, totalOrders }) {
  const dailyTarget = 200000;
  const progressPercent = Math.min(100, Math.round((totalRevenue / dailyTarget) * 100));

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200 shadow-md dark:from-[#151724] dark:via-[#10111A] dark:to-[#0A0B0F] dark:border-[#272A3C] dark:shadow-2xl p-6 lg:p-8 transition-colors">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F48936]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Side: Real-Time Revenue Number */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-zinc-200">Total Net Revenue Today (Live)</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-3 h-3" />
              <span>+28.4% vs yesterday</span>
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white transition-all duration-300">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-slate-600 dark:text-zinc-300 font-bold text-sm tracking-wide">USD</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-zinc-300 mt-2 font-medium">
            Aggregated across Stripe, Apple Pay, PayPal &amp; Global Merchant Gateways.
          </p>
        </div>

        {/* Right Side: Target Goal Gauge */}
        <div className="w-full lg:w-80 bg-white/80 border border-slate-200 dark:bg-[#161826]/80 dark:border-[#2B2F44] rounded-xl p-4 backdrop-blur-sm shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
              <Target className="w-3.5 h-3.5 text-[#F48936]" />
              <span>Daily Target ($200K)</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-slate-300/60 dark:border-zinc-700/50">
            <div
              className="h-full bg-gradient-to-r from-[#F48936] to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-zinc-300 font-semibold mt-2">
            <span>{totalOrders.toLocaleString()} Orders Shipped</span>
            {totalRevenue >= dailyTarget ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Goal Met! (+${(totalRevenue - dailyTarget).toLocaleString('en-US', { maximumFractionDigits: 0 })} surplus)</span>
            ) : (
              <span>${(dailyTarget - totalRevenue).toLocaleString('en-US', { maximumFractionDigits: 0 })} remaining</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
