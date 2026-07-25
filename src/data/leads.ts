export type LeadBucket = 'in-stock' | 'consignment'

/** The six attributes compared between the detected message and your stock. */
export type WatchSpec = {
  model: string
  reference: string
  color: string
  band: string
  dialFormat: string
  dialSize: string
}

export type LeadDetails = {
  deliverySet: string
  currency: string
  year: string
  price: string
  month: string
  paymentType: string
  condition: string
  country: string
}

export type Lead = {
  id: string
  ref: string
  brand: string
  releaseYear: string
  title: string
  /** Key into the map in `src/assets/index.ts`. */
  image: string
  /** Extra angles shown in the detail carousel. */
  gallery: string[]
  year: string
  condition: string
  listingDate: string
  bucket: LeadBucket
  matchPercent: number
  sender: {
    name: string
    flag: string
    group: string
    company: string
  }
  message: string
  rawMessage: string
  autoReply: string
  detected: WatchSpec
  yours: WatchSpec
  details: LeadDetails
}

/** Values offered by the detected-spec dropdowns in the detail view. */
export const SPEC_OPTIONS: Record<keyof WatchSpec, string[]> = {
  model: ['Air King', 'Day-Date', 'Datejust', 'Submariner', 'Cosmograph Daytona'],
  reference: ['126500LN', '126334', '128238', '126610LV', '116234-0002'],
  color: ['White', 'Gray', 'Black', 'Green', 'Champagne', 'Blue'],
  band: ['Oyster', 'Oyster Blue', 'Jubilee', 'President', 'Leather'],
  dialFormat: ['Arabic Numerals', 'Roman Numerals', 'Baton', 'Diamond', 'N/A'],
  dialSize: ['36.00 MM', '40.00 MM', '41.00 MM', '44.00 MM', 'N/A'],
}

export const SPEC_LABELS: Array<{ key: keyof WatchSpec; label: string }> = [
  { key: 'model', label: 'Model' },
  { key: 'reference', label: 'Reference number' },
  { key: 'color', label: 'Color' },
  { key: 'band', label: 'Band' },
  { key: 'dialFormat', label: 'Dial format' },
  { key: 'dialSize', label: 'Dial Size' },
]

export const DETAIL_FIELDS: Array<{ key: keyof LeadDetails; label: string }> = [
  { key: 'deliverySet', label: 'Delivery Set' },
  { key: 'currency', label: 'Currency' },
  { key: 'year', label: 'Year' },
  { key: 'price', label: 'Price' },
  { key: 'month', label: 'Month' },
  { key: 'paymentType', label: 'Payment Type' },
  { key: 'condition', label: 'Condition' },
  { key: 'country', label: 'Country' },
]

const RAW_MESSAGE = `NTG
126733GRNR
2023 - 2024
Must be full set unworn
For UK based dealers only — payment on collection.`

const reply = (title: string, ref: string, price: string) =>
  `Hey Watch Life Ltd, I've seen your message in UK🇬🇧 Watch Traders group.

We have the watch below available if needed.

Brand: Rolex ${title}
Ref: ${ref}
Case Material: Stainless Steel
Case Size: 41.00 MM
Color: White

• ${price} •

Date: 2025
Condition: New
Set: Watch with Box & Papers

Pictures: https://daowatches.com/product/3106`

