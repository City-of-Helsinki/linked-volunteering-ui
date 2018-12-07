import { injectIntl } from 'react-intl';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import eventService from '../../../../services/eventService';
import { withEventForm } from '../../../form/withForm';
import EventPage from '../EventPage';

export default compose(
  withProps(props => ({
    pageType: 'modify',
    id: props.match.params.id,
    locale: props.match.params.locale
  })),
  withHandlers({
    onSubmit: ({ history, locale }) => async values => {
      await eventService.modify(values);
      history.push(`/${locale}/events`);
    }
  }),
  connect(
    (state, { id }) => ({
      initialValues: state.event.events.results.get(id)
    }),
    {}
  ),
  injectIntl,
  withEventForm
)(EventPage);
