import React from 'react';
import { useRealTimeSales } from './hooks/useRealTimeSales';
import Header from './components/Header';
import LiveRevenueTicker from './components/LiveRevenueTicker';
import MetricsGrid from './components/MetricsGrid';
import SalesVelocityChart from './components/SalesVelocityChart';
import LiveSalesStream from './components/LiveSalesStream';
import GlobalSalesMap from './components/GlobalSalesMap';
import TopSellingProducts from './components/TopSellingProducts';
import ActivityLog from './components/ActivityLog';

export default function App() {
  const {
    sales,
    totalRevenue,
    totalOrders,
    activeShoppers,
    velocityPoints,
    activityLogs,
    speed,
    setSpeed,
    triggerSale
  } = useRealTimeSales();

  return (
    <div className="min-h-screen bg-[#0C0D11] text-[#F5F5F7] flex flex-col selection:bg-[#FF5A1F] selection:text-white">
      {/* Sticky Header with Controls */}
      <Header
        speed={speed}
        setSpeed={setSpeed}
        onTriggerSale={triggerSale}
        activeShoppers={activeShoppers}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Real-Time Revenue Ticker Hero */}
        <LiveRevenueTicker
          totalRevenue={totalRevenue}
          totalOrders={totalOrders}
        />

        {/* 4 Core KPIs Grid */}
        <MetricsGrid
          totalRevenue={totalRevenue}
          totalOrders={totalOrders}
          activeShoppers={activeShoppers}
        />

        {/* Real-time Grid: Velocity + Sales Stream vs Global Map + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (7 cols on desktop): Live Sales Feed & Throughput */}
          <div className="lg:col-span-7 space-y-6">
            <LiveSalesStream sales={sales} />
            <SalesVelocityChart velocityPoints={velocityPoints} />
          </div>

          {/* Right Column (5 cols on desktop): Global Distribution & Leaderboards */}
          <div className="lg:col-span-5 space-y-6">
            <GlobalSalesMap sales={sales} />
            <TopSellingProducts sales={sales} />
          </div>

        </div>

        {/* Operational Real-Time Webhook Activity Log */}
        <ActivityLog activityLogs={activityLogs} />

      </main>

      {/* Bottom Technical Footer */}
      <footer className="border-t border-[#1C1E2B] bg-[#0A0B0E] py-4 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>WebSocket Gateway: Connected (Latency: 14ms)</span>
          </div>
          <span>&copy; {new Date().getFullYear()} SalesPulse Live &middot; Engineered by Belintan B.</span>
          <span className="font-mono text-[11px] text-zinc-600">Built with React + Vite + Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}

