'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { getCookie, setCookie } from '@/lib/cookie';
import { trackCurrencyChange } from '@/lib/gtag';
import { useCurrencyStore } from '@/store/currencyStore';
import { FaDollarSign, FaEuroSign } from 'react-icons/fa';

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrencyStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: 'USD', label: <FaDollarSign /> },
    { code: 'EUR', label: <FaEuroSign /> },
  ];

  const selectedCurrency = currencies.find(c => c.code === currency);

  /*******************************************************
   * methods
   */
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleCurrencySelect = (selectedCurrency: string) => {
    const previousCurrency = currency;
    setCurrency(selectedCurrency);
    setIsOpen(false);

    setCookie('currency', selectedCurrency);

    trackCurrencyChange(selectedCurrency, previousCurrency);
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    const storedCurrency = getCookie('currency');
    if (storedCurrency) {
      setCurrency(storedCurrency);
    } else {
      const defaultCurrency = 'USD';
      setCurrency(defaultCurrency);
      setCookie('currency', defaultCurrency);
    }
  }, [setCurrency]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  /*******************************************************
   * render
   */
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <span>{selectedCurrency?.label}</span>
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
            {currencies.map(c => (
              <li
                key={c.code}
                onClick={() => handleCurrencySelect(c.code)}
                className={`px-4 py-2 text-gray-700 cursor-pointer flex items-center ${
                  c.code === currency ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
