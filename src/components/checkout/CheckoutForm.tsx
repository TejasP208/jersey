import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { OrderCustomer } from '@/lib/whatsapp';
import { validateCustomer } from '@/lib/validateCustomer';
import type { CustomerErrors } from '@/lib/validateCustomer';
import { cn } from '@/lib/cn';

const EMPTY_CUSTOMER: OrderCustomer = { name: '', phone: '', address: '', city: '', pincode: '' };

interface CheckoutFormProps {
  onSubmit: (customer: OrderCustomer) => void;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [customer, setCustomer] = useState<OrderCustomer>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof OrderCustomer) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCustomer((current) => ({ ...current, [field]: value }));
    if (submitted) setErrors(validateCustomer({ ...customer, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validateCustomer(customer);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit({
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
      city: customer.city.trim(),
      pincode: customer.pincode.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field id="checkout-name" label="Full name" error={errors.name} className="sm:col-span-2">
        <input
          id="checkout-name"
          type="text"
          autoComplete="name"
          value={customer.name}
          onChange={handleChange('name')}
          {...fieldProps('checkout-name', errors.name)}
        />
      </Field>

      <Field id="checkout-phone" label="Mobile number" error={errors.phone}>
        <input
          id="checkout-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98xxxxxxxx"
          value={customer.phone}
          onChange={handleChange('phone')}
          {...fieldProps('checkout-phone', errors.phone)}
        />
      </Field>

      <Field id="checkout-pincode" label="Pincode" error={errors.pincode}>
        <input
          id="checkout-pincode"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          value={customer.pincode}
          onChange={handleChange('pincode')}
          {...fieldProps('checkout-pincode', errors.pincode)}
        />
      </Field>

      <Field id="checkout-address" label="Delivery address" error={errors.address} className="sm:col-span-2">
        <textarea
          id="checkout-address"
          rows={3}
          autoComplete="street-address"
          value={customer.address}
          onChange={handleChange('address')}
          {...fieldProps('checkout-address', errors.address)}
        />
      </Field>

      <Field id="checkout-city" label="City" error={errors.city}>
        <input
          id="checkout-city"
          type="text"
          autoComplete="address-level2"
          value={customer.city}
          onChange={handleChange('city')}
          {...fieldProps('checkout-city', errors.city)}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:col-span-2">
        <button type="submit" className="btn-primary w-full py-4 text-base font-semibold tracking-wider uppercase">
          <CheckCircle2 size={20} />
          Place Order
        </button>
        <p className="text-xs leading-[1.5] text-smoke">
          Click Place Order to confirm your delivery details and place your order. Estimated delivery is 5 to 10 days.
        </p>
      </div>
    </form>
  );
}

function fieldProps(id: string, error?: string) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: cn(
      'w-full border bg-white px-4 py-3 text-sm placeholder:text-mist focus:outline-none',
      error ? 'border-red-600 focus:border-red-600' : 'border-line focus:border-ink',
    ),
  };
}

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
