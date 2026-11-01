import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Shield, Check, Plus, AlertCircle, ChevronRight, Sparkles, IndianRupee } from 'lucide-react';
import { formatCurrency, calculateDurationHours } from '../../../core/lib/utils';
import { HUBS } from '../../vehicles/data/fleetData';

export default function BookingSummaryModal({ vehicle, bookingParams, onClose, onProceedToKyc }) {
  if (!vehicle) return null;

  const [addons, setAddons] = useState({
    extraHelmet: false,
    phoneHolder: true,
    zeroDep: false,
  });

  const [paymentMode, setPaymentMode] = useState('advance'); // 'advance' (₹199) or 'full'

  const durationHours = calculateDurationHours(
    bookingParams.pickupDate,
    bookingParams.pickupTime,
    bookingParams.dropDate,
    bookingParams.dropTime
  );

  const days = Math.floor(durationHours / 24);
  const remHours = durationHours % 24;
  const baseRent = (days * vehicle.dailyRate) + (remHours * vehicle.hourlyRate);

  // Addons costs
  let addonsTotal = 0;
  if (addons.extraHelmet) addonsTotal += 50;
  if (addons.phoneHolder) addonsTotal += 30;
  if (addons.zeroDep) addonsTotal += 99;

  const fullDiscount = paymentMode === 'full' ? 50 : 0;
  const totalAmount = baseRent + addonsTotal + vehicle.securityDeposit - fullDiscount;
  
  // Advance amount is ₹199 as requested by user
  const advanceToken = 199;
  const amountToPayNow = paymentMode === 'advance' ? advanceToken : totalAmount;
  const balanceAtPickup = paymentMode === 'advance' ? (totalAmount - advanceToken) : 0;

  const hub = HUBS.find(h => h.id === bookingParams.hubId) || HUBS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sultan-orange/20 border border-sultan-orange/30 flex items-center justify-center text-xl">
              🏍️
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Customize Your Ride</h2>
              <p className="text-xs text-slate-400">Step 1 of 3: Trip details & advance selection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Selected Vehicle Snippet */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={vehicle.image} alt={vehicle.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
              <div>
                <h3 className="font-extrabold text-white text-base">{vehicle.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-semibold">{vehicle.transmission}</span>
                <p className="text-xs text-slate-400 mt-1">Free KM: {vehicle.freeKmPerDay} km/day</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Base Rental</span>
              <span className="text-base font-black text-white">{formatCurrency(baseRent)}</span>
              <span className="text-[11px] text-slate-500 block">({durationHours} hrs)</span>
            </div>
          </div>

          {/* Trip Schedule Review */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 flex items-center gap-1 font-bold">
                <Calendar className="w-3.5 h-3.5 text-sultan-orange" /> Pick-up at Hub:
              </span>
              <p className="font-bold text-white text-sm mt-0.5">
                {bookingParams.pickupDate} at {bookingParams.pickupTime}
              </p>
              <p className="text-slate-500 text-[11px]">{hub.name}</p>
            </div>

            <div>
              <span className="text-slate-400 flex items-center gap-1 font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Drop-off at Hub:
              </span>
              <p className="font-bold text-white text-sm mt-0.5">
                {bookingParams.dropDate} at {bookingParams.dropTime}
              </p>
              <p className="text-slate-500 text-[11px]">Same hub return</p>
            </div>
          </div>

          {/* Smart Addons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Optional Add-ons:</h4>
            <div className="space-y-2">
              
              <label 
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  addons.phoneHolder ? 'bg-sultan-orange/10 border-sultan-orange/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
                onClick={() => setAddons({ ...addons, phoneHolder: !addons.phoneHolder })}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${addons.phoneHolder ? 'bg-sultan-orange border-sultan-orange text-white' : 'border-slate-600'}`}>
                    {addons.phoneHolder && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Mobile Phone Holder with USB Fast Charger</span>
                    <span className="text-xs text-slate-400">Essential for Google Maps navigation around Kadapa & Gandikota</span>
                  </div>
                </div>
                <span className="font-extrabold text-white text-sm">+₹30</span>
              </label>

              <label 
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  addons.extraHelmet ? 'bg-sultan-orange/10 border-sultan-orange/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
                onClick={() => setAddons({ ...addons, extraHelmet: !addons.extraHelmet })}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${addons.extraHelmet ? 'bg-sultan-orange border-sultan-orange text-white' : 'border-slate-600'}`}>
                    {addons.extraHelmet && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Second Helmet for Pillion Rider</span>
                    <span className="text-xs text-slate-400">Sanitized ISI-certified helmet with clean disposable hairnet</span>
                  </div>
                </div>
                <span className="font-extrabold text-white text-sm">+₹50</span>
              </label>

              <label 
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  addons.zeroDep ? 'bg-sultan-orange/10 border-sultan-orange/40 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
                onClick={() => setAddons({ ...addons, zeroDep: !addons.zeroDep })}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${addons.zeroDep ? 'bg-sultan-orange border-sultan-orange text-white' : 'border-slate-600'}`}>
                    {addons.zeroDep && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Zero-Damage Waiver / Peace of Mind Cover</span>
                    <span className="text-xs text-slate-400">Covers minor scratches up to ₹3,000 without deducting from deposit</span>
                  </div>
                </div>
                <span className="font-extrabold text-white text-sm">+₹99</span>
              </label>

            </div>
          </div>

          {/* Payment Mode Selection */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Choose How You Want to Pay:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: ₹199 Advance (Requested) */}
              <div
                onClick={() => setPaymentMode('advance')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  paymentMode === 'advance'
                    ? 'border-sultan-orange bg-sultan-orange/15 shadow-glow-orange'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Most Popular
                  </span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMode === 'advance' ? 'border-sultan-orange bg-sultan-orange' : 'border-slate-600'}`}>
                    {paymentMode === 'advance' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
                <div className="text-lg font-black text-white mt-2">Pay ₹199 Advance Token</div>
                <p className="text-xs text-slate-300 mt-1">
                  Lock your bike slot now. Pay remaining {formatCurrency(balanceAtPickup)} at Apsara Circle counter.
                </p>
              </div>

              {/* Option 2: 100% Online */}
              <div
                onClick={() => setPaymentMode('full')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  paymentMode === 'full'
                    ? 'border-amber-400 bg-amber-500/15 shadow-glow-amber'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Save ₹50 Online
                  </span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMode === 'full' ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                    {paymentMode === 'full' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                </div>
                <div className="text-lg font-black text-white mt-2">Pay Full Online</div>
                <p className="text-xs text-slate-300 mt-1">
                  Express VIP handover. Zero waiting at the store counter.
                </p>
              </div>

            </div>
          </div>

          {/* Transparent Price Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Rental Charges ({durationHours} hrs)</span>
              <span className="font-semibold text-white">{formatCurrency(baseRent)}</span>
            </div>
            {addonsTotal > 0 && (
              <div className="flex justify-between text-slate-400">
                <span>Selected Add-ons</span>
                <span className="font-semibold text-white">{formatCurrency(addonsTotal)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1">
                Refundable Security Deposit
                <span className="text-[10px] text-emerald-400">(Refunded on return)</span>
              </span>
              <span className="font-semibold text-emerald-400">+{formatCurrency(vehicle.securityDeposit)}</span>
            </div>
            {fullDiscount > 0 && (
              <div className="flex justify-between text-amber-400 font-semibold">
                <span>Online Payment Discount</span>
                <span>-{formatCurrency(fullDiscount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-white">Total Trip Value</span>
              <span className="font-extrabold text-white text-base">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Due Online Right Now:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-400">{formatCurrency(amountToPayNow)}</span>
              {paymentMode === 'advance' && (
                <span className="text-xs text-slate-400">(Balance {formatCurrency(balanceAtPickup)} at Hub)</span>
              )}
            </div>
          </div>

          <button
            onClick={() => onProceedToKyc({
              vehicle,
              bookingParams,
              addons,
              paymentMode,
              baseRent,
              addonsTotal,
              securityDeposit: vehicle.securityDeposit,
              totalAmount,
              amountToPayNow,
              balanceAtPickup,
            })}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 font-extrabold text-white text-sm shadow-glow-orange hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Proceed to KYC & Pay</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
}
