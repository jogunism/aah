import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';

import Hero from '@/components/context/Hero';
import Introduce from '@/components/context/Introduce';
import Universities from '@/components/context/Universities';
import Programs from '@/components/context/Programs';
import Compare from '@/components/context/Compare';
import Included from '@/components/context/Included';
import Process from '@/components/context/Process';
import Instagram from '@/components/context/Instagram';
import MailingList from '@/components/context/MailingList';
import Faq from '@/components/context/Faq';
import Contactus from '@/components/context/Contactus';
import MobileCtaBar from '@/components/common/MobileCtaBar';
import { getTranslation } from '@/lib/i18n.server';
// API
import { refreshCurrency } from '@/api/server';

export const revalidate = 3600; // static, rebuilt hourly (prices follow exchange rates)

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  // Runs when the page is (re)generated, i.e. at most hourly
  refreshCurrency();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />

      {/* header padding */}
      <div className="h-[60px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Hero lang={lang} />
        <Programs lang={lang} />
        <Compare lang={lang} />
        <Included lang={lang} />
        <Universities lang={lang} />
        <Introduce lang={lang} />
        <Process lang={lang} />
        <Instagram />
        <Faq lang={lang} />
        <MailingList />
        <Contactus />
      </main>

      <Footer lang={lang} />
      <MobileCtaBar lang={lang} programsLabel={t('NAV_PROGRAMS')} ctaLabel={t('NAV_CTA')} />
    </div>
  );
}
