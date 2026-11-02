import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { getTranslation } from '@/lib/i18n.server';
import ScrollLink from '@/components/common/ScrollLink';
// API
import { retrieveAppVersion } from '@/api';

/**
 * Footer
 */
export default async function Footer() {
  const { t, lang } = await getTranslation();
  const appVersion = await retrieveAppVersion();

  const linkClass = 'hover:text-ink transition-colors';

  return (
    <footer className="w-full bg-soft border-t border-line text-[13px] text-muted">
      <div className="max-w-[1180px] mx-auto px-5 md:px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
          <div className="col-span-2 md:col-span-1">
            <Image src="/assets/logo.png" width={169} height={21} alt="aah! education" className="w-[140px] h-auto" />
            <p className="mt-3 leading-relaxed">{t('FOOTER_TAGLINE')}</p>
            <a href="mailto:contact@aah.education" className={`mt-1 inline-block ${linkClass}`}>
              contact@aah.education
            </a>
          </div>

          <nav aria-label={t('FOOTER_PROGRAMS')}>
            <h2 className="mb-3 font-semibold text-ink">{t('FOOTER_PROGRAMS')}</h2>
            <ul className="space-y-2">
              <li><Link href={`/${lang}/programs/short`} className={linkClass}>{t('TAG_SHORT')}</Link></li>
              <li><Link href={`/${lang}/programs/long`} className={linkClass}>{t('TAG_LONG')}</Link></li>
              <li><ScrollLink lang={lang} section="tuition" className={linkClass}>{t('NAV_TUITION')}</ScrollLink></li>
            </ul>
          </nav>

          <nav aria-label={t('FOOTER_ABOUT')}>
            <h2 className="mb-3 font-semibold text-ink">{t('FOOTER_ABOUT')}</h2>
            <ul className="space-y-2">
              <li><ScrollLink lang={lang} section="universities" className={linkClass}>{t('NAV_UNIVERSITIES')}</ScrollLink></li>
              <li><ScrollLink lang={lang} section="process" className={linkClass}>{t('NAV_PROCESS')}</ScrollLink></li>
              <li><ScrollLink lang={lang} section="faq" className={linkClass}>{t('NAV_FAQ')}</ScrollLink></li>
            </ul>
          </nav>

          <nav aria-label={t('FOOTER_FOLLOW')}>
            <h2 className="mb-3 font-semibold text-ink">{t('FOOTER_FOLLOW')}</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/aah_education.korea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 ${linkClass}`}
                >
                  <FaInstagram aria-hidden="true" /> Instagram
                </a>
              </li>
              <li>
                <a href="https://aah-e.net/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {t('FOOTER_PARENT')}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-5 border-t border-line flex flex-col sm:flex-row sm:justify-between gap-1">
          <p>© {new Date().getFullYear()} aah! education Europe. All rights reserved.</p>
          {appVersion && <p>v{appVersion}</p>}
        </div>
      </div>
    </footer>
  );
}
