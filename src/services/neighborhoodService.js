import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getNeighborhoods: async () => {
    const results = await get('neighborhood');

    return {
      count: results.count,
      next: null,
      previous: null,
      results: Map(results.results.map(r => [r.ocd_id, r]))
    };
  }
};
