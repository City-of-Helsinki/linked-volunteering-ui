// @flow
import type { Map } from 'immutable';

export type Location = {
  lat: number,
  lng: number
};

export type Event = {
  name: string,
  description: string,
  area: string,
  startdate: string,
  starttime: string,
  enddate: string,
  endtime: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  show_contact_details: boolean,
  amount_of_volunteers: number,
  cleaning_targets: string,
  trash_location: string,
  details: string,
  container: boolean,
  trash_bags: number,
  trash_pickers: string,
  visibility: string,
  free: boolean,
  fee: number,
  location: Location
};

export type Events = Map<string, Event>;
