import Image from 'next/image';

import LanguageSelector from './languageSelector';

export default function Header() {
  return (
    <header className="fixed z-[9999] top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Image src="/assets/logo.png" width={169} height={21} alt="Logo" />
        <LanguageSelector />
      </div>
    </header>
  );
}
