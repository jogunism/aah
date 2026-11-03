// constants

/*********************************************
 * interface
 */

export interface University {
  title: string;
  subTitle: string;
  id: string;
  width?: number;
  height?: number;
  margin?: boolean;

  priceShort: number;
  priceLong: number;

  // 'language_school' items only come with retrieveUniversityList('all')
  schoolType?: 'university' | 'language_school';

  // Detailed breakdown computed by the API (same number for USD and EUR).
  // null until the school has been synced from aah-e.net.
  pricing: UniversityPricing | null;

  // 授業時間 synced from aah-e.net per program; missing on older API responses
  classHours?: { long: ClassHours | null; short: ClassHours | null } | null;
}

export interface ClassHours {
  periodsPerDay: number | null; // class hours (periods) per day
  slots: string[]; // "9:00–13:00"; several = morning / afternoon classes
  weekdays?: number[]; // 0 = Mon … 6 = Sun; [] = not listed
  daysPerWeek?: number | null;
  classSize?: { min: number | null; max: number } | null; // min null = "up to max"
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface PriceBreakdown {
  entrance: number;
  tuition: number;
  accommodation: PriceRange | null; // null = accommodation not included
  aahFee: number;
  total: PriceRange;
}

export type DormRoomType = 'single' | 'double' | 'triple' | 'quad' | 'unspecified';

export interface DormitoryOption {
  roomType: DormRoomType;
  name: string;
  femaleOnly: boolean;
  maleOnly: boolean;
  lottery: boolean;
  price: PriceBreakdown;
}

export interface TermDuration {
  unit: 'semester' | 'month' | 'week' | 'day';
  value: number;
}

export interface TermPricing {
  period: number; // 1-based option position on aah-e.net
  duration: TermDuration;
  schoolOnly: PriceBreakdown;
  dormitories: DormitoryOption[];
}

export interface ProgramPricing {
  terms: TermPricing[];
}

export interface UniversityPricing {
  long: ProgramPricing | null;
  short: ProgramPricing | null;
  syncedAt: string;
}

export interface Prices {
  shortMin: number;
  shortMax: number;
  longMin: number;
  longMax: number;
}

export interface ContactusValidation {
  name: boolean;
  email: boolean | string;
  content: boolean;
}

export interface Contactus {
  firstName: string;
  lastName: string;
  email: string;
  semester: number;
  content: string;
  lang: string;
}

export interface Version {
  category: string;
  rate: string;
  updatedAt: string;
  itemId: string;
}

/*********************************************
 * enums
 */

export enum ProgramType {
  SHORT = 'short-term',
  LONG = 'long-term',
}
