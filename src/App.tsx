import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';
import HotelDetailPage from './pages/HotelDetailPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';

function AppRoutes() {
  const { view } = useApp();

  const page = {
    home: <HomePage />,
    hotels: <HotelsPage />,
    'hotel-detail': <HotelDetailPage />,
    booking: <BookingPage />,
    confirmation: <ConfirmationPage />,
    'my-bookings': <MyBookingsPage />,
  }[view] ?? <HomePage />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