export const LEADS: Lead[] = [
  {
    id: 'ld-1',
    ref: '116234-0002',
    brand: 'Rolex',
    releaseYear: '2025',
    title: 'Day-Date 40',
    image: 'daydate-green-rose',
    gallery: ['daydate-green-rose', 'daytona-green', 'daytona-white', 'daytona-black', 'daytona-blue'],
    year: '2024',
    condition: 'Mint',
    listingDate: '2025/03/08 11:32',
    bucket: 'in-stock',
    matchPercent: 78.2,
    sender: {
      name: 'John Pederson',
      flag: '🇬🇧',
      group: 'UK🇬🇧 Watch Traders',
      company: 'Watch Life Ltd',
    },
    message: 'WTS 2020 - TRUE UNWORN FULL SET, box and papers included, ready to ship today.',
    rawMessage: RAW_MESSAGE,
    autoReply: reply('Day-Date 40', '126500LN-0001', '£26,000'),
    detected: {
      model: 'Air King',
      reference: '126500LN',
      color: 'White',
      band: 'Oyster',
      dialFormat: 'N/A',
      dialSize: 'N/A',
    },
    yours: {
      model: 'Air King',
      reference: '126500LN',
      color: 'White',
      band: 'Oyster',
      dialFormat: 'Arabic Numerals',
      dialSize: '40.00 MM',
    },
    details: {
      deliverySet: 'Available Now',
      currency: 'GBP (£)',
      year: '2025',
      price: '£23,450',
      month: 'January',
      paymentType: 'Bank Transfer',
      condition: 'New',
      country: 'United Kingdom',
    },
  },
  {
    id: 'ld-2',
    ref: '116234-0002',
    brand: 'Rolex',
    releaseYear: '2025',
    title: 'Datejust 41',
    image: 'datejust-blue-steel',
    gallery: ['datejust-blue-steel', 'daytona-blue', 'daytona-black', 'submariner-black', 'daytona-white'],
    year: '2024',
    condition: 'Mint',
    listingDate: '2025/03/08 11:32',
    bucket: 'in-stock',
    matchPercent: 91.4,
    sender: {
      name: 'John Pederson',
      flag: '🇬🇧',
      group: 'UK🇬🇧 Watch Traders',
      company: 'Watch Life Ltd',
    },
    message: 'WTS 2020 - TRUE UNWORN FULL SET, looking for a quick sale this week.',
    rawMessage: RAW_MESSAGE,
    autoReply: reply('Datejust 41', '126334-0001', '£11,200'),
    detected: {
      model: 'Datejust',
      reference: '126334',
      color: 'Blue',
      band: 'Jubilee',
      dialFormat: 'Baton',
      dialSize: '41.00 MM',
    },
    yours: {
      model: 'Datejust',
      reference: '126334',
      color: 'Blue',
      band: 'Jubilee',
      dialFormat: 'Baton',
      dialSize: '41.00 MM',
    },
    details: {
      deliverySet: 'Available Now',
      currency: 'GBP (£)',
      year: '2025',
      price: '£11,200',
      month: 'February',
      paymentType: 'Escrow',
      condition: 'Unworn',
      country: 'United Kingdom',
    },
  },
  {
    id: 'ld-3',
    ref: '116234-0002',
    brand: 'Rolex',
    releaseYear: '2025',
    title: 'Datejust 41',
    image: 'datejust-choc-rose',
    gallery: ['datejust-choc-rose', 'daytona-green', 'daytona-white', 'daytona-black'],
    year: '2024',
    condition: 'Mint',
    listingDate: '2025/03/08 11:32',
    bucket: 'in-stock',
    matchPercent: 64.8,
    sender: {
      name: 'John Pederson',
      flag: '🇬🇧',
      group: 'UK🇬🇧 Watch Traders',
      company: 'Watch Life Ltd',
    },
    message: 'WTS 2020 - TRUE UNWORN FULL SET, happy to send more pictures on request.',
    rawMessage: RAW_MESSAGE,
    autoReply: reply('Datejust 41', '126331-0002', '£13,900'),
    detected: {
      model: 'Datejust',
      reference: '128238',
      color: 'Gray',
      band: 'Oyster Blue',
      dialFormat: 'N/A',
      dialSize: 'N/A',
    },
    yours: {
      model: 'Datejust',
      reference: '128238',
      color: 'White',
      band: 'Oyster',
      dialFormat: 'Arabic Numerals',
      dialSize: '40.00 MM',
    },
    details: {
      deliverySet: 'On Request',
      currency: 'GBP (£)',
      year: '2025',
      price: '£13,900',
      month: 'March',
      paymentType: 'Bank Transfer',
      condition: 'Mint',
      country: 'United Kingdom',
    },
  },
  {
    id: 'ld-4',
    ref: '116500-0001',
    brand: 'Rolex',
    releaseYear: '2025',
    title: 'Cosmograph Daytona',
    image: 'daytona-black',
    gallery: ['daytona-black', 'daytona-white', 'daytona-blue'],
    year: '2023',
    condition: 'Pre-owned',
    listingDate: '2025/03/06 09:14',
    bucket: 'consignment',
    matchPercent: 82.5,
    sender: {
      name: 'Amelia Rowe',
      flag: '🇮🇹',
      group: 'EU Watch Dealers',
      company: 'Rowe Timepieces',
    },
    message: 'Looking for a Daytona full set, 2023 or newer. Cash waiting, can collect in Milan.',
    rawMessage: RAW_MESSAGE,
    autoReply: reply('Cosmograph Daytona', '116500LN-0001', '£28,750'),
    detected: {
      model: 'Cosmograph Daytona',
      reference: '126500LN',
      color: 'Black',
      band: 'Oyster',
      dialFormat: 'Baton',
      dialSize: '40.00 MM',
    },
    yours: {
      model: 'Cosmograph Daytona',
      reference: '126500LN',
      color: 'Black',
      band: 'Oyster',
      dialFormat: 'Baton',
      dialSize: '40.00 MM',
    },
    details: {
      deliverySet: 'Available Now',
      currency: 'EUR (€)',
      year: '2023',
      price: '€32,400',
      month: 'March',
      paymentType: 'Escrow',
      condition: 'Pre-owned',
      country: 'Italy',
    },
  },
  {
    id: 'ld-5',
    ref: '126610-0004',
    brand: 'Rolex',
    releaseYear: '2024',
    title: 'Submariner Date',
    image: 'submariner-black',
    gallery: ['submariner-black', 'daytona-black', 'daytona-blue'],
    year: '2022',
    condition: 'Excellent',
    listingDate: '2025/03/04 16:48',
    bucket: 'consignment',
    matchPercent: 55.1,
    sender: {
      name: 'Marcus Feld',
      flag: '🇩🇪',
      group: 'DE Trade Circle',
      company: 'Feld & Sons',
    },
    message: 'WTB Submariner 41mm, box and papers preferred but not essential.',
    rawMessage: RAW_MESSAGE,
    autoReply: reply('Submariner Date', '126610LN-0001', '£9,850'),
    detected: {
      model: 'Submariner',
      reference: '126610LV',
      color: 'Green',
      band: 'Oyster',
      dialFormat: 'Baton',
      dialSize: '41.00 MM',
    },
    yours: {
      model: 'Submariner',
      reference: '126610LV',
      color: 'Black',
      band: 'Oyster',
      dialFormat: 'Baton',
      dialSize: '41.00 MM',
    },
    details: {
      deliverySet: 'On Request',
      currency: 'EUR (€)',
      year: '2022',
      price: '€11,600',
      month: 'April',
      paymentType: 'Bank Transfer',
      condition: 'Excellent',
      country: 'Germany',
    },
  },
]

