import { Map } from 'immutable';
import { get } from '../../utils/api';
import { Report } from '../types';

export default {
  getReport: async (year: string, apiAccessToken: string | undefined) => {
    const payload = await get('contract_zone/', { stats_year: year }, apiAccessToken);

    if (!payload) {
      return {};
    }

    return {
      ...payload,
      results: Map<string, Report>(payload.results.map((report: Report) => [report.id, report])),
    };
  },
};
