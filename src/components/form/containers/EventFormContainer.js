import { withFormik } from 'formik';
import event, { validationSchema } from '../../../entities/event';
import EventForm from '../EventForm';

export default withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: (values, { setSubmitting }) => {
    console.debug(values);
    setSubmitting(false);
  },
  displayName: 'EventForm'
})(EventForm);
