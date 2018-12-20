// @flow
import type { Map } from 'immutable';

type UserProfile = {
  sub: string,
  auth_time: number,
  given_name: string,
  email: string,
  name: string,
  family_name: string,
  nickname: string,
  email_verified: boolean
};

type User = {
  id_token: string | null,
  access_token: string | null,
  token_type: string | null,
  expires_at: number,
  profile: Map<string, UserProfile>
};

export type OIDC = {
  user: Map<string, User>,
  isLoadingUser: boolean
};
