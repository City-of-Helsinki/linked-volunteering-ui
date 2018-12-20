// @flow
import type { Map } from 'immutable';

type ProfileProps = {
  sub: string,
  auth_time: number,
  given_name: string,
  email: string,
  name: string,
  family_name: string,
  nickname: string,
  email_verified: boolean
};

export type Profile = Map<string, ProfileProps>;

type UserProps = {
  id_token: string | null,
  access_token: string | null,
  token_type: string | null,
  expires_at: number,
  profile: Profile
};

export type User = Map<string, UserProps>;

type OidcProps = {
  user: User,
  isLoadingUser: boolean
};

export type OIDC = Map<string, OidcProps>;
