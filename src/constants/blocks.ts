import { CanvasData } from '@/types';

export const BLOCK_IDS = [
  'suppliers',
  'problem',
  'primaryFunctions',
  'solution',
  'essentialAssets',
  'keyMetrics',
  'valuePropositions',
  'unfairAdvantage',
  'channels',
  'customerRelationships',
  'customerSegments',
  'costStructure',
  'revenueStreams',
] as const;

export type BlockId = (typeof BLOCK_IDS)[number];

export const DEFAULT_DATA: CanvasData = {
  meta: {
    title: 'My Awesome Startup',
    caption: 'EBMC-13 Strategy Canvas',
    logoUrl: '',
  },
  blocks: {
    suppliers: {
      id: 'suppliers',
      titleEn: '11. Suppliers',
      titleFa: '۱۱. تامین‌کنندگان',
      notes: [],
    },
    problem: {
      id: 'problem',
      titleEn: '1. Problem',
      titleFa: '۱. مسئله',
      notes: [
        {
          id: 'n1',
          title: 'Inefficiency',
          body: 'Current solutions are too slow.',
          color: 'yellow',
        },
      ],
    },
    primaryFunctions: {
      id: 'primaryFunctions',
      titleEn: '12. Primary Functions',
      titleFa: '۱۲. فعالیت‌های اصلی',
      notes: [],
    },
    solution: {
      id: 'solution',
      titleEn: '2. Solution',
      titleFa: '۲. راه‌حل',
      notes: [],
    },
    essentialAssets: {
      id: 'essentialAssets',
      titleEn: '13. Essential Assets',
      titleFa: '۱۳. دارایی‌های ضروری',
      notes: [],
    },
    keyMetrics: {
      id: 'keyMetrics',
      titleEn: '3. Key Metrics',
      titleFa: '۳. سنجه‌های کلیدی',
      notes: [],
    },
    valuePropositions: {
      id: 'valuePropositions',
      titleEn: '5. Value Propositions',
      titleFa: '۵. ارزش پیشنهادی',
      notes: [{ id: 'n2', title: 'Speed', body: '10x Faster than incumbents.', color: 'green' }],
    },
    unfairAdvantage: {
      id: 'unfairAdvantage',
      titleEn: '4. Unfair Advantage',
      titleFa: '۴. مزیت مطلق',
      notes: [],
    },
    channels: {
      id: 'channels',
      titleEn: '7. Channels',
      titleFa: '۷. کانال‌ها',
      notes: [],
    },
    customerRelationships: {
      id: 'customerRelationships',
      titleEn: '8. Customer Relationships',
      titleFa: '۸. ارتباط با مشتریان',
      notes: [],
    },
    customerSegments: {
      id: 'customerSegments',
      titleEn: '6. Customer Segments',
      titleFa: '۶. بخش‌های مشتریان',
      notes: [{ id: 'n3', title: 'Gen Z', body: 'Tech savvy users.', color: 'blue' }],
    },
    costStructure: {
      id: 'costStructure',
      titleEn: '10. Cost Structure',
      titleFa: '۱۰. ساختار هزینه‌ها',
      notes: [],
    },
    revenueStreams: {
      id: 'revenueStreams',
      titleEn: '9. Revenue Streams',
      titleFa: '۹. جریان‌های درآمدی',
      notes: [],
    },
  },
};

