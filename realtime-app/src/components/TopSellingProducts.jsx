import React from 'react';
import { Package, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../utils/mockData';

export default function TopSellingProducts({ sales }) {
  // Aggregate revenue and count by product
  const productStats = PRODUCTS.map(prod => {
    const matching = sales.filter(s => s.product === prod.name);
    const count = matching.length + Math.floor(prod.price > 500 ? 3 : 14); // baseline + live
    const revenue = count * prod.price;
    return { ...prod, count, revenue };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const highestRevenue = productStats[0]?.revenue || 1;

  return (
    <div className="rounded-xl bg-white dark:bg-[#14151F] border border-slate-200 dark:border-[#262838] p-5 shadow-sm dark:shadow-lg flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Top Performing Products</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-600 dark:text-zinc-300 font-semibold">By Gross Volume</span>
        </div>

        <div className="space-y-3">
          {productStats.map((item, idx) => {
            const percent = Math.round((item.revenue / highestRevenue) * 100);
            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{item.name}</span>
                  </div>
                  <span className="font-mono font-extrabold text-slate-900 dark:text-zinc-100 ml-2">
                    ${item.revenue.toLocaleString()}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#F48936] rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-slate-600 dark:text-zinc-300 font-semibold">
                  <span>{item.category}</span>
                  <span>{item.count} units sold</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#262838] flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 font-medium">
        <span className="flex items-center gap-1 font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>99.4% Fulfillment Rate</span>
        </span>
        <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400 font-medium">Global Warehouses</span>
      </div>
    </div>
  );
}
