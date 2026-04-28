import { useApp } from '../context/AppContext';
import { hotels } from '../data/hotels';
import type { Booking } from '../types';

const statusStyle: Record<Booking['status'], string> = {
  confirmed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-600',
};

export default function MyBookingsPage() {
  const { bookings, cancelBooking, navigate, selectHotel } = useApp();

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (bookings.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Bookings Yet</h2>
        <p className="text-slate-500 mb-6">Start exploring hotels and make your first booking!</p>
        <button
          onClick={() => navigate('hotels')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Browse Hotels
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <button
          onClick={() => navigate('hotels')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          + New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: bookings.length },
          { label: 'Confirmed', value: bookings.filter((b) => b.status === 'confirmed').length },
          { label: 'Total Spent', value: `$${bookings.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + b.totalPrice, 0).toLocaleString()}` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-center">
            <div className="text-2xl font-extrabold text-indigo-700">{value}</div>
            <div className="text-slate-500 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-5">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-opacity ${
              booking.status === 'cancelled' ? 'opacity-60 border-slate-200' : 'border-slate-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row">
              <img
                src={booking.image}
                alt={booking.hotelName}
                className="w-full sm:w-40 h-36 sm:h-auto object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{booking.hotelName}</h3>
                    <p className="text-slate-500 text-sm">{booking.hotelLocation}</p>
                    <p className="text-indigo-600 text-sm font-medium mt-0.5">{booking.roomType}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex-shrink-0 ${statusStyle[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-sm">
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <div className="text-slate-400 text-xs mb-0.5">Check-in</div>
                    <div className="font-semibold text-slate-800">{fmtDate(booking.checkIn)}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <div className="text-slate-400 text-xs mb-0.5">Check-out</div>
                    <div className="font-semibold text-slate-800">{fmtDate(booking.checkOut)}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <div className="text-slate-400 text-xs mb-0.5">Nights</div>
                    <div className="font-semibold text-slate-800">{booking.nights}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-3 py-2">
                    <div className="text-slate-400 text-xs mb-0.5">Guests</div>
                    <div className="font-semibold text-slate-800">{booking.guests}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400">Total: </span>
                    <span className="font-extrabold text-indigo-700 text-lg">${booking.totalPrice.toLocaleString()}</span>
                    <span className="text-xs text-slate-400 ml-1">Booking #{booking.id}</span>
                  </div>
                  <div className="flex gap-2">
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const hotel = hotels.find((h) => h.id === booking.hotelId);
                        if (hotel) selectHotel(hotel);
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 hover:border-indigo-400 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      View Hotel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
