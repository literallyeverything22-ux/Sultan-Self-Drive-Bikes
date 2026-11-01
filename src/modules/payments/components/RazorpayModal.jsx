import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Smartphone, CreditCard, Landmark, CheckCircle, ArrowRight } from 'lucide-react';
import { formatCurrency, generateBookingId } from '../../../core/lib/utils';
import confetti from 'canvas-confetti';

export default function RazorpayModal({ bookingData, onClose, onPaymentSuccess }) {
  if (!bookingData) return null;

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiApp, setUpiApp] = useState('gpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if not loaded
      }

      const confirmedBooking = {
        ...bookingData,
        bookingId: generateBookingId(),
        paidAmount: bookingData.amountToPayNow,
        paymentId: `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
        paymentDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        paymentTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        status: 'CONFIRMED',
      };

      onPaymentSuccess(confirmedBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0F172A] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Razorpay Brand Header */}
        <div className="p-4 bg-gradient-to-r from-[#0C2340] to-[#0A192F] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
              R
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white tracking-wide">Razorpay</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  SECURE
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Sultan Self Drive Bikes Kadapa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount Box */}
        <div className="p-5 bg-slate-950 text-center border-b border-slate-800">
          <span className="text-xs text-slate-400 block font-medium">Advance Slot Token to Pay:</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">
            {formatCurrency(bookingData.amountToPayNow)}
          </div>
          {bookingData.balanceAtPickup > 0 && (
            <span className="text-[11px] text-slate-400 mt-1 inline-block">
              Balance {formatCurrency(bookingData.balanceAtPickup)} payable at Apsara Circle counter
            </span>
          )}
        </div>

        {/* Methods */}
        <div className="p-5 space-y-4 text-xs text-slate-300">
          
          <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'upi' ? 'bg-sultan-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> UPI / QR
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'card' ? 'bg-sultan-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Cards
            </button>
            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`flex-1 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'netbanking' ? 'bg-sultan-orange text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" /> NetBanking
            </button>
          </div>

          {paymentMethod === 'upi' && (
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block">Select Instant UPI App:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gpay', name: 'Google Pay', icon: '🟢' },
                  { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                  { id: 'paytm', name: 'Paytm / UPI', icon: '🔵' },
                ].map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setUpiApp(app.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                      upiApp === app.id
                        ? 'border-sultan-orange bg-sultan-orange/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg">{app.icon}</span>
                    <span className="text-[11px]">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Card Number (4532 •••• •••• ••••)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                defaultValue="4532 8920 1823 9012"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  defaultValue="12/28"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength="3"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  defaultValue="888"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div className="space-y-2">
              <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                <option>State Bank of India (SBI)</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Andhra Pragathi Grameena Bank</option>
              </select>
            </div>
          )}

          {/* Secure badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-end 256-Bit SSL Encrypted Razorpay Gateway</span>
          </div>

        </div>

        {/* Action Button */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 font-extrabold text-white text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer transform active:scale-95"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Authorizing Advance Payment...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Simulate Pay {formatCurrency(bookingData.amountToPayNow)}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
