import { SizeGuideContent } from '@/components/product/SizeGuide';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export default function SizeGuidePage() {
  useDocumentMeta('Size guide | THE CLUB JERSEY', 'Find your jersey size with our chest and length measurement chart.');

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 md:px-10 md:py-16">
      <p className="eyebrow text-smoke">Fit</p>
      <h1 className="display-lg mt-3">Size guide</h1>
      <p className="mt-6 max-w-2xl text-base leading-[1.5] text-smoke">
        Use this chart to choose your size before ordering. If you are between two sizes, message us and we will help
        you choose.
      </p>
      <div className="mt-12">
        <SizeGuideContent />
      </div>
    </div>
  );
}
