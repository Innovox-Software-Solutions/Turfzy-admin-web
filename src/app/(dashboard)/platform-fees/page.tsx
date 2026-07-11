"use client";

import { useState } from "react";
import { DollarSign, Percent, ShieldCheck, FileText, Settings } from "lucide-react";

export default function PlatformFeesPage() {
  const [commission, setCommission] = useState(15);
  const [gatewayFee, setGatewayFee] = useState(2);
  const [gstRate, setGstRate] = useState(18);

  const mockFeeLogs = [
    { id: "TXN-901", date: "May 20, 2025", bookingId: "#4587", grossAmount: "₹1,200", commissionPaid: "₹180", gatewayCost: "₹24" },
    { id: "TXN-902", date: "May 19, 2025", bookingId: "#4585", grossAmount: "₹1,500", commissionPaid: "₹225", gatewayCost: "₹30" },
    { id: "TXN-903", date: "May 18, 2025", bookingId: "#4583", grossAmount: "₹1,200", commissionPaid: "₹180", gatewayCost: "₹24" },
  ];

  return (
    <div className="space-y-7 pb-12 text-left">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-black text-[#241c3d]">Platform Fees</h2>
        <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Configure transaction fees, billing policies, and track platform earnings</p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Card: Edit configuration */}
        <div className="lg:col-span-5 clay-card-white p-6 space-y-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b-2 border-[#f1effb] pb-4">
            <Settings className="h-5 w-5 text-purple-600" />
            <h3 className="font-extrabold text-[#241c3d]">Fee Configuration</h3>
          </div>

          {/* Commission setting */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#5b4e79]">
              <label>Platform Commission (%)</label>
              <span className="font-extrabold text-purple-600">{commission}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-2 bg-[#f1effb] rounded-lg appearance-none"
            />
            <p className="text-[10px] font-bold text-[#8a7fa8]">Rate deducted from each online booking before payouts.</p>
          </div>

          {/* Gateway charges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#5b4e79]">
              <label>Razorpay Gateway Fee (%)</label>
              <span className="font-extrabold text-[#241c3d]">{gatewayFee}%</span>
            </div>
            <input
              type="number"
              value={gatewayFee}
              onChange={(e) => setGatewayFee(Number(e.target.value))}
              className="w-full clay-input py-2 px-3.5 text-xs text-[#1e1b33]"
            />
            <p className="text-[10px] font-bold text-[#8a7fa8]">Standard credit/debit card transaction charges.</p>
          </div>

          {/* GST */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#5b4e79]">
              <label>Applicable GST Rate (%)</label>
              <span className="font-extrabold text-[#241c3d]">{gstRate}%</span>
            </div>
            <input
              type="number"
              value={gstRate}
              onChange={(e) => setGstRate(Number(e.target.value))}
              className="w-full clay-input py-2 px-3.5 text-xs text-[#1e1b33]"
            />
          </div>

          <button className="w-full clay-btn-purple py-3 text-center text-xs font-extrabold shadow-[0_5px_0_#7c62db] mt-4">
            Save Fee Configuration
          </button>
        </div>

        {/* Right Card: Earnings history logs */}
        <div className="lg:col-span-7 clay-card-white p-6">
          <div className="flex items-center justify-between border-b-2 border-[#f1effb] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h3 className="font-extrabold text-[#241c3d]">Recent Transactions Log</h3>
            </div>
          </div>

          <div className="space-y-4">
            {mockFeeLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-white rounded-3xl border-2 border-[#f1effb] shadow-[0_4px_0_#e4e2f2] text-left">
                <div>
                  <p className="text-xs font-extrabold text-[#241c3d]">{log.id} · Booking {log.bookingId}</p>
                  <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">Gross Booking Value: {log.grossAmount} · {log.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-purple-600">+{log.commissionPaid}</p>
                  <p className="text-[10px] font-bold text-[#8a7fa8] mt-0.5">Gateway cost: {log.gatewayCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
