// @flow
import type { RecordOf, RecordFactory } from 'immutable';
import type { ApiResult } from './api';
import type { Events } from './event';
import type { Notifications } from './notification';

export type Action = {
  type: string,
  // flowlint-next-line unclear-type:off
  payload: any
};

type EventProps = {
  submitted: boolean,
  events: ApiResult<Events>
};

type NotificationProps = {
  notifications: Notifications
};

export type EventFactory = RecordFactory<EventProps>;
export type EventState = RecordOf<EventProps>;

export type NotificationFactory = RecordFactory<NotificationProps>;
export type NotificationState = RecordOf<NotificationProps>;
