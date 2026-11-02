import type { Category } from '@/data/types';
import { photo } from '@/lib/images';

export const BRAND = {
  name: 'THE CLUB JERSEY',
  tagline: 'WEAR YOUR CLUB. LIVE YOUR PASSION.',
  announcement: 'YOUR CLUB. YOUR COLOURS. YOUR GAME.',
  website: 'theclubjersey.co.in',
};

export const STORE = {
  name: 'THE CLUB JERSEY — PRABHADEVI',
  address: 'Shop No. 10, Sadguru Darshan Building, Fitwala Road, Prabhadevi West, Mumbai – 400013',
  mapsQuery: 'Sadguru Darshan Building, Shop No. 10, Fitwala Road, Prabhadevi West, Mumbai 400013',
  landmarks: [
    'Near SBI ATM and KTM Showroom',
    '2 minutes walk from Prabhadevi Railway Station',
    'Near India Bulls Sky',
    'Opposite Sarthi Bar',
  ],
  timings: 'Usually 2:00 PM – 8:00/9:00 PM',
  phones: ['9326786457', '9082409082'],
  whatsappNumber: '919326786457',
  branches: {
    name: 'THE CLUB JERSEY — GHATKOPAR WEST',
    note: 'Our second branch is opening in Ghatkopar West, Mumbai. The exact address will be shared soon.',
  },
};

export const SOCIAL = {
  instagram: [
    { handle: '@theclubjerseymumbai', url: 'https://www.instagram.com/theclubjerseymumbai' },
  ],
};

export const CATEGORY_LABELS: Record<Category, string> = {
  football: 'Football',
  cricket: 'Cricket',
  retro: 'Retro',
};

export const HERO_SLIDES = [
  {
    id: 'football',
    image: photo('14460275', 1920),
    alt: 'Packed football stadium with fans under night lights',
    headline: ['FOOTBALL', 'IS A LIFESTYLE.'],
    description: 'From legendary clubs to unforgettable moments. Find the jersey that represents you.',
    primary: { label: 'Shop Football', to: '/jerseys?category=football' },
    secondary: { label: 'Explore Collection', to: '/jerseys' },
  },
  {
    id: 'legends',
    image: photo('41257', 1920),
    alt: 'Fans cheering in a bright football stadium',
    headline: ['REPRESENT', 'YOUR LEGENDS.'],
    description: 'Your favourite teams. Your favourite players. Your football identity.',
    primary: { label: 'Explore Jerseys', to: '/jerseys' },
    secondary: null,
  },
  {
    id: 'retro',
    image: '/images/Retro_Football_Legends_Collection.png',
    alt: 'Vintage football resting on wooden planks',
    headline: ['THE PAST.', 'THE PASSION.', 'THE JERSEY.'],
    description: 'Discover timeless football-inspired retro collections.',
    primary: { label: 'Shop Retro', to: '/jerseys?category=retro' },
    secondary: null,
  },
];

export const CATEGORY_CARDS: { category: Category; photoId: string; to: string; description: string }[] = [
  { category: 'football', photoId: '27642303', to: '/jerseys?category=football', description: 'Club and national team shirts' },
  { category: 'cricket', photoId: '10987827', to: '/jerseys?category=cricket', description: 'Whites, training and match kits' },
  { category: 'retro', photoId: '40016850', to: '/jerseys?category=retro', description: 'Vintage-inspired classics' },
];

export const FEATURED_PRODUCT_IDS = [
  'real-madrid-home',
  'barcelona-home',
  'manchester-united-home',
  'arsenal-home',
  'psg-home',
  'argentina-national',
  'brazil-national',
  'ac-milan-retro',
];

export const FEATURED_CLUB_SLUGS = [
  'real-madrid',
  'barcelona',
  'manchester-united',
  'arsenal',
  'liverpool',
  'chelsea',
  'psg',
  'bayern-munich',
  'ac-milan',
  'inter-milan',
  'manchester-city',
  'tottenham',
  'borussia-dortmund',
  'atletico-madrid',
  'juventus',
  'inter-miami',
  'al-hilal',
];

export const FEATURED_INTERNATIONAL_SLUGS = [
  'argentina',
  'brazil',
  'england',
  'france',
  'portugal',
];

export const TEAM_MONOGRAMS: Record<string, string> = {
  'real-madrid': 'RM',
  barcelona: 'FCB',
  'manchester-united': 'MU',
  arsenal: 'AFC',
  liverpool: 'LFC',
  chelsea: 'CFC',
  psg: 'PSG',
  'bayern-munich': 'FCB',
  'ac-milan': 'ACM',
  'inter-milan': 'INT',
  'manchester-city': 'MCI',
  tottenham: 'THFC',
  'borussia-dortmund': 'BVB',
  'atletico-madrid': 'ATM',
  juventus: 'JUV',
  'inter-miami': 'MIA',
  'al-hilal': 'ALH',
  argentina: 'ARG',
  brazil: 'BRA',
  india: 'IC',
  'india-football': 'IF',
  england: 'ENG',
  france: 'FRA',
  spain: 'ESP',
  portugal: 'POR',
  netherlands: 'NED',
  belgium: 'BEL',
  germany: 'GER',
  mexico: 'MEX',
  japan: 'JPN',
  italy: 'ITA',
};

export const GALLERY_PHOTO_IDS = [
  '19918607',
  '34691108',
  '31514425',
  '29348229',
  '12153269',
  '38345870',
  '20433896',
  '31514419',
];

export const FAQS = [
  {
    question: 'What types of jerseys do you sell?',
    answer:
      'We stock football club jerseys, national team jerseys, retro football jerseys, and cricket jerseys, in fan and player versions.',
  },
  {
    question: 'Do you have player and fan versions?',
    answer:
      'Yes. Most of our jerseys come in both fan and player versions. The version is shown on each product page, along with the sleeve options and sizes available.',
  },
  {
    question: 'Do you have retro jerseys?',
    answer:
      'Yes. Our retro collection features vintage-inspired football shirts. You can browse them from the Retro link in the menu.',
  },
  {
    question: 'Can I visit your physical store?',
    answer: `Yes, you are welcome to visit our Prabhadevi store. Store timings are ${STORE.timings}. We recommend calling ahead to confirm stock in your size.`,
  },
  {
    question: 'Where is the Prabhadevi store located?',
    answer: `${STORE.address}. We are near SBI ATM and KTM Showroom, 2 minutes walk from Prabhadevi Railway Station, near India Bulls Sky, and opposite Sarthi Bar.`,
  },
  {
    question: 'Do you have another branch?',
    answer: STORE.branches.note,
  },
  {
    question: 'How do I order a jersey online?',
    answer:
      'Choose your jersey and size, add it to your bag, then go to checkout. Enter your delivery details and we will open WhatsApp with your complete order message. Send it to confirm your order with our team.',
  },
  {
    question: 'How can I contact The Club Jersey?',
    answer: `Call or WhatsApp us on ${STORE.phones[0]} or ${STORE.phones[1]}, or message us on Instagram at ${SOCIAL.instagram[0].handle}.`,
  },
];
