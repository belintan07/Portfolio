import React from 'react';
import { ShoppingBag, TrendingUp, Users, Activity } from 'lucide-react';

export default function MetricsGrid({ totalRevenue, totalOrders, activeShoppers }) {
  const aov = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';

  const metrics = [
    {
      title: 'Average Order Value (AOV)',
      value: `$${aov}`,
      badge: '+12.5%',
      badgePositive: true,
      subtext: 'Across all active currencies',
      icon: ShoppingBag,
      color: 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    },
    {
      title: 'Completed Transactions',
      value: totalOrders.toLocaleString(),
      badge: 'Live',
      badgePositive: true,
      subtext: 'Zero failed settlements',
      icon: Activity,
      color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    },
    {
      title: 'Live Storefront Visitors',
      value: activeShoppers,
      badge: 'Pulsing',
      badgePositive: true,
      subtext: '48% on Mobile Devices',
      icon: Users,
      color: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    },
    {
      title: 'Global Checkout Conversion',
      value: '4.82%',
      badge: '+0.6%',
      badgePositive: true,
      subtext: 'Above industry benchmark (3.2%)',
      icon: TrendingUp,
      color: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="rounded-xl bg-[#14151F] border border-[#262838] p-5 shadow-lg hover:border-[#383B52] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-zinc-400">{item.title}</span>
              <span className={`p-2 rounded-lg border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {item.value}
              </span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {item.badge}
              </span>
            </div>

            <p className="text-[11px] text-zinc-500 mt-2 font-medium">{item.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}

