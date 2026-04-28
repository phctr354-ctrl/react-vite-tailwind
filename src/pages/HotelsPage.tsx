import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { hotels as allHotels } from '../data/hotels';
import HotelCard from '../components/HotelCard';
import type { SearchParams } from '../types';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'budget', label: 'Budget' },
  { value: 'mid-range', label: 'Mid-Range' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'resort', label: 'Resort' },
];

export default function HotelsPage() {
  const {
    searchResults,
    searchParams,
    doSearch,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
  } = useApp();

  const [form, setForm] = useState<SearchParams>(searchParams);
  const today = new Date().toISOString().split('T')[0];

  const displayed = useMemo(() => {
    let list = categoryFilter === 'all' ? searchResults : searchResults.filter((h) => h.category === categoryFilter);
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'reviews') list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [searchResults, categoryFilter, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(form);
  };

  const showAll = () => {
    doSearch({ destination: '', checkIn: form.checkIn, checkOut: form.checkOut, guests: form.guests });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-md p-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
          <input
            type="text"
            placeholder="City or hotel name"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Check-in</label>
          <input
            type="date"
            min={today}
            value={form.checkIn}
            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Check-out</label>
          <input
            type="date"
            min={form.checkIn || today}
            value={form.checkOut}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Guests</label>
            <input
              type="number"
              min={1}
              max={10}
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {searchParams.destination ? `Hotels in "${searchParams.destination}"` : 'All Hotels'}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {displayed.length} of {allHotels.length} properties found
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="rating">Top Rated</option>
            <option value="reviews">Most Reviewed</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCategoryFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              categoryFilter === value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Results */}
      {displayed.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No hotels found</h3>
          <p className="text-slate-500 mb-6">Try a different destination or adjust your filters.</p>
          <button
            onClick={showAll}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Show All Hotels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayed.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
