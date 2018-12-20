// @flow

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

export type User = {
  id_token: string | null,
  access_token: string | null,
  token_type: string | null,
  expires_at: number,
  profile: UserProfile
};
