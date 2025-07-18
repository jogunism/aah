// constants

/*********************************************
 * interface
 */

export interface University {
  title: string;
  subtitle: string;
  emblem: string;
  width?: number;
  height?: number;
  margin?: boolean;
}

export interface ContactusValidation {
  name: boolean;
  email: boolean | string;
  content: boolean;
  gdpr: boolean;
}

export interface Contactus {
  firstName: string;
  lastName: string;
  email: string;
  semester: number;
  content: string;
  gdpr: boolean;
}

/*********************************************
 * enums
 */

export enum ProgramType {
  SHORT = 'short-term',
  LONG = 'long-term',
}
