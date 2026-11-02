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
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Completed Transactions',
      value: totalOrders.toLocaleString(),
      badge: 'Live',
      badgePositive: true,
      subtext: 'Zero failed settlements',
      icon: Activity,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Live Storefront Visitors',
      value: activeShoppers,
      badge: 'Pulsing',
      badgePositive: true,
      subtext: '48% on Mobile Devices',
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Global Checkout Conversion',
      value: '4.82%',
      badge: '+0.6%',
      badgePositive: true,
      subtext: 'Above industry benchmark (3.2%)',
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="rounded-xl bg-white dark:bg-[#14151F] border border-slate-200 dark:border-[#262838] p-5 shadow-sm hover:shadow dark:shadow-lg hover:border-slate-300 dark:hover:border-[#383B52] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">{item.title}</span>
              <span className={`p-2 rounded-lg border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{item.value}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.badge}</span>
            </div>

            <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">{item.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
