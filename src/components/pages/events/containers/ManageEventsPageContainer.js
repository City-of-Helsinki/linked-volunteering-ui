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
      neighborhoods: state.neighborhood.neighborhoods,
      accessToken: state.auth.apiAccessToken
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
    remove: ({ openModal: showModal, accessToken }) => event => {
      showModal('confirmRemoval', event, accessToken);
    },
    approve: ({ addNotification: notify, publishEvent: publish, accessToken }) => event => {
      publish(event, accessToken);
      notify({
        color: 'success',
        message: 'notification.manage_events.approve',
        values: { name: event.name }
      });
    }
  })
)(ManageEventsPage);
