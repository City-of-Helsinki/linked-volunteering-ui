import { withFormik } from 'formik';
import event, { validationSchema } from '../../entities/event';

// eslint-disable-next-line import/prefer-default-export
export const withEventForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: (values, { setSubmitting }) => {
    console.debug(values);
    setSubmitting(false);
  },
  displayName: 'EventForm'
});
