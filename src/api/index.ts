import http from '@lib/http';
// constants
import type { Version, University, Prices, Contactus } from '@/types/constants';

/**
 * Get the app version
 */
export const retrieveAppVersion: () => Promise<string> = async () => {
  try {
    const response = await http.get<Version>('/version');
    return response.data.rate;
  } catch (error) {
    console.error('Error fetching app version:', error);
    throw error;
  }
};

/**
 * Update currency rate
 */
export const updateCurrency = async () => {
  try {
    http.put('/currency');
  } catch (error) {
    console.error('Error updating currency:', error);
  }
};

/**
 * Get currency rate
 */
export const retrieveCurrency: () => Promise<string> = async () => {
  try {
    const response = await http.get<Version>('/currency');
    return response.data?.rate ?? 0;
  } catch (error) {
    console.error('Error fetching currency:', error);
    throw error;
  }
};

/**
 * Get Uninversity List
 * @returns
 */
export const retrieveUniversityList: () => Promise<University[]> = async () => {
  try {
    const response = await http.get<University[]>('/university/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching university list:', error);
    throw error;
  }
};

/**
 * Get prices
 * @returns
 */
export const retrievePrices: () => Promise<Prices> = async () => {
  try {
    const response = await http.get<Prices>('/university/prices');
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};

/**
 * Send contact us form
 * @param {Contactus} formValues - The contact us form values
 */
export const sendContactUs = async (formValues: Contactus) => {
  try {
    const response = await http.post('/contact', formValues);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending contact us form:', error);
    throw error;
  }
};
