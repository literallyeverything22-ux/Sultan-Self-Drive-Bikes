import React from 'react';
import { MapPin, Navigation, Compass, ChevronRight } from 'lucide-react';

export default function TouristGuides({ onSelectVehicleForTour }) {
  const tours = [
    {
      title: 'Gandikota Fort & Gorge',
      subtitle: 'The Grand Canyon of India',
      distance: '85 KM from Kadapa',
      duration: 'Full Day Trip',
      recommendedBike: 'Royal Enfield Classic 350 / Pulsar',
      desc: 'Marvel at the breathtaking gorge carved by the Pennar river, ancient fort walls, and camping spots.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Ameen Peer Dargah (Pedda Dargah)',
      subtitle: 'Spiritual Sufi Heritage',
      distance: '2.5 KM from Apsara Circle Hub',
      duration: '2-3 Hours',
      recommendedBike: 'Honda Activa 6G / Suzuki Burgman',
      desc: 'Famous 300+ year old holy Sufi shrine visited by pilgrims, celebrities, and travelers from across India.',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Vontimitta Kodandarama Temple',
      subtitle: '14th-Century Chola Architecture',
      distance: '26 KM from Kadapa',
      duration: 'Half Day Trip',
      recommendedBike: 'Suzuki Burgman 125 / TVS Jupiter',
      desc: 'Ancient Vijayanagara rock architecture with monolithic sculptures and peaceful sacred pond.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div id="tourist-section" className="py-16 border-t border-slate-800/80">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Explore Kadapa on Wheels
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
            Popular Day Trips & Road Trails
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick up your ride from Apsara Circle and discover Rayalaseema’s most iconic attractions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((t, i) => (
          <div key={i} className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-amber-400/50 transition-all hover:-translate-y-1">
            <div>
              <div className="relative h-44 w-full overflow-hidden">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 text-amber-400 backdrop-blur-md border border-amber-400/20">
                    {t.distance}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">{t.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Best Ride:</span>
                <span className="font-bold text-amber-400">{t.recommendedBike}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
