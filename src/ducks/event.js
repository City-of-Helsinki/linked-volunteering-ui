// @flow
import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import type { Action, EventState, EventFactory } from '../types/redux';
import eventService from '../services/eventService';

const defaultState: EventFactory = Record({
  submitted: false
});

export const submit = createAction('EVENT_SUBMIT', eventService.submit);

export default (state: EventState = defaultState(), action: Action): EventState => {
  const { type } = action;
  switch (type) {
    case 'EVENT_SUBMIT_FULFILLED':
      return state.set('submitted', true);
    default:
      return state;
  }
};
