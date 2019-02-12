import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getNeighborhoods: async apiAccessToken => {
    const results = await get('neighborhood', null, apiAccessToken);

    return {
      count: results.count,
      next: null,
      previous: null,
      results: Map(results.results.map(r => [r.ocd_id, r]))
    };
  }
};
