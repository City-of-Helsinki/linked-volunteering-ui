import * as yup from 'yup';

export const defaultValues = {
  id: 0,
  state: 'waiting_for_approval',
  name: '',
  description: '',
  area: '',
  start_time: null,
  end_time: null,
  location: {
    type: 'Point',
    coordinates: []
  },
  organizer_first_name: '',
  organizer_last_name: '',
  organizer_email: '',
  organizer_phone: '',
  estimated_attendee_count: '',
  targets: '',
  maintenance_location: '',
  additional_information: '',
  trash_bag_count: '',
  trash_picker_count: '',
  has_roll_off_dumpster: false
};

const phoneRegex = /[0-9 +()]{6,19}/;

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  area: yup.string(),
  start_time: yup
    .date()
    .nullable()
    .required(),
  end_time: yup
    .date()
    .nullable()
    .required(),
  location: yup.object().shape({
    type: yup.string().required(),
    coordinates: yup.array().of(yup.number())
  }),
  organizer_first_name: yup.string().required(),
  organizer_last_name: yup.string().required(),
  organizer_email: yup
    .string()
    .required()
    .email(),
  organizer_phone: yup
    .string()
    .required()
    .matches(phoneRegex),
  estimated_attendee_count: yup.number().required(),
  targets: yup.string().required(),
  maintenance_location: yup.string().required(),
  additional_information: yup.string(),
  trash_bag_count: yup.number().required(),
  trash_picker_count: yup.number().required(),
  has_roll_off_dumpster: yup.boolean()
});

export default defaultValues;
