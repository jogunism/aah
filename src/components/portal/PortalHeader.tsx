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
      <div className="max-w-[1180px] mx-auto h-[60px] px-5 md:px-6 flex items-center gap-3 sm:gap-5">
        <Link href={`/${lang}`} aria-label="aah! education" className="shrink-0">
          <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" priority className="w-[112px] sm:w-[150px] h-auto" />
        </Link>
        <Link href={`/${lang}/my`} className="hidden sm:block border-l border-line pl-4 text-sm font-semibold text-ink-2">
          {t('MY_TITLE')}
        </Link>
        <div className="flex-1" />
        <LanguageSelector currentLang={lang} />
        {signedIn && (
          <>
            <Link href={`/${lang}/my/password`} className="text-[13px] text-ink-2 hover:text-ink">
              {t('MY_ACCOUNT')}
            </Link>
            <LogoutButton lang={lang} label={t('MY_LOGOUT')} />
          </>
        )}
      </div>
    </header>
  );
}
