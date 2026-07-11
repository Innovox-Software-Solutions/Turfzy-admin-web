"use client";

import { useState } from "react";
import { Search, UserCheck, UserX, UserMinus, Plus, Mail, Phone, Calendar } from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingsCount: number;
  status: "Active" | "Blocked" | "Inactive";
  joinedDate: string;
  avatar: string;
}

const dummyUsers: UserItem[] = [
  {
    id: "USR-001",
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    phone: "+91 98765 43210",
    bookingsCount: 24,
    status: "Active",
    joinedDate: "Jan 12, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rahul",
  },
  {
    id: "USR-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98210 87654",
    bookingsCount: 18,
    status: "Active",
    joinedDate: "Feb 05, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya",
  },
  {
    id: "USR-003",
    name: "Saurabh Joshi",
    email: "saurabh.j@example.com",
    phone: "+91 91234 56789",
    bookingsCount: 5,
    status: "Inactive",
    joinedDate: "Mar 20, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Saurabh",
  },
  {
    id: "USR-004",
    name: "Amit Kumar",
    email: "amit.k@example.com",
    phone: "+91 95555 44444",
    bookingsCount: 12,
    status: "Blocked",
    joinedDate: "Apr 02, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Amit",
  },
  {
    id: "USR-005",
    name: "Neha Sharma",
    email: "neha.s@example.com",
    phone: "+91 99887 76655",
    bookingsCount: 30,
    status: "Active",
    joinedDate: "Apr 15, 2025",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Neha",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Blocked" | "Inactive">("All");

  const filteredUsers = dummyUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesFilter = filter === "All" || u.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Users Management</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Manage, audit, and inspect user profiles</p>
        </div>
        <button className="clay-btn-purple px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_5px_0_#7c62db]">
          <Plus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Active Users</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">11,200</p>
          </div>
        </div>
        <div className="clay-card-peach p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-peach">
            <UserX className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-rose-950 uppercase">Blocked Users</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">140</p>
          </div>
        </div>
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <UserMinus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-950 uppercase">Inactive Users</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">1,240</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="clay-card-white p-4.5 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a79fc0]" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto py-2.5 px-1 -my-2.5">
          {(["All", "Active", "Blocked", "Inactive"] as const).map((tab) => {
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
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">User</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Contact</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Bookings</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Joined Date</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase">Status</th>
                <th className="pb-4 text-xs font-extrabold text-[#8a7fa8] uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1effb]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#faf9fd]/50 transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-2xl border-2 border-white bg-white/40 shadow-sm flex-shrink-0">
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#241c3d]">{user.name}</p>
                      <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{user.id}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="space-y-1">
                      <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                        {user.email}
                      </p>
                      <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 text-xs font-extrabold text-[#241c3d]">
                    {user.bookingsCount} bookings
                  </td>
                  <td className="py-4 text-[11px] text-[#8a7fa8] font-bold">
                    {user.joinedDate}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold border ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : user.status === "Blocked"
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-extrabold text-[#8a7fa8]">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-[#f1effb] space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_6px_0_#e4e2f2] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-2xl border-2 border-white bg-white/40 shadow-sm flex-shrink-0">
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-extrabold text-[#241c3d]">{user.name}</p>
                      <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">{user.id}</p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-extrabold border ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : user.status === "Blocked"
                          ? "bg-rose-50 text-rose-600 border-rose-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f1effb] space-y-2 text-left">
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  {user.email}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  {user.phone}
                </p>
                <p className="text-[11px] text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  Joined {user.joinedDate}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1effb]">
                <span className="text-xs font-extrabold text-[#241c3d]">
                  {user.bookingsCount} bookings
                </span>
                <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                  Manage User
                </button>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-xs font-extrabold text-[#8a7fa8]">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
