// @flow
import type { Map } from 'immutable';

type UserProfile = Map<{
  sub: string,
  auth_time: number,
  given_name: string,
  email: string,
  name: string,
  family_name: string,
  nickname: string,
  email_verified: boolean
}>;

type User = Map<{
  id_token: string | null,
  access_token: string | null,
  token_type: string | null,
  expires_at: number,
  profile: UserProfile
}>;

export type OIDC = {
  user: User,
  isLoadingUser: boolean
};
