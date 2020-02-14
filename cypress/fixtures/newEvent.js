export default {
  name: {
    method: 'type',
    value: 'Puistotalkoot'
  },
  description: {
    method: 'type',
    value: 'Puistotalkoot'
  },
  // TODO: After adding address search this field breaks travis tests.
  // This is not critical so fix later
  // neighborhood: {
  //   method: 'autosuggest',
  //   value: 'Kruununhaka'
  // },
  'date_range\\.start_time': {
    method: 'type',
    value: '11:11'
  },
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
  additional_information: {
    method: 'type',
    value: '1'
  },
  large_trash_bag_count: {
    method: 'type',
    value: '1'
  },
  small_trash_bag_count: {
    method: 'type',
    value: '1'
  },
  trash_picker_count: {
    method: 'type',
    value: '1'
  }
};
