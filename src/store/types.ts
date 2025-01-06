export interface ContractZone {
  id: number;
  name: string;
}
export interface Event {
  [key: string]: any;
  id: number;
  state: string;
  name: string;
  description: string;
  start_time?: Date;
  created_at?: Date;
  end_time?: Date;
  modified_at?: Date;
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
  [key: string]: any;
}