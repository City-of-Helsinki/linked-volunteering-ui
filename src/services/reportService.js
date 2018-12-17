// @flow
import type { Report } from '../types/report';
import reportData from './report.json';

export default {
  getReport: async (): Promise<Report> => reportData
};
