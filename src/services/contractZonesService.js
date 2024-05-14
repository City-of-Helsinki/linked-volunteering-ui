import { Map } from 'immutable';
import { get } from '../utils/api';

export default {
  getContractZones: async (apiAccessToken) => {
    const payload = await get('contract_zone/', {}, apiAccessToken);

    if (!payload) {
      return {};
    }

    return {
      ...payload,
      results: Map(payload.results.map((contractZone) => [contractZone.id, contractZone])),
    };
  },
};
