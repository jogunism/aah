// 개인정보·보안 정책 5개 언어 모음
import type { Locale } from '@/lib/locales';
import type { LegalDoc } from './types';
import en from './privacy.en';
import de from './privacy.de';
import fr from './privacy.fr';
import es from './privacy.es';
import it from './privacy.it';

export const privacyDocs: Record<Locale, LegalDoc> = { en, de, fr, es, it };
