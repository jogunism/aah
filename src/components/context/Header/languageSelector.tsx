'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);

    Cookies.set('language', selectedLang, { expires: 365 });

    // 언어 변경 적용 후 새로고침 (SSR 대응)
    if (i18n.language !== selectedLang) {
      i18n.changeLanguage(selectedLang).then(() => {
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    const storedLang = Cookies.get('language');
    setLang(storedLang ?? 'en');
    if (storedLang && storedLang !== i18n.language) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  return (
    <div className="relative">
      <select
        className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-4 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleChange}
        value={lang}
      >
        <option value="en">🇺🇸 EN</option>
        <option value="de">🇩🇪 DE</option>
      </select>
    </div>
  );
}
