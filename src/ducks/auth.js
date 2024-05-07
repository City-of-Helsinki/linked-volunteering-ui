import { Record } from 'immutable';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import authService from '../services/authService';

const defaultState = Record({
  apiAccessToken: null,
  currentUserData: null,
});

export const getApiAccessToken = createAction(
  'GET_API_ACCESS_TOKEN',
  authService.getApiAccessToken,
);

export const getCurrentUserData = createAction(
  'GET_CURRENT_USER_DATA',
  authService.getCurrentUserData,
);

export const isOfficialSelector = (state) => get(state, 'auth.currentUserData.is_official');
export const isContractorSelector = (state) => get(state, 'auth.currentUserData.is_contractor');

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_API_ACCESS_TOKEN_FULFILLED':
      return state.set('apiAccessToken', payload);
    case 'GET_CURRENT_USER_DATA_FULFILLED':
      return state.set('currentUserData', payload);
    default:
      return state;
  }
};
