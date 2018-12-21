// @flow
import type { Map } from 'immutable';

type Child = {
  type: string,
  ocd_id: string,
  municipality: string,
  bbox: Array<number>,
  name: {
    sv: string,
    fi: string
  }
};

export type District = {
  type: string,
  ocd_id: string,
  municipality: string,
  bbox: Array<number>,
  children: Array<Child>
};

export type Districts = Map<string, District>;
