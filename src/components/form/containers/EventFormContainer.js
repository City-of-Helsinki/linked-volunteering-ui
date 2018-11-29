import { withFormik } from 'formik';
import event, { validationSchema } from '../../../entities/event';
import EventForm from '../EventForm';

export default withFormik({
  validationSchema,
  validateOnChange: false,
  mapPropsToValues: () => event,
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.debug(values);
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'EventForm'
})(EventForm);
