import http from '@lib/http';
// constants
import type { University, Contactus } from '@/types/constants';

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
