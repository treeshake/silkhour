export function formatCurrency(
  amount: number | string,
  currency: string,
  locale: string = 'en-US',
): string {
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0, // Added to format to whole numbers
  }).format(numericAmount);
}
