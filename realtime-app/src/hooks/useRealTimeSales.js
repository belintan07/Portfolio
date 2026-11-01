import { useState, useEffect, useCallback, useRef } from 'react';
import { PRODUCTS, BUYERS, PAYMENT_METHODS } from '../utils/mockData';
import { sound } from '../utils/sound';

export function useRealTimeSales() {
  const [sales, setSales] = useState([]);
  const [filterType, setFilterType] = useState('all'); // 'all', 'business', 'personal'
  const [speed, setSpeed] = useState('normal'); // 'normal' (3.5s), 'surge' (1.2s), 'paused'
  const [totalRevenue, setTotalRevenue] = useState(148520.00);
  const [totalOrders, setTotalOrders] = useState(1284);
  const [activeShoppers, setActiveShoppers] = useState(84);
  const [velocityPoints, setVelocityPoints] = useState([
    { time: '12m ago', count: 18, revenue: 1420 },
    { time: '10m ago', count: 24, revenue: 1980 },
    { time: '8m ago', count: 19, revenue: 1650 },
    { time: '6m ago', count: 32, revenue: 2840 },
    { time: '4m ago', count: 29, revenue: 2410 },
    { time: '2m ago', count: 38, revenue: 3190 },
    { time: 'Now', count: 42, revenue: 3860 }
  ]);
  const [activityLogs, setActivityLogs] = useState([]);
  const nextId = useRef(100);

  // Generate a realistic sale event
  const triggerSale = useCallback((customProduct = null) => {
    const product = customProduct || PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const buyer = BUYERS[Math.floor(Math.random() * BUYERS.length)];
    const payment = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
    const qty = Math.random() > 0.85 ? 2 : 1;
    const amount = product.price * qty;

    const newSale = {
      id: `sale-${nextId.current++}`,
      product: product.name,
      category: product.category,
      type: product.type || 'business',
      icon: product.icon,
      buyer: buyer.name,
      city: buyer.city,
      country: buyer.country,
      flag: buyer.flag,
      avatar: buyer.avatar,
      amount,
      qty,
      payment: payment.name,
      paymentIcon: payment.icon,
      paymentClass: payment.color,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      epoch: Date.now()
    };

    sound.playCashChime();

    setSales(prev => [newSale, ...prev.slice(0, 24)]);
    setTotalRevenue(prev => prev + amount);
    setTotalOrders(prev => prev + 1);

    setActiveShoppers(prev => Math.max(30, prev + Math.floor(Math.random() * 5) - 2));

    const logItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      text: `${buyer.flag} ${buyer.name} bought ${qty > 1 ? `${qty}x ` : ''}${product.name} ($${amount.toFixed(2)})`,
      time: 'Just now',
      type: amount > 500 ? 'high-value' : 'sale'
    };
    setActivityLogs(prev => [logItem, ...prev.slice(0, 15)]);

    setVelocityPoints(prev => {
      if (!prev || prev.length === 0) return prev;
      const lastIdx = prev.length - 1;
      const updatedLast = {
        ...prev[lastIdx],
        count: prev[lastIdx].count + 1,
        revenue: Math.round(prev[lastIdx].revenue + amount)
      };
      return [...prev.slice(0, lastIdx), updatedLast];
    });

    return newSale;
  }, []);

  // Initialize initial recent sales
  useEffect(() => {
    const initialSales = [];
    for (let i = 0; i < 7; i++) {
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const buyer = BUYERS[Math.floor(Math.random() * BUYERS.length)];
      const payment = PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)];
      initialSales.push({
        id: `init-${i}`,
        product: product.name,
        category: product.category,
        type: product.type || 'business',
        icon: product.icon,
        buyer: buyer.name,
        city: buyer.city,
        country: buyer.country,
        flag: buyer.flag,
        avatar: buyer.avatar,
        amount: product.price,
        qty: 1,
        payment: payment.name,
        paymentIcon: payment.icon,
        paymentClass: payment.color,
        timestamp: new Date(Date.now() - (i * 12000 + 4000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        epoch: Date.now() - (i * 12000)
      });
    }
    setSales(initialSales);
  }, []);

  useEffect(() => {
    if (speed === 'paused') return;

    const intervalMs = speed === 'surge' ? 1200 : 3800;
    const timer = setInterval(() => {
      triggerSale();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [speed, triggerSale]);

  const filteredSales = filterType === 'all'
    ? sales
    : sales.filter(s => s.type === filterType);

  return {
    sales: filteredSales,
    rawSalesCount: sales.length,
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
  };
}
