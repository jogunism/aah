'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { trackLanguageChange, trackCurrencyChange } from '@/lib/gtag';
import { useCurrencyStore } from '@/store/currencyStore';
import { setCookie, getCookie } from '@/lib/cookie';
import i18n from '@/lib/i18n.client';
import {
  SUPPORTED_LOCALES,
  LOCALE_META,
  LOCALE_PATH_REGEX,
  DEFAULT_LOCALE,
  isSupportedLocale,
  type Locale,
} from '@/lib/locales';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const { setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<Locale>(
    isSupportedLocale(currentLang) ? currentLang : DEFAULT_LOCALE,
  );
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = SUPPORTED_LOCALES.map((code) => ({
    code,
    label: LOCALE_META[code].label,
  }));

  useEffect(() => {
    const langFromPath = pathname.match(LOCALE_PATH_REGEX)?.[1];
    if (langFromPath && isSupportedLocale(langFromPath) && langFromPath !== activeLang) {
      setActiveLang(langFromPath);
    }
  }, [pathname, activeLang]);

  const selectedLanguage = languages.find(l => l.code === activeLang);

  /*******************************************************
   * methods
   */
  const handleLanguageChange = (selectedLang: Locale) => {
    if (selectedLang === activeLang) {
      setIsOpen(false);
      return;
    }

    const currentCurrency = getCookie('currency');

    setIsOpen(false);

    trackLanguageChange(selectedLang, activeLang);

    const newCurrency = LOCALE_META[selectedLang].currency;
    setCurrency(newCurrency);
    setCookie('currency', newCurrency);

    if (currentCurrency !== newCurrency) {
      trackCurrencyChange(newCurrency, currentCurrency || undefined);
    }

    // 모달이 열린 상태(예: /en/programs/long)에서도 URL의 [lang] 세그먼트만 바뀌므로
    // Next.js soft navigation으로 처리되어 모달은 그대로 유지되고 콘텐츠만 새 언어로 다시 렌더됨.
    const newPathname = pathname.replace(LOCALE_PATH_REGEX, `/${selectedLang}`);
    setActiveLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    router.replace(newPathname, { scroll: false });
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /*******************************************************
   * render
   */
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <span>{selectedLanguage?.label}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 w-full mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1 text-sm">
            {languages.map(language => (
              <li
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`px-4 py-2 text-gray-700 cursor-pointer ${
                  language.code === activeLang ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                {language.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
