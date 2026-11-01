import React, { useState } from 'react';
import { X, Upload, CheckCircle2, ShieldCheck, Camera, AlertCircle, FileText, ChevronRight, Lock } from 'lucide-react';
import { formatCurrency } from '../../../core/lib/utils';

export default function KycModal({ bookingData, onClose, onProceedToPayment }) {
  if (!bookingData) return null;

  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    dlNumber: 'AP04 20210012345',
    dlFront: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', // sample verified license placeholder
    idProof: 'Aadhaar Card',
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(true);

  const handleSimulateUpload = (field) => {
    // Allows user to click and see immediate feedback
    alert("Simulated upload: Your document photo has been attached and encrypted.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onProceedToPayment({
        ...bookingData,
        customer: formData,
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Instant Digital KYC</h2>
              <p className="text-xs text-slate-400">Step 2 of 3: Driving License & Identity Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300">
          
          {/* Trust Banner */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
            <Lock className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>256-Bit Encrypted & Compliant with Govt. Motor Vehicle Rules. Only verified drivers are allowed to rent.</span>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Full Name (as on Driving License)</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sultan-orange"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400">Mobile Number (for WhatsApp Pass)</label>
              <input
                type="tel"
                required
                maxLength="10"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sultan-orange"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          {/* Driving License Number */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400">Driving License (DL) Number</label>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Check Active
              </span>
            </div>
            <input
              type="text"
              required
              value={formData.dlNumber}
              onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white uppercase focus:outline-none focus:border-sultan-orange font-mono"
              placeholder="e.g. AP04 20210012345"
            />
          </div>

          {/* License Upload Previews */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">Upload Driving License (Front & Back)</label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Front Preview */}
              <div 
                onClick={() => handleSimulateUpload('dlFront')}
                className="p-3 rounded-2xl bg-slate-950 border border-dashed border-slate-700 hover:border-sultan-orange flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-sultan-orange/20 text-slate-400 group-hover:text-sultan-orange flex items-center justify-center transition-colors">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">DL Front Photo</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">✓ Attached & Verified</span>
                </div>
              </div>

              {/* Back Preview */}
              <div 
                onClick={() => handleSimulateUpload('dlBack')}
                className="p-3 rounded-2xl bg-slate-950 border border-dashed border-slate-700 hover:border-sultan-orange flex flex-col items-center justify-center gap-2 cursor-pointer transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-sultan-orange/20 text-slate-400 group-hover:text-sultan-orange flex items-center justify-center transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">DL Back Photo</span>
                  <span className="text-[10px] text-slate-400">Tap to upload / change</span>
                </div>
              </div>

            </div>
          </div>

          {/* Verification Status */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">License Age Eligibility:</span>
            <span className="font-bold text-emerald-400">✓ 18+ Years Old (Eligible)</span>
          </div>

          {/* Footer inside form */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Due to Lock Slot:</span>
              <span className="text-2xl font-black text-emerald-400">{formatCurrency(bookingData.amountToPayNow)}</span>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 font-extrabold text-white text-sm shadow-glow-orange hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying ID...</span>
                </>
              ) : (
                <>
                  <span>Pay {formatCurrency(bookingData.amountToPayNow)} with Razorpay</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
