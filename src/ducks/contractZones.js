import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import contractZonesService from '../services/contractZonesService';

const defaultState = Record({
  contractZones: Map(),
});

export const getContractZones = createAction(
  'GET_CONTRACT_ZONES',
  contractZonesService.getContractZones,
);

export default (state = defaultState(), action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_CONTRACT_ZONES_FULFILLED':
      return state.set('contractZones', payload.results);
    default:
      return state;
  }
};
