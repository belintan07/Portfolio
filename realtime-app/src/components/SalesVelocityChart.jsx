import React from 'react';
import { Activity } from 'lucide-react';

export default function SalesVelocityChart({ velocityPoints }) {
  const validPoints = Array.isArray(velocityPoints) && velocityPoints.length > 0
    ? velocityPoints
    : [{ time: 'Now', count: 0, revenue: 0 }];

  const maxRevenue = Math.max(...validPoints.map(p => p.revenue), 4500);

  // Generate SVG path for the area chart
  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const points = validPoints.map((pt, idx, arr) => {
    const divisor = arr.length > 1 ? arr.length - 1 : 1;
    const x = paddingX + (idx / divisor) * chartW;
    const y = height - paddingY - (pt.revenue / maxRevenue) * chartH;
    return { x, y, pt };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="rounded-xl bg-white dark:bg-[#14151F] border border-slate-200 dark:border-[#262838] p-5 shadow-sm dark:shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FF5A1F]" />
            <span>Sales Velocity &amp; Transaction Throughput</span>
          </h3>
          <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium mt-0.5">Real-time revenue stream per 2-minute rolling window</p>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 dark:bg-zinc-800 dark:text-zinc-200 font-bold dark:border-zinc-700">
          60 FPS Stream
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} className="stroke-slate-200 dark:stroke-[#272A3C]" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} className="stroke-slate-200 dark:stroke-[#272A3C]" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} className="stroke-slate-200 dark:stroke-[#272A3C]" />

          {/* Area Fill */}
          <path d={areaD} fill="url(#velocityGrad)" />

          {/* Line Stroke */}
          <path d={pathD} fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="4" className="fill-white dark:fill-[#0C0D11] stroke-[#FF5A1F]" strokeWidth="2" />
              {idx === points.length - 1 && (
                <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#FF5A1F" strokeWidth="1.5" className="animate-ping" />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-[11px] text-slate-600 dark:text-zinc-300 font-mono font-bold mt-2 px-6">
        <span>-10m</span>
        <span>-8m</span>
        <span>-6m</span>
        <span>-4m</span>
        <span>-2m</span>
        <span className="text-[#FF5A1F] font-bold">Now</span>
      </div>
    </div>
  );
}
