// @flow
import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, EventState, EventFactory } from '../types/redux';
import eventService from '../services/eventService';

const defaultState: EventFactory = Record({
  count: 0,
  next: null,
  previous: null,
  events: Map()
});

export const getEvents = createAction('GET_EVENTS', eventService.getEvents);

export default (state: EventState = defaultState(), action: Action): EventState => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_EVENTS_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('events', events => events.merge(Map(payload.results.map(row => [row.id, row]))));
    default:
      return state;
  }
};
