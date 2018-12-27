import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import eventService from '../services/eventService';

const defaultState = Record({
  count: 0,
  next: null,
  previous: null,
  events: Map(),
  filterByNeighborhood: null
});

export const getEvents = createAction('GET_EVENTS', eventService.getEvents);
export const submitEvent = createAction('SUBMIT_EVENT', eventService.create);
export const setFilterByNeighborhood = createAction('SET_EVENT_FILTER', id => id);

export default (state = defaultState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_EVENTS_FULFILLED':
      return state
        .set('count', payload.count)
        .set('next', payload.next)
        .set('previous', payload.previous)
        .update('events', events => events.merge(payload.results));
    case 'SUBMIT_EVENT_FULFILLED':
      return state.update('count', count => count + 1).setIn(['events', payload.id], payload);
    case 'SET_EVENT_FILTER':
      return state.set('filterByNeighborhood', payload);
    default:
      return state;
  }
};
