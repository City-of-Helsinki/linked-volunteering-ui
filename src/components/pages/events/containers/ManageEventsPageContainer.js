import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  getEvents,
  publishEvent,
  setFilterByNeighborhood,
  setOrderBy
} from '../../../../ducks/event';
import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { addNotification } from '../../../../ducks/notification';
import { openModal } from '../../../../ducks/modal';
import ManageEventsPage from '../ManageEventsPage';
import { renderIfAuthenticated, orderBy } from '../../../../utils/container';

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
      ordering: state.event.ordering,
      neighborhoods: state.neighborhood.neighborhoods
    }),
    {
      getNeighborhoods,
      getEvents,
      publishEvent,
      setFilterByNeighborhood,
      addNotification,
      openModal,
      setOrderBy
    }
  ),
  orderBy('events'),
  withHandlers({
    remove: ({ openModal: showModal }) => event => {
      showModal('confirmRemoval', event);
    },
    approve: ({ addNotification: notify, publishEvent: publish }) => event => {
      publish(event);
      notify({
        color: 'success',
        message: 'notification.manage_events.approve',
        values: { name: event.name }
      });
    }
  })
)(ManageEventsPage);
