// 이용약관·취소 정책 5개 언어 모음
import type { Locale } from '@/lib/locales';
import type { LegalDoc } from './types';
import en from './terms.en';
import de from './terms.de';
import fr from './terms.fr';
import es from './terms.es';
import it from './terms.it';

export const termsDocs: Record<Locale, LegalDoc> = { en, de, fr, es, it };
