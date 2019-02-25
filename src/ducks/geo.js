import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import geoService from '../services/geoService';

const defaultState = Record({
  geoData: null
});

export const getGeoData = createAction('GET_GEODATA_FROM_COORDINATES', geoService.getGeoData);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_GEODATA_FROM_COORDINATES_FULFILLED':
      return state.set('geoData', payload);
    default:
      return state;
  }
};
