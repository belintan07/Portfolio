import React, { useState, useEffect } from 'react';
import { useRealTimeSales } from './hooks/useRealTimeSales';
import Header from './components/Header';
import LiveRevenueTicker from './components/LiveRevenueTicker';
import MetricsGrid from './components/MetricsGrid';
import SalesVelocityChart from './components/SalesVelocityChart';
import LiveSalesStream from './components/LiveSalesStream';
import GlobalSalesMap from './components/GlobalSalesMap';
import TopSellingProducts from './components/TopSellingProducts';
import ActivityLog from './components/ActivityLog';
import ProfileCard from './components/ProfileCard';
import NeonLogo from './components/NeonLogo';
import FadeContent from './components/FadeContent';

export default function App() {
  const {
    sales,
    rawSalesCount,
    filterType,
    setFilterType,
    totalRevenue,
    totalOrders,
    activeShoppers,
    velocityPoints,
    activityLogs,
    speed,
    setSpeed,
    triggerSale
  } = useRealTimeSales();

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('salespulse_theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('salespulse_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0C0D11] text-slate-800 dark:text-[#F5F5F7] flex flex-col selection:bg-[#FF5A1F] selection:text-white transition-colors duration-200">
      {/* Sticky Header with Controls */}
      <Header
        speed={speed}
        setSpeed={setSpeed}
        onTriggerSale={triggerSale}
        activeShoppers={activeShoppers}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
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
            <LiveSalesStream
              sales={sales}
              rawSalesCount={rawSalesCount}
              filterType={filterType}
              setFilterType={setFilterType}
            />
            <SalesVelocityChart velocityPoints={velocityPoints} />
          </div>

          {/* Right Column (5 cols on desktop): Global Distribution & Leaderboards */}
          <div className="lg:col-span-5 space-y-6">
            <GlobalSalesMap sales={sales} />
            <TopSellingProducts sales={sales} />
          </div>

        </div>

        {/* Operational Real-Time Webhook Activity Log */}
        <FadeContent effect="focus" duration={1.2} threshold={0.1}>
          <ActivityLog activityLogs={activityLogs} />
        </FadeContent>

        {/* System Architect & Engineer Profile Card Spotlight */}
        <FadeContent effect="mist" duration={1.6} ease="power2.out" threshold={0.15}>
          <section className="rounded-2xl border border-slate-200 dark:border-[#222436] bg-white/80 dark:bg-[#10121A]/80 backdrop-blur-md p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm dark:shadow-2xl transition-colors">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FF5A1F]/10 text-[#FF5A1F] border border-[#FF5A1F]/20">
                <span>✦</span>
                <span>SYSTEM ARCHITECT &amp; LEAD ENGINEER</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  Engineered by
                </span>
                <div className="w-full h-24 sm:h-28 -my-2 relative" style={{ minHeight: '90px' }}>
                  <NeonLogo
                    text="Belintan B."
                    fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                    fontWeight={800}
                    scale={0.88}
                    colors={['#ffc9f4', '#ea6fe0', '#d351b6', '#a6f3fa', '#6fd6f7', '#5aaef0', '#2b4bb8', '#121646']}
                    baseColor={theme === 'dark' ? '#F48936' : '#FF5A1F'}
                    heat={0.5}
                    radius={1.5}
                    softness={0.25}
                    swell={0.1}
                    idle="drift"
                    speed={2}
                    igniteOnClick={true}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                Architected with high-frequency WebSocket event pipelines, distributed state synchronization, and reactive UI components. Tilt or hover over the holographic verification card to inspect contact credentials.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="mailto:belintan07@gmail.com"
                  className="px-4 py-2 rounded-lg bg-[#FF5A1F] hover:bg-[#E0470E] text-white font-bold text-xs shadow-md shadow-[#FF5A1F]/20 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Get in Touch</span>
                  <span>&rarr;</span>
                </a>
                <a
                  href="https://linkedin.com/in/belintanben"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-zinc-700 hover:border-slate-400 dark:hover:border-zinc-500 text-slate-800 dark:text-zinc-200 font-bold text-xs transition-all inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-xs">&#8599;</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center p-2">
              <ProfileCard
                name="Belintan B."
                title="Lead Full-Stack &amp; Systems Engineer"
                handle="belintanben"
                status="Available for Hire"
                statusColor="#22c55e"
                contactText="Email Me"
                avatarUrl="/belintan-hero.jpg"
                miniAvatarUrl="/belintan-hero.jpg"
                holo={0.85}
                glare={0.6}
                tiltStrength={14}
                parallax={10}
                radius={16}
                enableTilt={true}
                intro={true}
                showUserInfo={true}
                theme={theme === 'dark' ? 'dark' : 'light'}
                onContactClick={() => {
                  window.location.href = 'mailto:belintan07@gmail.com';
                }}
              />
            </div>
          </section>
        </FadeContent>

      </main>

      {/* Bottom Technical Footer */}
      <footer className="border-t border-slate-200 dark:border-[#1C1E2B] bg-white dark:bg-[#0A0B0E] py-4 text-center text-xs text-slate-700 dark:text-zinc-300 font-medium transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>WebSocket Gateway: Connected (Latency: 14ms)</span>
          </div>
          <span>&copy; {new Date().getFullYear()} SalesPulse Live &middot; Engineered by Belintan B.</span>
          <span className="font-mono text-[11px] text-slate-600 dark:text-zinc-400 font-medium">Separated: Business SaaS &amp; Personal Commerce Tracks</span>
        </div>
      </footer>
    </div>
  );
}
