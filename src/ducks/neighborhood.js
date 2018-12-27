import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import neighborhoodService from '../services/neighborhoodService';

const defaultState = Record({
  count: 0,
  next: null,
  previous: null,
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
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .set('neighborhoods', payload.results);
    default:
      return state;
  }
};
