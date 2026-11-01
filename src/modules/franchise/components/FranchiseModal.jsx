import React, { useState } from 'react';
import { X, Sparkles, Building2, Bike, IndianRupee, Phone, CheckCircle, Send } from 'lucide-react';

export default function FranchiseModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('franchise'); // 'franchise' or 'connectBike'
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert("Thank you! Your inquiry has been sent to the Sultan team. We will call you within 24 hours.");
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              ✨
            </div>
            <div>
              <h2 className="text-lg font-black">Partner with Sultan</h2>
              <p className="text-xs text-amber-100">Grow with Andhra Pradesh & Telangana's leading rental network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/40 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-3 bg-slate-950 border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('franchise')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'franchise' ? 'bg-sultan-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> Start a Franchise (₹2L - ₹10L)
          </button>
          <button
            onClick={() => setActiveTab('connectBike')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'connectBike' ? 'bg-sultan-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4" /> Connect Your Bike (Earn Monthly)
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
          
          {activeTab === 'franchise' ? (
            <>
              {/* Franchise Perks */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-amber-300">
                <span className="font-extrabold text-sm text-white block">📈 Earn ₹30,000 - ₹60,000 / month!</span>
                <p>• Complete booking software, mobile app, and fleet management provided.</p>
                <p>• We handle marketing, customer support, and legal agreements.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Syed"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Contact Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Target City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tirupati, Kurnool, Nellore"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Investment Budget</label>
                  <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                    <option>₹2 Lakh - ₹5 Lakh</option>
                    <option>₹5 Lakh - ₹10 Lakh</option>
                    <option>₹10 Lakh+ (Mega Hub)</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Connect Bike Perks */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 text-emerald-300">
                <span className="font-extrabold text-sm text-white block">🛵 Put your idle bike to work!</span>
                <p>• Earn predictable monthly rental income from your Activa, Pulsar, or Royal Enfield.</p>
                <p>• Complete GPS tracking and verified driver security check on every rental.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Bike Model & Year</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Honda Activa 6G (2023)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Location in Kadapa</label>
                <input
                  type="text"
                  placeholder="e.g. Near Rims / Nagarajupalli / Apsara"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 font-extrabold text-white text-xs shadow-glow-orange hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Partner Inquiry</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
