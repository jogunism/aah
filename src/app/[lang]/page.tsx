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
import { updateCurrency } from '@/api';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { t } = await getTranslation(lang);

  // currency
  updateCurrency();

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
        <Introduce />
        <Universities />
        <Process />
        <Instagram />
        <MailingList />
        <Faq />
        <Contactus />
      </main>

      <Footer />
      <MobileCtaBar lang={lang} programsLabel={t('NAV_PROGRAMS')} ctaLabel={t('NAV_CTA')} />
    </div>
  );
}
