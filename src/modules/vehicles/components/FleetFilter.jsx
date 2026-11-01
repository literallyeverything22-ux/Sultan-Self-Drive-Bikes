import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function FleetFilter({ selectedCategory, setSelectedCategory, selectedTransmission, setSelectedTransmission }) {
  const categories = [
    { id: 'all', label: 'All Fleet', icon: '🛵' },
    { id: 'Scooter', label: 'Scooters / Commuters', icon: '🛵' },
    { id: 'Sports', label: 'Sports & Street', icon: '⚡' },
    { id: 'Cruiser', label: 'Royal Enfield & Cruisers', icon: '🏍️' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-slate-800">
      
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-sultan-orange to-amber-500 text-white shadow-glow-orange scale-105'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Transmission / Quick Filter */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="text-slate-400 flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-sultan-orange" /> Gear:
        </span>
        <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
          {['all', 'Automatic', 'Manual'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTransmission(type)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                selectedTransmission === type
                  ? 'bg-sultan-orange text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
