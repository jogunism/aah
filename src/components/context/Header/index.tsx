import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/lib/i18n.server';
import HeaderNav from './HeaderNav';

interface HeaderProps {
  lang: string;
}

/** Global sticky header. Labels are translated on the server so the menu is in the HTML. */
export default async function Header({ lang }: HeaderProps) {
  const { t } = await getTranslation(lang);

  const items = [
    { section: 'programs', label: t('NAV_PROGRAMS') },
    { section: 'tuition', label: t('NAV_TUITION') },
    { section: 'universities', label: t('NAV_UNIVERSITIES') },
    { section: 'process', label: t('NAV_PROCESS') },
    { section: 'faq', label: t('NAV_FAQ') },
  ];

  return (
    <header className="fixed z-[1000] top-0 left-0 w-full bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
      <div className="max-w-[1180px] mx-auto h-[60px] px-5 md:px-6 flex items-center">
        <Link href={`/${lang}`} aria-label="aah! education" className="shrink-0">
          <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" priority className="w-[132px] sm:w-[169px] h-auto" />
        </Link>
        <HeaderNav
          lang={lang}
          items={items}
          ctaLabel={t('NAV_CTA')}
          menuOpenLabel={t('NAV_MENU_OPEN')}
          menuCloseLabel={t('NAV_MENU_CLOSE')}
          languageLabel={t('NAV_LANGUAGE')}
          currencyLabel={t('NAV_CURRENCY')}
        />
      </div>
    </header>
  );
}
