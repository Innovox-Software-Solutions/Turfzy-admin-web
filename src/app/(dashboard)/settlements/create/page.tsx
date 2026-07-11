"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Search, Landmark, AlertCircle } from "lucide-react";
import { useSettlementsStore } from "@/store/settlements.store";
import { ownersService } from "@/services/owners.service";

interface OwnerItem {
  id: string;
  name: string;
  phone: string;
  contactNumber?: string;
}

export default function CreateSettlementPage() {
  const router = useRouter();
  const { createManualSettlement, isActionLoading, error } = useSettlementsStore();

  const [owners, setOwners] = useState<OwnerItem[]>([]);
  const [isOwnersLoading, setIsOwnersLoading] = useState(false);
  const [ownerSearch, setOwnerSearch] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");

  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("");
  const [bookingCount, setBookingCount] = useState("");
  const [notes, setNotes] = useState("");
  const [formValidationError, setFormValidationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnersList = async () => {
      setIsOwnersLoading(true);
      try {
        const response = await ownersService.getOwners({
          search: ownerSearch || undefined,
          status: "active",
          limit: 30,
        });
        if (response.success && response.data.owners) {
          const list = response.data.owners.map((o: any) => ({
            id: o.profile?.id || o.id,
            name: o.profile?.name || "Unnamed Owner",
            phone: o.profile?.contactNumber || o.phone || "",
          }));
          setOwners(list);
        }
      } catch (err) {
        console.error("Failed to load owners", err);
      } finally {
        setIsOwnersLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchOwnersList();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [ownerSearch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormValidationError(null);

    if (!selectedOwnerId) {
      setFormValidationError("Please select a turf owner/partner.");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      setFormValidationError("Please enter a valid payout amount (minimum ₹1).");
      return;
    }

    const numBookingCount = bookingCount ? parseInt(bookingCount) : undefined;

    const payload = {
      ownerProfileId: selectedOwnerId,
      amount: numAmount,
      period: period || undefined,
      bookingCount: numBookingCount,
      notes: notes || undefined,
    };

    const success = await createManualSettlement(payload);
    if (success) {
      router.push("/settlements");
    }
  };

  return (
    <div className="space-y-7 pb-12 text-left max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/settlements" className="p-2 rounded-xl bg-[#f8f7fd] border-2 border-[#f1effb] hover:bg-[#f3effc] transition-colors">
          <ArrowLeft className="h-4.5 w-4.5 text-[#5b4e79]" />
        </Link>
        <div>
          <h2 className="text-2xl font-black text-[#241c3d]">Create Settlement</h2>
          <p className="text-xs text-[#8a7fa8] mt-0.5 font-bold">Initiate a manual payout entry for a verified partner</p>
        </div>
      </div>

      <div className="clay-card-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Owner Profile Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-[#5b4e79] uppercase tracking-wider">Select Owner / Partner</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a79fc0] pointer-events-none" />
              <input
                type="text"
                placeholder="Search owner by name..."
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
                className="w-full clay-input py-2 pl-10 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
              />
            </div>

            <div className="mt-2.5 max-h-40 overflow-y-auto border-2 border-[#f1effb] rounded-2xl p-1 bg-[#f8f7fd] space-y-1 no-scrollbar">
              {isOwnersLoading ? (
                <p className="text-[10px] text-[#8a7fa8] font-bold py-3 text-center animate-pulse">Searching accounts...</p>
              ) : owners.length === 0 ? (
                <p className="text-[10px] text-[#8a7fa8] font-bold py-3 text-center">No active owners found.</p>
              ) : (
                owners.map((owner) => (
                  <button
                    type="button"
                    key={owner.id}
                    onClick={() => {
                      setSelectedOwnerId(owner.id);
                      setOwnerSearch(owner.name);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex justify-between items-center ${
                      selectedOwnerId === owner.id
                        ? "bg-purple-100 text-purple-700"
                        : "hover:bg-white text-[#5b4e79]"
                    }`}
                  >
                    <span>{owner.name}</span>
                    <span className="text-[10px] text-[#8a7fa8]">{owner.phone}</span>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Amount */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#5b4e79] uppercase tracking-wider">Payout Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-[#8a7fa8]">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full clay-input py-2.5 pl-7 pr-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
                  required
                />
              </div>
            </div>

            {/* Booking Count */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-[#5b4e79] uppercase tracking-wider">Bookings Count (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 15"
                value={bookingCount}
                onChange={(e) => setBookingCount(e.target.value)}
                className="w-full clay-input py-2.5 px-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
              />
            </div>
          </div>

          {/* Period */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-[#5b4e79] uppercase tracking-wider">Settlement Period (Optional)</label>
            <input
              type="text"
              placeholder="e.g. 2026-06-01 to 2026-06-07"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full clay-input py-2.5 px-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-[#5b4e79] uppercase tracking-wider">Administrative Notes</label>
            <textarea
              placeholder="Enter details like transaction notes, IMPS descriptions..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full clay-input py-2.5 px-4 text-xs text-[#1e1b33] placeholder:text-[#a79fc0]"
            />
          </div>

          {/* Validation/API error message */}
          {(formValidationError || error) && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-2 text-rose-700 text-xs font-bold">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{formValidationError || error}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-[#f1effb]">
            <Link
              href="/settlements"
              className="px-5 py-2.5 text-xs font-extrabold text-[#5b4e79] rounded-full hover:bg-[#f8f7fd] border-2 border-[#f1effb] text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isActionLoading}
              className="clay-btn-purple px-6 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-[0_5px_0_#7c62db] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {isActionLoading ? "Submitting..." : "Submit Settlement"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
