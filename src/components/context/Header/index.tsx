import Image from 'next/image';

import LanguageSelector from './languageSelector';
import CurrencySelector from './CurrencySelector';

export default function Header() {
  return (
    <header className="fixed z-[9999] top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between">
        <Image src="/assets/logo.png" width={169} height={21} alt="Logo" />
        <div className="flex items-center space-x-2">
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
