import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import neighborhoodService from '../services/neighborhoodService';

const defaultState = Record({
  neighborhoods: Map()
});

export const getNeighborhoods = createAction(
  'GET_NEIGHBORHOODS',
  neighborhoodService.getNeighborhoods
);

export default (state = defaultState(), action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_NEIGHBORHOODS_FULFILLED':
      return state.set('neighborhoods', payload);
    default:
      return state;
  }
};
