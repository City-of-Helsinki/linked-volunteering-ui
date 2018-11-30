// @flow
import * as Yup from 'yup';

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

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  area: Yup.string().required(),
  startdate: Yup.string()
    .required()
    .matches(dateRegex),
  starttime: Yup.string()
    .required()
    .matches(timeRegex),
  enddate: Yup.string()
    .required()
    .matches(dateRegex),
  endtime: Yup.string()
    .required()
    .matches(timeRegex),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string()
    .required()
    .email(),
  phone: Yup.string()
    .required()
    .matches(phoneRege),
  show_contact_details: Yup.boolean(),
  amount_of_volunteers: Yup.number().required(),
  cleaning_targets: Yup.string().required(),
  trash_location: Yup.string().required(),
  details: Yup.string(),
  container: Yup.boolean(),
  trash_bags: Yup.number().required(),
  trash_pickers: Yup.number().required(),
  visibility: Yup.string().required(),
  free: Yup.boolean(),
  fee: Yup.number()
});

export default defaultValues;
