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
    caption: 'Strategic Actualization Canvas',
    logoUrl: '',
    canvasSize: 'A4',
    backgroundPattern: 'paper-fibers',
    noteColumns: 2,
  },
  blocks: {
    suppliers: {
      id: 'suppliers',
      notes: [],
    },
    problem: {
      id: 'problem',
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
      notes: [],
    },
    solution: {
      id: 'solution',
      notes: [],
    },
    essentialAssets: {
      id: 'essentialAssets',
      notes: [],
    },
    keyMetrics: {
      id: 'keyMetrics',
      notes: [],
    },
    valuePropositions: {
      id: 'valuePropositions',
      notes: [{ id: 'n2', title: 'Speed', body: '10x Faster than incumbents.', color: 'green' }],
    },
    unfairAdvantage: {
      id: 'unfairAdvantage',
      notes: [],
    },
    channels: {
      id: 'channels',
      notes: [],
    },
    customerRelationships: {
      id: 'customerRelationships',
      notes: [],
    },
    customerSegments: {
      id: 'customerSegments',
      notes: [{ id: 'n3', title: 'Gen Z', body: 'Tech savvy users.', color: 'blue' }],
    },
    costStructure: {
      id: 'costStructure',
      notes: [],
    },
    revenueStreams: {
      id: 'revenueStreams',
      notes: [],
    },
  },
};

export const SEED_DATA: CanvasData = {
  meta: {
    title: 'EcoScoot',
    caption: 'Urban Electric Mobility Platform',
    logoUrl:
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgNDAgNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yMCAwQzI1LjMwNDMgNC4wMDQ2NmUtMDcgMzAuMzkxOSAyLjEwNjY5IDM0LjE0MjYgNS44NTc0MkMzNC44MTU3IDYuNTMwNTggMzUuNDM1NCA3LjI0NzE5IDM2IDhIMjBDMTYuODE3NCA4IDEzLjc2NTEgOS4yNjQyMSAxMS41MTQ2IDExLjUxNDZDOS4yNjQyMSAxMy43NjUxIDggMTYuODE3NCA4IDIwSDIwTDM2LjkxMDIgOS4zMTkzNEMzOC4xNjU2IDExLjMwNzQgMzkuMDYxMSAxMy41MDI3IDM5LjU1NDcgMTUuODAyN0wzMiAyMEgyMEwzOS45OTQxIDIwLjQ5NzFDMzkuODY2OSAyNS42MjEzIDM3Ljc3NiAzMC41MDkyIDM0LjE0MjYgMzQuMTQyNkMzMC4zOTE5IDM3Ljg5MzMgMjUuMzA0MyA0MCAyMCA0MEMxNC42OTU3IDQwIDkuNjA4MTUgMzcuODkzMyA1Ljg1NzQyIDM0LjE0MjZDNS4xODQyNiAzMy40Njk0IDQuNTY0NTkgMzIuNzUyOCA0IDMySDIwQzIzLjE4MjYgMzIgMjYuMjM0OSAzMC43MzU4IDI4LjQ4NTQgMjguNDg1NEMzMC41OTUyIDI2LjM3NTUgMzEuODM4MyAyMy41NjA4IDMxLjk4NTQgMjAuNTk0N0wzMiAyMEgyMEwzLjA4OTg0IDMwLjY3ODdDMS44MzQ1MiAyOC42OTA2IDAuOTQxMDAyIDI2LjQ5NTEgMC40NDcyNjYgMjQuMTk1M0w4IDIwSDBDOC4wMDkzMWUtMDcgMTQuNjk1NyAyLjEwNjcgOS42MDgxNSA1Ljg1NzQyIDUuODU3NDJDOS42MDgxNSAyLjEwNjcgMTQuNjk1NyAtNS43OTM2MWUtMTAgMjAgMFoiIGZpbGw9IiMwMDk0RjciPjwvcGF0aD4KPC9zdmc+',
    canvasSize: 'A4',
    backgroundPattern: 'lined-paper',
    noteColumns: 2,
  },
  blocks: {
    suppliers: {
      id: 'suppliers',
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
      notes: [
        { id: 'pf1', title: 'Fleet Mgmt', body: 'Daily charging & repairs.', color: 'green' },
        { id: 'pf2', title: 'App Dev', body: 'User experience & tracking.', color: 'green' },
      ],
    },
    solution: {
      id: 'solution',
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
      notes: [
        { id: 'km1', title: 'Rides/Day', body: 'Target: 4 rides per scooter.', color: 'green' },
        { id: 'km2', title: 'CAC', body: 'Cost to acquire rider < $5.', color: 'yellow' },
      ],
    },
    valuePropositions: {
      id: 'valuePropositions',
      notes: [
        { id: 'vp1', title: 'Fast Commute', body: 'Bypass traffic instantly.', color: 'green' },
        { id: 'vp2', title: 'Eco-Friendly', body: 'Zero emissions ride.', color: 'green' },
        { id: 'vp3', title: 'Affordable', body: 'Cheaper than Uber/Taxi.', color: 'green' },
      ],
    },
    unfairAdvantage: {
      id: 'unfairAdvantage',
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
      notes: [
        { id: 'ch1', title: 'Mobile App', body: 'iOS and Android Store.', color: 'yellow' },
        { id: 'ch2', title: 'Social Media', body: 'Instagram local influencers.', color: 'yellow' },
      ],
    },
    customerRelationships: {
      id: 'customerRelationships',
      notes: [
        { id: 'cr1', title: 'Automated', body: 'Self-service via app.', color: 'blue' },
        { id: 'cr2', title: 'Support Chat', body: '24/7 in-app assistance.', color: 'blue' },
      ],
    },
    customerSegments: {
      id: 'customerSegments',
      notes: [
        { id: 'cs1', title: 'Commuters', body: 'Daily office workers.', color: 'pink' },
        { id: 'cs2', title: 'Students', body: 'University campus travel.', color: 'pink' },
        { id: 'cs3', title: 'Tourists', body: 'City exploration.', color: 'pink' },
      ],
    },
    costStructure: {
      id: 'costStructure',
      notes: [
        { id: 'cst1', title: 'Hardware', body: 'Scooter purchase & depreciation.', color: 'red' },
        { id: 'cst2', title: 'Charging', body: 'Electricity and "Juicer" labor.', color: 'red' },
      ],
    },
    revenueStreams: {
      id: 'revenueStreams',
      notes: [
        { id: 'rs1', title: 'Unlock Fee', body: '$1 per ride start.', color: 'green' },
        { id: 'rs2', title: 'Per Minute', body: '$0.15 per minute riding.', color: 'green' },
      ],
    },
  },
};

