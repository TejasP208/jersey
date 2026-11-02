import { BRAND, STORE } from '@/data/site';

export type LegalDocumentId = 'privacy' | 'terms';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocument {
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentId, LegalDocument> = {
  privacy: {
    title: 'Privacy policy',
    summary: 'How The Club Jersey handles the details you share while shopping with us.',
    updated: 'January 2025',
    sections: [
      {
        heading: 'What we collect',
        paragraphs: [
          'When you place an order, we collect the name, mobile number, delivery address, city and pincode you enter at checkout. Your cart and wishlist are stored only in your own browser.',
          'We do not take card payments on this website, and we do not store card or bank details.',
        ],
      },
      {
        heading: 'How we use your details',
        paragraphs: [
          `We use your details only to confirm, prepare and deliver your order, and to contact you about it on WhatsApp or by phone at the number you provide.`,
          'We do not sell your personal information or share it with advertisers.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          `You can clear your cart and wishlist at any time from your browser settings. To ask for your details to be corrected or deleted, contact us at ${STORE.phones[0]}.`,
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of sale',
    summary: 'The terms that apply when you order from The Club Jersey online or in store.',
    updated: 'January 2025',
    sections: [
      {
        heading: 'Orders',
        paragraphs: [
          `Placing an order on ${BRAND.website} sends your order details to our team on WhatsApp. An order is confirmed only after our team replies to confirm stock, size, delivery and the final total.`,
          'Prices are shown in Indian rupees and include applicable taxes unless stated otherwise.',
        ],
      },
      {
        heading: 'Sizes and returns',
        paragraphs: [
          'Please check the size guide before ordering. Products are sold as shown, and sizes are subject to the stock we hold at the time of confirmation.',
          'Customised or opened items cannot be returned. For any issue with your order, contact us on WhatsApp within 48 hours of delivery.',
        ],
      },
      {
        heading: 'Products and branding',
        paragraphs: [
          'Club, national team and player names are used to describe the products we sell. The Club Jersey is an independent retailer and is not affiliated with these clubs or federations.',
        ],
      },
    ],
  },
};
