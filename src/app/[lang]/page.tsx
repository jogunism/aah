import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';

import Introduce from '@/components/context/Introduce';
import Universities from '@/components/context/Universities';
import Programes from '@/components/context/Programes';
import Contactus from '@/components/context/Contactus';
// API
import { updateCurrency } from '@/api';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // currency
  updateCurrency();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header lang={lang} />

      {/* header padding */}
      <div className="h-[60px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Introduce />
        <Universities />
        <Programes />
        <Contactus />
      </main>

      <Footer />
    </div>
  );
}
