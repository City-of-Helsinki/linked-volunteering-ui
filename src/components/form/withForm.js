import { withFormik } from 'formik';
import event, { validationSchema } from '../../entities/event';

export const withEventForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: ({ initialValues }) => initialValues || event,
  handleSubmit: async (values, { setSubmitting, props: { onSubmit } }) => {
    await onSubmit(values);
    setSubmitting(false);
  },
  displayName: 'EventForm'
});

export const withReportForm = withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: (values, { setSubmitting }) => {
    console.debug(values);
    setSubmitting(false);
  },
  displayName: 'ReportForm'
});
