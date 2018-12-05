// @flow
import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, EventState, EventFactory } from '../types/redux';
import eventService from '../services/eventService';

const defaultState: EventFactory = Record({
  submitted: false,
  events: null
});

export const submit = createAction('EVENT_SUBMIT', eventService.submit);
export const getEvents = createAction('GET_EVENTS', eventService.getEvents);

export default (state: EventState = defaultState(), action: Action): EventState => {
  const { type, payload } = action;
  switch (type) {
    case 'EVENT_SUBMIT_FULFILLED':
      return state.set('submitted', true);
    case 'GET_EVENTS_FULFILLED':
      return state.set('events', payload);
    default:
      return state;
  }
};
