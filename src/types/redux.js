// @flow
import type { RecordOf, RecordFactory } from 'immutable';
import type { Events } from './event';
import type { Districts } from './district';
import type { Reports } from './report';
import type { Notifications } from './notification';
import type { OIDC } from './user';

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
  events: Events,
  filterByDistrict: String
};

type DistrictProps = {
  count: 0,
  next: string | null,
  previous: string | null,
  districts: Districts
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

export type DistrictFactory = RecordFactory<DistrictProps>;
export type DistrictState = RecordOf<DistrictProps>;

export type ReportFactory = RecordFactory<ReportProps>;
export type ReportState = RecordOf<ReportProps>;

export type NotificationFactory = RecordFactory<NotificationProps>;
export type NotificationState = RecordOf<NotificationProps>;

export type ModalFactory = RecordFactory<ModalProps>;
export type ModalState = RecordOf<ModalProps>;

export type Store = {
  oidc: OIDC,
  event: EventProps,
  district: DistrictProps,
  report: ReportProps,
  notification: NotificationProps,
  modal: ModalProps
};
