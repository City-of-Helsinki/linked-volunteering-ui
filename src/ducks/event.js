// @flow
import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, EventState, EventFactory } from '../types/redux';
import eventService from '../services/eventService';

const defaultState: EventFactory = Record({
  count: 0,
  next: null,
  previous: null,
  events: Map(),
  filterByDistrict: null
});

export const getEvents = createAction('GET_EVENTS', eventService.getEvents);
export const setFilterByDistrict = createAction('SET_EVENT_FILTER', name => name);

export default (state: EventState = defaultState(), action: Action): EventState => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_EVENTS_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('events', events => events.merge(Map(payload.results.map(row => [row.id, row]))));
    case 'SET_EVENT_FILTER':
      return state.set('filterByDistrict', payload);
    default:
      return state;
  }
};
