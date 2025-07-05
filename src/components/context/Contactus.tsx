'use client';

import { useEffect, useState } from 'react';
// i18n client
import '@/lib/i18n.client';
import { useTranslation } from 'react-i18next';
import { i18nPromise } from '@/lib/i18n.client';
// store
import useContactUsStore from '@store/contactusStore';
// UI Component
import ParallaxImage from '@common/parallaxImage';
import { FaSpinner } from 'react-icons/fa';
import { toast } from '@lib/toast';
// constants
import type { ContactusValidation, Contactus } from '@/types/constants';

/**
 * Contact Us
 */
export default function Contactus() {
  const { t } = useTranslation();
  const { send, resetSendStatus, pending, isSuccess } = useContactUsStore();

  const [ready, setReady] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    semester: -1,
    content: '',
    gdpr: false,
  } as Contactus);

  const [errors, setErrors] = useState<ContactusValidation>({
    name: false,
    email: false,
    content: false,
    gdpr: false,
  });

  /*******************************************************
   * methods
   */
  const validateForm = () => {
    const nameValid = formValues.firstName.trim() !== '' || formValues.lastName.trim() !== '';
    const emailValue = formValues.email.trim();
    const contentValid = formValues.content.trim() !== '';
    const gdprValid = formValues.gdpr;

    let emailError: false | 'required' | 'invalid' = false;

    if (!emailValue) {
      emailError = 'required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError = 'invalid';
    }

    setErrors({
      name: !nameValid,
      email: emailError,
      content: !contentValid,
      gdpr: !gdprValid,
    });

    return nameValid && !emailError && contentValid && gdprValid;
  };

  const handleNameBlur = () => {
    if (formValues.firstName.trim() !== '' || formValues.lastName.trim() !== '') {
      setErrors(prev => ({ ...prev, name: false }));
    }
  };

  const handleEmailBlur = () => {
    const email = formValues.email.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email) {
      setErrors(prev => ({ ...prev, email: 'required' }));
    } else if (!isValidEmail) {
      setErrors(prev => ({ ...prev, email: 'invalid' }));
    } else {
      setErrors(prev => ({ ...prev, email: false }));
    }
  };

  const handleSelectSemester = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues(prev => ({
      ...prev,
      semester: Number(e.target.value),
    }));
  };

  const handleContentBlur = () => {
    if (formValues.content.trim() !== '') {
      setErrors(prev => ({ ...prev, content: false }));
    }
  };

  const handleGdprBlur = () => {
    if (formValues.gdpr) {
      setErrors(prev => ({ ...prev, gdpr: false }));
    }
  };

  const getInputClass = (hasError: boolean, isPending: boolean) =>
    `mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border focus:ring-2 focus:ring-indigo-600 sm:text-sm ${
      hasError ? 'border-red-700' : 'border-gray-300'
    } ${isPending ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`;

  const handleSendButtonClick = () => {
    if (!validateForm()) {
      toast.error(t('CONTACTUS_FORM_INVALID'));
      return;
    }

    send(formValues, t);
  };

  const resetFormValues = () => {
    setFormValues(prev => ({ ...prev, gdpr: false }));
    setErrors({
      name: false,
      email: false,
      content: false,
      gdpr: false,
    });
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    i18nPromise.then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (isSuccess !== undefined && isSuccess) {
      resetFormValues();
      resetSendStatus();
    }
  }, [isSuccess, resetSendStatus]);

  /*******************************************************
   * render
   */
  if (!ready) {
    return null;
  }

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
                    <strong>
                      {t('CONTACTUS_FIRST_NAME')}
                      <span className="text-red-700 text-base leading-none relative top-[3px] left-[3px]">
                        *
                      </span>
                    </strong>
                  </label>
                  <div className="mt-1">
                    <input
                      id="first-name"
                      type="text"
                      disabled={pending}
                      value={formValues.firstName}
                      onChange={e => setFormValues({ ...formValues, firstName: e.target.value })}
                      onBlur={handleNameBlur}
                      className={getInputClass(errors.name, pending)}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{t('CONTACTUS_NAME_REQUIRED')}</p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    <strong>{t('CONTACTUS_LAST_NAME')}</strong>
                  </label>
                  <div className="mt-1">
                    <input
                      id="last-name"
                      type="text"
                      disabled={pending}
                      value={formValues.lastName}
                      onChange={e => setFormValues({ ...formValues, lastName: e.target.value })}
                      onBlur={handleNameBlur}
                      className={getInputClass(errors.name, pending)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    <strong>
                      {t('CONTACTUS_EMAIL_ADDRESS')}
                      <span className="text-red-700 text-base leading-none relative top-[3px] left-[3px]">
                        *
                      </span>
                    </strong>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      disabled={pending}
                      value={formValues.email}
                      onChange={e => setFormValues({ ...formValues, email: e.target.value })}
                      onBlur={handleEmailBlur}
                      className={getInputClass(!!errors.email, pending)}
                    />
                    {errors.email === 'required' && (
                      <p className="text-red-600 text-sm mt-1">{t('CONTACTUS_EMAIL_REQUIRED')}</p>
                    )}
                    {errors.email === 'invalid' && (
                      <p className="text-red-600 text-sm mt-1">{t('CONTACTUS_EMAIL_INVALID')}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    <strong>{t('CONTACTUS_PROGRAMS')}</strong>
                  </label>
                  <div className="mt-1 grid grid-cols-1">
                    <select
                      id="semester"
                      name="semester"
                      value={formValues.semester}
                      disabled={pending}
                      autoComplete="semester"
                      className={`
                        col-start-1 row-start-1 w-full appearance-none rounded-md bg-white 
                        py-1.5 pr-8 pl-3 text-base text-gray-900 
                        outline-1 -outline-offset-1 outline-gray-300 
                        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                        ${pending ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                      `}
                      onChange={handleSelectSemester}
                    >
                      <option value={-1}>{t('CONTACTUS_PROGRAMS_SELECT')}</option>
                      <option value={0}>{t('CONTACTUS_PROGRAMS_SHORT_TERMS')}</option>
                      <option value={1}>{t('CONTACTUS_PROGRAMS_LONG_TERMS')}</option>
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
                    <strong>
                      {t('CONTACTUS_CONTENT')}
                      <span className="text-red-700 text-base leading-none relative top-[3px] left-[3px]">
                        *
                      </span>
                    </strong>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="content"
                      rows={4}
                      disabled={pending}
                      value={formValues.content}
                      onChange={e => setFormValues({ ...formValues, content: e.target.value })}
                      onBlur={handleContentBlur}
                      className={getInputClass(errors.content, pending)}
                    />
                    {errors.content && (
                      <p className="text-red-700 text-sm mt-1">{t('CONTACTUS_CONTENT_REQUIRED')}</p>
                    )}
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    <label htmlFor="gdpr" className="text-sm text-gray-700 flex items-center gap-2">
                      <input
                        id="gdpr"
                        type="checkbox"
                        disabled={pending}
                        checked={formValues.gdpr}
                        onChange={e => setFormValues({ ...formValues, gdpr: e.target.checked })}
                        onBlur={handleGdprBlur}
                        className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${errors.gdpr ? 'outline outline-1 outline-red-700' : ''}`}
                      />
                      <span className={errors.gdpr ? 'text-red-700' : ''}>
                        {t('CONTACTUS_GDPR')}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                disabled={pending}
                className="bg-[#DF7B7B] hover:bg-[#F1A0A0] text-white py-2 px-4 rounded-lg shadow-md transition duration-200 w-30 h-13 flex items-center justify-center"
                onClick={handleSendButtonClick}
              >
                {pending ? <FaSpinner className="animate-spin" size={18} /> : t('CONTACTUS_SEND')}
              </button>
            </div>

            {/* ./body */}
          </div>
        </div>
      </div>
    </div>
  );
}
