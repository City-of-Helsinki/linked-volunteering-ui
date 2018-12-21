// @flow
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getEvents, setFilterByDistrict } from '../../../../ducks/event';
import { getDistricts } from '../../../../ducks/district';
import { addNotification } from '../../../../ducks/notification';
import { openModal } from '../../../../ducks/modal';
import ManageEventsPage from '../ManageEventsPage';
import type { Store } from '../../../../types/redux';

const filterEvents = eventState => {
  if (eventState.filterByDistrict) {
    return eventState.events.filter(event => event.name === eventState.filterByDistrict);
  }

  return eventState.events;
};

export default compose(
  connect(
    (state: Store) => ({
      events: filterEvents(state.event),
      districts: state.district.districts
    }),
    { getDistricts, getEvents, setFilterByDistrict, addNotification, openModal }
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
