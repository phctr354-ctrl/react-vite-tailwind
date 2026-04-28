import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏨</span>
              <span className="text-white font-bold text-xl">StayEasy</span>
            </div>
            <p className="text-sm leading-relaxed">
              Discover and book the world's best hotels — from luxury resorts to budget-friendly stays.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('hotels')} className="hover:text-white transition-colors">
                  Browse Hotels
                </button>
              </li>
              <li>
                <button onClick={() => navigate('my-bookings')} className="hover:text-white transition-colors">
                  My Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-3">Popular Destinations</h4>
            <ul className="space-y-2 text-sm">
              {['New York', 'Miami', 'Chicago', 'Aspen', 'Malibu'].map((city) => (
                <li key={city}>
                  <span className="hover:text-white transition-colors cursor-default">{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>24/7 Customer Support</li>
              <li>Free Cancellation</li>
              <li>Best Price Guarantee</li>
              <li>Secure Payments</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} StayEasy. All rights reserved.</span>
          <span>Built with React + Vite + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
