'use client';

import { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import * as gtag from '@/lib/gtag';
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
  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setIsOpen(false);

    Cookies.set('currency', selectedCurrency, { expires: 365, path: '/', secure: true, sameSite: 'Lax' });

    gtag.event({
      action: 'change_currency',
      category: 'header',
      label: selectedCurrency,
    });
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    const storedCurrency = Cookies.get('currency');
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, [setCurrency]);

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
        className="flex items-center justify-center w-8 h-8 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm">{selectedCurrency?.label}</span>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
