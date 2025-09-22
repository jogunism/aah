// constants

/*********************************************
 * interface
 */

export interface University {
  title: string;
  subTitle: string;
  id: string;
  width?: number;
  height?: number;
  margin?: boolean;

  priceShort: number;
  priceLong: number;
}

export interface Prices {
  shortMin: number;
  shortMax: number;
  longMin: number;
  longMax: number;
}

export interface ContactusValidation {
  name: boolean;
  email: boolean | string;
  content: boolean;
}

export interface Contactus {
  firstName: string;
  lastName: string;
  email: string;
  semester: number;
  content: string;
}

export interface Version {
  category: string;
  rate: string;
  updatedAt: string;
  itemId: string;
}

/*********************************************
 * enums
 */

export enum ProgramType {
  SHORT = 'short-term',
  LONG = 'long-term',
}
