import Header from '@/components/Header';

import Introduce from '@/components/context/Introduce';
// import Univercities from '@/components/Univercities';
// import Semesters from '@/components/context/Semesters';
// import Programs from '@/components/context/Programs';
// import Price from '@/components/context/Price';
// import Contactus from '@/components/context/Contactus';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* header */}
      <Header />

      {/* header padding */}
      <div className="h-[72px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Introduce />
        {/* <Univercities />
        <Semesters />
        <Programs />
        <Price />
        <Contactus /> */}
      </main>

      {/* footer */}
      <footer className="w-full bg-[#DF7B7B] text-center p-6 border-t border-gray-300">
        <p className="text-gray-800 text-sm text-white">
          © 2025 aah! education Europe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
