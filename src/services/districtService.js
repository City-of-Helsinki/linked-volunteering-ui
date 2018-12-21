// @flow
import type { District } from '../types/district';
import districtsData from './districts.json';

export default {
  getDistricts: async (): Promise<District> => districtsData
};
