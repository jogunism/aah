import Header from '@/components/context/Header';
import Footer from '@/components/context/Footer';

import Introduce from '@/components/context/Introduce';
import Univercities from '@/components/context/Univercities';
import Semesters from '@/components/context/Semesters';
import Curriculum from '@/components/context/Curriculum';
import Tuition from '@/components/context/Tuition';
import Contactus from '@/components/context/Contactus';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* header padding */}
      <div className="h-[72px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Introduce />
        <Univercities />
        <Semesters />
        <Curriculum />
        <Tuition />
        <Contactus />
      </main>

      <Footer />
    </div>
  );
}
