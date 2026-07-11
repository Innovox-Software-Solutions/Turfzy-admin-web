"use client";

import { useState } from "react";
import { Search, Plus, CalendarRange, Clock, CreditCard } from "lucide-react";

interface BookingItem {
  id: string;
  userName: string;
  turfName: string;
  city: string;
  bookingDate: string;
  slotTime: string;
  price: string;
  paymentMode: "Razorpay" | "Cash";
  status: "Confirmed" | "Pending" | "Cancelled";
}

const dummyBookings: BookingItem[] = [
  {
    id: "#4587",
    userName: "Rahul Verma",
    turfName: "Elite Arena",
    city: "Mumbai",
    bookingDate: "May 20, 2025",
    slotTime: "07:00 PM - 08:00 PM",
    price: "₹1,200",
    paymentMode: "Razorpay",
    status: "Confirmed",
  },
  {
    id: "#4586",
    userName: "Priya Patel",
    turfName: "Playground Sports",
    city: "Pune",
    bookingDate: "May 20, 2025",
    slotTime: "06:00 PM - 07:00 PM",
    price: "₹800",
    paymentMode: "Cash",
    status: "Pending",
  },
  {
    id: "#4585",
    userName: "Neha Sharma",
    turfName: "Turf World",
    city: "Thane",
    bookingDate: "May 19, 2025",
    slotTime: "08:00 PM - 09:00 PM",
    price: "₹1,500",
    paymentMode: "Razorpay",
    status: "Confirmed",
  },
  {
    id: "#4584",
    userName: "Amit Kumar",
    turfName: "Goal Station",
    city: "Nashik",
    bookingDate: "May 19, 2025",
    slotTime: "05:00 PM - 06:00 PM",
    price: "₹900",
    paymentMode: "Razorpay",
    status: "Cancelled",
  },
  {
    id: "#4583",
    userName: "Saurabh Joshi",
    turfName: "Elite Arena",
    city: "Mumbai",
    bookingDate: "May 18, 2025",
    slotTime: "09:00 PM - 10:00 PM",
    price: "₹1,200",
    paymentMode: "Razorpay",
    status: "Confirmed",
  },
];

export default function BookingsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Confirmed" | "Pending" | "Cancelled">("All");

  const filteredBookings = dummyBookings.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.turfName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Bookings Management</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Audit, verify, and inspect play schedules and gateway fees</p>
        </div>
        <button className="clay-btn-purple px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_5px_0_#7c62db]">
          <Plus className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <CalendarRange className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Total Bookings</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">14,580</p>
          </div>
        </div>
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-955 uppercase">Pending Payments</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">342</p>
          </div>
        </div>
        <div className="clay-card-blue p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-blue">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-955 uppercase">Razorpay Payments</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">85%</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="clay-card-white p-4.5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a79fc0]" />
          <input
            type="text"
            placeholder="Search booking ID, user, turf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["All", "Confirmed", "Pending", "Cancelled"] as const).map((tab) => {
            const isTabActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-xs font-extrabold transition-all duration-150 ${
                  isTabActive
                    ? "clay-btn-purple shadow-[0_4px_0_#7c62db]"
                    : "rounded-xl bg-[#f8f7fd] border-2 border-[#f1effb] text-[#5b4e79] hover:bg-[#f3effc]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings View */}
      <div className="clay-card-white overflow-hidden p-6">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#f1effb] pb-3">
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Booking ID</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">User</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Turf</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Date & Slot</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Price</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Payment</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Status</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1effb]">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[#faf9fd]/50 transition-colors">
                  <td className="py-4 text-xs font-extrabold text-[#241c3d]">{booking.id}</td>
                  <td className="py-4 text-xs font-bold text-[#5b4e79]">{booking.userName}</td>
                  <td className="py-4">
                    <p className="text-xs font-extrabold text-[#241c3d]">{booking.turfName}</p>
                    <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{booking.city}</p>
                  </td>
                  <td className="py-4">
                    <p className="text-xs text-[#5b4e79] font-bold">{booking.bookingDate}</p>
                    <p className="text-[10px] text-[#8a7fa8] font-bold mt-0.5">{booking.slotTime}</p>
                  </td>
                  <td className="py-4 text-xs font-black text-[#241c3d]">{booking.price}</td>
                  <td className="py-4 text-xs text-[#8a7fa8] font-bold">{booking.paymentMode}</td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold border ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : booking.status === "Pending"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs font-extrabold text-[#8a7fa8]">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-[#f1effb] space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_6px_0_#e4e2f2] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-[#241c3d]">{booking.id}</span>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${
                    booking.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : booking.status === "Pending"
                      ? "bg-blue-50 text-blue-600 border-blue-200"
                      : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="pt-3 border-t border-[#f1effb] space-y-1.5 text-left">
                <p className="text-xs font-extrabold text-[#241c3d]">
                  {booking.userName}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold">
                  {booking.turfName} ({booking.city})
                </p>
                <p className="text-[10px] text-[#8a7fa8] font-bold">
                  Date: {booking.bookingDate} · {booking.slotTime}
                </p>
                <p className="text-[10px] text-[#8a7fa8] font-bold">
                  Payment: {booking.paymentMode}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1effb]">
                <span className="text-xs font-black text-[#241c3d]">
                  {booking.price}
                </span>
                <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                  Audit Details
                </button>
              </div>
            </div>
          ))}
          {filteredBookings.length === 0 && (
            <div className="py-8 text-center text-xs font-extrabold text-[#8a7fa8]">
              No bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
