import { withFormik } from 'formik';
import event, { validationSchema } from '../../entities/event';

export const withEventForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: ({ initialValues }) => initialValues || event,
  handleSubmit: async (values, { setSubmitting, setErrors, props: { onSubmit } }) => {
    try {
      await onSubmit(values);
    } catch ({ response }) {
      const errors = Object.entries(response.data).reduce((acc, [key]) => {
        acc[key] = 'form.validation.generic';
        return acc;
      }, {});
      setErrors(errors);
    } finally {
      setSubmitting(false);
    }
  },
  displayName: 'EventForm'
});

export const withEventFilterForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: ({ initialValues }) => initialValues || event,
  handleSubmit: async (values, { setSubmitting, props: { onSubmit } }) => {
    await onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'EventFilterForm'
});

export const withReportForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: (values, { setSubmitting }) => {
    // eslint-disable-next-line no-console
    console.debug(values);
    setSubmitting(false);
  },
  displayName: 'ReportForm'
});
