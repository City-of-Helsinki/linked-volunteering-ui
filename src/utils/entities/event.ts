import * as yup from 'yup';
import { Event } from '../../store/types';

export const defaultValues: Event = {
  id: 0,
  state: 'waiting_for_approval',
  name: '',
  description: '',
  start_time: '',
  end_time: '',
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
  captchaToken: '',
};

const phoneRegex = /[0-9 +()]{6,19}/;

const VALIDATION_NUMBER_POSITIVE = 'form.validation.number.positive_or_zero';
const VALIDATION_NOT_NUMBER = 'form.validation.mixed.not.number';

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
    .positive('form.validation.number.positive_or_zero')
    .required(VALIDATION_NOT_NUMBER),
  targets: yup.string().required(),
  maintenance_location: yup.string().required(),
  additional_information: yup.string(),
  small_trash_bag_count: yup
    .number()
    .min(0, VALIDATION_NUMBER_POSITIVE)
    .required(VALIDATION_NOT_NUMBER),
  large_trash_bag_count: yup
    .number()
    .min(0, VALIDATION_NUMBER_POSITIVE)
    .required(VALIDATION_NOT_NUMBER),
  trash_picker_count: yup
    .number()
    .min(0, VALIDATION_NUMBER_POSITIVE)
    .max(50, 'form.validation.number.max')
    .required(VALIDATION_NOT_NUMBER),
  captchaToken: yup
    .string()
    // TODO: Disabled until new captcha provider chosen
    // .required('form.validation.captcha.required'),
});

export default defaultValues;
