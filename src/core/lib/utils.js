export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateDurationHours(pickupDate, pickupTime, dropDate, dropTime) {
  if (!pickupDate || !pickupTime || !dropDate || !dropTime) return 24;
  
  const start = new Date(`${pickupDate}T${pickupTime}`);
  const end = new Date(`${dropDate}T${dropTime}`);
  
  const diffMs = end - start;
  if (diffMs <= 0) return 6; // minimum 6 hours
  
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  return Math.max(hours, 6);
}

export function generateBookingId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'SLT-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}
