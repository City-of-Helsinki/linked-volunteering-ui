// @flow
import type { Map } from 'immutable';

export type ReportRow = {
  id: string,
  area: string,
  contact_person: string,
  email: string,
  phone: string,
  events: number,
  participants: number
};

export type Report = Map<string, ReportRow>;
