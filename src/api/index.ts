import http from '@lib/http';
// constants
import type { Version, University } from '@/types/constants';

/**
 * Get the app version
 */
export const retrieveAppVersion = async (): Promise<string | null> => {
  try {
    const response = await http.get<Version>('/version');
    return response.data.rate;
  } catch (error) {
    console.error('Error fetching app version:', error);
    return null;
  }
};

/**
 * Update currency rate
 */
export const updateCurrency = async () => {
  try {
    await http.put('/currency');
  } catch (error) {
    console.error('Error updating currency:', error);
  }
};

/**
 * Get Uninversity List
 * @param schoolType - 'all' also returns language schools (tuition calculator);
 *                     omitted returns universities only (partner list)
 * @returns
 */
export const retrieveUniversityList = async (schoolType?: 'all'): Promise<University[]> => {
  try {
    const response = await http.get<University[]>('/university/list', {
      params: schoolType ? { schoolType } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching university list:', error);
    return [];
  }
};
