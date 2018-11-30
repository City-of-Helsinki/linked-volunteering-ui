// @flow
import * as yup from 'yup';

export const defaultValues = {
  name: '',
  description: '',
  area: '',
  startdate: '',
  starttime: '',
  enddate: '',
  endtime: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  show_contact_details: false,
  amount_of_volunteers: '',
  cleaning_targets: '',
  trash_location: '',
  details: '',
  container: false,
  trash_bags: '',
  trash_pickers: '',
  visibility: '',
  free: false,
  fee: ''
};

const dateRegex = /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}/;
const timeRegex = /[0-9]{2}:[0-9]{2}/;
const phoneRege = /[0-9 +()]{6,19}/;

export const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  area: yup.string().required(),
  startdate: yup
    .string()
    .required()
    .matches(dateRegex),
  starttime: yup
    .string()
    .required()
    .matches(timeRegex),
  enddate: yup
    .string()
    .required()
    .matches(dateRegex),
  endtime: yup
    .string()
    .required()
    .matches(timeRegex),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup
    .string()
    .required()
    .email(),
  phone: yup
    .string()
    .required()
    .matches(phoneRege),
  show_contact_details: yup.boolean(),
  amount_of_volunteers: yup.number().required(),
  cleaning_targets: yup.string().required(),
  trash_location: yup.string().required(),
  details: yup.string(),
  container: yup.boolean(),
  trash_bags: yup.number().required(),
  trash_pickers: yup.number().required(),
  visibility: yup.string().required(),
  free: yup.boolean(),
  fee: yup.number().when('free', {
    is: true,
    then: yup.number(),
    otherwise: yup.number().required()
  })
});

export default defaultValues;
