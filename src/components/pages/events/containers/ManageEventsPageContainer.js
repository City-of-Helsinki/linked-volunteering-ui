import { compose } from 'recompose';
import { connect } from 'react-redux';

import { getEvents } from '../../../../ducks/event';
import { addNotification } from '../../../../ducks/notification';
import ManageEventsPage from '../ManageEventsPage';

export default compose(
  connect(
    state => ({
      events: state.event.events
    }),
    { getEvents, addNotification }
  )
)(ManageEventsPage);
