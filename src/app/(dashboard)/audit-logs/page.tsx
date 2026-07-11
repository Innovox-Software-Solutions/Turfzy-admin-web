"use client";

import { useState } from "react";
import { Search, Eye, Filter, Calendar } from "lucide-react";

interface AuditLogItem {
  id: string;
  adminName: string;
  action: string;
  module: "Turfs" | "Bookings" | "Fees" | "Settlements" | "Users";
  timestamp: string;
  ipAddress: string;
}

const dummyLogs: AuditLogItem[] = [
  {
    id: "LOG-001",
    adminName: "Super Admin",
    action: "Approved Green Field Arena listed under Mumbai BKC",
    module: "Turfs",
    timestamp: "May 20, 2025, 11:34 AM",
    ipAddress: "192.168.1.12",
  },
  {
    id: "LOG-002",
    adminName: "Super Admin",
    action: "Modified Base Commission Fee from 12% to 15%",
    module: "Fees",
    timestamp: "May 19, 2025, 04:12 PM",
    ipAddress: "192.168.1.12",
  },
  {
    id: "LOG-003",
    adminName: "Admin Assistant",
    action: "Initiated Settlement payout reference SET-502 to Sandeep Patil",
    module: "Settlements",
    timestamp: "May 19, 2025, 02:45 PM",
    ipAddress: "192.168.1.48",
  },
  {
    id: "LOG-004",
    adminName: "Super Admin",
    action: "Blocked user account USR-004 (Amit Kumar) due to spam reports",
    module: "Users",
    timestamp: "May 18, 2025, 09:20 AM",
    ipAddress: "192.168.1.12",
  },
];

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState<"All" | "Turfs" | "Bookings" | "Fees" | "Settlements" | "Users">("All");

  const filteredLogs = dummyLogs.filter((l) => {
    const matchesSearch =
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.adminName.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.includes(search);
    const matchesModule = moduleFilter === "All" || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-[#241c3d]">Audit Activity Logs</h2>
        <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Track and review administrative actions, system modifications, and IP addresses</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="clay-card-white p-4.5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a79fc0]" />
          <input
            type="text"
            placeholder="Search action logs, admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto py-2.5 px-1 -my-2.5">
          {(["All", "Turfs", "Bookings", "Fees", "Settlements", "Users"] as const).map((tab) => {
            const isTabActive = moduleFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setModuleFilter(tab)}
                className={`px-3 py-1.5 text-xs font-extrabold transition-all duration-150 ${
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

      {/* Responsive Logs View */}
      <div className="clay-card-white overflow-hidden p-6">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[#f1effb] pb-3">
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Log ID</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Admin Operator</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Action</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Module</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Timestamp</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1effb]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#faf9fd]/50 transition-colors text-xs">
                  <td className="py-4 font-extrabold text-[#241c3d]">{log.id}</td>
                  <td className="py-4 font-extrabold text-[#5b4e79]">{log.adminName}</td>
                  <td className="py-4 text-[#241c3d] font-bold leading-relaxed max-w-sm">{log.action}</td>
                  <td className="py-4">
                    <span className="rounded-md bg-[#f3effc] border border-purple-100 text-[#7c3aed] text-[9px] font-extrabold px-2.5 py-0.5">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-4 text-[#8a7fa8] font-bold">{log.timestamp}</td>
                  <td className="py-4 text-[#8a7fa8] font-mono font-bold">{log.ipAddress}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-extrabold text-[#8a7fa8]">
                    No system log entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-[#f1effb] space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_6px_0_#e4e2f2] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-[#241c3d]">{log.id}</span>
                <span className="rounded bg-purple-50 border border-purple-100 text-[#7c3aed] text-[9px] font-bold px-2 py-0.5">
                  {log.module}
                </span>
              </div>

              <div className="pt-3 border-t border-[#f1effb] space-y-1.5 text-left">
                <p className="text-xs font-bold text-[#5b4e79]">{log.adminName}</p>
                <p className="text-xs text-[#241c3d] font-semibold leading-relaxed">{log.action}</p>
                <p className="text-[10px] text-[#8a7fa8] flex items-center gap-1 font-bold">
                  <Calendar className="h-3 w-3" />
                  {log.timestamp}
                </p>
                <p className="text-[10px] text-[#8a7fa8] font-mono font-bold">
                  IP: {log.ipAddress}
                </p>
              </div>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="py-8 text-center text-xs font-extrabold text-[#8a7fa8]">
              No system log entries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
