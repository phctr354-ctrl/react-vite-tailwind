export type View =
  | 'home'
  | 'hotels'
  | 'hotel-detail'
  | 'booking'
  | 'confirmation'
  | 'my-bookings';

export interface Room {
  id: string;
  type: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  available: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  images: string[];
  amenities: string[];
  priceFrom: number;
  category: 'budget' | 'mid-range' | 'luxury' | 'resort';
  rooms: Room[];
  coordinates: { lat: number; lng: number };
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelLocation: string;
  roomId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestInfo: BookingGuest;
  totalPrice: number;
  pricePerNight: number;
  nights: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  image: string;
}
