import React from 'react';
import { Gauge, Shield, ChevronRight, Zap, Info } from 'lucide-react';
import { formatCurrency, calculateDurationHours } from '../../../core/lib/utils';

export default function VehicleCard({ vehicle, bookingParams, onSelectVehicle, onViewDetails }) {
  const durationHours = calculateDurationHours(
    bookingParams.pickupDate,
    bookingParams.pickupTime,
    bookingParams.dropDate,
    bookingParams.dropTime
  );

  // Calculate rental cost for selected duration
  const days = Math.floor(durationHours / 24);
  const remHours = durationHours % 24;
  const estimatedRent = (days * vehicle.dailyRate) + (remHours * vehicle.hourlyRate);

  return (
    <div className="group glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-sultan-orange/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-orange flex flex-col justify-between">
      
      {/* Card Header & Image */}
      <div>
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950/60">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-400/30 backdrop-blur-md">
              {vehicle.badge}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-slate-300 backdrop-blur-md">
              {vehicle.transmission}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Ready at Hub
            </span>
          </div>

          {/* Title on image base */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">
              {vehicle.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium truncate">
              {vehicle.tagline}
            </p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="p-4 grid grid-cols-3 gap-2 bg-slate-900/60 border-y border-slate-800/80 text-xs text-slate-300">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-950/40">
            <Gauge className="w-4 h-4 text-sultan-orange mb-1" />
            <span className="text-[10px] text-slate-400">Mileage</span>
            <span className="font-bold text-white">{vehicle.mileage}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-950/40">
            <Zap className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-slate-400">Engine</span>
            <span className="font-bold text-white">{vehicle.cc}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-950/40">
            <Shield className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[10px] text-slate-400">Free Helmets</span>
            <span className="font-bold text-white">{vehicle.helmetIncluded} ISI</span>
          </div>
        </div>

        {/* Features Chips */}
        <div className="px-4 py-3 flex flex-wrap gap-1.5">
          {vehicle.features.slice(0, 3).map((f, i) => (
            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              ✓ {f}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Pricing & CTAs */}
      <div className="p-4 pt-2 bg-slate-950/40 border-t border-slate-800/60">
        
        {/* Price Row */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Estimated Rent ({durationHours} hrs)</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white">
                {formatCurrency(estimatedRent)}
              </span>
              <span className="text-[11px] text-slate-400">
                (or {formatCurrency(vehicle.hourlyRate)}/hr)
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 block">
              ₹199 Advance
            </span>
            <span className="text-[10px] text-slate-400">Balance at Hub</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(vehicle)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 hover:from-sultan-orangeHover hover:to-amber-600 text-xs font-extrabold text-white shadow-glow-orange flex items-center justify-center gap-1 transition-all cursor-pointer transform active:scale-95"
          >
            <span>Book for ₹199</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

      </div>

    </div>
  );
}
