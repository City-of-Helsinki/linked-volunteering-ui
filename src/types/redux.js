// @flow
import type { RecordOf, RecordFactory } from 'immutable';
import type { Events } from './event';
import type { ReportRows } from './report';
import type { Notifications } from './notification';

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
  reportRows: ReportRows
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

export type Store = {
  events: EventState,
  report: ReportState
};

export type ModalFactory = RecordFactory<ModalProps>;
export type ModalState = RecordOf<ModalProps>;
