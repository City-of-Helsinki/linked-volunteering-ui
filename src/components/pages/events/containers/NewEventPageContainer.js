// @flow
import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { addNotification } from '../../../../ducks/notification';
import eventService from '../../../../services/eventService';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

type Props = {
  pageType: string,
  locale: string
};

export default compose(
  // flowlint-next-line unclear-type:off
  withProps<any, Props>((props: any) => ({
    pageType: 'new',
    locale: props.match.params.locale
  })),
  connect(
    null,
    { addNotification }
  ),
  withHandlers({
    onSubmit: ({ history, locale, addNotification: notify }) => async values => {
      await eventService.create(values);
      history.push(`/${locale}/event/submitted`);
      notify({ color: 'success', message: 'notification.form.event.created' });
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
