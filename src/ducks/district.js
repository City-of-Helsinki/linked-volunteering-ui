// @flow
import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, DistrictState, DistrictFactory } from '../types/redux';
import districtService from '../services/districtService';

const defaultState: DistrictFactory = Record({
  count: 0,
  next: null,
  previous: null,
  districts: Map()
});

export const getDistricts = createAction('GET_DISTRICTS', districtService.getDistricts);

export default (state: DistrictState = defaultState(), action: Action): DistrictState => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_DISTRICTS_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('districts', districts =>
          districts.merge(Map(payload.results.map(row => [row.id, row])))
        );
    default:
      return state;
  }
};
