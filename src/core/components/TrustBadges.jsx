import React from 'react';
import { Shield, Sparkles, Clock, Award, Star } from 'lucide-react';

export default function TrustBadges() {
  const steps = [
    {
      num: '01',
      title: 'Pick Dates & Bike',
      desc: 'Choose from Burgman, Activa, Pulsar, or Royal Enfield at our Kadapa Apsara Circle hub.',
      icon: '🛵',
    },
    {
      num: '02',
      title: 'Instant ₹199 Lock',
      desc: 'Hold your vehicle with just ₹199 advance and paperless digital Driving License check.',
      icon: '⚡',
    },
    {
      num: '03',
      title: 'Grab Keys & Ride',
      desc: 'Show your digital QR pass at Apsara Circle counter, inspect bike, and start riding!',
      icon: '🏁',
    },
  ];

  return (
    <div id="how-it-works" className="py-16 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-sultan-orange/20 text-sultan-orange border border-sultan-orange/30">
          Seamless 3-Step Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
          How Renting with Sultan Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Zero long paperwork. Zero waiting. Transparent deposit policy with instant return refunds.
        </p>
      </div>

      {/* Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 relative border border-slate-800 hover:border-sultan-orange/40 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{s.icon}</span>
              <span className="font-mono text-2xl font-black text-slate-700">{s.num}</span>
            </div>
            <h3 className="text-base font-extrabold text-white mb-2">{s.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust Stats Bar */}
      <div className="mt-12 glass-card rounded-2xl p-6 border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-white block">50,000+</span>
          <span className="text-xs text-slate-400 mt-1 block">Happy Customer Rides</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 block">4.8 ★</span>
          <span className="text-xs text-slate-400 mt-1 block">Google Verified Rating</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">₹199</span>
          <span className="text-xs text-slate-400 mt-1 block">Zero-Risk Advance Token</span>
        </div>
        <div>
          <span className="text-2xl sm:text-3xl font-black text-sultan-orange block">100%</span>
          <span className="text-xs text-slate-400 mt-1 block">Instant Deposit Refund</span>
        </div>
      </div>

    </div>
  );
}
