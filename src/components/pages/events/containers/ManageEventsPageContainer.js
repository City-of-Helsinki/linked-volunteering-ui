import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getEvents, setFilterByNeighborhood } from '../../../../ducks/event';
import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { addNotification } from '../../../../ducks/notification';
import { openModal } from '../../../../ducks/modal';
import ManageEventsPage from '../ManageEventsPage';
import { renderIfAuthenticated } from '../../../../utils/container';

const filterEvents = eventState => {
  if (eventState.filterByNeighborhood) {
    return eventState.events.filter(event => event.ocd_id === eventState.filterByNeighborhood);
  }

  return eventState.events;
};

export default compose(
  renderIfAuthenticated,
  connect(
    state => ({
      events: filterEvents(state.event),
      neighborhoods: state.neighborhood.neighborhoods
    }),
    { getNeighborhoods, getEvents, setFilterByNeighborhood, addNotification, openModal }
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
