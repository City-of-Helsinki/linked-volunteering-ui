// @flow
import type { RecordOf, RecordFactory, Map } from 'immutable';
import type { Events } from './event';
import type { Reports } from './report';
import type { Notifications } from './notification';
import type { User } from './user';

export type Action = {
  type: string,
  // flowlint-next-line unclear-type:off
  payload: any,
  // flowlint-next-line unclear-type:off
  meta: any
};

type EventProps = {
  count: 0,
  next: string | null,
  previous: string | null,
  events: Events
};

type ReportProps = {
  count: 0,
  next: string | null,
  previous: string | null,
  reports: Reports
};

type NotificationProps = {
  notifications: Notifications
};

type ModalProps = {
  isOpen: boolean,
  modal: null | string,
  // flowlint-next-line unclear-type:off
  meta: any
};

export type EventFactory = RecordFactory<EventProps>;
export type EventState = RecordOf<EventProps>;

export type ReportFactory = RecordFactory<ReportProps>;
export type ReportState = RecordOf<ReportProps>;

export type NotificationFactory = RecordFactory<NotificationProps>;
export type NotificationState = RecordOf<NotificationProps>;

export type ModalFactory = RecordFactory<ModalProps>;
export type ModalState = RecordOf<ModalProps>;

export type Store = {
  oidc: Map<string, { user: User }>,
  event: EventProps,
  report: ReportProps,
  notification: NotificationProps,
  modal: ModalProps
};
