import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Booking, BookingGuest, Hotel, Room, SearchParams, View } from '../types';
import { hotels } from '../data/hotels';

interface BookingDraft {
  hotel: Hotel | null;
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface AppContextValue {
  // Navigation
  view: View;
  navigate: (v: View) => void;

  // Search
  searchParams: SearchParams;
  setSearchParams: (p: SearchParams) => void;
  searchResults: Hotel[];
  doSearch: (p: SearchParams) => void;

  // Selected hotel
  selectedHotel: Hotel | null;
  selectHotel: (hotel: Hotel) => void;

  // Booking draft
  bookingDraft: BookingDraft;
  startBooking: (hotel: Hotel, room: Room, checkIn: string, checkOut: string, guests: number) => void;

  // Confirmed bookings
  bookings: Booking[];
  confirmBooking: (guestInfo: BookingGuest) => Booking | null;
  cancelBooking: (id: string) => void;

  // Filter / sort
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const defaultCheckIn = today.toISOString().split('T')[0];
const defaultCheckOut = tomorrow.toISOString().split('T')[0];

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('home');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: '',
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    guests: 2,
  });
  const [searchResults, setSearchResults] = useState<Hotel[]>(hotels);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({
    hotel: null,
    room: null,
    checkIn: defaultCheckIn,
    checkOut: defaultCheckOut,
    guests: 2,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const navigate = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const doSearch = useCallback((p: SearchParams) => {
    setSearchParams(p);
    const dest = p.destination.toLowerCase();
    const filtered = hotels.filter((h) => {
      const matchDest =
        !dest ||
        h.city.toLowerCase().includes(dest) ||
        h.country.toLowerCase().includes(dest) ||
        h.location.toLowerCase().includes(dest) ||
        h.name.toLowerCase().includes(dest);
      const hasCapacity = h.rooms.some((r) => r.capacity >= p.guests && r.available);
      return matchDest && hasCapacity;
    });
    setSearchResults(filtered);
    navigate('hotels');
  }, [navigate]);

  const selectHotel = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel);
    navigate('hotel-detail');
  }, [navigate]);

  const startBooking = useCallback(
    (hotel: Hotel, room: Room, checkIn: string, checkOut: string, guests: number) => {
      setBookingDraft({ hotel, room, checkIn, checkOut, guests });
      navigate('booking');
    },
    [navigate],
  );

  const confirmBooking = useCallback(
    (guestInfo: BookingGuest): Booking | null => {
      const { hotel, room, checkIn, checkOut, guests } = bookingDraft;
      if (!hotel || !room) return null;
      const ci = new Date(checkIn);
      const co = new Date(checkOut);
      const nights = Math.max(1, Math.ceil((co.getTime() - ci.getTime()) / 86400000));
      const newBooking: Booking = {
        id: `BK${Date.now()}`,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        roomId: room.id,
        roomType: room.type,
        checkIn,
        checkOut,
        guests,
        guestInfo,
        totalPrice: room.pricePerNight * nights,
        pricePerNight: room.pricePerNight,
        nights,
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        image: hotel.images[0],
      };
      setBookings((prev) => [newBooking, ...prev]);
      navigate('confirmation');
      return newBooking;
    },
    [bookingDraft, navigate],
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        view,
        navigate,
        searchParams,
        setSearchParams,
        searchResults,
        doSearch,
        selectedHotel,
        selectHotel,
        bookingDraft,
        startBooking,
        bookings,
        confirmBooking,
        cancelBooking,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
