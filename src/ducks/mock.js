import { createAction } from 'redux-actions';
import { addWeeks } from 'date-fns';
import uuid from 'uuid';

const convertToUnixTime = time => Math.round(time.getTime() / 1000);

const now = new Date();
const expiresAt = addWeeks(now, 1);

// eslint-disable-next-line import/prefer-default-export
export const mockUser = createAction('redux-oidc/USER_FOUND', () => ({
  id_token: uuid(),
  access_token: uuid(),
  token_type: 'bearer',
  profile: {
    sub: uuid(),
    name: 'Gaylord Lohiposki',
    given_name: 'Gaylord',
    family_name: 'Lohiposki',
    nickname: 'Gaylord',
    auth_time: convertToUnixTime(now)
  },
  expires_at: convertToUnixTime(expiresAt)
}));

// eslint-disable-next-line import/prefer-default-export
export const mockUserData = createAction('GET_CURRENT_USER_DATA_FULFILLED', () => ({
  uuid: uuid(),
  first_name: 'Gaylord',
  last_name: 'Lohiposki',
  is_official: true,
  is_contractor: false
}));
