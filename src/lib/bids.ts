export function isBidOver(item: {
  id: number;
  name: string;
  userId: string;
  startingPrice: number;
  endDate: Date;
}) {
  return item.endDate < new Date();
}
