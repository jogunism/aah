'use client';

import { useEffect, useState, useRef } from 'react';
// i18n client
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

  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const programDropdownRef = useRef<HTMLDivElement>(null);

  const programs = [
    { value: -1, label: t('CONTACTUS_PROGRAMS_SELECT') },
    { value: 0, label: t('CONTACTUS_PROGRAMS_SHORT_TERMS') },
    { value: 1, label: t('CONTACTUS_PROGRAMS_LONG_TERMS') },
  ];

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

  const handleSelectProgram = (value: number) => {
    setFormValues(prev => ({ ...prev, semester: value }));
    setIsProgramOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        programDropdownRef.current &&
        !programDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProgramOpen(false);
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
  if (!ready) {
    return null;
  }

  const selectedProgram = programs.find(p => p.value === formValues.semester);

  return (
    <div className="relative w-full bg-white">
      <ParallaxImage section="contactus" imagePath="/assets/image5.jpg" />

      <div className="relative bg-[#f3e1eb] w-full px-6 py-12">
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
                  <label htmlFor="program" className="block text-sm/6 font-medium text-gray-900">
                    <strong>{t('CONTACTUS_PROGRAMS')}</strong>
                  </label>
                  <div className="relative mt-1" ref={programDropdownRef}>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => setIsProgramOpen(!isProgramOpen)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                        pending ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
                      }`}
                    >
                      <span className="block truncate">{selectedProgram?.label}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isProgramOpen ? 'transform rotate-180' : ''}`}
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
                      </span>
                    </button>
                    {isProgramOpen && (
                      <div className="absolute z-10 mt-2 w-full origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                        <ul tabIndex={-1} role="listbox" className="py-1 text-sm">
                          {programs.map(program => (
                            <li
                              key={program.value}
                              onClick={() => handleSelectProgram(program.value)}
                              className={`px-4 py-2 text-gray-700 cursor-pointer ${
                                program.value === formValues.semester
                                  ? 'bg-gray-200'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              <span className="block truncate">{program.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                      <p className="text-red-600 text-sm mt-1">{t('CONTACTUS_CONTENT_REQUIRED')}</p>
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
