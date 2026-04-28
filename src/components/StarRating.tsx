interface Props {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, size = 'md' }: Props) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<span key={i} className="text-amber-400">★</span>);
    } else if (i - 0.5 <= rating) {
      stars.push(<span key={i} className="text-amber-400">✦</span>);
    } else {
      stars.push(<span key={i} className="text-slate-300">★</span>);
    }
  }
  return <span className={sizeClass}>{stars}</span>;
}
