"use client";

import { useState } from "react";
import { Settings, Shield, CreditCard, HelpCircle, Save } from "lucide-react";

export default function SettingsPage() {
  const [appName, setAppName] = useState("Turfzy");
  const [supportEmail, setSupportEmail] = useState("support@turfzy.com");
  const [razorpayMode, setRazorpayMode] = useState("Sandbox");

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-[#241c3d]">Global Settings</h2>
        <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Manage portal preferences, security levels, and payment gateway keys</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Side: Navigation segments (mocked list) */}
        <div className="lg:col-span-4 clay-card-white p-5 space-y-2">
          <button className="w-full flex items-center gap-3 clay-btn-purple text-xs py-3 px-4 font-extrabold shadow-[0_4px_0_#7c62db]">
            <Settings className="h-4 w-4" />
            General Information
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl text-[#5b4e79] hover:bg-[#f6f4fd] px-4 py-3 text-xs font-extrabold transition-all border-2 border-transparent">
            <CreditCard className="h-4 w-4 text-[#8a7fa8]" />
            Payment Gateway
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl text-[#5b4e79] hover:bg-[#f6f4fd] px-4 py-3 text-xs font-extrabold transition-all border-2 border-transparent">
            <Shield className="h-4 w-4 text-[#8a7fa8]" />
            Security & MFA
          </button>
          <button className="w-full flex items-center gap-3 rounded-xl text-[#5b4e79] hover:bg-[#f6f4fd] px-4 py-3 text-xs font-extrabold transition-all border-2 border-transparent">
            <HelpCircle className="h-4 w-4 text-[#8a7fa8]" />
            Support Desk
          </button>
        </div>

        {/* Right Side: Configuration details */}
        <div className="lg:col-span-8 clay-card-white p-6 space-y-6">
          <div className="flex items-center gap-2 border-b-2 border-[#f1effb] pb-4">
            <Settings className="h-5 w-5 text-purple-600" />
            <h3 className="font-extrabold text-[#241c3d]">General Preferences</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#5b4e79]">Platform/App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full clay-input py-2.5 px-3.5 text-xs text-[#1e1b33]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#5b4e79]">System Contact Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full clay-input py-2.5 px-3.5 text-xs text-[#1e1b33]"
              />
            </div>
          </div>

          <div className="space-y-2 border-t-2 border-[#f1effb] pt-4">
            <label className="text-xs font-bold text-[#5b4e79]">Payment Gateway Environment</label>
            <div className="flex gap-3 mt-1">
              {["Sandbox", "Live Production"].map((mode) => {
                const isActive = razorpayMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setRazorpayMode(mode)}
                    className={`px-4 py-2 text-xs font-extrabold transition-all duration-150 ${
                      isActive
                        ? "clay-btn-purple shadow-[0_4px_0_#7c62db]"
                        : "rounded-xl bg-[#f8f7fd] border-2 border-[#f1effb] text-[#5b4e79] hover:bg-[#f3effc]"
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t-2 border-[#f1effb]">
            <button className="flex items-center gap-2 clay-btn-purple px-5 py-3 text-xs font-extrabold shadow-[0_5px_0_#7c62db]">
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
