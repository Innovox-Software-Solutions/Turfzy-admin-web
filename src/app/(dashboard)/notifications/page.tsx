"use client";

import { useState } from "react";
import { Send, Bell, History, Users, Megaphone } from "lucide-react";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("All");

  const pastBroadcasts = [
    { id: "BRD-01", title: "Maintenance Window", message: "Platform will be down for 2 hours on Sat midnight.", target: "All", sentTime: "2 hours ago", status: "Sent" },
    { id: "BRD-02", title: "Monsoon Discounts!", message: "Get up to 20% off on all booking fees this weekend.", target: "Players", sentTime: "1 day ago", status: "Sent" },
    { id: "BRD-03", title: "Update GST Invoice details", message: "Please update your tax records before May 25.", target: "Owners", sentTime: "3 days ago", status: "Sent" },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    alert(`Broadcast Sent: "${title}" to ${target}`);
    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-[#241c3d]">Broadcast Alerts</h2>
        <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Send real-time alerts and system updates to app users and owners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Form: Compose Broadcast */}
        <form onSubmit={handleSend} className="lg:col-span-5 clay-card-white p-6 space-y-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b-2 border-[#f1effb] pb-4">
            <Megaphone className="h-5 w-5 text-purple-600" />
            <h3 className="font-extrabold text-[#241c3d]">Compose Broadcast</h3>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#5b4e79]">Target Audience</label>
            <div className="grid grid-cols-3 gap-2">
              {(["All", "Players", "Owners"] as const).map((seg) => {
                const isActive = target === seg;
                return (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => setTarget(seg)}
                    className={`py-2 text-xs font-extrabold transition-all duration-150 ${
                      isActive
                        ? "clay-btn-purple shadow-[0_4px_0_#7c62db]"
                        : "rounded-xl bg-[#f8f7fd] border-2 border-[#f1effb] text-[#5b4e79] hover:bg-[#f3effc]"
                    }`}
                  >
                    {seg}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#5b4e79]">Message Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. System Maintenance Update"
              className="w-full clay-input py-2.5 px-3.5 text-xs text-[#1e1b33]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#5b4e79]">Message Body</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message description here..."
              className="w-full clay-input py-2.5 px-3.5 text-xs text-[#1e1b33] resize-none"
            />
          </div>

          <button type="submit" className="w-full clay-btn-purple py-3 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-[0_5px_0_#7c62db] mt-4">
            <Send className="h-4 w-4" />
            Send Broadcast
          </button>
        </form>

        {/* Right List: Broadcast logs */}
        <div className="lg:col-span-7 clay-card-white p-6">
          <div className="flex items-center gap-2 border-b-2 border-[#f1effb] pb-4 mb-4">
            <History className="h-5 w-5 text-purple-600" />
            <h3 className="font-extrabold text-[#241c3d]">Broadcast History Log</h3>
          </div>

          <div className="space-y-4">
            {pastBroadcasts.map((brd) => (
              <div key={brd.id} className="p-4.5 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_4px_0_#e4e2f2] text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#241c3d]">{brd.title}</span>
                  <span className="rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 text-[9px] font-extrabold">
                    {brd.sentTime}
                  </span>
                </div>
                <p className="text-[11px] text-[#5b4e79] font-bold leading-relaxed">{brd.message}</p>
                <div className="flex items-center justify-between pt-2 border-t-2 border-[#f1effb]">
                  <span className="text-[9px] font-extrabold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded">
                    To: {brd.target}
                  </span>
                  <span className="text-[9px] font-bold text-[#8a7fa8]">{brd.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