export const SEED_DATA: CanvasData = {
  meta: {
    title: 'EcoScoot',
    caption: 'Urban Electric Mobility Platform',
    logoUrl: '',
  },
  blocks: {
    suppliers: {
      id: 'suppliers',
      titleEn: '11. Suppliers',
      titleFa: '۱۱. تامین‌کنندگان',
      notes: [
        {
          id: 's1',
          title: 'Battery Corp',
          body: 'Long-range lithium cells provider.',
          color: 'blue',
        },
        { id: 's2', title: 'City Council', body: 'Permits and charging zones.', color: 'yellow' },
      ],
    },
    problem: {
      id: 'problem',
      titleEn: '1. Problem',
      titleFa: '۱. مسئله',
      notes: [
        {
          id: 'p1',
          title: 'Traffic Jams',
          body: 'Commuting takes too long in CBD.',
          color: 'pink',
        },
        { id: 'p2', title: 'Pollution', body: 'High carbon footprint of cars.', color: 'pink' },
      ],
    },
    primaryFunctions: {
      id: 'primaryFunctions',
      titleEn: '12. Primary Functions',
      titleFa: '۱۲. فعالیت‌های اصلی',
      notes: [
        { id: 'pf1', title: 'Fleet Mgmt', body: 'Daily charging & repairs.', color: 'green' },
        { id: 'pf2', title: 'App Dev', body: 'User experience & tracking.', color: 'green' },
      ],
    },
    solution: {
      id: 'solution',
      titleEn: '2. Solution',
      titleFa: '۲. راه‌حل',
      notes: [
        {
          id: 'sol1',
          title: 'E-Scooters',
          body: 'Deployable anywhere, unlock via app.',
          color: 'yellow',
        },
      ],
    },
    essentialAssets: {
      id: 'essentialAssets',
      titleEn: '13. Essential Assets',
      titleFa: '۱۳. دارایی‌های ضروری',
      notes: [
        { id: 'ea1', title: 'The Fleet', body: '500 Initial Scooters.', color: 'blue' },
        {
          id: 'ea2',
          title: 'Charging Hubs',
          body: 'Strategically placed warehouses.',
          color: 'blue',
        },
      ],
    },
    keyMetrics: {
      id: 'keyMetrics',
      titleEn: '3. Key Metrics',
      titleFa: '۳. سنجه‌های کلیدی',
      notes: [
        { id: 'km1', title: 'Rides/Day', body: 'Target: 4 rides per scooter.', color: 'green' },
        { id: 'km2', title: 'CAC', body: 'Cost to acquire rider < $5.', color: 'yellow' },
      ],
    },
    valuePropositions: {
      id: 'valuePropositions',
      titleEn: '5. Value Propositions',
      titleFa: '۵. ارزش پیشنهادی',
      notes: [
        { id: 'vp1', title: 'Fast Commute', body: 'Bypass traffic instantly.', color: 'green' },
        { id: 'vp2', title: 'Eco-Friendly', body: 'Zero emissions ride.', color: 'green' },
        { id: 'vp3', title: 'Affordable', body: 'Cheaper than Uber/Taxi.', color: 'green' },
      ],
    },
    unfairAdvantage: {
      id: 'unfairAdvantage',
      titleEn: '4. Unfair Advantage',
      titleFa: '۴. مزیت مطلق',
      notes: [
        {
          id: 'ua1',
          title: 'Exclusive Deal',
          body: '3-year exclusive city contract.',
          color: 'blue',
        },
      ],
    },
    channels: {
      id: 'channels',
      titleEn: '7. Channels',
      titleFa: '۷. کانال‌ها',
      notes: [
        { id: 'ch1', title: 'Mobile App', body: 'iOS and Android Store.', color: 'yellow' },
        { id: 'ch2', title: 'Social Media', body: 'Instagram local influencers.', color: 'yellow' },
      ],
    },
    customerRelationships: {
      id: 'customerRelationships',
      titleEn: '8. Customer Relationships',
      titleFa: '۸. ارتباط با مشتریان',
      notes: [
        { id: 'cr1', title: 'Automated', body: 'Self-service via app.', color: 'blue' },
        { id: 'cr2', title: 'Support Chat', body: '24/7 in-app assistance.', color: 'blue' },
      ],
    },
    customerSegments: {
      id: 'customerSegments',
      titleEn: '6. Customer Segments',
      titleFa: '۶. بخش‌های مشتریان',
      notes: [
        { id: 'cs1', title: 'Commuters', body: 'Daily office workers.', color: 'pink' },
        { id: 'cs2', title: 'Students', body: 'University campus travel.', color: 'pink' },
        { id: 'cs3', title: 'Tourists', body: 'City exploration.', color: 'pink' },
      ],
    },
    costStructure: {
      id: 'costStructure',
      titleEn: '10. Cost Structure',
      titleFa: '۱۰. ساختار هزینه‌ها',
      notes: [
        { id: 'cst1', title: 'Hardware', body: 'Scooter purchase & depreciation.', color: 'red' },
        { id: 'cst2', title: 'Charging', body: 'Electricity and "Juicer" labor.', color: 'red' },
      ],
    },
    revenueStreams: {
      id: 'revenueStreams',
      titleEn: '9. Revenue Streams',
      titleFa: '۹. جریان‌های درآمدی',
      notes: [
        { id: 'rs1', title: 'Unlock Fee', body: '$1 per ride start.', color: 'green' },
        { id: 'rs2', title: 'Per Minute', body: '$0.15 per minute riding.', color: 'green' },
      ],
    },
  },
};

export const NOTE_COLORS = {
  yellow: 'bg-yellow-100 border-yellow-200 text-yellow-900',
  blue: 'bg-blue-100 border-blue-200 text-blue-900',
  green: 'bg-green-100 border-green-200 text-green-900',
  pink: 'bg-pink-100 border-pink-200 text-pink-900',
  red: 'bg-red-100 border-red-200 text-red-900',
} as const;

export const NOTE_COLOR_VALUES = {
  yellow: '#fef3c7',
  blue: '#dbeafe',
  green: '#dcfce7',
  pink: '#fce7f3',
  red: '#fee2e2',
} as const;
