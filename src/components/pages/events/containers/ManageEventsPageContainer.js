import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import {
  getEvents,
  publishEvent,
  setFilterByContractZone,
  setOrderBy
} from '../../../../ducks/event';
import { getNeighborhoods } from '../../../../ducks/neighborhood';
import { getContractZones } from '../../../../ducks/contractZones';
import { addNotification } from '../../../../ducks/notification';
import { openModal } from '../../../../ducks/modal';
import ManageEventsPage from '../ManageEventsPage';
import { renderIfAuthenticated, orderBy } from '../../../../utils/container';

const filterEvents = eventState => {
  if (eventState.filterByContractZone) {
    return eventState.events.filter(
      event => event.contract_zone === eventState.filterByContractZone
    );
  }

  return eventState.events;
};

export default compose(
  renderIfAuthenticated,
  connect(
    state => ({
      events: filterEvents(state.event),
      nextParams: state.event.next,
      ordering: state.event.ordering,
      neighborhoods: state.neighborhood.neighborhoods,
      contractZones: state.contractZones.contractZones,
      apiAccessToken: state.auth.apiAccessToken
    }),
    {
      getNeighborhoods,
      getContractZones,
      getEvents,
      publishEvent,
      setFilterByContractZone,
      addNotification,
      openModal,
      setOrderBy
    }
  ),
  orderBy('events'),
  withHandlers({
    remove: ({ openModal: showModal, apiAccessToken }) => event => {
      showModal('confirmRemoval', event, apiAccessToken);
    },
    approve: ({ addNotification: notify, publishEvent: publish, apiAccessToken }) => event => {
      publish(event, apiAccessToken);
      notify({
        color: 'success',
        message: 'notification.manage_events.approve',
        values: { name: event.name }
      });
    }
  })
)(ManageEventsPage);
