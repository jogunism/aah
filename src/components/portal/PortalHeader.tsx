// 포털 전용 헤더: 로고, 언어 선택, (로그인 상태면) 비밀번호 변경·로그아웃
import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/lib/i18n.server';
import LanguageSelector from '@/components/context/Header/languageSelector';
import LogoutButton from './LogoutButton';

export default async function PortalHeader({ lang, signedIn }: { lang: string; signedIn: boolean }) {
  const { t } = await getTranslation(lang);
  return (
    <header className="border-b border-line bg-white">
      <div className="max-w-[1180px] mx-auto h-[60px] px-4 sm:px-5 md:px-6 flex items-center gap-2 sm:gap-5">
        <Link href={`/${lang}`} aria-label="aah! education" className="shrink-0">
          <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" priority className="w-[112px] sm:w-[150px] h-auto" />
        </Link>
        <Link href={`/${lang}/my`} className="hidden sm:block border-l border-line pl-4 text-sm font-semibold text-ink-2">
          {t('MY_TITLE')}
        </Link>
        <div className="flex-1" />
        <div className="shrink-0">
          <LanguageSelector currentLang={lang} />
        </div>
        {signedIn && (
          <>
            {/* Phones: icon only (key), the label stays for screen readers */}
            <Link href={`/${lang}/my/password`} aria-label={t('MY_ACCOUNT')}
              className="flex h-8 w-8 sm:w-auto shrink-0 items-center justify-center rounded-full text-[13px] text-ink-2 hover:text-ink">
              <svg aria-hidden="true" className="w-[18px] h-[18px] sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <circle cx="8" cy="15" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 12l8-8m-3 3l2 2m-4 0l2 2" />
              </svg>
              <span className="hidden sm:inline">{t('MY_ACCOUNT')}</span>
            </Link>
            <LogoutButton lang={lang} label={t('MY_LOGOUT')} />
          </>
        )}
      </div>
    </header>
  );
}
