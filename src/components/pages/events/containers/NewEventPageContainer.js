import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { addNotification } from '../../../../ducks/notification';
import { submitEvent } from '../../../../ducks/event';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  withProps(props => ({
    pageType: 'new',
    locale: props.match.params.locale
  })),
  connect(
    null,
    { addNotification, submitEvent }
  ),
  withHandlers({
    onSubmit: ({
      history,
      locale,
      addNotification: notify,
      submitEvent: submit
    }) => async values => {
      await submit(values);
      await notify({ color: 'success', message: 'notification.form.event.created' });
      history.push(`/${locale}/event/submitted`);
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
