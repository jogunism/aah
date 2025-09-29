'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// import Cookies from 'js-cookie';
import { getCookie, setCookie } from '@/lib/cookie';
import { useRouter } from 'next/navigation';
import { trackLanguageChange, trackCurrencyChange } from '@/lib/gtag';
import { useCurrencyStore } from '@/store/currencyStore';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const { setCurrency } = useCurrencyStore();
  const [lang, setLang] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: '🇺🇸 EN' },
    { code: 'de', label: '🇩🇪 DE' },
  ];

  const selectedLanguage = languages.find(l => l.code === lang);

  /*******************************************************
   * methods
   */
  const handleLanguageChange = (selectedLang: string) => {
    const previousLang = lang;
    const currentCurrency = getCookie('currency');

    setLang(selectedLang);
    setIsOpen(false);

    setCookie('language', selectedLang);

    if (i18n.language !== selectedLang) {
      i18n.changeLanguage(selectedLang).then(() => {
        router.refresh();
      });
    }

    // Track language change
    trackLanguageChange(selectedLang, previousLang);

    // Handle currency change based on language
    let newCurrency = '';
    if (selectedLang === 'en') {
      newCurrency = 'USD';
      setCurrency('USD');
      setCookie('currency', 'USD');
    } else if (selectedLang === 'de') {
      newCurrency = 'EUR';
      setCurrency('EUR');
      setCookie('currency', 'EUR');
    }

    // Track currency change if it actually changed
    if (newCurrency && currentCurrency !== newCurrency) {
      trackCurrencyChange(newCurrency, currentCurrency || undefined);
    }
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    const storedLang = getCookie('language');
    const currentLang = storedLang ?? 'en';
    setLang(currentLang);
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

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
                  language.code === lang ? 'bg-gray-200' : 'hover:bg-gray-100'
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
