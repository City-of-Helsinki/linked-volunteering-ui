import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getReport: async (year, apiAccessToken) => {
    const payload = await get('contract_zone/', { stats_year: year }, apiAccessToken);

    if (!payload) {
      return {};
    }

    return {
      ...payload,
      results: Map(payload.results.map(report => [report.id, report]))
    };
  }
};
