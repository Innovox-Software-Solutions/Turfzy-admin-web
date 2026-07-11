"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Wallet,
  TrendingUp,
  ChevronDown,
  ShieldCheck,
  Play,
  Star,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

// Custom Turf/Soccer Pitch Icon
const TurfIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <line x1="12" y1="4" x2="12" y2="20" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

// --- Static Data Mockups matching the image ---
const statCards = [
  {
    title: "Songs Played",
    value: "1,248",
    change: "+18%",
    timeframe: "this week",
    icon: Users,
    clayClass: "clay-card-purple",
    iconClass: "clay-icon-purple",
  },
  {
    title: "Favorites",
    value: "128",
    change: "+8",
    timeframe: "this week",
    icon: TurfIcon,
    clayClass: "clay-card-peach",
    iconClass: "clay-icon-peach",
  },
  {
    title: "Hours Listened",
    value: "34.6",
    change: "+6.2",
    timeframe: "this week",
    icon: Calendar,
    clayClass: "clay-card-yellow",
    iconClass: "clay-icon-yellow",
  },
  {
    title: "Current Streak",
    value: "7",
    change: "days",
    timeframe: "in a row",
    icon: Wallet,
    clayClass: "clay-card-blue",
    iconClass: "clay-icon-blue",
  },
];

const revenueData = [
  { day: "Mon", amount: 35000 },
  { day: "Tue", amount: 75000 },
  { day: "Wed", amount: 55000 },
  { day: "Thu", amount: 105000 },
  { day: "Fri", amount: 80000 },
  { day: "Sat", amount: 142000 },
  { day: "Sun", amount: 95000 },
];

const bookingsByCity = [
  { name: "Mumbai", value: 45, color: "#9c83f3" },
  { name: "Pune", value: 25, color: "#ff8b94" },
  { name: "Thane", value: 15, color: "#ffb3ba" },
  { name: "Nashik", value: 10, color: "#fff0c7" },
  { name: "Nagpur", value: 5, color: "#bfeaff" },
];

