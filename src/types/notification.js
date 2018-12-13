// @flow
import type { Map } from 'immutable';

export type Notification = {
  color: string,
  message: string,
  values: Object
};

export type Notifications = Map<string, Notification>;
