'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { trackLanguageChange, trackCurrencyChange } from '@/lib/gtag';
import { useCurrencyStore } from '@/store/currencyStore';
import { setCookie, getCookie } from '@/lib/cookie';
import i18n from '@/lib/i18n.client';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const { setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(currentLang);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: '🇺🇸 EN' },
    { code: 'de', label: '🇩🇪 DE' },
  ];

  // pathname이 바뀌면 activeLang도 동기화
  useEffect(() => {
    const langFromPath = pathname.match(/^\/(en|de)/)?.[1];
    if (langFromPath && langFromPath !== activeLang) {
      setActiveLang(langFromPath);
    }
  }, [pathname, activeLang]);

  const selectedLanguage = languages.find(l => l.code === activeLang);

  /*******************************************************
   * methods
   */
  const handleLanguageChange = (selectedLang: string) => {
    if (selectedLang === activeLang) {
      setIsOpen(false);
      return;
    }

    const currentCurrency = getCookie('currency');

    setIsOpen(false);

    // Track language change
    trackLanguageChange(selectedLang, activeLang);

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

    // 모달이 열린 상태(예: /en/programs/long)에서도 URL의 [lang] 세그먼트만 바뀌므로
    // Next.js soft navigation으로 처리되어 모달은 그대로 유지되고 콘텐츠만 새 언어로 다시 렌더됨.
    // - 서버 컴포넌트: router.replace 가 [lang] 변경을 감지해 RSC 재요청 → 새 언어로 렌더
    // - 클라이언트 컴포넌트(useTranslation 사용): 아래 i18n.changeLanguage 로 즉시 갱신
    //   (네비게이션 완료 전 깜빡임 방지. ClientWrapper 의 lang prop 동기화도 백업으로 동작)
    // - TuitionCalculation 등 클라이언트 상태 모달: 컴포넌트가 트리 동일 위치에
    //   유지되므로 isOpen 등 state 가 보존됨
    const newPathname = pathname.replace(/^\/(en|de)/, `/${selectedLang}`);
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
