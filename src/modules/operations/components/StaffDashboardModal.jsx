import React, { useState } from 'react';
import { X, Wrench, Shield, CheckCircle2, Camera, Gauge, Fuel, QrCode, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../../core/lib/utils';

export default function StaffDashboardModal({ onClose, activeBookings = [] }) {
  const [selectedBooking, setSelectedBooking] = useState(activeBookings[0] || null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'handover', 'return'
  
  // Handover state
  const [startKm, setStartKm] = useState('14250');
  const [fuelLevel, setFuelLevel] = useState('Full (100%)');
  const [photosTaken, setPhotosTaken] = useState({ front: true, back: true, left: true, right: true });
  const [isHandedOver, setIsHandedOver] = useState(false);

  // Return state
  const [returnKm, setReturnKm] = useState('14380');
  const [returnFuel, setReturnFuel] = useState('Full (100%)');
  const [isReturned, setIsReturned] = useState(false);

  // Calculation for return
  const startKmNum = parseInt(startKm) || 14250;
  const returnKmNum = parseInt(returnKm) || 14380;
  const drivenKm = Math.max(0, returnKmNum - startKmNum);
  const freeKm = 120;
  const excessKm = Math.max(0, drivenKm - freeKm);
  const excessCharge = excessKm * 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Apsara Circle Store Operations</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  STAFF MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage vehicle inspection, key handovers, and return refunds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Navigation Bar inside modal */}
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-sultan-orange text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              📋 All Bookings ({activeBookings.length})
            </button>
            <button
              onClick={() => setViewMode('handover')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'handover' ? 'bg-sultan-orange text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              🔑 Vehicle Handover & Scratch Inspector
            </button>
            <button
              onClick={() => setViewMode('return')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'return' ? 'bg-sultan-orange text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              🏁 Vehicle Return & Deposit Refund
            </button>
          </div>

          {/* VIEW: All Bookings List */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {activeBookings.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-3xl block mb-2">🛵</span>
                  <p className="font-bold text-white">No active bookings yet</p>
                  <p className="text-xs text-slate-400 mt-1">Book a bike on the website to see it appear here in real-time!</p>
                </div>
              ) : (
                activeBookings.map((b) => (
                  <div key={b.bookingId} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">{b.bookingId}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                          Advance Paid ₹{b.paidAmount}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-white text-base mt-1">{b.vehicle?.name}</h4>
                      <p className="text-xs text-slate-400">
                        Customer: <strong className="text-slate-200">{b.customer?.fullName}</strong> ({b.customer?.phone}) • DL: <span className="font-mono text-emerald-400">{b.customer?.dlNumber}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setViewMode('handover');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-sultan-orange hover:bg-sultan-orangeHover text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        Handover Keys →
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setViewMode('return');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer"
                      >
                        Return Flow
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* VIEW: Handover Flow */}
          {viewMode === 'handover' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Inspecting Vehicle:</span>
                  <h3 className="font-black text-white text-lg">{selectedBooking?.vehicle?.name || 'Suzuki Burgman Street 125'}</h3>
                  <span className="text-xs text-amber-400 font-mono">Slot ID: {selectedBooking?.bookingId || 'SLT-DEMO'}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Collect at Counter:</span>
                  <span className="text-xl font-black text-white">₹{selectedBooking?.balanceAtPickup || 350}</span>
                </div>
              </div>

              {/* 4 Photos Inspector */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Mandatory 4-Angle Condition Photos (Saved in Cloud for Protection)
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {['Front View', 'Back View', 'Left Scratch Check', 'Right Scratch Check'].map((angle, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-400 flex flex-col items-center justify-center gap-1">
                      <Camera className="w-5 h-5" />
                      <span className="text-[10px] font-bold text-white">{angle}</span>
                      <span className="text-[9px] text-emerald-400">✓ Logged</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Odometer & Fuel inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-sultan-orange" /> Starting Odometer (KM)
                  </label>
                  <input
                    type="number"
                    value={startKm}
                    onChange={(e) => setStartKm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-amber-400" /> Current Fuel Gauge
                  </label>
                  <select
                    value={fuelLevel}
                    onChange={(e) => setFuelLevel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white"
                  >
                    <option>Full (100%)</option>
                    <option>3/4 Tank (75%)</option>
                    <option>Half Tank (50%)</option>
                    <option>1/4 Tank (25%)</option>
                  </select>
                </div>
              </div>

              {/* Handover Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsHandedOver(true);
                    alert("Bike marked as ON TRIP. Handover recorded with start odometer: " + startKm + " KM.");
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-black text-white text-sm shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  ✓ Handover Keys to Customer (Start Ride)
                </button>
              </div>
            </div>
          )}

          {/* VIEW: Return Flow */}
          {viewMode === 'return' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h3 className="font-black text-white text-base mb-1">Vehicle Return Inspection</h3>
                <p className="text-xs text-slate-400">Verify return odometer and fuel level to calculate security deposit refund.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Return Odometer (KM)</label>
                  <input
                    type="number"
                    value={returnKm}
                    onChange={(e) => setReturnKm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white font-mono"
                  />
                  <p className="text-[10px] text-slate-400">Start KM: {startKm} • Total Driven: {drivenKm} KM</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">Return Fuel Level</label>
                  <select
                    value={returnFuel}
                    onChange={(e) => setReturnFuel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white"
                  >
                    <option>Full (100%) - Matched</option>
                    <option>Less than Start (-₹100 fuel charge)</option>
                  </select>
                </div>
              </div>

              {/* Excess calculation box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Free KM Allowed:</span>
                  <span className="font-semibold text-white">{freeKm} KM</span>
                </div>
                <div className="flex justify-between">
                  <span>Total KM Driven:</span>
                  <span className="font-semibold text-white">{drivenKm} KM</span>
                </div>
                {excessKm > 0 && (
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>Excess Distance ({excessKm} km × ₹4/km):</span>
                    <span>+₹{excessCharge}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-black text-emerald-400">
                  <span>Net Security Deposit to Refund:</span>
                  <span className="text-lg">₹{Math.max(0, 500 - excessCharge)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsReturned(true);
                  alert("Ride completed successfully! Security deposit refund of ₹" + Math.max(0, 500 - excessCharge) + " initiated via UPI.");
                  setViewMode('list');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 font-black text-white text-sm shadow-glow-orange hover:brightness-110 transition-all cursor-pointer"
              >
                ✓ Complete Ride & Refund Security Deposit
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
