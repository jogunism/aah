// 플랜 빌더의 학교 페이지 경로와 학교별 제공 프로그램 판단(서버·클라이언트 공용)
import type { University } from '@/types/constants';

// A school offers a program if it has synced pricing for it, or a legacy price
export const offersProgram = (uni: University, program: 'short' | 'long') =>
  uni.pricing ? !!uni.pricing[program] : (program === 'short' ? uni.priceShort : uni.priceLong) > 0;

// School pages open on the long-term program (tuition searches are mostly per semester)
export const defaultProgram = (uni: University): 'short' | 'long' | null =>
  offersProgram(uni, 'long') ? 'long' : offersProgram(uni, 'short') ? 'short' : null;

// /plan, or the school's own page /plan/{id}
export const planPath = (lang: string, schoolId?: string | null) =>
  `/${lang}/plan${schoolId ? `/${schoolId}` : ''}`;
