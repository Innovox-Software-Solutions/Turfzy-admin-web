"use client";

import { useState } from "react";
import { Search, Plus, Landmark, PiggyBank, RefreshCw } from "lucide-react";

interface SettlementItem {
  id: string;
  ownerName: string;
  turfName: string;
  amount: string;
  bankName: string;
  accountNo: string;
  payoutDate: string;
  status: "Paid" | "Pending";
}

const dummySettlements: SettlementItem[] = [
  {
    id: "SET-501",
    ownerName: "Rohit Sharma",
    turfName: "Elite Arena",
    amount: "₹25,000",
    bankName: "HDFC Bank",
    accountNo: "******8921",
    payoutDate: "May 20, 2025",
    status: "Paid",
  },
  {
    id: "SET-502",
    ownerName: "Sandeep Patil",
    turfName: "Playground Sports",
    amount: "₹18,500",
    bankName: "ICICI Bank",
    accountNo: "******1204",
    payoutDate: "May 19, 2025",
    status: "Paid",
  },
  {
    id: "SET-503",
    ownerName: "Amit Verma",
    turfName: "Turf World",
    amount: "₹21,000",
    bankName: "SBI Bank",
    accountNo: "******4567",
    payoutDate: "May 19, 2025",
    status: "Paid",
  },
  {
    id: "SET-504",
    ownerName: "Vikram Singh",
    turfName: "Goal Station",
    amount: "₹15,300",
    bankName: "Axis Bank",
    accountNo: "******7890",
    payoutDate: "May 18, 2025",
    status: "Paid",
  },
  {
    id: "SET-505",
    ownerName: "Vinay Kumar",
    turfName: "Green Field Arena",
    amount: "₹12,400",
    bankName: "HDFC Bank",
    accountNo: "******9988",
    payoutDate: "May 15, 2025",
    status: "Pending",
  },
];

export default function SettlementsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Paid" | "Pending">("All");

  const filteredSettlements = dummySettlements.filter((s) => {
    const matchesSearch =
      s.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      s.turfName.toLowerCase().includes(search.toLowerCase()) ||
      s.bankName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || s.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Payout Settlements</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Manage bank transfer distributions and payout status</p>
        </div>
        <button className="clay-btn-purple px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_5px_0_#7c62db]">
          <Plus className="h-4 w-4" />
          Create Settlement
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <PiggyBank className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-955 uppercase">Pending Settlements</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">₹48,000</p>
          </div>
        </div>
        <div className="clay-card-blue p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-blue">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-950 uppercase">Settled Today</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">₹1,20,000</p>
          </div>
        </div>
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Last Sync Date</p>
            <p className="text-xs font-black text-[#241c3d] mt-1.5">2 min ago</p>
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
            placeholder="Search bank name, owner, turf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["All", "Paid", "Pending"] as const).map((tab) => {
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

      {/* Settlements Table / Cards */}
      <div className="clay-card-white overflow-hidden p-6">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#f1effb] pb-3">
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Settlement ID</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Owner</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Turf</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Bank Account</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Payout Amount</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Date</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Status</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1effb]">
              {filteredSettlements.map((s) => (
                <tr key={s.id} className="hover:bg-[#faf9fd]/50 transition-colors">
                  <td className="py-4 text-xs font-extrabold text-[#241c3d]">{s.id}</td>
                  <td className="py-4 text-xs font-bold text-[#5b4e79]">{s.ownerName}</td>
                  <td className="py-4 text-xs text-[#241c3d] font-extrabold">{s.turfName}</td>
                  <td className="py-4">
                    <p className="text-xs font-extrabold text-[#241c3d]">{s.bankName}</p>
                    <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{s.accountNo}</p>
                  </td>
                  <td className="py-4 text-xs font-black text-[#241c3d]">{s.amount}</td>
                  <td className="py-4 text-[11px] text-[#8a7fa8] font-bold">{s.payoutDate}</td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold border ${
                        s.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSettlements.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs font-extrabold text-[#8a7fa8]">
                    No settlements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-[#f1effb] space-y-4">
          {filteredSettlements.map((s) => (
            <div key={s.id} className="p-5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_6px_0_#e4e2f2] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-[#241c3d]">{s.id}</span>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${
                    s.status === "Paid"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}
                >
                  {s.status}
                </span>
              </div>

              <div className="pt-3 border-t border-[#f1effb] space-y-1.5 text-left">
                <p className="text-xs font-extrabold text-[#241c3d]">
                  {s.ownerName}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold">
                  {s.turfName}
                </p>
                <p className="text-[10px] text-[#8a7fa8] font-bold">
                  Bank: {s.bankName} ({s.accountNo})
                </p>
                <p className="text-[10px] text-[#8a7fa8] font-bold">
                  Payout Date: {s.payoutDate}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1effb]">
                <span className="text-xs font-black text-[#241c3d]">
                  {s.amount}
                </span>
                <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                  Inspect Bank Logs
                </button>
              </div>
            </div>
          ))}
          {filteredSettlements.length === 0 && (
            <div className="py-8 text-center text-xs font-extrabold text-[#8a7fa8]">
              No payouts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
