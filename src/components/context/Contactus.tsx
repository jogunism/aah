import { getTranslation } from '@/lib/i18n.server';
import ParallaxImage from '@common/parallaxImage';

export default async function Contactus() {
  const { t } = await getTranslation();

  return (
    <div className="relative w-full bg-white">
      <ParallaxImage section="contactus" imagePath="/assets/image8.jpg" />

      <div className="relative z-10 bg-[#f3e1eb] w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            {t('CONTACTUS_TITLE')}
          </h2>
          <div className="text-lg text-gray-800 ">
            {/* body */}

            <div className="border-b border-gray-900/10 pb-12">
              <p className="mt-1 text-md/6 text-gray-600 text-center">
                {t('CONTACTUS_DESCRIPTION')}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                    {t('CONTACTUS_1ST_NAME')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    {t('CONTACTUS_LAST_NAME')}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    {t('CONTACTUS_EMAIL_ADDRESS')}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    {t('CONTACTUS_SEMESTERS')}
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>{t('CONTACTUS_SEMESTERS_SELECT')}</option>
                      <option>{t('CONTACTUS_SEMESTERS_SHORT_TERMS')}</option>
                      <option>{t('CONTACTUS_SEMESTERS_LONG_TERMS')}</option>
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                    {t('CONTACTUS_CONTENT')}
                  </label>
                  <div className="mt-2">
                    <textarea
                      name="about"
                      id="about"
                      rows={5}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    ></textarea>
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    <label>
                      <input type="checkbox" required /> {t('CONTACTUS_GDPR')}
                    </label>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button className="bg-[#DF7B7B] hover:bg-[#F1A0A0] text-white py-2 px-4 rounded-lg shadow-md transition duration-200">
                Send
              </button>
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
