import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import geoService from '../services/geoService';

const defaultState = Record({
  selectedAddress: null
});

export const getAddress = createAction('GET_ADRESS_FROM_COORDINATES', geoService.getAddress);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ADRESS_FROM_COORDINATES_FULFILLED':
      return state.set('selectedAddress', payload);
    default:
      return state;
  }
};
