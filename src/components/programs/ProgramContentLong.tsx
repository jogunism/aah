'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface ProgramContentLongProps {
  lang?: string;
}

export default function ProgramContentLong({ lang }: ProgramContentLongProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // 서버에서 전달된 lang이 있으면 동기화
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    setMounted(true);
  }, [lang, i18n]);

  // hydration mismatch 방지: 마운트 전에는 빈 화면 표시
  if (!mounted) {
    return <div className="p-2 space-y-12 min-h-[500px]" />;
  }

  return (
    <div className="p-2 space-y-12">
      <div className="px-2 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-16 text-gray-800">
          {t('PROGRAM_MODAL_LONG_TERM_TITLE')}
        </h1>

        {/* Section 1 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_1')}</h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('PROGRAM_MODAL_LONG_TERM_CONTENT_1_1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_LONG_TERM_CONTENT_1_2')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content5.jpg"
                alt="University language center class"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_2')}</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_LONG_TERM_CONTENT_2')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content6.jpg"
                alt="Korean textbook and notes"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_3')}</h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_LONG_TERM_CONTENT_3')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content7.jpg"
                alt="Student with Korean graduation certificate"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_4')}</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-2">
                {t('PROGRAM_MODAL_LONG_TERM_CONTENT_4')}
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>{t('PROGRAM_MODAL_LONG_TERM_CONTENT_4_1')}</li>
                <li>{t('PROGRAM_MODAL_LONG_TERM_CONTENT_4_2')}</li>
                <li>{t('PROGRAM_MODAL_LONG_TERM_CONTENT_4_3')}</li>
                <li>{t('PROGRAM_MODAL_LONG_TERM_CONTENT_4_4')}</li>
              </ul>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content8.jpg"
                alt="Korean visa and documents"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 5 - Table */}
        <div className="mb-12">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-base rounded-xl overflow-hidden text-gray-700">
              <thead>
                <tr className="bg-[#f3e1eb]">
                  <th className="py-2 px-4 text-center font-semibold text-gray-800"></th>
                  <th className="py-2 px-4 text-center font-semibold text-gray-800">
                    {t('PROGRAM_MODAL_TABLE_VALUE_1_TITLE')}
                  </th>
                  <th className="py-2 px-4 text-center font-semibold text-gray-800">
                    {t('PROGRAM_MODAL_TABLE_VALUE_2_TITLE')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_1')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_1')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_1')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_2')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_2')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_2')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_3')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_3')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_3')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_4')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_4')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_4')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_5')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_5')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_5')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_6')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_6')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_6')}</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_7')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_7')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_7')}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">{t('PROGRAM_MODAL_TABLE_SECTION_8')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_1_8')}</td>
                  <td className="py-2 px-4 text-center">{t('PROGRAM_MODAL_LONG_TERM_TABLE_VALUE_2_8')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
