// @flow
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getEvents } from '../../../../ducks/event';
import { addNotification } from '../../../../ducks/notification';
import { openModal } from '../../../../ducks/modal';
import ManageEventsPage from '../ManageEventsPage';
import type { Store } from '../../../../types/redux';

export default compose(
  connect(
    (state: Store) => ({
      events: state.event.events
    }),
    { getEvents, addNotification, openModal }
  ),
  withHandlers({
    remove: ({ openModal: showModal }) => event => {
      showModal('confirmRemoval', event);
    },
    approve: ({ addNotification: notify }) => event => {
      notify({
        color: 'success',
        message: 'notification.manage_events.approve',
        values: { name: event.name }
      });
    }
  })
)(ManageEventsPage);
