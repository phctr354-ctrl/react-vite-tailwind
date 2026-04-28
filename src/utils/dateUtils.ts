export const MS_PER_DAY = 86_400_000;

export function calculateNights(checkIn: string, checkOut: string): number {
  const ci = new Date(checkIn);
  const co = new Date(checkOut);
  return Math.max(1, Math.ceil((co.getTime() - ci.getTime()) / MS_PER_DAY));
}
