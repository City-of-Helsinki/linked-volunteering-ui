import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import authService from '../services/authService';

const defaultState = Record({
  apiAccessToken: null
});

export const getApiAccessToken = createAction(
  'GET_API_ACCESS_TOKEN',
  authService.getApiAccessToken
);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_API_ACCESS_TOKEN_FULFILLED':
      return state.set('apiAccessToken', payload);
    default:
      return state;
  }
};
