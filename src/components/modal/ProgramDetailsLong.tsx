'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const ProgramDetailsLong: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-2 space-y-12">
      <div className="px-2 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t('PROGRAM_MODAL_LONG_TERM_TITLE')}
        </h1>

        {/* Section 1 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_1')}</h2>
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
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_2')}</h2>
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
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_3')}</h2>
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
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_LONG_TERM_SUBTITLE_4')}</h2>
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

        {/* Section 5 */}
        <div className="mb-12">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-base rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#f3e1eb]">
                  <th className="py-2 px-4 text-center font-semibold"></th>
                  <th className="py-2 px-4 text-center font-semibold">
                    University Language Institute
                  </th>
                  <th className="py-2 px-4 text-center font-semibold">Language School</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Semester Start Time</td>
                  <td className="py-2 px-4 text-center">
                    4 times a year (start of each semester in spring, summer, autumn, winter)
                  </td>
                  <td className="py-2 px-4 text-center">
                    12 times a year (classes start every month)
                  </td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Levels Offered</td>
                  <td className="py-2 px-4 text-center">Levels 1-6</td>
                  <td className="py-2 px-4 text-center">Levels 1-6</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">1 Semester Unit</td>
                  <td className="py-2 px-4 text-center">10 weeks</td>
                  <td className="py-2 px-4 text-center">4 weeks</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Participation Unit</td>
                  <td className="py-2 px-4 text-center">1 semester (approx. 3 months)</td>
                  <td className="py-2 px-4 text-center">1 semester (approx. 1 month)</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Class Hours</td>
                  <td className="py-2 px-4 text-center">9:00-13:00 (morning class)</td>
                  <td className="py-2 px-4 text-center">10:00-13:00</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Weekly Class Schedule</td>
                  <td className="py-2 px-4 text-center">Monday-Friday (5 days a week)</td>
                  <td className="py-2 px-4 text-center">Mon, Tue, Thu, Fri (4 days a week)</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Average Class Size</td>
                  <td className="py-2 px-4 text-center">Approx. 10-15 students</td>
                  <td className="py-2 px-4 text-center">Approx. 5-10 students</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Visa Issuance</td>
                  <td className="py-2 px-4 text-center">D-4 (General Training)</td>
                  <td className="py-2 px-4 text-center">※ No visa or H-1 (Working Holiday)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsLong;
