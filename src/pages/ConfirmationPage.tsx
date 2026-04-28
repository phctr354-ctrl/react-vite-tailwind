import { useApp } from '../context/AppContext';

export default function ConfirmationPage() {
  const { bookings, navigate } = useApp();
  const booking = bookings[0];

  if (!booking) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 mb-4">No booking found.</p>
        <button onClick={() => navigate('hotels')} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          Browse Hotels
        </button>
      </div>
    );
  }

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Success banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <span className="text-5xl">✅</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500">
          Your reservation has been successfully made. A confirmation will be sent to{' '}
          <span className="font-semibold text-indigo-700">{booking.guestInfo.email}</span>.
        </p>
      </div>

      {/* Booking card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        <img src={booking.image} alt={booking.hotelName} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="text-xl font-bold text-slate-800">{booking.hotelName}</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {booking.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-1">{booking.hotelLocation}</p>
          <p className="text-indigo-600 font-medium text-sm mb-5">{booking.roomType}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            {[
              { label: 'Booking ID', value: booking.id },
              { label: 'Guests', value: `${booking.guests} guest${booking.guests !== 1 ? 's' : ''}` },
              { label: 'Check-in', value: fmtDate(booking.checkIn) },
              { label: 'Check-out', value: fmtDate(booking.checkOut) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-400 mb-1">{label}</div>
                <div className="font-bold text-slate-800 text-sm">{value}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>${booking.pricePerNight} × {booking.nights} night{booking.nights !== 1 ? 's' : ''}</span>
              <span>${booking.pricePerNight * booking.nights}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxes & fees</span>
              <span className="text-green-600">Included</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 text-base pt-2 border-t border-slate-100">
              <span>Total Charged</span>
              <span>${booking.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guest info */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <h3 className="font-bold text-slate-800 mb-3">Guest Details</h3>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-slate-400">Name</dt>
            <dd className="font-semibold text-slate-800">{booking.guestInfo.firstName} {booking.guestInfo.lastName}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Phone</dt>
            <dd className="font-semibold text-slate-800">{booking.guestInfo.phone}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-slate-400">Email</dt>
            <dd className="font-semibold text-slate-800">{booking.guestInfo.email}</dd>
          </div>
        </dl>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('my-bookings')}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          View My Bookings
        </button>
        <button
          onClick={() => navigate('home')}
          className="flex-1 border-2 border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 font-bold py-3 rounded-xl transition-colors"
        >
          Book Another Hotel
        </button>
      </div>
    </div>
  );
}
