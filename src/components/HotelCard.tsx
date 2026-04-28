import type { Hotel } from '../types';
import { useApp } from '../context/AppContext';
import StarRating from './StarRating';

interface Props {
  hotel: Hotel;
}

const categoryBadge: Record<string, string> = {
  budget: 'bg-green-100 text-green-800',
  'mid-range': 'bg-blue-100 text-blue-800',
  luxury: 'bg-purple-100 text-purple-800',
  resort: 'bg-orange-100 text-orange-800',
};

export default function HotelCard({ hotel }: Props) {
  const { selectHotel } = useApp();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryBadge[hotel.category]}`}
        >
          {hotel.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-slate-800 text-lg leading-tight">{hotel.name}</h3>
        </div>

        <p className="text-slate-500 text-sm mb-2 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {hotel.location}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={hotel.rating} size="sm" />
          <span className="text-sm font-semibold text-slate-700">{hotel.rating}</span>
          <span className="text-slate-400 text-xs">({hotel.reviewCount.toLocaleString()} reviews)</span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{hotel.description}</p>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400">From</span>
            <div className="text-xl font-bold text-indigo-700">
              ${hotel.priceFrom}
              <span className="text-sm font-normal text-slate-400"> / night</span>
            </div>
          </div>
          <button
            onClick={() => selectHotel(hotel)}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            View Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
