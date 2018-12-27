import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import uuid from 'uuid';

const defaultState = Record({
  notifications: Map()
});

export const addNotification = createAction('ADD_NOTIFICATION');
export const dismissNotification = createAction('DISMISS_NOTIFICATION');

export default (state = defaultState(), action) => {
  const { type, payload, error } = action;
  if (error) {
    return state.setIn(['notifications', uuid()], {
      color: 'danger',
      message: 'notification.generic.error'
    });
  }
  switch (type) {
    case 'ADD_NOTIFICATION':
      return state.setIn(['notifications', uuid()], payload);
    case 'DISMISS_NOTIFICATION':
      return state.deleteIn(['notifications', payload]);
    default:
      return state;
  }
};
