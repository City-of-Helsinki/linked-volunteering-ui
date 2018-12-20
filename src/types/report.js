// @flow
import type { Map } from 'immutable';

export type Report = {
  id: string,
  area: string,
  contact_person: string,
  email: string,
  phone: string,
  events: number,
  participants: number
};

export type Reports = Map<string, Report>;
