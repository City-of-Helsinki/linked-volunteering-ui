// @flow
import type { RecordOf, RecordFactory } from 'immutable';
import { type ApiResult } from './api';
import { type Events } from './event';

export type Action = {
  type: string,
  // flowlint-next-line unclear-type:off
  payload: any
};

type EventProps = {
  submitted: boolean,
  events: ApiResult<Events>
};

export type EventFactory = RecordFactory<EventProps>;
export type EventState = RecordOf<EventProps>;
