'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';

const ProgramDetailsShort: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-2 space-y-12">
      <div className="px-2 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t('PROGRAM_MODAL_SHORT_TERM_TITLE')}
        </h1>

        {/* Section 1 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_SHORT_TERM_SUBTITLE_1')}</h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_1_1')}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_1_2')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_1_3')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content1.jpg"
                alt="Korean class with international students"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_SHORT_TERM_SUBTITLE_2')}</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_2')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content2.jpg"
                alt="Beginner student studying Korean"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_SHORT_TERM_SUBTITLE_3')}</h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_3')}
              </p>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content3.jpg"
                alt="Student experiencing Korean culture"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">{t('PROGRAM_MODAL_SHORT_TERM_SUBTITLE_4')}</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-2">
                {t('PROGRAM_MODAL_SHORT_TERM_CONTENT_4')}
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>{t('PROGRAM_MODAL_SHORT_TERM_CONTENT_4_1')}</li>
                <li>{t('PROGRAM_MODAL_SHORT_TERM_CONTENT_4_2')}</li>
                <li>{t('PROGRAM_MODAL_SHORT_TERM_CONTENT_4_3')}</li>
                <li>{t('PROGRAM_MODAL_SHORT_TERM_CONTENT_4_4')}</li>
              </ul>
            </div>
            <div className="w-full md:w-3/10">
              <Image
                src="/assets/modal/content4.jpg"
                alt="Calendar and travel planner"
                width={400}
                height={300}
                className="rounded-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="mb-12">
          {/* <h2 className="text-xl font-semibold mb-4">Comparison of University Language Institute and Language School</h2> */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-base rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#f3e1eb]">
                  <th className="py-2 px-4 text-center font-semibold">Comparison Item</th>
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
                    Spring break, GW, summer vacation, year-end and New Year holidays, etc.
                  </td>
                  <td className="py-2 px-4 text-center">
                    Spring break, GW, summer vacation, autumn, year-end and New Year holidays, etc.
                  </td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Levels Offered</td>
                  <td className="py-2 px-4 text-center">Levels 1-6</td>
                  <td className="py-2 px-4 text-center">Levels 1-6</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">1 Semester Unit</td>
                  <td className="py-2 px-4 text-center">3 weeks</td>
                  <td className="py-2 px-4 text-center">1-2 weeks</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Participation Unit</td>
                  <td className="py-2 px-4 text-center">1 semester</td>
                  <td className="py-2 px-4 text-center">1 semester</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Class Hours</td>
                  <td className="py-2 px-4 text-center">
                    9:00-13:00, afternoon training available
                  </td>
                  <td className="py-2 px-4 text-center">
                    9:00-13:00, afternoon training available
                  </td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Weekly Class Schedule</td>
                  <td className="py-2 px-4 text-center">Monday-Friday (5 days a week)</td>
                  <td className="py-2 px-4 text-center">6 days a week</td>
                </tr>
                <tr className="border-b border-[#e9d5e1]">
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Average Class Size</td>
                  <td className="py-2 px-4 text-center">Approx. 10-15 students</td>
                  <td className="py-2 px-4 text-center">Approx. 6-8 students</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-center bg-[#f9f5f7]">Visa Issuance</td>
                  <td className="py-2 px-4 text-center">None</td>
                  <td className="py-2 px-4 text-center">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsShort;
