import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import authService from '../services/authService';

const defaultState = Record({
  apiAccessToken: null,
  currentUserType: {
    is_official: false,
    is_contactor: false
  }
});

export const getApiAccessToken = createAction(
  'GET_API_ACCESS_TOKEN',
  authService.getApiAccessToken
);

export const getCurrentUserType = createAction(
  'GET_CURRENT_USER_TYPE',
  authService.getCurrentUserType
);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_API_ACCESS_TOKEN_FULFILLED':
      return state.set('apiAccessToken', payload);
    case 'GET_CURRENT_USER_TYPE_FULFILLED':
      return state.set('currentUserType', payload);
    default:
      return state;
  }
};
