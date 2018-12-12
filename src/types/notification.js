// @flow
import type { Map } from 'immutable';

export type Notification = {
  color: string,
  message: string
};

export type Notifications = Map<string, Notification>;
