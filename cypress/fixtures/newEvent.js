export default {
  name: {
    method: 'type',
    value: 'Puistotalkoot'
  },
  description: {
    method: 'type',
    value: 'Puistotalkoot'
  },
  neighborhood: {
    method: 'select',
    value: 'Ullanlinna'
  },
  'date_range\\.start_date': {
    method: 'type',
    value: '11.11.1111'
  },
  // eslint-disable no-dupe-keys
  'date_range\\.end_time': {
    method: 'click'
  },
  // eslint-disable-next-line no-dupe-keys
  'date_range\\.start_time': {
    method: 'type',
    value: '11:11'
  },
  // eslint-disable-next-line no-dupe-keys
  'date_range\\.end_time': {
    method: 'click'
  },
  // eslint-disable-next-line no-dupe-keys
  'date_range\\.end_date': {
    method: 'type',
    value: '11.11.1111'
  },
  // eslint-disable-next-line no-dupe-keys
  'date_range\\.start_time': {
    method: 'click'
  },
  // eslint-disable-next-line no-dupe-keys
  'date_range\\.end_time': {
    method: 'type',
    value: '11:11'
  },
  organizer_first_name: {
    method: 'type',
    value: 'Etunimi'
  },
  organizer_last_name: {
    method: 'type',
    value: 'Sukunimi'
  },
  organizer_email: {
    method: 'type',
    value: 'sahko@posti.fi'
  },
  organizer_phone: {
    method: 'type',
    value: '1234567'
  },
  estimated_attendee_count: {
    method: 'type',
    value: '1'
  },
  targets: {
    method: 'type',
    value: '1'
  },
  maintenance_location: {
    method: 'type',
    value: '1'
  },
  additional_information: {
    method: 'type',
    value: '1'
  },
  has_roll_off_dumpster: {
    method: 'click'
  },
  trash_bag_count: {
    method: 'type',
    value: '1'
  },
  trash_picker_count: {
    method: 'type',
    value: '1'
  }
};
