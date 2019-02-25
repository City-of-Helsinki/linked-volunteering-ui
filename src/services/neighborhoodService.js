import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getNeighborhoods: async apiAccessToken => {
    const results = await get('neighborhood', null, apiAccessToken);

    return Map(
      results.results.reduce((acc, cur) => {
        if (cur.sub_districts.length > 0) {
          cur.sub_districts.forEach(c => acc.push([c.ocd_id, { ...c, parent: cur }]));
        } else {
          acc.push([cur.ocd_id, cur]);
        }
        return acc;
      }, [])
    );
  }
};
