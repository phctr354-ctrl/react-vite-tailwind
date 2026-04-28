import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StarRating from '../components/StarRating';
import type { Room } from '../types';

export default function HotelDetailPage() {
  const { selectedHotel, navigate, startBooking, searchParams } = useApp();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState(searchParams.guests);
  const [tabActive, setTabActive] = useState<'overview' | 'rooms' | 'amenities'>('overview');

  const today = new Date().toISOString().split('T')[0];

  if (!selectedHotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 mb-4">No hotel selected.</p>
        <button
          onClick={() => navigate('hotels')}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Browse Hotels
        </button>
      </div>
    );
  }

  const hotel = selectedHotel;

  const nights = (() => {
    const ci = new Date(checkIn);
    const co = new Date(checkOut);
    return Math.max(1, Math.ceil((co.getTime() - ci.getTime()) / 86400000));
  })();

  const handleBookNow = () => {
    if (!selectedRoom) {
      setTabActive('rooms');
      return;
    }
    startBooking(hotel, selectedRoom, checkIn, checkOut, guests);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <button
        onClick={() => navigate('hotels')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-700 text-sm font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to results
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-2 mb-8 rounded-2xl overflow-hidden h-72 sm:h-96">
        <div className="col-span-2 relative">
          <img
            src={hotel.images[activeImg]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          {hotel.images.slice(1, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i + 1)}
              className={`relative overflow-hidden transition-opacity ${
                activeImg === i + 1 ? 'ring-2 ring-indigo-500' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Hotel info */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{hotel.name}</h1>
              <span className="bg-indigo-50 text-indigo-700 font-bold text-lg px-3 py-1 rounded-xl">
                From ${hotel.priceFrom}<span className="text-sm font-normal text-slate-500">/night</span>
              </span>
            </div>
            <p className="text-slate-500 flex items-center gap-1 mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {hotel.location}
            </p>
            <div className="flex items-center gap-3">
              <StarRating rating={hotel.rating} size="md" />
              <span className="font-bold text-slate-800">{hotel.rating}</span>
              <span className="text-slate-400 text-sm">({hotel.reviewCount.toLocaleString()} reviews)</span>
              <span className="capitalize text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                {hotel.category}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 mb-6 gap-6">
            {(['overview', 'rooms', 'amenities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTabActive(tab)}
                className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                  tabActive === tab
                    ? 'text-indigo-700 border-b-2 border-indigo-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tabActive === 'overview' && (
            <div>
              <p className="text-slate-600 leading-relaxed">{hotel.longDescription}</p>
            </div>
          )}

          {tabActive === 'amenities' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
                  <span className="text-indigo-500 font-bold">✓</span>
                  <span className="text-sm text-slate-700">{a}</span>
                </div>
              ))}
            </div>
          )}

          {tabActive === 'rooms' && (
            <div className="space-y-5">
              {hotel.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`border-2 rounded-2xl overflow-hidden transition-all cursor-pointer ${
                    !room.available
                      ? 'opacity-50 cursor-not-allowed border-slate-200'
                      : selectedRoom?.id === room.id
                      ? 'border-indigo-500 shadow-lg shadow-indigo-100'
                      : 'border-slate-200 hover:border-indigo-300'
                  }`}
                  onClick={() => room.available && setSelectedRoom(room)}
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={room.image}
                      alt={room.type}
                      className="w-full sm:w-48 h-40 sm:h-auto object-cover"
                    />
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-slate-800 text-lg">{room.type}</h3>
                        {selectedRoom?.id === room.id && (
                          <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm mb-3">{room.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {room.amenities.map((a) => (
                          <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {a}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-indigo-700">${room.pricePerNight}</span>
                          <span className="text-slate-400 text-sm"> / night</span>
                          <div className="text-xs text-slate-400 mt-0.5">
                            👥 Up to {room.capacity} guests
                          </div>
                        </div>
                        {!room.available && (
                          <span className="text-sm font-semibold text-red-500">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Booking card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
            <h2 className="font-bold text-slate-800 text-lg mb-4">Book Your Stay</h2>

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Check-in</label>
                <input
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Check-out</label>
                <input
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            {/* Selected room summary */}
            {selectedRoom ? (
              <div className="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-800">{selectedRoom.type}</p>
                <div className="flex justify-between text-sm text-indigo-700 mt-1">
                  <span>${selectedRoom.pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span className="font-bold">${selectedRoom.pricePerNight * nights}</span>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-xl p-3 mb-4 border border-amber-100 text-sm text-amber-700">
                ← Select a room in the Rooms tab to continue
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={!selectedRoom}
              className={`w-full font-bold py-3 rounded-xl text-white transition-colors ${
                selectedRoom
                  ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {selectedRoom ? `Book Now — $${selectedRoom.pricePerNight * nights}` : 'Select a Room'}
            </button>

            <p className="text-center text-xs text-slate-400 mt-3">Free cancellation · No booking fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
