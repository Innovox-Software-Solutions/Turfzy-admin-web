"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { CalendarRange, Activity, Sparkles, TrendingUp, ChevronDown } from "lucide-react";

const monthlyBookings = [
  { month: "Jan", bookings: 1200, revenue: 1400000 },
  { month: "Feb", bookings: 1500, revenue: 1800000 },
  { month: "Mar", bookings: 1800, revenue: 2200000 },
  { month: "Apr", bookings: 2400, revenue: 2900000 },
  { month: "May", bookings: 3100, revenue: 3800000 },
  { month: "Jun", bookings: 2800, revenue: 3400000 },
];

const categoryData = [
  { name: "5-a-side", value: 55, color: "#9c83f3" },
  { name: "7-a-side", value: 30, color: "#ff8b94" },
  { name: "11-a-side", value: 15, color: "#ffb3ba" },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Last 6 Months");

  const formatRevenueY = (value: number) => {
    return `₹${value / 100000}L`;
  };

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">System Analytics</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Audit transaction growth, bookings frequency, and popular turf formats</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-full border-2 border-[#f1effb] px-4 py-2.5 text-xs font-extrabold text-[#5b4e79] bg-white shadow-sm hover:bg-[#faf9fd] transition-all duration-150">
          {timeframe}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Conversion Rate</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">4.8%</p>
          </div>
        </div>
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-955 uppercase">YoY Revenue Growth</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">+24.5%</p>
          </div>
        </div>
        <div className="clay-card-blue p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-blue">
            <CalendarRange className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-950 uppercase">Avg Slot Pricing</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">₹1,150</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Revenue Growth Area Chart */}
        <div className="lg:col-span-8 clay-card-white p-6 flex flex-col justify-between min-h-[350px]">
          <div>
            <h3 className="text-base font-extrabold text-[#241c3d]">Revenue Performance</h3>
            <p className="text-[11px] text-[#8a7fa8] mt-0.5 font-semibold">Historical booking income values</p>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyBookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9c83f3" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9c83f3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
                <YAxis tickFormatter={formatRevenueY} tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
                <Tooltip cursor={{ stroke: "#ebdffc" }} />
                <Area type="monotone" dataKey="revenue" stroke="#9c83f3" strokeWidth={3} fill="url(#analyticsRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Turf Category Popularity Pie Chart */}
        <div className="lg:col-span-4 clay-card-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#241c3d]">Turf Formats</h3>
            <p className="text-[11px] text-[#8a7fa8] mt-0.5 font-semibold">Preferred pitch sizing and configurations</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="text-xs font-black text-[#241c3d]">Category</p>
              <p className="text-[10px] text-[#8a7fa8] font-extrabold">Split</p>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-4 border-t-2 border-[#f1effb]">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.color }} />
                  <span className="font-bold text-[#5b4e79]">{c.name}</span>
                </div>
                <span className="font-extrabold text-[#241c3d]">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Frequency Bar Chart */}
      <div className="clay-card-white p-6 min-h-[300px]">
        <div>
          <h3 className="text-base font-extrabold text-[#241c3d]">Booking Counts</h3>
          <p className="text-[11px] text-[#8a7fa8] mt-0.5 font-semibold">Total tickets scheduled monthly</p>
        </div>

        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyBookings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
              <Tooltip cursor={{ fill: "#fbfafc" }} />
              <Bar dataKey="bookings" radius={[8, 8, 8, 8]} barSize={24}>
                {monthlyBookings.map((entry, index) => {
                  const colors = ["#9c83f3", "#ff8b94", "#ffb3ba", "#fff0c7", "#bfeaff", "#ffc9c2"];
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
