import type { OrderCustomer } from '@/lib/whatsapp';

export type CustomerErrors = Partial<Record<keyof OrderCustomer, string>>;

export function validateCustomer(customer: OrderCustomer): CustomerErrors {
  const errors: CustomerErrors = {};
  const name = customer.name.trim();
  const address = customer.address.trim();
  const city = customer.city.trim();
  const pincode = customer.pincode.trim();
  const phoneDigits = customer.phone.replace(/[\s()+-]/g, '').replace(/^91(?=\d{10}$)/, '');

  if (name.length < 2) errors.name = 'Enter your full name.';
  if (!/^[6-9]\d{9}$/.test(phoneDigits)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (address.length < 10) errors.address = 'Enter your full delivery address, including building and street.';
  if (city.length < 2) errors.city = 'Enter your city.';
  if (!/^\d{6}$/.test(pincode)) errors.pincode = 'Enter a valid 6-digit pincode.';

  return errors;
}
