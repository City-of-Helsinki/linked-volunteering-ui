import { withFormik } from 'formik';
import event, { validationSchema } from '../../entities/event';

// eslint-disable-next-line import/prefer-default-export
export const withEventForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: async (values, { setSubmitting, props: { submit } }) => {
    await submit(values);
    setSubmitting(false);
  },
  displayName: 'EventForm'
});
