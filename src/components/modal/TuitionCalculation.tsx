'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
// UI Components
import Image from 'next/image';
import Modal from '@/components/common/Modal';
// Constants
import {
  ProgramType,
  University,
  PriceBreakdown,
  PriceRange,
  DormitoryOption,
  ProgramPricing,
  TermDuration,
} from '@/types/constants';
// Store
import { useCurrencyStore } from '@/store/currencyStore';
import useContactUsStore from '@/store/contactusStore';
// API
import { retrieveUniversityList } from '@/api';
// Utils
import { formatPrice } from '@/utils';
// Analytics
import { trackTuitionCalculationSubmit, event } from '@/lib/gtag';

interface TuitionCalculationProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCHOOL_ONLY = '__school_only__';

const programKey = (type: ProgramType) => (type === ProgramType.SHORT ? 'short' : 'long');

const getProgram = (uni: University | null, type: ProgramType): ProgramPricing | null =>
  uni?.pricing?.[programKey(type)] ?? null;

// A school is offered for a program if it has synced pricing for it, or a legacy price
const offersProgram = (uni: University, type: ProgramType) =>
  uni.pricing
    ? !!uni.pricing[programKey(type)]
    : (type === ProgramType.SHORT ? uni.priceShort : uni.priceLong) > 0;

