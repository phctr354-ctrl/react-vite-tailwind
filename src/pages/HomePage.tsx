import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { cities } from '../data/hotels';
import type { SearchParams } from '../types';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80';

const features = [
  { icon: '🏷️', title: 'Best Price Guarantee', desc: 'We match any lower price you find' },
  { icon: '✅', title: 'Free Cancellation', desc: 'Cancel up to 24 hours before check-in' },
  { icon: '🔒', title: 'Secure Booking', desc: 'Your payment info is always protected' },
  { icon: '🌟', title: '5M+ Happy Guests', desc: 'Trusted by travelers worldwide' },
];

export default function HomePage() {
  const { searchParams, doSearch } = useApp();
  const [form, setForm] = useState<SearchParams>(searchParams);
  const [destOpen, setDestOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(form);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[580px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/40" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Find Your Perfect Stay
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 drop-shadow">
            Search over 500,000 hotels worldwide — unbeatable prices, no booking fees.
          </p>

          {/* Search Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Destination */}
            <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1 text-left">
                Destination
              </label>
              <input
                type="text"
                placeholder="City or hotel name"
                value={form.destination}
                onChange={(e) => { setForm({ ...form, destination: e.target.value }); setDestOpen(true); }}
                onFocus={() => setDestOpen(true)}
                onBlur={() => setTimeout(() => setDestOpen(false), 150)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {destOpen && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden text-left">
                  {cities
                    .filter((c) => c.toLowerCase().includes(form.destination.toLowerCase()))
                    .map((c) => (
                      <li
                        key={c}
                        className="px-4 py-2.5 text-sm hover:bg-indigo-50 cursor-pointer text-slate-700"
                        onMouseDown={() => { setForm({ ...form, destination: c }); setDestOpen(false); }}
                      >
                        📍 {c}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 text-left">Check-in</label>
              <input
                type="date"
                min={today}
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 text-left">Check-out</label>
              <input
                type="date"
                min={form.checkIn || today}
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {/* Guests + Search */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1 text-left">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold px-10 py-3 rounded-xl transition-colors text-base shadow-md"
              >
                🔍 Search Hotels
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
              <p className="text-slate-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { city: 'New York', img: 'https://images.unsplash.com/photo-1546436836-07a91091f160?w=400&q=80' },
            { city: 'Miami', img: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=400&q=80' },
            { city: 'Chicago', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&q=80' },
            { city: 'Aspen', img: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&q=80' },
            { city: 'Malibu', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80' },
            { city: 'Portland', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80' },
          ].map(({ city, img }) => (
            <button
              key={city}
              onClick={() => doSearch({ ...form, destination: city })}
              className="relative h-32 rounded-2xl overflow-hidden group"
            >
              <img src={img} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-white font-semibold text-sm">
                {city}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
