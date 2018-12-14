// @flow
import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, ReportState, ReportFactory } from '../types/redux';
import reportService from '../services/reportService';

const defaultState: ReportFactory = Record({
  count: 0,
  next: null,
  previous: null,
  reportRows: Map()
});

export const getReport = createAction('GET_REPORT', reportService.getReport);

export default (state: ReportState = defaultState(), action: Action): ReportState => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_REPORT_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('reportRows', reportRows =>
          reportRows.merge(Map(payload.results.map(row => [row.id, row])))
        );
    default:
      return state;
  }
};
