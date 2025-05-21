'use client';

import Image from 'next/image';

import Introduce from '@/components/Introduce';
import Univercities from '@/components/Univercities';
import Semesters from '@/components/Semesters';
import Programs from '@/components/Programs';
import Price from '@/components/Price';
import Contactus from '@/components/Contactus';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto p-4">
          <Image src="/assets/logo.png" width={169} height={21} alt="Logo" />
        </div>
      </header>

      {/* header padding */}
      <div className="h-[72px]" />

      {/* components */}
      <main className="flex flex-col items-center flex-grow">
        <Introduce />
        <Univercities />
        <Semesters />
        <Programs />
        <Price />
        <Contactus />
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