export type MatchPromo = {
  id: string
  eyebrow: string
  headline: string
  image: string
}

export const MATCH_PROMOS: MatchPromo[] = [
  { id: 'mp-1', eyebrow: 'Review price for 6 listings', headline: '4 requests for Datejust 41', image: 'daytona-black' },
  { id: 'mp-2', eyebrow: 'Review price for 6 listings', headline: '9 requests for Daytona 126500LN', image: 'daytona-blue' },
  { id: 'mp-3', eyebrow: 'Review price for 6 listings', headline: '3 requests for Day-Date 40', image: 'daytona-white' },
  { id: 'mp-4', eyebrow: 'Review price for 6 listings', headline: '7 requests for Submariner Date', image: 'submariner-black' },
  { id: 'mp-5', eyebrow: 'Review price for 6 listings', headline: '2 requests for GMT-Master II', image: 'daytona-green' },
  { id: 'mp-6', eyebrow: 'Review price for 6 listings', headline: '5 requests for Air King', image: 'datejust-blue-steel' },
]

export type TrendingWatch = {
  id: string
  ref: string
  brand: string
  releaseYear: string
  title: string
  image: string
}

export const TRENDING: TrendingWatch[] = [
  { id: 'tw-1', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Cosmograph Daytona', image: 'daytona-black' },
  { id: 'tw-2', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Cosmograph Daytona', image: 'daytona-blue' },
  { id: 'tw-3', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Cosmograph Daytona', image: 'daytona-white' },
  { id: 'tw-4', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Cosmograph Daytona', image: 'daytona-green' },
  { id: 'tw-5', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Submariner Date', image: 'submariner-black' },
  { id: 'tw-6', ref: 'H6234-0002', brand: 'Rolex', releaseYear: '2025', title: 'Datejust 41', image: 'datejust-blue-steel' },
]

export const FILTER_GROUPS: Array<{ label: string; options: string[] }> = [
  { label: 'Brand', options: ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'Omega'] },
  { label: 'Condition', options: ['Unworn', 'Mint', 'Excellent', 'Pre-owned'] },
  { label: 'Match', options: ['Above 90%', '70 – 90%', 'Below 70%'] },
]
