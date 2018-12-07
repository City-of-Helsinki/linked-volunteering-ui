import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';

import eventService from '../../../../services/eventService';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  withProps(props => ({
    pageType: 'new',
    locale: props.match.params.locale
  })),
  withHandlers({
    onSubmit: ({ history, locale }) => async values => {
      await eventService.create(values);
      history.push(`/${locale}/event/submitted`);
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
