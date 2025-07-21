'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';

const ProgramDetailsShort: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-12">
      <div className="px-2 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Start Your Korean Journey with a Short-Term Study Abroad Program
        </h1>

        {/* Section 1 */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">
            📌 Benefits of a Short-Term Language Program
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-4">
                Regular language courses at university-affiliated institutes typically last around
                10 weeks (3 months), and even at private schools, a minimum duration of one month is
                often required. This makes it difficult for working professionals or students to
                commit to long-term study abroad.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                However, if you’re learning Korean, the desire to experience studying in Korea
                naturally grows. Language learning goes far beyond memorizing vocabulary—it’s about
                living the language in its cultural context. A short-term language program is the
                ideal choice for learners looking for a meaningful experience without the long-term
                commitment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Many short-term programs do not require a visa, making them accessible and easy to
                join—just like taking a trip with an educational twist.
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
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">👶 Especially Ideal for Beginners</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                Korean requires a strong foundation, and early learning should be accurate, focused,
                and well-structured. For beginners who may find long-term programs overwhelming, a
                short-term course is a perfect starting point.
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
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-4">
            🧑‍🎓 Valuable for Upper-Beginners and Intermediate Learners
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed">
                If you’ve passed the beginner stage, staying in Korea even for a few weeks allows
                you to observe how locals think, speak, and behave—an experience that enhances both
                language skills and cultural understanding.
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
          <h2 className="text-xl font-semibold mb-4">📅 Course Availability & Duration</h2>
          <div className="flex flex-col md:flex-row-reverse items-start gap-6">
            <div className="w-full md:w-7/10">
              <p className="text-gray-700 leading-relaxed mb-2">
                Short-term programs are not available year-round. They are generally scheduled
                during vacation seasons:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>
                  Main intake periods: Summer break, spring/winter holidays, year-end/New Year,
                  Golden Week
                </li>
                <li>Typical duration: 2–3 weeks</li>
                <li>Extended short-term options: 4 to 6 weeks</li>
                <li>Ultra-short courses: 1 week, 3 days, or 5 days (offered occasionally)</li>
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
      </div>
    </div>
  );
};

export default ProgramDetailsShort;
