import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { LEGAL_DOCUMENTS } from '@/data/legal';
import type { LegalDocumentId } from '@/data/legal';

export default function LegalPage({ id }: { id: LegalDocumentId }) {
  const document = LEGAL_DOCUMENTS[id];
  useDocumentMeta(`${document.title} | THE CLUB JERSEY`, document.summary);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-10 md:py-16">
      <p className="eyebrow text-smoke">Legal</p>
      <h1 className="display-lg mt-3">{document.title}</h1>
      <p className="mt-4 text-sm text-smoke">Last updated {document.updated}</p>

      <div className="mt-12 space-y-10">
        {document.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-[15px] leading-[1.5] text-smoke">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
