import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { renderIfAuthenticated } from '../../../../utils/container';
import { addNotification } from '../../../../ducks/notification';
import eventService from '../../../../services/eventService';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  renderIfAuthenticated,
  withProps(props => ({
    pageType: 'modify',
    id: props.match.params.id,
    locale: props.match.params.locale
  })),
  connect(
    (state, { id }) => {
      const parsedId = parseInt(id, 10);
      return {
        initialValues: state.event.events.get(parsedId),
        neighborhoods: state.neighborhood.neighborhoods
      };
    },
    { addNotification, getNeighborhoods }
  ),
  withHandlers({
    onSubmit: ({ history, locale, addNotification: notify }) => async values => {
      await eventService.modify(values);
      history.push(`/${locale}/events/manage`);
      notify({ color: 'success', message: 'notification.form.event.modified' });
    }
  }),
  injectIntl,
  withEventForm
)(EventPage);
