export interface ContractZone {
  id: number;
  name: string;
}
export interface Event {
  [key: string]: unknown;
  id: number;
  state: string;
  name: string;
  description: string;
  start_time: string;
  created_at?: string;
  end_time: string;
  modified_at?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  organizer_first_name: string;
  organizer_last_name: string;
  organizer_email: string;
  organizer_phone: string;
  estimated_attendee_count?: number;
  targets: string;
  maintenance_location: string;
  additional_information: string;
  large_trash_bag_count?: number;
  small_trash_bag_count?: number;
  trash_picker_count?: number;
  contract_zone?: number;
}

export interface Report {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  event_count: number;
  estimated_attendee_count: number;
  [key: string]: unknown;
}
