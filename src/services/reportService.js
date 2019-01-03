import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getReport: async year => {
    const payload = await get('report/', { year });

    if (!payload) {
      return {};
    }

    return {
      ...payload,
      results: Map(payload.results.map(report => [report.id, report]))
    };
  }
};
