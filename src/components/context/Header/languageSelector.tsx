'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: '🇺🇸 EN' },
    { code: 'de', label: '🇩🇪 DE' },
  ];

  /*******************************************************
   * methods
   */

  const handleLanguageChange = (selectedLang: string) => {
    setLang(selectedLang);
    setIsOpen(false);

    Cookies.set('language', selectedLang, { expires: 365 });

    if (i18n.language !== selectedLang) {
      i18n.changeLanguage(selectedLang).then(() => {
        router.refresh();
      });
    }
  };

  /*******************************************************
   * lifecycle hooks
   */

  useEffect(() => {
    const storedLang = Cookies.get('language');
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

  const selectedLanguage = languages.find(l => l.code === lang);

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
