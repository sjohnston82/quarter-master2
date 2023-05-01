export function calculateDaysUntilExpiry(expiresDate: Date) {
  const expiryDate = new Date(expiresDate);
  const currDate = new Date(Date.now());

  const difference = currDate.getTime() - expiryDate.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24)) * -1;

  return totalDays
}