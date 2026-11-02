import { useId, useState } from 'react';
import { Ruler } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuantityStepper from '@/components/ui/QuantityStepper';
import SizeGuideModal from '@/components/product/SizeGuide';
import { SIZES } from '@/data/types';
import type { Product, Size, Sleeve } from '@/data/types';
import { useCart } from '@/context/CartContext';
import { SLEEVE_LABELS } from '@/lib/catalog';
import { cn } from '@/lib/cn';

interface PurchaseControlsProps {
  product: Product;
  variant: 'compact' | 'full';
  onAdded?: () => void;
}

export default function PurchaseControls({ product, variant, onAdded }: PurchaseControlsProps) {
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState<Size | null>(null);
  const [sleeve, setSleeve] = useState<Sleeve>(product.sleeves[0]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const sizeLabelId = useId();

  const buildSelection = () => {
    if (!size) {
      setError('Please select a size to continue.');
      return null;
    }
    setError(null);
    return { productId: product.id, size, sleeve, quantity };
  };

  const handleAddToBag = () => {
    const selection = buildSelection();
    if (!selection) return;
    addItem(selection);
    onAdded?.();
    openCart();
  };

  const handleBuyNow = () => {
    const selection = buildSelection();
    if (!selection) return;
    addItem(selection);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col gap-6">
      {product.sleeves.length > 1 ? (
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Sleeve</legend>
          <div className="flex flex-wrap gap-2">
            {product.sleeves.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={sleeve === option}
                onClick={() => setSleeve(option)}
                className={cn(
                  'border px-4 py-2.5 text-sm font-medium transition-colors',
                  sleeve === option ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink',
                )}
              >
                {SLEEVE_LABELS[option]}
              </button>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="text-sm">
          <span className="font-semibold">Sleeve:</span> {SLEEVE_LABELS[sleeve]}
        </p>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p id={sizeLabelId} className="text-sm font-semibold">
            Size <span className="text-red-600">*</span>
            {size && <span className="ml-2 font-normal text-smoke">Selected: {size}</span>}
          </p>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider underline-offset-4 hover:underline"
          >
            <Ruler size={14} />
            Size guide
          </button>
        </div>
        <div role="group" aria-labelledby={sizeLabelId} className="grid grid-cols-5 gap-2">
          {SIZES.map((option) => {
            const available = product.sizes.includes(option);
            return (
              <button
                key={option}
                type="button"
                disabled={!available}
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setError(null);
                }}
                className={cn(
                  'h-12 border text-sm font-semibold transition-colors',
                  size === option && 'border-ink bg-ink text-paper',
                  size !== option && available && 'border-line bg-white hover:border-ink',
                  !available && 'cursor-not-allowed border-line bg-paper text-mist line-through',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold">Quantity</span>
        <QuantityStepper label="Quantity" value={quantity} onChange={setQuantity} />
      </div>

      <div className={cn('grid gap-3', variant === 'full' ? 'sm:grid-cols-2' : 'grid-cols-1')}>
        <button type="button" onClick={handleAddToBag} className="btn-dark w-full py-4">
          Add to bag
        </button>
        {variant === 'full' && (
          <button type="button" onClick={handleBuyNow} className="btn-primary w-full py-4">
            Buy now
          </button>
        )}
      </div>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