const recentBookings = [
  {
    id: "#4587",
    turf: "Elite Arena",
    city: "Mumbai",
    price: "₹1,200",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&h=80&fit=crop&q=80",
  },
  {
    id: "#4586",
    turf: "Playground Sports",
    city: "Pune",
    price: "₹800",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1489945052260-4f21d52268b9?w=80&h=80&fit=crop&q=80",
  },
  {
    id: "#4585",
    turf: "Turf World",
    city: "Thane",
    price: "₹1,500",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1518605333140-552d48123fad?w=80&h=80&fit=crop&q=80",
  },
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

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8b5cf6] border-t-transparent" />
      </div>
    );
  }

  const formatYAxis = (value: number) => {
    if (value === 0) return "0";
    if (value >= 100000) return `₹${value / 100000}L`;
    return `₹${value / 1000}K`;
  };

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* ---------------- SECTION 1: GREETING BANNER ---------------- */}
      <div className="relative overflow-hidden clay-card-purple p-6 text-[#241c3d]">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight relative z-10">
          Good Morning, Admin!{" "}
          <span className="inline-block animate-wave">👋</span>
        </h2>
      </div>

      {/* ---------------- SECTION 2: STAT CARDS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`${card.clayClass} p-6 flex flex-col justify-between h-44`}
            >
              <div className="flex flex-col items-start gap-4">
                <div className={`h-11 w-11 flex items-center justify-center text-white ${card.iconClass}`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <div className="text-left">
                  <p className="text-[12px] font-bold text-[#5b4e79]">
                    {card.title}
                  </p>
                  <p className="text-2xl font-black text-[#241c3d] mt-1">
                    {card.value}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[11px] font-extrabold text-[#10b981]">
                  {card.change}
                </span>
                <span className="text-[11px] font-semibold text-[#8a7fa8]">
                  {card.timeframe}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- SECTION 3: CHARTS ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Revenue Overview (Bar chart cylinder) */}
        <div className="lg:col-span-8 clay-card-white p-6 flex flex-col justify-between min-h-[350px]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-extrabold text-[#241c3d]">Listening Overview</h3>
              <p className="text-[11px] text-[#8a7fa8] mt-0.5 font-semibold">Weekly booking income visualization</p>
            </div>
            {/* Filter Dropdown */}
            <button className="flex items-center gap-1.5 rounded-full border-2 border-[#f1effb] px-3.5 py-1.5 text-xs font-extrabold text-[#5b4e79] bg-white shadow-sm hover:bg-[#faf9fd] transition-colors">
              This Week
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Volumetric Cylindrical Bar Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
                  {/* Sun: Violet */}
                  <linearGradient id="barGrad-6" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#dcc4ff" />
                    <stop offset="35%" stopColor="#b695ff" />
                    <stop offset="100%" stopColor="#8157e2" />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }}
                />
                <YAxis
                  ticks={[0, 40000, 80000, 120000, 160000]}
                  tickFormatter={formatYAxis}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#5b4e79", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-3xl border-2 border-[#f1effb] bg-white px-5 py-3 shadow-[0_8px_16px_rgba(36,28,61,0.08),0_4px_0_#e4e2f2] text-center">
                          <p className="text-[9px] font-black text-[#8a7fa8] uppercase tracking-wider">Daily Revenue</p>
                          <p className="text-sm font-black text-[#241c3d] mt-1">
                            ₹{payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" shape={<CustomBar />} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings by City Donut Chart */}
        <div className="lg:col-span-4 clay-card-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#241c3d]">Top Genres</h3>
            <p className="text-[11px] text-[#8a7fa8] mt-0.5 font-semibold">Distribution of users by urban areas</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 flex-1">
            <div className="h-36 w-36 relative flex items-center justify-center flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {/* Reuse color gradients defined in Bar Chart or add specifically */}
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
                    <linearGradient id="pieGrad-3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff2be" />
                      <stop offset="100%" stopColor="#ebb118" />
                    </linearGradient>
                    <linearGradient id="pieGrad-4" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#bce9ff" />
                      <stop offset="100%" stopColor="#2c8fe5" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={bookingsByCity}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={4}
                    cornerRadius={6}
                    dataKey="value"
                  >
                    {bookingsByCity.map((entry, index) => (
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
                <p className="text-[9px] font-bold text-[#8a7fa8] uppercase tracking-wider">Total</p>
                <p className="text-base font-black text-[#241c3d]">100%</p>
              </div>
            </div>

            {/* City legends styled like Top Genres */}
            <div className="space-y-2 text-left flex-1 pl-2 w-full">
              {bookingsByCity.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-bold text-[#5b4e79]">{item.name}</span>
                  </div>
                  <span className="font-extrabold text-[#241c3d]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 4: RECENTLY PLAYED & DAILY MIX ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Recently Played (Recent Bookings) */}
        <div className="lg:col-span-7 clay-card-white p-6">
          <div className="flex items-center justify-between border-b border-[#f1effb] pb-4 mb-4">
            <h4 className="font-extrabold text-[#241c3d] text-[15px]">Recently Played</h4>
            <button className="text-[10px] font-extrabold text-[#9c83f3] hover:brightness-95 transition-all uppercase tracking-wider">
              See All
            </button>
          </div>

          <div className="space-y-4.5">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-11 w-11 overflow-hidden rounded-2xl border-2 border-[#f1effb] shadow-md flex-shrink-0 bg-purple-50">
                    <img
                      src={booking.image}
                      alt={booking.turf}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-extrabold text-[#241c3d] truncate">{booking.turf}</p>
                    <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5 truncate">{booking.city} · {booking.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-[#241c3d]">{booking.price}</p>
                    <span className="inline-block text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 mt-0.5">
                      {booking.status}
                    </span>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-white border-2 border-[#f1effb] text-[#9c83f3] shadow-[0_3px_0_#e4e2f2] flex items-center justify-center hover:bg-[#f6f4fd] transition-all active:translate-y-0.5 active:shadow-[0_1px_0_#e4e2f2]">
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Mix (Featured Venue) */}
        <div className="lg:col-span-5 clay-card-white p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#f1effb] pb-4 mb-4">
            <h4 className="font-extrabold text-[#241c3d] text-[15px]">Daily Mix</h4>
            <button className="text-[10px] font-extrabold text-[#9c83f3] hover:brightness-95 transition-all uppercase tracking-wider">
              See All
            </button>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border-3 border-[#f1effb] shadow-md flex-1 min-h-[160px] flex flex-col justify-end p-4">
            <img
              src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=250&fit=crop&q=80"
              alt="Featured Arena"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 flex items-end justify-between w-full text-left">
              <div className="text-white">
                <h5 className="text-sm font-extrabold leading-tight">Chill Vibes</h5>
                <p className="text-[10px] text-gray-300 font-bold mt-0.5">Green Field Arena · Mumbai</p>
              </div>
              <button className="h-9 w-9 rounded-full bg-white border-2 border-white text-[#9c83f3] shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- SECTION 5: DISCOVER BANNER ---------------- */}
      <div className="relative overflow-hidden clay-card-purple p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left">
          <div className="h-12 w-12 rounded-2xl bg-white border-2 border-white shadow-md flex items-center justify-center text-[#ffc5bb] flex-shrink-0 animate-bounce">
            <Star className="h-6 w-6 fill-current text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-purple-950">Discover new music</h4>
            <p className="text-xs text-purple-900 font-bold mt-0.5">Play songs we think you'll love</p>
          </div>
        </div>

        <button className="clay-btn-purple px-6 py-2.5 text-xs font-extrabold flex items-center gap-1.5 bg-white border-2 border-white text-purple-600 shadow-[0_5px_0_#7c62db] hover:brightness-105">
          Explore Now
        </button>
      </div>
    </div>
  );
}
