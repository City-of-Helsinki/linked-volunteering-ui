// @flow
import type { Map } from 'immutable';

export type Location = {
  type: string,
  coordinates: Array<number>
};

export type NewEvent = {
  name: string,
  description: string,
  area: string,
  start_time: string,
  end_time: string,
  location: {
    type: string,
    coordinates: Array<string>
  },
  organizer_first_name: string,
  organizer_last_name: string,
  organizer_email: string,
  organizer_phone: string,
  estimated_attendee_count: number,
  targets: string,
  maintenance_location: string,
  additional_information: string,
  trash_bag_count: number,
  trash_picker_count: number,
  has_roll_off_dumpster: boolean
};

export type Event = {
  id: string,
  state: string,
  created_at: string,
  modified_at: string
} & NewEvent;

export type Events = Map<string, Event>;
