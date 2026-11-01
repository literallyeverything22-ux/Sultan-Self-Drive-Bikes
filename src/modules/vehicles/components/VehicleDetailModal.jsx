import React from 'react';
import { X, CheckCircle2, Shield } from 'lucide-react';
import { formatCurrency } from '../../../core/lib/utils';

export default function VehicleDetailModal({ vehicle, onClose, onBook }) {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative h-56 w-full bg-slate-950">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sultan-orange text-white">
              {vehicle.category} • {vehicle.transmission}
            </span>
            <h2 className="text-2xl font-black text-white mt-2">{vehicle.name}</h2>
            <p className="text-xs text-slate-300">{vehicle.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Key Pricing Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Hourly Rate</span>
              <span className="text-lg font-black text-white">{formatCurrency(vehicle.hourlyRate)}</span>
              <span className="text-[10px] text-slate-500 block">per hour</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Daily 24h Rate</span>
              <span className="text-lg font-black text-amber-400">{formatCurrency(vehicle.dailyRate)}</span>
              <span className="text-[10px] text-slate-500 block">per day</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block">Security Deposit</span>
              <span className="text-lg font-black text-emerald-400">{formatCurrency(vehicle.securityDeposit)}</span>
              <span className="text-[10px] text-emerald-500/80 block">100% Refundable</span>
            </div>
          </div>

          {/* Features list */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Vehicle Highlights</h4>
            <div className="grid grid-cols-2 gap-2">
              {vehicle.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 border border-slate-800 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Policies */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Sultan Transparent Rental Policy:
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• <strong>Free Distance:</strong> {vehicle.freeKmPerDay} KM per day included free. Extra KM at {formatCurrency(vehicle.excessKmRate)}/km.</li>
              <li>• <strong>Helmets:</strong> {vehicle.helmetIncluded} ISI-standard sanitized helmet included for free.</li>
              <li>• <strong>Fuel Policy:</strong> Like-to-like return (we handover with fuel, return with same fuel level).</li>
              <li>• <strong>Security Deposit:</strong> Refunded immediately upon return after routine vehicle check.</li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Token Advance Required:</span>
            <span className="text-xl font-black text-emerald-400">₹199 only</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBook(vehicle);
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 font-extrabold text-white text-sm shadow-glow-orange hover:brightness-110 transition-all cursor-pointer"
          >
            Reserve Slot for ₹199 →
          </button>
        </div>

      </div>
    </div>
  );
}
