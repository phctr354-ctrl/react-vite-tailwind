import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { navigate, view, bookings } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;

  const navLinks = [
    { label: 'Home', v: 'home' as const },
    { label: 'Browse Hotels', v: 'hotels' as const },
    { label: 'My Bookings', v: 'my-bookings' as const },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 font-bold text-xl text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            <span className="text-2xl">🏨</span>
            <span>StayEasy</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, v }) => (
              <button
                key={v}
                onClick={() => navigate(v)}
                className={`text-sm font-medium transition-colors ${
                  view === v
                    ? 'text-indigo-700 border-b-2 border-indigo-700 pb-0.5'
                    : 'text-slate-600 hover:text-indigo-700'
                }`}
              >
                {label}
                {v === 'my-bookings' && confirmedCount > 0 && (
                  <span className="ml-1.5 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5">
                    {confirmedCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-indigo-700 hover:bg-slate-100"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-2">
          {navLinks.map(({ label, v }) => (
            <button
              key={v}
              onClick={() => { navigate(v); setMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === v ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {label}
              {v === 'my-bookings' && confirmedCount > 0 && (
                <span className="ml-2 bg-indigo-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {confirmedCount}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
