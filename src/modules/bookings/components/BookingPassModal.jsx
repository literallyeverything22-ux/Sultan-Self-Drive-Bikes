import React from 'react';
import { X, CheckCircle2, QrCode, MapPin, Calendar, Clock, Share2, Download, Phone, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../core/lib/utils';
import { HUBS } from '../../vehicles/data/fleetData';

export default function BookingPassModal({ booking, onClose }) {
  if (!booking) return null;

  const hub = HUBS.find(h => h.id === booking.bookingParams?.hubId) || HUBS[0];

  const whatsappMessage = encodeURIComponent(
    `🏍️ *Sultan Self Drive Bikes - Booking Confirmed!*\n\n` +
    `• *Booking ID:* ${booking.bookingId}\n` +
    `• *Vehicle:* ${booking.vehicle?.name}\n` +
    `• *Customer:* ${booking.customer?.fullName} (${booking.customer?.phone})\n` +
    `• *Pickup:* ${booking.bookingParams?.pickupDate} at ${booking.bookingParams?.pickupTime}\n` +
    `• *Hub:* ${hub.name} (Opp. Apsara Theatre, Kadapa)\n` +
    `• *Advance Paid:* ₹${booking.paidAmount}\n` +
    `• *Balance at Pickup:* ₹${booking.balanceAtPickup}\n\n` +
    `Please keep your original Driving License ready during key handover. See you at Apsara Circle!`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=918341723230&text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header Ticket Pattern */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center text-xs font-black">
              ✓
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-emerald-200">
              SLOT RESERVED & CONFIRMED
            </span>
          </div>

          <h2 className="text-2xl font-black">{booking.vehicle?.name}</h2>
          <p className="text-xs text-emerald-100 mt-0.5">Booking Reference: <strong className="font-mono text-white text-sm">{booking.bookingId}</strong></p>
        </div>

        {/* Ticket Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* QR Code & Scan Handover Notice */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
            <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              {/* Dynamic QR Mock */}
              <div className="w-full h-full border-2 border-dashed border-slate-900 flex flex-col items-center justify-center text-slate-900">
                <QrCode className="w-12 h-12 stroke-[1.5]" />
                <span className="text-[8px] font-mono font-bold">{booking.bookingId}</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-white text-sm block">Contactless Hub Handover</span>
              <p className="text-slate-400">
                Show this QR pass to Sultan staff at Apsara Circle to inspect vehicle and collect keys.
              </p>
              <div className="pt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  DL Verified Online
                </span>
              </div>
            </div>
          </div>

          {/* Schedule Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sultan-orange" /> Pick-up
              </span>
              <span className="font-bold text-white text-sm mt-0.5 block">
                {booking.bookingParams?.pickupDate}
              </span>
              <span className="text-slate-400">{booking.bookingParams?.pickupTime}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Drop-off
              </span>
              <span className="font-bold text-white text-sm mt-0.5 block">
                {booking.bookingParams?.dropDate}
              </span>
              <span className="text-slate-400">{booking.bookingParams?.dropTime}</span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-emerald-400 font-bold">
              <span>Advance Slot Token Paid:</span>
              <span className="text-base font-black">₹{booking.paidAmount} ✓</span>
            </div>
            {booking.balanceAtPickup > 0 && (
              <div className="flex justify-between items-center text-slate-300">
                <span>Remaining Balance at Pickup:</span>
                <span className="font-bold text-white">₹{booking.balanceAtPickup}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800">
              <span>Refundable Security Deposit:</span>
              <span className="text-emerald-400 font-semibold">₹{booking.securityDeposit} (Refunded on return)</span>
            </div>
          </div>

          {/* Hub Location Details */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-sultan-orange shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">{hub.name}</span>
              <span className="text-slate-400">{hub.landmark}</span>
            </div>
          </div>

        </div>

        {/* Action CTAs */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-extrabold text-white text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Send Confirmation to My WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://maps.google.com/?q=Apsara+Circle+Kadapa"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-sultan-orange" />
              <span>Google Maps Pin</span>
            </a>

            <button
              onClick={onClose}
              className="py-2.5 rounded-xl bg-sultan-orange hover:bg-sultan-orangeHover text-xs font-bold text-white transition-all cursor-pointer"
            >
              Done / Close Pass
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
