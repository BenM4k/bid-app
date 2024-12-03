export const formatToDollar = (cent: number) =>
  Math.floor(cent / 100).toFixed(2);
