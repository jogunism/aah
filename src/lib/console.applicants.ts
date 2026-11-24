// 관리자 화면 신청자: API 응답 타입, 상태 색, 학기·과정 표기 (서버·클라이언트 공용)
import { ct, type ConsoleKey, type ConsoleLang } from '@/lib/console.i18n';
import { countryName } from '@/lib/apply';

export type StepKey = 'application' | 'confirmation' | 'payment' | 'school' | 'visaDocs' | 'visaStatus' | 'housing' | 'complete';
export type StepState = 'done' | 'current' | 'locked';
export type LoginState = 'not_sent' | 'not_used' | 'active' | 'locked';
export type Turn = 'aah' | 'student' | 'none';

export interface TimelineEvent { at: string; code: string; by: 'student' | 'aah'; detail?: string | null; actor?: string }

export interface ApplicantSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  schoolId: string;
  schoolName: string;
  program: 'long' | 'short';
  term: string;
  semesters: number | null;
  lang: string;
  createdAt: string;
  currency: 'EUR' | 'USD' | 'GBP';
  total: number;
  steps: { key: StepKey; state: StepState }[];
  step: StepKey;
  status: string;
  turn: Turn;
  due: string | null;
  login: LoginState;
  lockedUntil: string | null;
  lastEvent: TimelineEvent | null;
}

export interface LineItem { label: string; amount: number; type: string; qty?: number }
export interface PriceOption { id: string; label: string; items: LineItem[]; course?: { start: string; end: string } }
export interface Reply {
  optionId: string;
  checks: { passport: { has: boolean; expiry: string | null }; health: { declared: boolean; details: string }; residence: string | null };
  remarks: string;
  signedName: string;
  agreedAt: string;
}

export interface ApplicationData {
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
  semesters?: number;
  arrivalDate: string;
  departureDate: string;
  koreanLevel?: string;
  message?: string;
  lang: string;
  createdAt: string;
  confirmation: {
    status: 'preparing' | 'sent' | 'agreed' | 'approved';
    sentAt: string | null;
    replyBy: string | null;
    currency: 'EUR' | 'USD' | 'GBP';
    options: PriceOption[];
    message: string | null;
    reply: Reply | null;
    returned?: { at: string; message: string } | null;
  };
  payment: { status: 'pending' | 'confirmed'; items: LineItem[]; dueDate: string | null; invoiceNo: string | null; invoiceIssuedAt?: string | null; confirmedAt: string | null };
  school: { status: string; updatedAt: string | null; postedAt?: string | null };
  visa: { status: string; submittedAt: string | null; mission: string | null; issuedAt: string | null };
  housing?: { status: string; contractedAt: string | null };
  documents: { id: string; type: string; owner: 'student' | 'aah'; fileName: string; size: number; uploadedAt: string }[];
  memos?: { at: string; by: string; text: string }[];
}

export interface ApplicantDetail {
  application: ApplicationData;
  account: {
    email: string;
    state: LoginState;
    loginSentAt: string | null;
    firstLoginAt: string | null;
    lastLoginAt: string | null;
    failedLogins: number;
    lockedUntil: string | null;
    applicationIds: string[];
  } | null;
  summary: ApplicantSummary;
  timeline: TimelineEvent[];
  warnings: string[];
}

/** Statuses where we have to act, and those past a deadline (shown red) */
export const URGENT = ['review', 'reply_overdue', 'payment_overdue', 'school_rejected', 'visa_refused'];

export const statusTone = (s: { status: string; turn: Turn }) =>
  URGENT.includes(s.status) ? 'red' : s.status === 'complete' ? 'green' : s.turn === 'aah' ? 'amber' : 'blue';

export const LOGIN_TONE: Record<LoginState, string> = { not_sent: 'gray', not_used: 'amber', active: 'green', locked: 'red' };

export const TONES: Record<string, string> = {
  red: 'bg-[#FDECEA] text-[#B3261E]',
  amber: 'bg-[#FFF4DE] text-[#8A5A00]',
  blue: 'bg-[#E6EEF7] text-[#2C4F78]',
  green: 'bg-[#E7F5EE] text-[#1F7A4D]',
  gray: 'bg-[#EEF0F3] text-[#5B6675]',
};

/** Needs us now: our turn, or the student's login is locked */
export const isTodo = (s: ApplicantSummary) => s.turn === 'aah' || s.login === 'locked';

export const termLabel = (lang: ConsoleLang, term: string) => {
  const [y, season] = term.split('-');
  return ['spring', 'summer', 'fall', 'winter'].includes(season) ? ct(lang, `term_${season}` as ConsoleKey, { y }) : term;
};

/** "2027년 봄학기 · 장기 2학기" */
export const courseLabel = (lang: ConsoleLang, a: { term: string; program: 'long' | 'short'; semesters?: number | null }) =>
  [termLabel(lang, a.term), `${ct(lang, a.program === 'long' ? 'program_long' : 'program_short')}${a.program === 'long' && a.semesters ? ` ${ct(lang, 'semesters_n', { n: a.semesters })}` : ''}`].join(' · ');

export const country = (lang: ConsoleLang, code: string) => countryName(code, lang);

export const money = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amount);

export const dateOnly = (lang: ConsoleLang, iso: string) =>
  new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: iso.length === 10 ? 'UTC' : 'Asia/Seoul',
  });

/** Student language name in the operator's language */
export const langName = (lang: ConsoleLang, code: string) => {
  try {
    return new Intl.DisplayNames([lang], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
};
