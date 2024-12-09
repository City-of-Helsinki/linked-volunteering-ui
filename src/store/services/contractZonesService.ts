import { Map } from 'immutable';
import { get } from '../../utils/api';
import { ContractZone } from '../types';

export default {
  getContractZones: async (apiAccessToken: string | undefined) => {
    const payload = await get('contract_zone/', {}, apiAccessToken);

    if (!payload) {
      return {};
    }

    return {
      ...payload,
      results: Map(
        payload.results.map((contractZone: ContractZone) => [contractZone.id, contractZone]),
      ),
    };
  },
};
