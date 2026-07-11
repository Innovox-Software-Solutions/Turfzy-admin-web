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

// Custom 3D Volumetric Cylinder Bar Shape Component
const CustomBar = (props: any) => {
  const { x, y, width, height, index } = props;
  if (!height) return null;

  const radius = width / 2;

  return (
    <g>
      {/* 3D drop shadow replica */}
      <rect
        x={x + 3}
        y={y + 4}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill="#1d1637"
        opacity={0.12}
      />
      
      {/* Main cylinder bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        ry={radius}
        fill={`url(#barGrad-${index})`}
      />
      
      {/* Glossy overlay reflection on the left side of the cylinder */}
      <rect
        x={x + 2.5}
        y={y + 3}
        width={width * 0.22}
        height={height - 6}
        rx={radius * 0.22}
        ry={radius * 0.22}
        fill="#ffffff"
        opacity={0.25}
      />
    </g>
  );
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Last 6 Months");

  const formatRevenueY = (value: number) => {
    if (value === 0) return "₹0L";
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
                  {/* Drop shadow for the line path */}
                  <filter id="clay-line-shadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#7c62db" floodOpacity="0.25" />
                  </filter>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
                <YAxis
                  ticks={[0, 950000, 1900000, 2850000, 3800000]}
                  tickFormatter={formatRevenueY}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ stroke: "#ebdffc" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-3xl border-2 border-[#f1effb] bg-white px-5 py-3 shadow-[0_8px_16px_rgba(36,28,61,0.08),0_4px_0_#e4e2f2] text-left">
                          <p className="text-xs font-black text-[#241c3d]">{data.month}</p>
                          <p className="text-[10px] font-bold text-[#8a7fa8] uppercase tracking-wider mt-1">Revenue</p>
                          <p className="text-sm font-extrabold text-purple-600 mt-0.5">
                            ₹{payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9c83f3"
                  strokeWidth={4.5}
                  fill="url(#analyticsRevenue)"
                  style={{
                    filter: "url(#clay-line-shadow)",
                  }}
                />
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
                <defs>
                  <linearGradient id="pieGrad-0" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c7b3ff" />
                    <stop offset="100%" stopColor="#7c5beb" />
                  </linearGradient>
                  <linearGradient id="pieGrad-1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffa6bc" />
                    <stop offset="100%" stopColor="#f5476a" />
                  </linearGradient>
                  <linearGradient id="pieGrad-2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffd29d" />
                    <stop offset="100%" stopColor="#e37207" />
                  </linearGradient>
                </defs>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={4}
                  cornerRadius={6}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#pieGrad-${index})`}
                      style={{
                        filter: "drop-shadow(2px 4px 5px rgba(29, 22, 55, 0.12))",
                      }}
                    />
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
              <defs>
                {/* Mon: Purple */}
                <linearGradient id="barGrad-0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c7b3ff" />
                  <stop offset="35%" stopColor="#ab8eff" />
                  <stop offset="100%" stopColor="#7c5beb" />
                </linearGradient>
                {/* Tue: Pink */}
                <linearGradient id="barGrad-1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffa6bc" />
                  <stop offset="35%" stopColor="#ff809b" />
                  <stop offset="100%" stopColor="#f5476a" />
                </linearGradient>
                {/* Wed: Orange */}
                <linearGradient id="barGrad-2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffd29d" />
                  <stop offset="35%" stopColor="#ffa048" />
                  <stop offset="100%" stopColor="#e37207" />
                </linearGradient>
                {/* Thu: Yellow */}
                <linearGradient id="barGrad-3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fff2be" />
                  <stop offset="35%" stopColor="#ffd858" />
                  <stop offset="100%" stopColor="#ebb118" />
                </linearGradient>
                {/* Fri: Green */}
                <linearGradient id="barGrad-4" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c5f2b4" />
                  <stop offset="35%" stopColor="#8fe26b" />
                  <stop offset="100%" stopColor="#5fb932" />
                </linearGradient>
                {/* Sat: Blue */}
                <linearGradient id="barGrad-5" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#bce9ff" />
                  <stop offset="35%" stopColor="#6dc5ff" />
                  <stop offset="100%" stopColor="#2c8fe5" />
                </linearGradient>
              </defs>

              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }} />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-3xl border-2 border-[#f1effb] bg-white px-5 py-3 shadow-[0_8px_16px_rgba(36,28,61,0.08),0_4px_0_#e4e2f2] text-center">
                        <p className="text-xs font-black text-[#241c3d]">{data.month}</p>
                        <p className="text-[10px] font-bold text-[#8a7fa8] uppercase tracking-wider mt-1">Bookings</p>
                        <p className="text-sm font-extrabold text-[#7c5beb] mt-0.5">
                          {payload[0].value?.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="bookings" shape={<CustomBar />} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
