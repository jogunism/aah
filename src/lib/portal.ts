// 포털 공용: API 응답 타입, 진행 단계 계산, 날짜·금액 표기

export type DocType =
  | 'passport' | 'photo' | 'diploma' | 'visa' | 'other'
  | 'admission_letter' | 'business_registration' | 'invoice' | 'other_aah';

export interface PortalDocument {
  id: string;
  type: DocType;
  owner: 'student' | 'aah';
  fileName: string;
  size: number;
  contentType: string;
  uploadedAt: string;
}

export interface LineItem {
  label: string;
  amount: number;
}

export interface PriceOption {
  id: string;
  label: string;
  items: LineItem[];
}

export const ACKS_ALL = ['SCHEDULE', 'DOCS', 'FLIGHT'] as const;
export const ACKS_LONG = ['VISA_TRIP', 'VISA_STAY'] as const;
export type AckKey = (typeof ACKS_ALL)[number] | (typeof ACKS_LONG)[number];

export interface ConfirmationChecks {
  passport: { has: boolean; expiry: string | null };
  health: { declared: boolean; details: string; consent?: boolean }; // consent: GDPR Art. 9, required with details
  residence: string | null; // long-term only
  acks: AckKey[];
}

export interface ConfirmationReply {
  optionId: string;
  checks?: ConfirmationChecks; // missing on replies from before the checks existed
  health: string;
  remarks: string;
  signedName: string;
  agreedAt: string;
}

/** Passport must be valid at least until arrival + 6 months */
export const passportNeededUntil = (arrivalDate: string) => {
  const d = new Date(`${arrivalDate}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + 6);
  return d.toISOString().slice(0, 10);
};

/** The application can be changed until the student agrees to the confirmation */
export const canEditApplication = (a: Application) => a.confirmation.status === 'preparing' || a.confirmation.status === 'sent';

export type Currency3 = 'EUR' | 'USD' | 'GBP';

export interface Application {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  nationality: string;
  address: { street: string; postalCode: string; city: string; country: string };
  education: 'high_school' | 'university';
  schoolId: string;
  schoolName: string;
  program: 'long' | 'short';
  term: string;
  semesters?: number; // long-term only
  arrivalDate: string;
  departureDate: string;
  koreanLevel?: string;
  message?: string;
  lang: string;
  createdAt: string;
  confirmation: {
    status: 'preparing' | 'sent' | 'agreed' | 'approved'; // agreed = we're checking the answers
    sentAt: string | null;
    replyBy: string | null;
    currency: Currency3;
    options: PriceOption[];
    message: string | null;
    reply: ConfirmationReply | null;
    approvedAt?: string | null;
    returned?: { at: string; message: string } | null; // our request for corrections
    history?: ConfirmationReply[]; // earlier replies we returned
  };
  payment: {
    status: 'pending' | 'confirmed';
    currency: Currency3;
    items: LineItem[];
    dueDate: string | null;
    confirmedAt: string | null;
    invoiceNo: string | null;
  };
  school: { status: 'not_started' | 'submitted' | 'reviewing' | 'admitted' | 'rejected'; updatedAt: string | null; postedAt?: string | null };
  visa: {
    status: 'not_started' | 'submitted' | 'issued' | 'refused';
    submittedAt: string | null;
    mission: string | null;
    contactedAt: string | null;
    issuedAt: string | null;
  };
  documents: PortalDocument[];
}

export interface Bank {
  accountHolder: string;
  iban: string;
  bic: string;
  bankName: string;
}

export interface PortalData {
  account: { email: string; mustChangePassword: boolean };
  applications: { id: string; schoolName: string; term: string }[];
  application: Application;
  bank: Bank;
}

/** Where long-term students post their original documents (Seoul office on aah-e.net). TODO(사용자 확인): 수신인 표기 */
export const KOREA_OFFICE = ['aah! Seoul office', '4F MOO Building, 21 Baekbeom-ro 1-gil', 'Mapo-gu, Seoul 04101', 'Republic of Korea'];

/*************************************************************************
 * Steps
 */
export type StepKey = 'application' | 'confirmation' | 'payment' | 'school' | 'visaDocs' | 'visaStatus';
export type StepState = 'done' | 'current' | 'locked';

const DONE: Record<StepKey, (a: Application) => boolean> = {
  application: () => true,
  confirmation: (a) => a.confirmation.status === 'approved',
  payment: (a) => a.payment.status === 'confirmed',
  school: (a) => a.school.status === 'admitted',
  visaDocs: (a) => a.visa.status !== 'not_started',
  visaStatus: (a) => a.visa.status === 'issued',
};

/** Short courses don't need a student visa, so they end with the school step */
export const stepsFor = (a: Application): StepKey[] =>
  a.program === 'short'
    ? ['application', 'confirmation', 'payment', 'school']
    : ['application', 'confirmation', 'payment', 'school', 'visaDocs', 'visaStatus'];

export const stepStates = (a: Application): { key: StepKey; state: StepState }[] => {
  const keys = stepsFor(a);
  const firstOpen = keys.findIndex((k) => !DONE[k](a));
  return keys.map((key, i) => ({
    key,
    state: firstOpen === -1 || i < firstOpen ? 'done' : i === firstOpen ? 'current' : 'locked',
  }));
};

/** The step shown first: the current one, or the last one when everything is done */
export const currentStep = (a: Application): StepKey => {
  const states = stepStates(a);
  return (states.find((s) => s.state === 'current') ?? states[states.length - 1]).key;
};

export const total = (items: LineItem[]) => items.reduce((s, i) => s + i.amount, 0);

export { countryName } from '@/lib/apply';

export const formatDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatMoney = (amount: number, currency: string, lang: string) =>
  new Intl.NumberFormat(lang, { style: 'currency', currency }).format(amount);
