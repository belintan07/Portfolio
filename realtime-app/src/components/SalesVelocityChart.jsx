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
    <div className="rounded-xl bg-[#14151F] border border-[#262838] p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FF5A1F]" />
            <span>Sales Velocity &amp; Transaction Throughput</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">Real-time revenue stream per 2-minute rolling window</p>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
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
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#272A3C" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#272A3C" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#272A3C" />

          {/* Area Fill */}
          <path d={areaD} fill="url(#velocityGrad)" />

          {/* Line Stroke */}
          <path d={pathD} fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="4" fill="#0C0D11" stroke="#FF5A1F" strokeWidth="2" />
              {idx === points.length - 1 && (
                <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#FF5A1F" strokeWidth="1.5" className="animate-ping" />
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-[11px] text-zinc-500 font-mono mt-2 px-6">
        {velocityPoints.map((pt, idx) => (
          <span key={idx}>{pt.time}</span>
        ))}
      </div>
    </div>
  );
}

