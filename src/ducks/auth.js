import { Record } from 'immutable';
import { createAction } from 'redux-actions';

const defaultState = Record({
  apiAccessToken: null
});

export const setApiAccessToken = createAction('SET_API_ACCESS_TOKEN');
export const getApiAccessToken = createAction('GET_API_ACCESS_TOKEN');

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_API_ACCESS_TOKEN':
      return state.get('apiAccessToken');
    case 'SET_API_ACCESS_TOKEN':
      return state.set('apiAccessToken', payload);
    default:
      return state;
  }
};