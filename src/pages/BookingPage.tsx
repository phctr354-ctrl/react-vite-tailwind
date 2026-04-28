import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateNights } from '../utils/dateUtils';
import type { BookingGuest } from '../types';

const EMPTY_GUEST: BookingGuest = { firstName: '', lastName: '', email: '', phone: '' };

export default function BookingPage() {
  const { bookingDraft, confirmBooking, navigate } = useApp();
  const { hotel, room, checkIn, checkOut, guests } = bookingDraft;
  const [guest, setGuest] = useState<BookingGuest>(EMPTY_GUEST);
  const [errors, setErrors] = useState<Partial<BookingGuest>>({});
  const [submitting, setSubmitting] = useState(false);

  const nights = calculateNights(checkIn, checkOut);

  if (!hotel || !room) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 mb-4">No booking in progress.</p>
        <button
          onClick={() => navigate('hotels')}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Browse Hotels
        </button>
      </div>
    );
  }

  const total = room.pricePerNight * nights;

  const validate = (): boolean => {
    const errs: Partial<BookingGuest> = {};
    if (!guest.firstName.trim()) errs.firstName = 'Required';
    if (!guest.lastName.trim()) errs.lastName = 'Required';
    if (!guest.email.trim() || !/\S+@\S+\.\S+/.test(guest.email)) errs.email = 'Valid email required';
    if (!guest.phone.trim()) errs.phone = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      confirmBooking(guest);
      setSubmitting(false);
    }, 800);
  };

  const field = (
    key: keyof BookingGuest,
    label: string,
    type = 'text',
    placeholder = '',
  ) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={guest[key]}
        onChange={(e) => setGuest({ ...guest, [key]: e.target.value })}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          errors[key] ? 'border-red-400 bg-red-50' : 'border-slate-200'
        }`}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button
        onClick={() => navigate('hotel-detail')}
        className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-700 text-sm font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to hotel
      </button>

      <h1 className="text-2xl font-bold text-slate-900 mb-8">Complete Your Booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Guest info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="text-2xl">👤</span> Guest Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {field('firstName', 'First Name', 'text', 'John')}
              {field('lastName', 'Last Name', 'text', 'Doe')}
              {field('email', 'Email Address', 'email', 'john@example.com')}
              {field('phone', 'Phone Number', 'tel', '+1 555 000 0000')}
            </div>
          </div>

          {/* Stay summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span> Stay Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Check-in', value: new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                { label: 'Check-out', value: new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                { label: 'Nights', value: nights.toString() },
                { label: 'Guests', value: guests.toString() },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs text-slate-400 mb-1">{label}</div>
                  <div className="font-bold text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment placeholder */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="text-2xl">💳</span> Payment Details
            </h2>
            {/* NOTE: Payment section is intentionally non-functional — this is a demo app. */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  readOnly
                  defaultValue="4242 4242 4242 4242"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    readOnly
                    defaultValue="12 / 28"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    readOnly
                    defaultValue="123"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                🔒 Your payment is secured with 256-bit SSL encryption. This is a demo — no real charge will be made.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-colors text-lg shadow-md"
          >
            {submitting ? '⏳ Processing...' : `Confirm Booking — $${total.toLocaleString()}`}
          </button>
        </form>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
            <h2 className="font-bold text-slate-800 mb-4">Booking Summary</h2>
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-36 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-slate-800">{hotel.name}</h3>
            <p className="text-slate-500 text-sm mb-1">{hotel.location}</p>
            <p className="text-sm text-indigo-700 font-medium mb-4">{room.type}</p>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>${room.pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}</span>
                <span>${room.pricePerNight * nights}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & fees</span>
                <span className="text-green-600">Included</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 text-base pt-2 border-t border-slate-100">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 bg-green-50 rounded-xl p-3 text-xs text-green-700 border border-green-100">
              ✅ Free cancellation available up to 24 hours before check-in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
