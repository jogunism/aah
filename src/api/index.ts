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
export const retrieveCurrencyRate: () => Promise<string> = async () => {
  try {
    const response = await http.get<Version>('/currency/rate');
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

/**
 * Subscribe to mailing list
 * @param {string} email - The email address to subscribe
 */
export const subscribeMailingList = async (email: string, lang: string) => {
  try {
    const response = await http.post('/subscribe', { email, lang });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to mailing list:', error);
    throw error;
  }
};

/**
 * Cancel mailing list subscription
 * @param {string} email - The email address to unsubscribe
 */
export const cancelSubscription = async (email: string, lang: string) => {
  try {
    const response = await http.delete('/subscribe/remove', { data: { email, lang } });
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};
