'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { ProgramType, University } from '@/types/constants';
import { formatPrice } from '@/utils';
// API
import { retrieveCurrency, retrieveUniversityList } from '@/api';

interface TuitionCalculationProps {
  isOpen: boolean;
  onClose: () => void;
}

const TuitionCalculation: React.FC<TuitionCalculationProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();

  const [currency, setCurrency] = useState<number>(0.0);
  const [universityList, setUniversityList] = useState<University[]>([]);
  const [selectedUniversityList, setSelectedUniversityList] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const [programType, setProgramType] = useState<ProgramType>(ProgramType.SHORT);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /*******************************************************
   * methods
   */
  const handleSelectProgramType = (type: ProgramType) => {
    setProgramType(type);

    let list: University[] = [];
    switch (type) {
      case ProgramType.SHORT:
        list = universityList.filter(uni => uni.priceShort > 0) ?? [];
        break;
      case ProgramType.LONG:
        list = universityList.filter(uni => uni.priceLong > 0) ?? [];
        break;
      default:
    }

    setSelectedUniversityList(list);
    setSelectedUniversity(null);
    setCalculatedPrice(0);
  };

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setIsDropdownOpen(false);

    const price = programType === ProgramType.SHORT ? university.priceShort : university.priceLong;

    if (price && currency > 0) {
      const calculated = Math.ceil(price / currency + 100000 / currency);
      setCalculatedPrice(calculated);
    } else {
      setCalculatedPrice(null);
    }
  };

  /*******************************************************
   * lifecycle hooks
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const currency = await retrieveCurrency();
        setCurrency(Number(currency));

        const universities = await retrieveUniversityList();
        setUniversityList(universities);
        setInitialDataLoaded(true);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    if (isOpen && !initialDataLoaded) {
      fetchInitialData();
    }
  }, [isOpen, initialDataLoaded]);

  useEffect(() => {
    handleSelectProgramType(ProgramType.SHORT);
  }, [universityList]);

  /*******************************************************
   * render
   */
  return (
    <Modal
      size={'lg'}
      isOpen={isOpen}
      onClose={onClose}
      title={t('TUITION_CALCULATOR_MODAL_TITLE')}
      isScrollAllowed={true}
    >
      <div className="py-2 px-8 h-[450px] flex flex-col">
        {/* Description for Program Type Selection */}
        <p className="text-left text-gray-600 mb-6">
          <Trans i18nKey="TUITION_CALCULATOR_DESCRIPTION" />
        </p>

        {/* Program Type Selector */}
        <div className="flex justify-center gap-8 mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="programType"
              value={ProgramType.SHORT}
              checked={programType === ProgramType.SHORT}
              onChange={() => handleSelectProgramType(ProgramType.SHORT)}
              className="hidden"
            />
            <div
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
                programType === ProgramType.SHORT
                  ? 'bg-[#C03F44] text-white shadow-md'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {t('TUITION_SHORT_TERM_TITLE')}
            </div>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="programType"
              value={ProgramType.LONG}
              checked={programType === ProgramType.LONG}
              onChange={() => handleSelectProgramType(ProgramType.LONG)}
              className="hidden"
            />
            <div
              className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
                programType === ProgramType.LONG
                  ? 'bg-[#2A5E95] text-white shadow-md'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {t('TUITION_LONG_TERM_TITLE')}
            </div>
          </label>
        </div>

        {/* University Selector */}
        <div className="relative w-full mb-6" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex justify-between items-center h-[80px]"
          >
            {selectedUniversity ? (
              <div className="flex items-center gap-4">
                <Image
                  src={`/assets/emblem/${selectedUniversity.id}.png`}
                  alt={selectedUniversity.title}
                  width={36}
                  height={36}
                  className={`${selectedUniversity.margin ? 'ml-1 mr-1' : ''}`}
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{selectedUniversity.title}</span>
                  <span className="text-sm text-gray-500">{selectedUniversity.subTitle}</span>
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
                {selectedUniversityList.map(uni => (
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
                        <span className="text-sm text-gray-500 text-xs">{uni.subTitle}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Price Display */}
        <div className="mt-auto p-6 mb-8 bg-gray-100 rounded-lg text-center h-[200px] flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            {t('TUITION_CALCULATOR_MODAL_ESTIMATED_PRICE')}
          </h4>
          <p
            className={`text-4xl font-bold ${programType === ProgramType.SHORT ? 'text-[#C03F44]' : 'text-[#2A5E95]'}`}
          >
            {calculatedPrice !== null ? `€${formatPrice(calculatedPrice, i18n.language)}` : '-'}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default TuitionCalculation;
