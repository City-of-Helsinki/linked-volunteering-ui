import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getEvents } from '../../../../ducks/event';
import EventsPage from '../EventsPage';

export default compose(
  connect(
    state => ({
      events: state.event.events
    }),
    { getEvents }
  )
)(EventsPage);
