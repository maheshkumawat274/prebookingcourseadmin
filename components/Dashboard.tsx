
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Users, Calendar, Wallet, TrendingUp } from 'lucide-react';
import StatCard from './StatCard';
import { CHART_DATA } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="Today's Total Bookings" 
          value="42" 
          change="12%" 
          isPositive={true}
          icon={<Calendar size={20} />}
        />
        <StatCard 
          label="Weekly Bookings" 
          value="254" 
          change="8.2%" 
          isPositive={true}
          icon={<Users size={20} />}
        />
        <StatCard 
          label="Total Revenue Collected" 
          value="$12,850.00" 
          change="3.1%" 
          isPositive={false}
          icon={<Wallet size={20} />}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Revenue Performance</h4>
              <p className="text-sm text-slate-500">Daily revenue trends for the current week</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center text-indigo-600 font-medium">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1.5"></div>
                Revenue
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-semibold text-slate-900 mb-2">Booking Volume</h4>
          <p className="text-sm text-slate-500 mb-6">Total number of bookings per day</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                  }}
                />
                <Bar dataKey="bookings" radius={[4, 4, 0, 0]}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 4 ? '#4f46e5' : '#e2e8f0'} 
                      className="hover:fill-indigo-400 transition-colors"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Peak Day</p>
              <p className="text-sm font-semibold text-slate-900">Friday (30 Bookings)</p>
            </div>
            <TrendingUp size={20} className="text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