const TuitionCalculation: React.FC<TuitionCalculationProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { currency } = useCurrencyStore();
  const { requestPrefill } = useContactUsStore();

  const [universityList, setUniversityList] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [programType, setProgramType] = useState<ProgramType>(ProgramType.SHORT);
  const [period, setPeriod] = useState(1); // option position, see TermPricing.period
  const [stayKey, setStayKey] = useState(SCHOOL_ONLY); // SCHOOL_ONLY or a dormitory name
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const symbol = currency === 'USD' ? '$' : '€';
  const money = (value: number) => `${symbol}${formatPrice(value, i18n.language)}`;
  const moneyRange = (range: PriceRange) =>
    range.min === range.max ? money(range.max) : `${money(range.min)} – ${money(range.max)}`;

  /*******************************************************
   * derived state
   */
  const selectedUniversityList = useMemo(
    () => universityList.filter(uni => offersProgram(uni, programType)),
    [universityList, programType],
  );

  // Dropdown groups: universities first, then language schools
  const universityGroups = useMemo(
    () =>
      [
        {
          key: 'university',
          label: t('TUITION_CALCULATOR_GROUP_UNIVERSITY'),
          items: selectedUniversityList.filter(
            u => (u.schoolType ?? 'university') === 'university',
          ),
        },
        {
          key: 'language_school',
          label: t('TUITION_CALCULATOR_GROUP_LANGUAGE_SCHOOL'),
          items: selectedUniversityList.filter(u => u.schoolType === 'language_school'),
        },
      ].filter(group => group.items.length > 0),
    [selectedUniversityList, t],
  );

  // Look up fresh data — the list is refetched on open / currency change
  const university = useMemo(
    () =>
      selectedUniversity
        ? (universityList.find(u => u.id === selectedUniversity.id) ?? selectedUniversity)
        : null,
    [selectedUniversity, universityList],
  );

  const program = getProgram(university, programType);
  const term = program?.terms.find(tm => tm.period === period) ?? program?.terms[0] ?? null;
  const dormitories = term?.dormitories ?? [];
  const selectedDorm: DormitoryOption | null = dormitories.find(d => d.name === stayKey) ?? null;
  const breakdown: PriceBreakdown | null = term ? (selectedDorm?.price ?? term.schoolOnly) : null;

  // Schools that have not been synced yet only have a single number
  const legacyPrice =
    university && !university.pricing
      ? programType === ProgramType.SHORT
        ? university.priceShort
        : university.priceLong
      : null;

  const programTitle =
    programType === ProgramType.SHORT
      ? t('TUITION_SHORT_TERM_TITLE')
      : t('TUITION_LONG_TERM_TITLE');
  const accentText = programType === ProgramType.SHORT ? 'text-aah-red' : 'text-aah-blue';
  const accentBg = programType === ProgramType.SHORT ? 'bg-aah-red' : 'bg-aah-blue';

  const dormLabel = (dorm: DormitoryOption) => {
    const notes = [
      dorm.femaleOnly && t('TUITION_CALCULATOR_DORM_FEMALE_ONLY'),
      dorm.maleOnly && t('TUITION_CALCULATOR_DORM_MALE_ONLY'),
      dorm.lottery && t('TUITION_CALCULATOR_DORM_LOTTERY'),
    ].filter(Boolean);
    const base = t(`TUITION_CALCULATOR_DORM_${dorm.roomType.toUpperCase()}`);
    return notes.length ? `${base} (${notes.join(', ')})` : base;
  };

  const durationLabel = (duration: TermDuration) =>
    t(`TUITION_CALCULATOR_DURATION_${duration.unit.toUpperCase()}`, { count: duration.value });

  /*******************************************************
   * methods
   */
  const fetchUniversityList = async () => {
    try {
      const universities = await retrieveUniversityList('all');
      setUniversityList(universities);
    } catch (error) {
      console.error('Failed to fetch university list:', error);
    }
  };

  const handleSelectProgramType = useCallback((type: ProgramType) => {
    setProgramType(type);
    setSelectedUniversity(null);
    setPeriod(1);
    setStayKey(SCHOOL_ONLY);

    event({
      action: 'program_type_select',
      category: 'tuition_calculator',
      label: type,
      custom_parameters: { program_type: type },
    });
  }, []);

  const handleUniversitySelect = (uni: University) => {
    setSelectedUniversity(uni);
    setIsDropdownOpen(false);
    setPeriod(1);
    setStayKey(SCHOOL_ONLY);

    event({
      action: 'university_select',
      category: 'tuition_calculator',
      label: uni.title,
      custom_parameters: {
        university_id: uni.id,
        university_name: uni.title,
        program_type: programType,
      },
    });
  };

  const buildInquiryText = (): string => {
    if (!university) return '';
    const lines: string[] = [
      `■ ${t('TUITION_CALCULATOR_INQUIRY_HEADER')}`,
      `- ${t('TUITION_CALCULATOR_UNIVERSITY')}: ${university.title} (${university.subTitle})`,
      `- ${t('TUITION_CALCULATOR_PROGRAM')}: ${programTitle}${
        term ? ` · ${durationLabel(term.duration)}` : ''
      }`,
    ];

    if (breakdown) {
      lines.push(
        `- ${t('TUITION_CALCULATOR_ACCOMMODATION')}: ${
          selectedDorm
            ? dormLabel(selectedDorm)
            : t('TUITION_CALCULATOR_ACCOMMODATION_NOT_INCLUDED')
        }`,
      );
      if (breakdown.entrance > 0) {
        lines.push(`- ${t('TUITION_CALCULATOR_ENTRANCE_FEE')}: ${money(breakdown.entrance)}`);
      }
      lines.push(`- ${t('TUITION_CALCULATOR_TUITION')}: ${money(breakdown.tuition)}`);
      if (breakdown.accommodation) {
        lines.push(
          `- ${t('TUITION_CALCULATOR_DORMITORY_FEE')}: ${moneyRange(breakdown.accommodation)}`,
        );
      }
      lines.push(`- ${t('TUITION_CALCULATOR_AAH_FEE')}: ${money(breakdown.aahFee)}`);
      lines.push(
        `- ${t('TUITION_CALCULATOR_TOTAL')}: ${moneyRange(breakdown.total)}${
          breakdown.accommodation ? '' : ` ${t('TUITION_CALCULATOR_PLUS_ACCOMMODATION')}`
        }`,
      );
    } else if (legacyPrice) {
      lines.push(`- ${t('TUITION_CALCULATOR_MODAL_ESTIMATED_PRICE')}: ${money(legacyPrice)}`);
    }

    return `${lines.join('\n')}\n\n`;
  };

  const handleInquiry = () => {
    if (!university) return;

    event({
      action: 'tuition_inquiry_click',
      category: 'tuition_calculator',
      label: university.title,
      custom_parameters: {
        university_id: university.id,
        program_type: programType,
        duration: term ? `${term.duration.value} ${term.duration.unit}` : 'none',
        accommodation: selectedDorm ? selectedDorm.roomType : 'none',
        total: breakdown?.total.max ?? legacyPrice ?? 0,
        currency,
      },
    });

    requestPrefill({
      semester: programType === ProgramType.SHORT ? 0 : 1,
      content: buildInquiryText(),
    });
    onClose();
  };

  /*******************************************************
   * lifecycle hooks
   */
  // Refetch on open and on currency change
  useEffect(() => {
    if (isOpen) {
      fetchUniversityList();
    }
  }, [isOpen, currency]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalForTracking = breakdown?.total.max ?? legacyPrice ?? 0;
  useEffect(() => {
    if (!university || !(totalForTracking > 0)) return;
    trackTuitionCalculationSubmit({
      university_id: university.id,
      university_name: university.title,
      program_type: programType,
      currency,
      calculated_price: totalForTracking,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university?.id, programType, totalForTracking, currency]);

  /*******************************************************
   * render
   */
  const optionButton = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
      active
        ? `${accentBg} text-white border-transparent shadow-md`
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
    }`;

  return (
    <Modal
      size={'lg'}
      isOpen={isOpen}
      onClose={onClose}
      title={t('TUITION_CALCULATOR_MODAL_TITLE')}
      isScrollAllowed={false}
    >
      <div className="py-2 px-4 sm:px-8 flex flex-col">
        {/* Description */}
        <p className="text-left text-gray-600 mb-6">
          <Trans i18nKey="TUITION_CALCULATOR_DESCRIPTION" />
        </p>

        {/* Program Type Selector */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-6">
          {[ProgramType.SHORT, ProgramType.LONG].map(type => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="programType"
                value={type}
                checked={programType === type}
                onChange={() => handleSelectProgramType(type)}
                className="hidden"
              />
              <div
                className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
                  programType === type
                    ? `${type === ProgramType.SHORT ? 'bg-aah-red' : 'bg-aah-blue'} text-white shadow-md`
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {type === ProgramType.SHORT
                  ? t('TUITION_SHORT_TERM_TITLE')
                  : t('TUITION_LONG_TERM_TITLE')}
              </div>
            </label>
          ))}
        </div>

        {/* University Selector */}
        <div className="relative w-full mb-6" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex justify-between items-center h-[80px]"
          >
            {university ? (
              <div className="flex items-center gap-4">
                <Image
                  src={`/assets/emblem/${university.id}.png`}
                  alt={university.title}
                  width={36}
                  height={36}
                  className={`${university.margin ? 'ml-1 mr-1' : ''}`}
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{university.title}</span>
                  <span className="text-sm text-gray-500">{university.subTitle}</span>
                </div>
              </div>
            ) : (
              <span className="text-gray-500">
                {t('TUITION_CALCULATOR_MODAL_SELECT_UNIVERSITY')}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
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
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <ul className="py-1">
                {universityGroups.map(group => (
                  <React.Fragment key={group.key}>
                    {universityGroups.length > 1 && (
                      <li className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 text-left cursor-default">
                        {group.label}
                      </li>
                    )}
                    {group.items.map(uni => (
                      <li
                        key={uni.id}
                        onClick={() => handleUniversitySelect(uni)}
                        className="cursor-pointer hover:bg-gray-100 p-3"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={`/assets/emblem/${uni.id}.png`}
                            alt={uni.title}
                            width={36}
                            height={36}
                            className={`${uni.margin ? 'ml-1 mr-1' : ''}`}
                          />
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-sm">{uni.title}</span>
                            <span className="text-gray-500 text-xs">{uni.subTitle}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Options: duration + accommodation */}
        {program && term && (
          <div className="flex flex-col gap-5 mb-6 text-left">
            {program.terms.length > 1 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {t('TUITION_CALCULATOR_DURATION')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.terms.map(tm => (
                    <button
                      key={tm.period}
                      type="button"
                      onClick={() => setPeriod(tm.period)}
                      className={optionButton(term.period === tm.period)}
                    >
                      {durationLabel(tm.duration)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                {t('TUITION_CALCULATOR_ACCOMMODATION')}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setStayKey(SCHOOL_ONLY)}
                  className={optionButton(!selectedDorm)}
                >
                  {t('TUITION_CALCULATOR_ACCOMMODATION_SEPARATE')}
                </button>
                {dormitories.map(dorm => (
                  <button
                    key={dorm.name}
                    type="button"
                    onClick={() => setStayKey(dorm.name)}
                    className={optionButton(selectedDorm?.name === dorm.name)}
                  >
                    {dormLabel(dorm)}
                  </button>
                ))}
              </div>
              {dormitories.length === 0 && (
                <p className="text-xs text-gray-500 mt-2">{t('TUITION_CALCULATOR_NO_DORMITORY')}</p>
              )}
            </div>
          </div>
        )}

        {/* Price Display */}
        <div className="p-6 mb-6 bg-gray-100 rounded-lg">
          {breakdown ? (
            <>
              <dl className="text-gray-700 divide-y divide-gray-200">
                {breakdown.entrance > 0 && (
                  <div className="flex justify-between py-2">
                    <dt>{t('TUITION_CALCULATOR_ENTRANCE_FEE')}</dt>
                    <dd className="font-medium">{money(breakdown.entrance)}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <dt>{t('TUITION_CALCULATOR_TUITION')}</dt>
                  <dd className="font-medium">{money(breakdown.tuition)}</dd>
                </div>
                {breakdown.accommodation && (
                  <div className="flex justify-between py-2">
                    <dt>{t('TUITION_CALCULATOR_DORMITORY_FEE')}</dt>
                    <dd className="font-medium">{moneyRange(breakdown.accommodation)}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <dt>{t('TUITION_CALCULATOR_AAH_FEE')}</dt>
                  <dd className="font-medium">{money(breakdown.aahFee)}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-end justify-between gap-2 border-t-2 border-gray-300 mt-2 pt-4">
                <span className="text-xl font-semibold text-gray-800">
                  {t('TUITION_CALCULATOR_TOTAL')}
                </span>
                <span className="text-right">
                  <span className={`block text-3xl sm:text-4xl font-bold ${accentText}`}>
                    {moneyRange(breakdown.total)}
                  </span>
                  {!breakdown.accommodation && (
                    <span className="block text-sm font-semibold text-gray-600 mt-1">
                      {t('TUITION_CALCULATOR_PLUS_ACCOMMODATION')}
                    </span>
                  )}
                </span>
              </div>

              <ul className="mt-4 text-xs text-gray-500 space-y-1 text-left">
                {selectedDorm &&
                  term &&
                  term.duration.unit === 'semester' &&
                  term.duration.value > 1 && <li>※ {t('TUITION_CALCULATOR_DORM_NOTE')}</li>}
                <li>※ {t('TUITION_CALCULATOR_PRICE_NOTE')}</li>
              </ul>
            </>
          ) : (
            <div className="text-center h-[110px] flex flex-col justify-center items-center">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {t('TUITION_CALCULATOR_MODAL_ESTIMATED_PRICE')}
              </h4>
              <p className={`text-4xl font-bold ${accentText}`}>
                {legacyPrice && legacyPrice > 0 ? money(legacyPrice) : '-'}
              </p>
            </div>
          )}
        </div>

        {/* Inquiry */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            disabled={!university}
            onClick={handleInquiry}
            className={`${accentBg} text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {t('TUITION_CALCULATOR_INQUIRY_BUTTON')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TuitionCalculation;
