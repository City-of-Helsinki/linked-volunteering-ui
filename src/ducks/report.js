import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import reportService from '../services/reportService';
import ordering from '../entities/ordering';

const defaultState = Record({
  count: 0,
  next: null,
  previous: null,
  reports: Map(),
  ordering: ordering()
});

export const getReport = createAction('GET_REPORT', reportService.getReport);
export const setOrderBy = createAction('SET_REPORT_ORDER_BY');

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_REPORT_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('reports', reports =>
          reports.merge(Map(payload.results.map(report => [report.id, report])))
        );
    case 'SET_REPORT_ORDER_BY':
      return state
        .setIn(['ordering', 'key'], payload.key)
        .setIn(['ordering', 'order'], payload.order);
    default:
      return state;
  }
};
