import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY_PER_LINE } from '@/context/CartContext';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = MAX_QUANTITY_PER_LINE,
}: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-line bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
      >
        <Minus size={16} />
      </button>
      <span aria-live="polite" className="w-10 text-center text-sm font-semibold tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-ink hover:text-paper disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
