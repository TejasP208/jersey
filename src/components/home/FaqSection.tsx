import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { FAQS, STORE } from '@/data/site';
import { cn } from '@/lib/cn';

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenItems((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="Help" title="FREQUENTLY ASKED QUESTIONS." />
          <p className="mt-6 text-base leading-[1.5] text-smoke">
            Still have a question? Call or WhatsApp us on {STORE.phones[0]} and our team will help.
          </p>
        </div>

        <ul className="border-y border-line lg:col-span-8">
          {FAQS.map((faq, index) => {
            const isOpen = openItems.includes(index);
            const panelId = `faq-panel-${index}`;
            return (
              <li key={faq.question} className="border-b border-line last:border-b-0">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-smoke"
                  >
                    <span className="text-lg font-semibold md:text-xl">{faq.question}</span>
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center border border-ink transition-all duration-300',
                        isOpen && 'rotate-45 bg-ink text-paper',
                      )}
                    >
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 pr-14 text-[15px] leading-[1.5] text-smoke md:text-base">{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
