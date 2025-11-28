'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { trackLanguageChange, trackCurrencyChange } from '@/lib/gtag';
import { useCurrencyStore } from '@/store/currencyStore';
import { setCookie, getCookie } from '@/lib/cookie';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const { setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: '🇺🇸 EN' },
    { code: 'de', label: '🇩🇪 DE' },
  ];

  const selectedLanguage = languages.find(l => l.code === currentLang);

  /*******************************************************
   * methods
   */
  const handleLanguageChange = (selectedLang: string) => {
    if (selectedLang === currentLang) {
      setIsOpen(false);
      return;
    }

    const currentCurrency = getCookie('currency');

    setIsOpen(false);

    // Track language change
    trackLanguageChange(selectedLang, currentLang);

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

    // URL 경로 변경 (예: /en/about → /de/about)
    const newPathname = pathname.replace(/^\/(en|de)/, `/${selectedLang}`);
    const isModalPath = pathname.includes('/programs/');

    if (isModalPath) {
      // 모달 URL인 경우: 먼저 메인 페이지로 이동 후 모달 URL로 push
      // 이렇게 해야 Intercepting Route가 제대로 작동
      router.replace(`/${selectedLang}`, { scroll: false });
      setTimeout(() => {
        router.push(newPathname, { scroll: false });
      }, 100);
    } else {
      // 일반 페이지면 언어만 변경
      router.replace(newPathname, { scroll: false });
    }
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
                  language.code === currentLang ? 'bg-gray-200' : 'hover:bg-gray-100'
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
