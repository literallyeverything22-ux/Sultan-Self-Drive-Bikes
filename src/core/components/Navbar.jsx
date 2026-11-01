import React from 'react';
import { Phone, MapPin, Wrench, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenStaff, onOpenFranchise }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-sultan-dark/90 backdrop-blur-md border-b border-sultan-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sultan-orange to-sultan-amber flex items-center justify-center shadow-glow-orange">
              <span className="text-2xl">🏍️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                  SULTAN
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-sultan-orange/20 text-sultan-orange border border-sultan-orange/30">
                  SELF DRIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sultan-orange inline" /> Apsara Circle, Kadapa
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                const el = document.getElementById('fleet-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-semibold text-slate-300 hover:text-sultan-orange transition-colors cursor-pointer"
            >
              Our Fleet
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-semibold text-slate-300 hover:text-sultan-orange transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('tourist-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm font-semibold text-slate-300 hover:text-sultan-orange transition-colors cursor-pointer"
            >
              Kadapa Trips
            </button>
            <button 
              onClick={onOpenFranchise}
              className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Franchise & Partner
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href="tel:+918341723230"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-slate-500 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-sultan-orange" />
              <span>+91 83417 23230</span>
            </a>

            {/* Staff / Garage Mode Button */}
            <button
              onClick={onOpenStaff}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
              title="Store staff handover and return dashboard"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff Portal</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenStaff}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-amber-400"
              title="Staff Portal"
            >
              <Wrench className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sultan-card border-b border-sultan-border px-4 py-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 font-medium text-slate-200"
          >
            🛵 Our Fleet
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 font-medium text-slate-200"
          >
            ⚡ How It Works
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('tourist-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="block w-full text-left py-2 font-medium text-slate-200"
          >
            🏰 Kadapa & Gandikota Trips
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFranchise();
            }}
            className="block w-full text-left py-2 font-medium text-amber-400"
          >
            ✨ Franchise / Connect Your Bike
          </button>
          <a
            href="tel:+918341723230"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-sultan-orange font-bold text-white text-sm"
          >
            <Phone className="w-4 h-4" /> Call Hub: 83417 23230
          </a>
        </div>
      )}
    </header>
  );
}
