"use client";

import { useState } from "react";
import { Search, MapPin, Plus, Star, ShieldAlert, Sparkles } from "lucide-react";

interface TurfItem {
  id: string;
  name: string;
  location: string;
  city: "Mumbai" | "Pune" | "Thane" | "Nashik";
  pricePerHour: number;
  rating: number;
  status: "Approved" | "Pending";
  ownerName: string;
  image: string;
  sports: string[];
}

const dummyTurfs: TurfItem[] = [
  {
    id: "TRF-201",
    name: "Elite Arena",
    location: "Andheri West",
    city: "Mumbai",
    pricePerHour: 1200,
    rating: 4.8,
    status: "Approved",
    ownerName: "Rohit Sharma",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&h=300&fit=crop&q=80",
    sports: ["Football", "Cricket"],
  },
  {
    id: "TRF-202",
    name: "Playground Sports",
    location: "Kothrud",
    city: "Pune",
    pricePerHour: 800,
    rating: 4.5,
    status: "Approved",
    ownerName: "Sandeep Patil",
    image: "https://images.unsplash.com/photo-1489945052260-4f21d52268b9?w=500&h=300&fit=crop&q=80",
    sports: ["Football", "Basketball"],
  },
  {
    id: "TRF-203",
    name: "Turf World",
    location: "Ghodbunder Road",
    city: "Thane",
    pricePerHour: 1500,
    rating: 4.9,
    status: "Approved",
    ownerName: "Amit Verma",
    image: "https://images.unsplash.com/photo-1518605333140-552d48123fad?w=500&h=300&fit=crop&q=80",
    sports: ["Football", "Cricket", "Tennis"],
  },
  {
    id: "TRF-204",
    name: "Goal Station",
    location: "Nashik Road",
    city: "Nashik",
    pricePerHour: 900,
    rating: 4.2,
    status: "Approved",
    ownerName: "Vikram Singh",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=500&h=300&fit=crop&q=80",
    sports: ["Football"],
  },
  {
    id: "TRF-205",
    name: "Green Field Arena",
    location: "Bandra Kurla Complex",
    city: "Mumbai",
    pricePerHour: 2000,
    rating: 0.0,
    status: "Pending",
    ownerName: "Vinay Kumar",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=500&h=300&fit=crop&q=80",
    sports: ["Cricket", "Football"],
  },
  {
    id: "TRF-206",
    name: "Victory Turf",
    location: "Hinjewadi Phase 2",
    city: "Pune",
    pricePerHour: 1000,
    rating: 0.0,
    status: "Pending",
    ownerName: "Milind Soman",
    image: "https://images.unsplash.com/photo-1524191632731-067f967cc996?w=500&h=300&fit=crop&q=80",
    sports: ["Football", "Cricket"],
  },
];

export default function TurfsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Pending">("All");
  const [cityFilter, setCityFilter] = useState<"All" | "Mumbai" | "Pune" | "Thane" | "Nashik">("All");

  const filteredTurfs = dummyTurfs.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesCity = cityFilter === "All" || t.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Turfs Management</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Manage arena listings, rates, and approval applications</p>
        </div>
        <button className="clay-btn-purple px-5 py-2.5 text-xs font-extrabold flex items-center gap-1.5 shadow-[0_5px_0_#7c62db]">
          <Plus className="h-4 w-4" />
          Add New Turf
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clay-card-purple p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-purple">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#5b4e79] uppercase">Total Listed</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">865</p>
          </div>
        </div>
        <div className="clay-card-blue p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-blue">
            <Star className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-blue-950 uppercase">Approved</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">820</p>
          </div>
        </div>
        <div className="clay-card-yellow p-5 flex items-center gap-4 text-[#241c3d]">
          <div className="h-10 w-10 flex items-center justify-center text-white clay-icon-yellow">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-955 uppercase">Pending Review</p>
            <p className="text-xl font-black text-[#241c3d] mt-0.5">45</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="clay-card-white p-4.5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a79fc0]" />
            <input
              type="text"
              placeholder="Search turfs, location, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto py-2.5 px-1 -my-2.5">
            {(["All", "Approved", "Pending"] as const).map((tab) => {
              const isTabActive = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
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

        {/* City Filter Tags */}
        <div className="flex flex-wrap gap-2 pt-3 border-t-2 border-[#f1effb]">
          <span className="text-xs font-extrabold text-[#8a7fa8] self-center mr-2">City:</span>
          {(["All", "Mumbai", "Pune", "Thane", "Nashik"] as const).map((city) => {
            const isCityActive = cityFilter === city;
            return (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all duration-150 ${
                  isCityActive
                    ? "bg-[#ffe0dd] border-2 border-[#fff0ee] text-rose-950 shadow-[0_3px_0_#f9c2bd]"
                    : "bg-white text-[#5b4e79] border-2 border-[#ece8f8] hover:bg-[#f8f7fd]"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Turf Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {filteredTurfs.map((turf) => (
          <div
            key={turf.id}
            className="clay-card-white overflow-hidden flex flex-col"
          >
            {/* Visual Header */}
            <div className="relative h-44 w-full bg-purple-50 overflow-hidden rounded-t-[1.5rem]">
              <img src={turf.image} alt={turf.name} className="h-full w-full object-cover" />
              
              {/* Badge Status */}
              <span className={`absolute top-4 right-4 rounded-full px-2.5 py-1 text-[9px] font-extrabold shadow-md border ${
                turf.status === "Approved"
                  ? "bg-emerald-500 text-white border-emerald-300"
                  : "bg-amber-500 text-white border-amber-300 animate-pulse"
              }`}>
                {turf.status}
              </span>

              {/* Price Tag */}
              <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white rounded-lg px-2.5 py-1 text-[10px] font-black">
                ₹{turf.pricePerHour.toLocaleString()}/hr
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-extrabold text-[#241c3d] line-clamp-1">{turf.name}</h3>
                  {turf.rating > 0 && (
                    <div className="flex items-center gap-1 text-[11px] font-black text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{turf.rating}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#5b4e79] font-bold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#a79fc0] flex-shrink-0" />
                  {turf.location}, {turf.city}
                </p>

                <p className="text-[11px] text-[#8a7fa8] font-bold">
                  Owner: <span className="font-extrabold text-[#5b4e79]">{turf.ownerName}</span>
                </p>
              </div>

              {/* Sports tags & actions */}
              <div className="pt-3 border-t-2 border-[#f1effb] flex items-center justify-between">
                <div className="flex gap-1">
                  {turf.sports.map((sport) => (
                    <span key={sport} className="rounded-md bg-purple-50 border border-purple-100 text-[#7c3aed] text-[9px] font-bold px-2 py-0.5">
                      {sport}
                    </span>
                  ))}
                </div>
                <button className="clay-btn-purple py-1.5 px-4 text-xs font-extrabold shadow-[0_4px_0_#7c62db]">
                  Edit Turf
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTurfs.length === 0 && (
          <div className="col-span-full clay-card-white p-12 text-center text-xs font-extrabold text-[#8a7fa8]">
            No turfs found matching your filter selection.
          </div>
        )}
      </div>
    </div>
  );
}
