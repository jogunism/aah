import http from '@lib/http';
// constants
import type { Version, University, Contactus } from '@/types/constants';

/**
 * Get the app version
 * @returns {Promise<string>} The app version
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
 * Send contact us form
 * @param {Contactus} formValues - The contact us form values
 * @returns {Promise<any>} The response from the server
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
