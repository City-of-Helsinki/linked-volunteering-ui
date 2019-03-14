import * as yup from 'yup';

export const defaultValues = {
  id: 0,
  state: 'waiting_for_approval',
  name: '',
  description: '',
  neighborhood: '',
  start_time: null,
  end_time: null,
  location: null,
  organizer_first_name: '',
  organizer_last_name: '',
  organizer_email: '',
  organizer_phone: '',
  estimated_attendee_count: '',
  targets: '',
  maintenance_location: '',
  additional_information: '',
  trash_bag_count: '',
  small_trash_bag_count: '',
  trash_picker_count: ''
};

const phoneRegex = /[0-9 +()]{6,19}/;

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  neighborhood: yup.string(),
  start_time: yup
    .date()
    .nullable()
    .required(),
  end_time: yup
    .date()
    .nullable()
    .required(),
  location: yup
    .object()
    .shape({
      type: yup.string().required(),
      coordinates: yup.array().of(yup.number())
    })
    .required(),
  organizer_first_name: yup.string().required(),
  organizer_last_name: yup.string().required(),
  organizer_email: yup
    .string()
    .required()
    .email(),
  organizer_phone: yup
    .string()
    .required()
    .matches(phoneRegex, { message: 'form.validation.string.phone' }),
  estimated_attendee_count: yup
    .number()
    .positive('form.validation.number.positive')
    .required(),
  targets: yup.string().required(),
  maintenance_location: yup.string().required(),
  additional_information: yup.string(),
  small_trash_bag_count: yup.number().required(),
  trash_bag_count: yup
    .number()
    .positive('form.validation.number.positive')
    .required(),
  trash_picker_count: yup
    .number()
    .positive('form.validation.number.positive')
    .required()
});

export default defaultValues;
