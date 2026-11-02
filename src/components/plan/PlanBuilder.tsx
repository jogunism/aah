'use client';
// 플랜 빌더(/plan) 본문. 프로그램·학교·기간·숙소를 고르면 견적을 계산하고 문의 폼으로 넘긴다

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
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
import { trackTuitionCalculationOpen, trackTuitionCalculationSubmit, event } from '@/lib/gtag';

type Currency = 'USD' | 'EUR';

interface PlanBuilderProps {
  lang: string;
  initialProgram: 'short' | 'long';
  initialSchool?: string;
  initial: University[];
  initialCurrency: Currency;
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

export default function PlanBuilder({
  lang,
  initialProgram,
  initialSchool,
  initial,
  initialCurrency,
}: PlanBuilderProps) {
  const { i18n } = useTranslation();
  const t = i18n.getFixedT(lang);
  const currency = useCurrencyStore(s => s.currency) as Currency;
  const { requestPrefill } = useContactUsStore();

  const startType = initialProgram === 'long' ? ProgramType.LONG : ProgramType.SHORT;
  const [list, setList] = useState({ schools: initial, currency: initialCurrency });
  const [programType, setProgramType] = useState<ProgramType>(startType);
  const [schoolId, setSchoolId] = useState<string | null>(() =>
    initial.some(u => u.id === initialSchool && offersProgram(u, startType)) ? initialSchool! : null,
  );
  const [period, setPeriod] = useState(1); // option position, see TermPricing.period
  const [stayKey, setStayKey] = useState(SCHOOL_ONLY); // SCHOOL_ONLY or a dormitory name

  const symbol = list.currency === 'USD' ? '$' : '€';
  const money = (value: number) => `${symbol}${formatPrice(value, lang)}`;
  const moneyRange = (range: PriceRange) =>
    range.min === range.max ? money(range.max) : `${money(range.min)} – ${money(range.max)}`;

  /*******************************************************
   * derived state
   */
  const offered = useMemo(
    () => list.schools.filter(uni => offersProgram(uni, programType)),
    [list.schools, programType],
  );

  // Universities first, then language schools
  const groups = [
    {
      key: 'university',
      label: t('TUITION_CALCULATOR_GROUP_UNIVERSITY'),
      items: offered.filter(u => (u.schoolType ?? 'university') === 'university'),
    },
    {
      key: 'language_school',
      label: t('TUITION_CALCULATOR_GROUP_LANGUAGE_SCHOOL'),
      items: offered.filter(u => u.schoolType === 'language_school'),
    },
  ].filter(group => group.items.length > 0);

  const university = list.schools.find(u => u.id === schoolId) ?? null;
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

  const isShort = programType === ProgramType.SHORT;
  const programTitle = isShort ? t('TUITION_SHORT_TERM_TITLE') : t('TUITION_LONG_TERM_TITLE');
  const accentText = isShort ? 'text-aah-red' : 'text-aah-blue';
  const accentBg = isShort ? 'bg-aah-red' : 'bg-aah-blue';
  const accentBorder = isShort ? 'border-aah-red' : 'border-aah-blue';

  const totalText = breakdown
    ? moneyRange(breakdown.total)
    : legacyPrice && legacyPrice > 0
      ? money(legacyPrice)
      : '–';

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
  const handleSelectProgramType = (type: ProgramType) => {
    if (type === programType) return;
    setProgramType(type);
    // Keep the school when it also offers the other program
    if (university && !offersProgram(university, type)) setSchoolId(null);
    setPeriod(1);
    setStayKey(SCHOOL_ONLY);

    event({
      action: 'program_type_select',
      category: 'tuition_calculator',
      label: type,
      custom_parameters: { program_type: type },
    });
  };

  const handleUniversitySelect = (uni: University) => {
    setSchoolId(uni.id);
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

  // Hand the estimate to the contact form below (it scrolls itself into view)
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
        currency: list.currency,
      },
    });

    requestPrefill({
      semester: isShort ? 0 : 1,
      content: buildInquiryText(),
    });
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    trackTuitionCalculationOpen('plan_page');
  }, []);

  // Refetch when the visitor switches currency
  useEffect(() => {
    if (currency === list.currency) return;
    let alive = true;
    retrieveUniversityList('all').then(
      schools => alive && schools.length && setList({ schools, currency }),
    );
    return () => {
      alive = false;
    };
  }, [currency, list.currency]);

  const totalForTracking = breakdown?.total.max ?? legacyPrice ?? 0;
  useEffect(() => {
    if (!university || !(totalForTracking > 0)) return;
    trackTuitionCalculationSubmit({
      university_id: university.id,
      university_name: university.title,
      program_type: programType,
      currency: list.currency,
      calculated_price: totalForTracking,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university?.id, programType, totalForTracking, list.currency]);

  /*******************************************************
   * render
   */
  const chip = (active: boolean) =>
    `px-4 h-10 rounded-full text-sm font-semibold transition-colors border-[1.5px] ${
      active ? `${accentBg} ${accentBorder} text-white` : 'bg-white border-line text-ink-2 hover:border-ink-2'
    }`;
  const stepTitle = 'text-lg md:text-xl font-bold text-ink';

  const inquiryButton = (extra = '') => (
    <button
      type="button"
      disabled={!university}
      onClick={handleInquiry}
      className={`${accentBg} items-center justify-center rounded-full text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed ${extra}`}
    >
      {t('TUITION_CALCULATOR_INQUIRY_BUTTON')}
    </button>
  );

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
      {/* Choices */}
      <div className="space-y-10">
        {/* 1. Program */}
        <fieldset>
          <legend className={stepTitle}>1. {t('TUITION_CALCULATOR_PROGRAM')}</legend>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[ProgramType.SHORT, ProgramType.LONG].map(type => {
              const active = programType === type;
              const border = type === ProgramType.SHORT ? 'border-aah-red' : 'border-aah-blue';
              return (
                <button
                  key={type}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleSelectProgramType(type)}
                  className={`rounded-[18px] border-2 bg-white px-4 py-4 text-left transition-colors ${
                    active ? border : 'border-line hover:border-ink-2'
                  }`}
                >
                  <span className="block font-bold text-ink">
                    {type === ProgramType.SHORT
                      ? t('TUITION_SHORT_TERM_TITLE')
                      : t('TUITION_LONG_TERM_TITLE')}
                  </span>
                  <span className="block mt-0.5 text-[13px] text-muted">
                    {t(type === ProgramType.SHORT ? 'TILE_SHORT_SUB' : 'TILE_LONG_SUB')}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 2. School */}
        <fieldset>
          <legend className={stepTitle}>2. {t('TUITION_CALCULATOR_UNIVERSITY')}</legend>
          <div className="mt-4 space-y-6">
            {groups.map(group => (
              <div key={group.key}>
                {groups.length > 1 && (
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                    {group.label}
                  </p>
                )}
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {group.items.map(uni => {
                    const active = uni.id === schoolId;
                    return (
                      <li key={uni.id}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => handleUniversitySelect(uni)}
                          className={`w-full flex items-center gap-3 rounded-[16px] border-2 bg-white px-3.5 py-3 text-left transition-colors ${
                            active ? accentBorder : 'border-line hover:border-ink-2'
                          }`}
                        >
                          <Image
                            src={`/assets/emblem/${uni.id}.png`}
                            alt=""
                            width={36}
                            height={36}
                            className="w-9 h-9 object-contain shrink-0"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-ink leading-tight">
                              {uni.title}
                            </span>
                            <span className="block text-xs text-muted truncate">{uni.subTitle}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </fieldset>

        {/* 3. Duration + 4. Accommodation */}
        {program && term && (
          <>
            {program.terms.length > 1 && (
              <fieldset>
                <legend className={stepTitle}>3. {t('TUITION_CALCULATOR_DURATION')}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {program.terms.map(tm => (
                    <button
                      key={tm.period}
                      type="button"
                      aria-pressed={term.period === tm.period}
                      onClick={() => setPeriod(tm.period)}
                      className={chip(term.period === tm.period)}
                    >
                      {durationLabel(tm.duration)}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <fieldset>
              <legend className={stepTitle}>
                {program.terms.length > 1 ? 4 : 3}. {t('TUITION_CALCULATOR_ACCOMMODATION')}
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-pressed={!selectedDorm}
                  onClick={() => setStayKey(SCHOOL_ONLY)}
                  className={chip(!selectedDorm)}
                >
                  {t('TUITION_CALCULATOR_ACCOMMODATION_SEPARATE')}
                </button>
                {dormitories.map(dorm => (
                  <button
                    key={dorm.name}
                    type="button"
                    aria-pressed={selectedDorm?.name === dorm.name}
                    onClick={() => setStayKey(dorm.name)}
                    className={chip(selectedDorm?.name === dorm.name)}
                  >
                    {dormLabel(dorm)}
                  </button>
                ))}
              </div>
              {dormitories.length === 0 && (
                <p className="text-[13px] text-muted mt-2">{t('TUITION_CALCULATOR_NO_DORMITORY')}</p>
              )}
            </fieldset>
          </>
        )}
      </div>

      {/* Summary */}
      <aside
        aria-live="polite"
        className="lg:sticky lg:top-[84px] rounded-[24px] bg-soft p-6 md:p-7"
      >
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{programTitle}</p>
        {university ? (
          <div className="mt-3 flex items-center gap-3">
            <Image
              src={`/assets/emblem/${university.id}.png`}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 object-contain shrink-0"
            />
            <div className="min-w-0">
              <p className="font-bold text-ink leading-tight">{university.title}</p>
              <p className="text-[13px] text-muted">
                {term ? durationLabel(term.duration) : university.subTitle}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-3 text-ink-2">{t('TUITION_CALCULATOR_MODAL_SELECT_UNIVERSITY')}</p>
        )}

        {breakdown && (
          <dl className="mt-5 text-[15px] text-ink-2 divide-y divide-line border-y border-line">
            {breakdown.entrance > 0 && (
              <div className="flex justify-between gap-4 py-2.5">
                <dt>{t('TUITION_CALCULATOR_ENTRANCE_FEE')}</dt>
                <dd className="font-medium text-ink">{money(breakdown.entrance)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 py-2.5">
              <dt>{t('TUITION_CALCULATOR_TUITION')}</dt>
              <dd className="font-medium text-ink">{money(breakdown.tuition)}</dd>
            </div>
            {breakdown.accommodation && (
              <div className="flex justify-between gap-4 py-2.5">
                <dt>{t('TUITION_CALCULATOR_DORMITORY_FEE')}</dt>
                <dd className="font-medium text-ink">{moneyRange(breakdown.accommodation)}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 py-2.5">
              <dt>{t('TUITION_CALCULATOR_AAH_FEE')}</dt>
              <dd className="font-medium text-ink">{money(breakdown.aahFee)}</dd>
            </div>
          </dl>
        )}

        <div className="mt-5">
          <p className="text-sm font-semibold text-ink-2">
            {breakdown ? t('TUITION_CALCULATOR_TOTAL') : t('TUITION_CALCULATOR_MODAL_ESTIMATED_PRICE')}
          </p>
          <p className={`mt-1 text-[32px] leading-tight font-extrabold tracking-tight ${accentText}`}>
            {totalText}
          </p>
          {breakdown && !breakdown.accommodation && (
            <p className="text-sm font-semibold text-ink-2">
              {t('TUITION_CALCULATOR_PLUS_ACCOMMODATION')}
            </p>
          )}
        </div>

        {inquiryButton('mt-6 w-full h-12 px-6 hidden lg:inline-flex')}

        <ul className="mt-4 text-xs text-muted space-y-1">
          {selectedDorm && term && term.duration.unit === 'semester' && term.duration.value > 1 && (
            <li>※ {t('TUITION_CALCULATOR_DORM_NOTE')}</li>
          )}
          <li>※ {t('TUITION_CALCULATOR_PRICE_NOTE')}</li>
        </ul>
      </aside>

      {/* Mobile: sticky total + inquiry */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-[800] bg-white/95 backdrop-blur border-t border-line">
        <div className="px-5 py-3 flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted truncate">{university?.title ?? programTitle}</p>
            <p className={`font-extrabold leading-tight truncate ${accentText}`}>{totalText}</p>
          </div>
          {inquiryButton('inline-flex shrink-0 h-11 px-5 text-sm')}
        </div>
      </div>
    </div>
  );
}
