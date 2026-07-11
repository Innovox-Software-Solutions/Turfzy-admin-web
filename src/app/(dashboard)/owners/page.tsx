"use client";

import { useState } from "react";
import { Search, Plus, ShieldCheck, Mail, Phone, Calendar, Landmark } from "lucide-react";

interface OwnerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  turfsOwned: number;
  totalEarnings: string;
  status: "Verified" | "Pending" | "Suspended";
  joinedDate: string;
  avatar: string;
}

const dummyOwners: OwnerItem[] = [
  {
    id: "OWN-401",
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    phone: "+91 90123 45678",
    turfsOwned: 2,
    totalEarnings: "₹3,45,000",
    status: "Verified",
    joinedDate: "Dec 10, 2024",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rohit",
  },
  {
    id: "OWN-402",
    name: "Sandeep Patil",
    email: "sandeep.patil@example.com",
    phone: "+91 93210 12345",
    turfsOwned: 1,
    totalEarnings: "₹1,85,500",
    status: "Verified",
    joinedDate: "Jan 18, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sandeep",
  },
  {
    id: "OWN-403",
    name: "Amit Verma",
    email: "amit.verma@example.com",
    phone: "+91 98888 77777",
    turfsOwned: 3,
    totalEarnings: "₹6,12,000",
    status: "Verified",
    joinedDate: "Feb 02, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amit",
  },
  {
    id: "OWN-404",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    phone: "+91 95555 66666",
    turfsOwned: 1,
    totalEarnings: "₹98,000",
    status: "Verified",
    joinedDate: "Mar 10, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Vikram",
  },
  {
    id: "OWN-405",
    name: "Vinay Kumar",
    email: "vinay.k@example.com",
    phone: "+91 97777 88888",
    turfsOwned: 2,
    totalEarnings: "₹0",
    status: "Pending",
    joinedDate: "May 01, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Vinay",
  },
];

export default function OwnersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Verified" | "Pending" | "Suspended">("All");

  const filteredOwners = dummyOwners.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    const matchesFilter = filter === "All" || o.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Owners Management</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Manage partner accounts, payouts profiles, and listing permissions</p>
        </div>
        <button className="clay-btn-purple px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_5px_0_#7c62db]">
          <Plus className="h-4 w-4" />
          Add New Owner
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Verified Owners</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">380</p>
          </div>
        </div>
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-955 uppercase">Pending Audits</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">40</p>
          </div>
        </div>
        <div className="clay-card-blue p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-blue">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-950 uppercase">Total Settlements Paid</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">₹12.4L</p>
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
            placeholder="Search owners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["All", "Verified", "Pending", "Suspended"] as const).map((tab) => {
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

      {/* Responsive View (Table / Card Grid) */}
      <div className="clay-card-white overflow-hidden p-6">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#f1effb] pb-3">
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Owner</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Contact</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Turfs Owned</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Total Earnings</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Joined Date</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Status</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1effb]">
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-[#faf9fd]/50 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-2xl border-2 border-white bg-white/40 shadow-sm flex-shrink-0">
                      <img src={owner.avatar} alt={owner.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#241c3d]">{owner.name}</p>
                      <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{owner.id}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                        {owner.email}
                      </p>
                      <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                        {owner.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 text-xs font-extrabold text-[#241c3d]">
                    {owner.turfsOwned} turfs
                  </td>
                  <td className="py-4 text-xs font-black text-[#241c3d]">
                    {owner.totalEarnings}
                  </td>
                  <td className="py-4 text-[11px] text-[#8a7fa8] font-bold">
                    {owner.joinedDate}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold border ${
                        owner.status === "Verified"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : owner.status === "Pending"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {owner.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOwners.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs font-extrabold text-[#8a7fa8]">
                    No owners found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-[#f1effb] space-y-4">
          {filteredOwners.map((owner) => (
            <div key={owner.id} className="p-5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_6px_0_#e4e2f2] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-2xl border-2 border-white bg-white/40 shadow-sm flex-shrink-0">
                  <img src={owner.avatar} alt={owner.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-extrabold text-[#241c3d]">{owner.name}</p>
                      <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{owner.id}</p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${
                        owner.status === "Verified"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : owner.status === "Pending"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-rose-50 text-rose-600 border-rose-200"
                      }`}
                    >
                      {owner.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f1effb] space-y-2 text-left">
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  {owner.email}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  {owner.phone}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  Joined {owner.joinedDate}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1effb]">
                <div className="text-left">
                  <p className="text-[9px] text-[#8a7fa8] font-bold uppercase leading-none">Earnings</p>
                  <p className="text-xs font-black text-[#241c3d] mt-1">{owner.totalEarnings}</p>
                </div>
                <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                  Configure Owner
                </button>
              </div>
            </div>
          ))}
          {filteredOwners.length === 0 && (
            <div className="py-8 text-center text-xs font-extrabold text-[#8a7fa8]">
              No owners found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
