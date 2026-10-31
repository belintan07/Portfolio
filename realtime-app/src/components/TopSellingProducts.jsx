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
    <div className="rounded-xl bg-[#14151F] border border-[#262838] p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Top Performing Products</h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">By Gross Volume</span>
        </div>

        <div className="space-y-3">
          {productStats.map((item, idx) => {
            const percent = Math.round((item.revenue / highestRevenue) * 100);
            return (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-bold text-white truncate">{item.name}</span>
                  </div>
                  <span className="font-mono font-extrabold text-zinc-300 ml-2">
                    ${item.revenue.toLocaleString()}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#FF5A1F] rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>{item.category}</span>
                  <span>{item.count} units sold</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#262838] flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1 font-semibold text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" /> High conversion velocity
        </span>
        <span className="font-mono text-[11px]">Updated live</span>
      </div>
    </div>
  );
}

