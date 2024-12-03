import * as yup from 'yup';
import { Event } from '../../store/reducers/event';

export const defaultValues: Event = {
  id: 0,
  state: 'waiting_for_approval',
  name: '',
  description: '',
  start_time: undefined,
  end_time: undefined,
  location: undefined,
  organizer_first_name: '',
  organizer_last_name: '',
  organizer_email: '',
  organizer_phone: '',
  estimated_attendee_count: undefined,
  targets: '',
  maintenance_location: '',
  additional_information: '',
  large_trash_bag_count: undefined,
  small_trash_bag_count: undefined,
  trash_picker_count: undefined,
};

const phoneRegex = /[0-9 +()]{6,19}/;

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  start_time: yup.date().nullable().required(),
  end_time: yup
    .date()
    .nullable()
    .when('start_time', (st) => {
      return st
        ? yup.date().min(st, 'form.validation.date.endtime')
        : yup.date().nullable().required();
    }),
  location: yup
    .object()
    .shape({
      type: yup.string().required(),
      coordinates: yup.array().of(yup.number()),
    })
    .required(),
  organizer_first_name: yup.string().required(),
  organizer_last_name: yup.string().required(),
  organizer_email: yup.string().required().email(),
  organizer_phone: yup
    .string()
    .required()
    .matches(phoneRegex, { message: 'form.validation.string.phone' }),
  estimated_attendee_count: yup
    .number()
    .positive('form.validation.number.positive')
    .required('form.validation.mixed.not.number'),
  targets: yup.string().required(),
  maintenance_location: yup.string().required(),
  additional_information: yup.string(),
  small_trash_bag_count: yup
    .number()
    .min(0, 'form.validation.number.positive_or_zero')
    .required('form.validation.mixed.not.number'),
  large_trash_bag_count: yup
    .number()
    .min(0, 'form.validation.number.positive_or_zero')
    .required('form.validation.mixed.not.number'),
  trash_picker_count: yup
    .number()
    .min(0, 'form.validation.number.positive_or_zero')
    .max(50, 'form.validation.number.max')
    .required('form.validation.mixed.not.number'),
});

export default defaultValues;
