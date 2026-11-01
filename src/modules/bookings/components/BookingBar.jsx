import React from 'react';
import { MapPin, Calendar, Clock, Search, ChevronRight, Zap } from 'lucide-react';
import { HUBS } from '../../vehicles/data/fleetData';
import { calculateDurationHours, getTodayDateString } from '../../../core/lib/utils';

export default function BookingBar({ bookingParams, setBookingParams, onSearch }) {
  const durationHours = calculateDurationHours(
    bookingParams.pickupDate,
    bookingParams.pickupTime,
    bookingParams.dropDate,
    bookingParams.dropTime
  );

  const durationText = durationHours >= 24
    ? `${Math.floor(durationHours / 24)} Day${Math.floor(durationHours / 24) > 1 ? 's' : ''} ${durationHours % 24 > 0 ? `${durationHours % 24} Hrs` : ''}`
    : `${durationHours} Hours`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 -mt-12 sm:-mt-14 relative z-30">
      <div className="glass-card rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-700/60 bg-slate-900/90">
        
        {/* Top Badges / Notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-white">Live Availability in Kadapa</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-sultan-amber font-medium">⚡ Pay ₹199 advance to lock slot</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sultan-orange/10 border border-sultan-orange/30 text-sultan-orange font-bold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Trip Duration: {durationText}</span>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          {/* 1. Hub Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sultan-orange" /> Pick-up & Drop Hub
            </label>
            <div className="relative">
              <select
                value={bookingParams.hubId}
                onChange={(e) => setBookingParams({ ...bookingParams, hubId: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-sultan-orange cursor-pointer"
              >
                {HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id} className="bg-slate-900 text-white">
                    {hub.name} {hub.isMain ? '📍 (Main)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[10px] text-slate-500 truncate">
              {HUBS.find(h => h.id === bookingParams.hubId)?.landmark}
            </p>
          </div>

          {/* 2. Pickup Date & Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sultan-amber" /> Pick-up Schedule
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                min={getTodayDateString(0)}
                value={bookingParams.pickupDate}
                onChange={(e) => setBookingParams({ ...bookingParams, pickupDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sultan-orange"
              />
              <input
                type="time"
                value={bookingParams.pickupTime}
                onChange={(e) => setBookingParams({ ...bookingParams, pickupTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sultan-orange"
              />
            </div>
            <p className="text-[10px] text-slate-500">Free sanitized helmet at pickup</p>
          </div>

          {/* 3. Dropoff Date & Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
              <Clock className="w-3 h-3 text-sultan-orange" /> Drop-off Schedule
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                min={bookingParams.pickupDate || getTodayDateString(0)}
                value={bookingParams.dropDate}
                onChange={(e) => setBookingParams({ ...bookingParams, dropDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sultan-orange"
              />
              <input
                type="time"
                value={bookingParams.dropTime}
                onChange={(e) => setBookingParams({ ...bookingParams, dropTime: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-sultan-orange"
              />
            </div>
            <p className="text-[10px] text-slate-500">Flexible 30-min grace period</p>
          </div>

          {/* 4. Action CTA */}
          <div className="pt-2 md:pt-4">
            <button
              onClick={() => {
                onSearch?.();
                document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-sultan-orange to-amber-500 hover:from-sultan-orangeHover hover:to-amber-600 font-extrabold text-sm text-white shadow-glow-orange flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>FIND BIKES</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
