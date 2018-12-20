// @flow
import type { Map } from 'immutable';

export type Notification = {
  color: string,
  message: string,
  // flowlint-next-line unclear-type:off
  values: Object
};

export type Notifications = Map<string, Notification>;
