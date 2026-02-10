import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { Users, Calendar, Wallet, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import { API_BASE_URL } from "../src/config/api";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard_stats.php`)
    // fetch("http://localhost/cmb-backend/api/dashboard_stats.php")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) {
    return <div className="p-10 text-slate-500">Loading dashboard…</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Today's Total Bookings"
          value={stats.today}
          change=""
          isPositive={true}
          icon={<Calendar size={20} />}
        />

        <StatCard
          label="Weekly Bookings"
          value={stats.weekly}
          change=""
          isPositive={true}
          icon={<Users size={20} />}
        />

        <StatCard
          label="Total Revenue Collected"
          value={`₹${stats.totalRevenue}`}
          change=""
          isPositive={true}
          icon={<Wallet size={20} />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AREA CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Revenue Performance</h4>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Booking Volume</h4>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />

                <Bar dataKey="bookings" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((_: any, index: number) => (
                    <Cell
                      key={index}
                      fill={index === stats.chartData.length - 1
                        ? '#4f46e5'
                        : '#e2e8f0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-between items-center bg-slate-50 p-4 rounded">
            <div>
              <p className="text-xs text-slate-500 uppercase">Peak Period</p>
              <p className="text-sm font-semibold">
                Last 7 Days
              </p>
            </div>
            <TrendingUp className="text-indigo-600" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
