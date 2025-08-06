import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';

import Introduce from '@/components/context/Introduce';
import Universities from '@/components/context/Universities';
import Programes from '@/components/context/Programes';
// import Curriculum from '@/components/context/Curriculum';
import Tuition from '@/components/context/Tuition';
import Contactus from '@/components/context/Contactus';
// API
import { retrieveCurrency } from '@/api';

export default function Home() {
  // update currency
  retrieveCurrency();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* header padding */}
      <div className="h-[72px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Introduce />
        <Universities />
        <Programes />
        {/* <Curriculum /> */}
        <Tuition />
        <Contactus />
      </main>

      <Footer />
    </div>
  );
}
