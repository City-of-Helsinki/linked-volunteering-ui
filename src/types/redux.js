// @flow
import type { RecordOf, RecordFactory } from 'immutable';

export type Action = {
  type: string,
  // flowlint-next-line unclear-type:off
  payload: any
};

type EventProps = {
  submitted: boolean
};

export type EventFactory = RecordFactory<EventProps>;
export type EventState = RecordOf<EventProps>;
