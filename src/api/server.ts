import { cache } from 'react';
import { retrieveUniversityList } from '@/api';

/**
 * Server-side data helpers, de-duplicated per request with React `cache`,
 * so several sections of one page share a single API call.
 */
export const getUniversities = cache(() => retrieveUniversityList());
export const getAllSchools = cache(() => retrieveUniversityList('all'));
