import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import geoService from '../services/geoService';

const defaultState = Record({
  addressCoordinates: null,
  geoData: null
});

export const getGeoData = createAction('GET_GEODATA_FROM_COORDINATES', geoService.getGeoData);

export const clearCoordinatesByAddress = createAction('CLEAR_COORDINATES_BY_ADDRESS', () => null);

export const getCoordinatesByAddress = createAction(
  'GET_COORDINATES_BY_ADDRESS',
  geoService.getCoordinatesByAddress
);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CLEAR_COORDINATES_BY_ADDRESS':
      return state.set('addressCoordinates', payload);
    case 'GET_COORDINATES_BY_ADDRESS_FULFILLED':
      return state.set('addressCoordinates', payload);
    case 'GET_GEODATA_FROM_COORDINATES_FULFILLED':
      return state.set('geoData', payload);
    default:
      return state;
  }
};
