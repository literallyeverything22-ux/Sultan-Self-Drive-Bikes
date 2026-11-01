import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenFranchise }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏍️</span>
              <span className="font-extrabold text-xl text-white tracking-tight">SULTAN</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-sultan-orange/20 text-sultan-orange">
                SELF DRIVE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Kadapa's most trusted self-drive bike and scooter rental service. Instant ₹199 advance booking, sanitized helmets, and 24/7 roadside assistance.
            </p>
            <div className="pt-1 text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Govt. Approved & DL Verified</span>
            </div>
          </div>

          {/* Hub Location */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Our Kadapa Hub</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sultan-orange shrink-0 mt-0.5" />
                <span>Opp. Apsara Theatre, Apsara Circle, Kadapa, Andhra Pradesh 516002</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open Everyday: 6:00 AM – 10:30 PM</span>
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Call & WhatsApp</h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+918341723230" className="flex items-center gap-2 text-slate-300 hover:text-sultan-orange transition-colors">
                <Phone className="w-4 h-4 text-sultan-orange" />
                <span>+91 83417 23230</span>
              </a>
              <a href="mailto:muzaffarsyed444@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-sultan-orange transition-colors">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>muzaffarsyed444@gmail.com</span>
              </a>
              <div className="pt-2">
                <a
                  href="https://api.whatsapp.com/send?phone=918341723230&text=Hi%20Sultan%20Bikes%2C%20I%20want%20to%20rent%20a%20bike%20in%20Kadapa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Business & Network</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={onOpenFranchise} className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                  • Franchise Opportunities (₹2L - ₹10L)
                </button>
              </li>
              <li>
                <button onClick={onOpenFranchise} className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                  • Connect Your Bike (Earn Monthly)
                </button>
              </li>
              <li>
                <span className="text-slate-500">• Tirupati, Kurnool, Nellore (Upcoming)</span>
              </li>
              <li>
                <span className="text-slate-500">• Gandikota Tour Packages</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Sultan Self Drive Bikes Kadapa. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern architecture for high-speed mobile & web bookings.
          </p>
        </div>

      </div>
    </footer>
  );
}
