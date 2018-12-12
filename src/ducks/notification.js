// @flow
import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import uuid from 'uuid';
import type { Action, NotificationState, NotificationFactory } from '../types/redux';

const defaultState: NotificationFactory = Record({
  notifications: Map()
});

export const addNotification = createAction('ADD_NOTIFICATION');
export const dismissNotification = createAction('DISMISS_NOTIFICATION');

export default (state: NotificationState = defaultState(), action: Action): NotificationState => {
  const { type, payload } = action;
  switch (type) {
    case 'ADD_NOTIFICATION':
      return state.setIn(['notifications', uuid()], payload);
    case 'DISMISS_NOTIFICATION':
      return state.deleteIn(['notifications', payload]);
    default:
      return state;
  }
};