export const SEED_DATA_FA: CanvasData = {
  meta: {
    title: 'اکواسکوت',
    caption: 'پلتفرم حمل و نقل برقی شهری',
    logoUrl: SEED_DATA.meta.logoUrl,
    canvasSize: 'A4',
    backgroundPattern: 'lined-paper',
    noteColumns: 2,
    fonts: {
      noteTitle: 'vazirmatn',
      noteBody: 'vazirmatn',
      blockTitle: 'vazirmatn',
      canvasCaption: 'vazirmatn',
      canvasTitle: 'vazirmatn',
    },
  },
  blocks: {
    suppliers: {
      id: 'suppliers',
      notes: [
        {
          id: 's1',
          title: 'شرکت باتری',
          body: 'تامین‌کننده سلول‌های لیتیومی برد بلند.',
          color: 'blue',
        },
        { id: 's2', title: 'شورای شهر', body: 'مجوزها و مناطق شارژ.', color: 'yellow' },
      ],
    },
    problem: {
      id: 'problem',
      notes: [
        {
          id: 'p1',
          title: 'ترافیک سنگین',
          body: 'رفت و آمد در مرکز شهر خیلی طول می‌کشد.',
          color: 'pink',
        },
        { id: 'p2', title: 'آلودگی', body: 'ردپای کربنی بالای خودروها.', color: 'pink' },
      ],
    },
    primaryFunctions: {
      id: 'primaryFunctions',
      notes: [
        { id: 'pf1', title: 'مدیریت ناوگان', body: 'شارژ روزانه و تعمیرات.', color: 'green' },
        { id: 'pf2', title: 'توسعه اپلیکیشن', body: 'تجربه کاربری و ردیابی.', color: 'green' },
      ],
    },
    solution: {
      id: 'solution',
      notes: [
        {
          id: 'sol1',
          title: 'اسکوترهای برقی',
          body: 'قابل استفاده در هر جا، باز کردن قفل با اپ.',
          color: 'yellow',
        },
      ],
    },
    essentialAssets: {
      id: 'essentialAssets',
      notes: [
        { id: 'ea1', title: 'ناوگان', body: '۵۰۰ اسکوتر اولیه.', color: 'blue' },
        {
          id: 'ea2',
          title: 'هاب‌های شارژ',
          body: 'انبارها با موقعیت استراتژیک.',
          color: 'blue',
        },
      ],
    },
    keyMetrics: {
      id: 'keyMetrics',
      notes: [
        { id: 'km1', title: 'سفر/روز', body: 'هدف: ۴ سفر برای هر اسکوتر.', color: 'green' },
        { id: 'km2', title: 'هزینه جذب', body: 'هزینه جذب کاربر < ۵ دلار.', color: 'yellow' },
      ],
    },
    valuePropositions: {
      id: 'valuePropositions',
      notes: [
        { id: 'vp1', title: 'سفر سریع', body: 'دور زدن فوری ترافیک.', color: 'green' },
        { id: 'vp2', title: 'دوستدار محیط زیست', body: 'سفر بدون آلایندگی.', color: 'green' },
        { id: 'vp3', title: 'مقرون به صرفه', body: 'ارزان‌تر از اوبر/تاکسی.', color: 'green' },
      ],
    },
    unfairAdvantage: {
      id: 'unfairAdvantage',
      notes: [
        {
          id: 'ua1',
          title: 'قرارداد انحصاری',
          body: 'قرارداد ۳ ساله انحصاری با شهر.',
          color: 'blue',
        },
      ],
    },
    channels: {
      id: 'channels',
      notes: [
        { id: 'ch1', title: 'اپلیکیشن موبایل', body: 'استور iOS و اندروید.', color: 'yellow' },
        {
          id: 'ch2',
          title: 'شبکه‌های اجتماعی',
          body: 'اینفلوئنسرهای محلی اینستاگرام.',
          color: 'yellow',
        },
      ],
    },
    customerRelationships: {
      id: 'customerRelationships',
      notes: [
        { id: 'cr1', title: 'خودکار', body: 'سلف‌سرویس از طریق اپ.', color: 'blue' },
        { id: 'cr2', title: 'چت پشتیبانی', body: 'پشتیبانی ۲۴/۷ درون برنامه‌ای.', color: 'blue' },
      ],
    },
    customerSegments: {
      id: 'customerSegments',
      notes: [
        { id: 'cs1', title: 'کارمندان', body: 'کارمندان اداری روزانه.', color: 'pink' },
        { id: 'cs2', title: 'دانشجویان', body: 'سفرهای پردیس دانشگاه.', color: 'pink' },
        { id: 'cs3', title: 'گردشگران', body: 'گشت و گذار در شهر.', color: 'pink' },
      ],
    },
    costStructure: {
      id: 'costStructure',
      notes: [
        { id: 'cst1', title: 'سخت‌افزار', body: 'خرید و استهلاک اسکوتر.', color: 'red' },
        { id: 'cst2', title: 'شارژ', body: 'برق و نیروی کار "جویسر".', color: 'red' },
      ],
    },
    revenueStreams: {
      id: 'revenueStreams',
      notes: [
        { id: 'rs1', title: 'هزینه بازگشایی', body: '۱ دلار برای شروع هر سفر.', color: 'green' },
        { id: 'rs2', title: 'دقیقه‌ای', body: '۰.۱۵ دلار برای هر دقیقه سواری.', color: 'green' },
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
