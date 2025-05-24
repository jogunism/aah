import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

export default async function Price() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white mb-30">
      <ParallaxImage section="tuition" imagePath="/assets/image7.jpg" />

      <div className="relative z-10 bg-gradient-to-b from-[#f3e1eb] to-[#fff] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('TUITION_TITLE')}
          </h2>
          <div className="text-lg text-gray-800 ">
            {/* body */}
            <p className="mb-5">
              If you are thinking about studying abroad in Korea, our Japanese staff with experience
              studying abroad will personally and personally help you with all the procedures for
              studying abroad, such as choosing a school, various planning, and application, as well
              as accommodation in Korea, local procedures, and student life.
            </p>
            <p>
              <strong>We are</strong>
            </p>
            <ul className="list-disc pl-12 ml-0">
              <li>
                a trusted company with <strong>15 years of experience</strong>, specializing in{' '}
                <strong>study abroad programs in Korea.</strong>
              </li>
              <li>
                officially authorized and registered as{' '}
                <strong>an education-related organization in both Japan and Korea</strong> — a rare
                and reliable distinction in the industry.
              </li>
              <li>
                a regular member of the NPO Study Abroad Association and designated as part of the
                Korean Secretariat.
              </li>
              <li>
                one of the largest study abroad agency, sending 700 students from Japan to Korea
                every year.
              </li>
              <li>
                partnered with numerous university training institutions across Korea, building
                strong and lasting collaborations.
              </li>
              <li>
                capable of providing a wide range of study abroad options, including 3-week
                short-term programs, 10-week regular programs, full undergraduate and graduate
                degrees, and cyber university programs.
              </li>
              <li>
                fully equipped to support students with school and dormitory arrangements,
                documentation and visa guidance, local SIM card setup, insurance, and other on-site
                preparations.
              </li>
            </ul>
            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
