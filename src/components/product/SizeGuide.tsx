import Modal from '@/components/ui/Modal';
import { SIZES } from '@/data/types';
import type { Size } from '@/data/types';

const CHART: Record<Size, { chest: string; length: string; sleeve: string }> = {
  S: { chest: '96 – 100', length: '68', sleeve: '22' },
  M: { chest: '100 – 104', length: '70', sleeve: '23' },
  L: { chest: '106 – 110', length: '72', sleeve: '24' },
  XL: { chest: '112 – 116', length: '74', sleeve: '25' },
  XXL: { chest: '118 – 122', length: '76', sleeve: '26' },
};

export function SizeGuideContent() {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <caption className="mb-4 text-left text-smoke">All measurements in centimetres.</caption>
          <thead>
            <tr className="border-b border-ink">
              <th scope="col" className="py-3 pr-4 font-display text-xl tracking-wide">
                Size
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Chest
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Jersey length
              </th>
              <th scope="col" className="py-3 font-semibold">
                Sleeve (half)
              </th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((size) => (
              <tr key={size} className="border-b border-line">
                <th scope="row" className="py-4 pr-4 font-display text-2xl tracking-wide">
                  {size}
                </th>
                <td className="py-4 pr-4 tabular-nums">{CHART[size].chest}</td>
                <td className="py-4 pr-4 tabular-nums">{CHART[size].length}</td>
                <td className="py-4 tabular-nums">{CHART[size].sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold">How to measure</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.5] text-smoke">
            <li>Chest: measure around the fullest part of your chest, under the arms.</li>
            <li>Length: measure from the highest point of the shoulder down to the hem.</li>
          </ul>
        </div>
        <p className="text-sm leading-[1.5] text-smoke">
          Measurements vary slightly between clubs and player or fan versions. If you are between two sizes, WhatsApp
          us your measurements and we will recommend the best fit.
        </p>
      </div>
    </div>
  );
}

export default function SizeGuideModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Size guide" maxWidthClass="max-w-3xl">
      <SizeGuideContent />
    </Modal>
  );
}
