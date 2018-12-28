import { Record, Map } from 'immutable';
import { createAction } from 'redux-actions';
import eventService from '../services/eventService';
import ordering from '../entities/ordering';

const defaultState = Record({
  count: 0,
  next: null,
  previous: null,
  events: Map(),
  filterByNeighborhood: null,
  ordering: ordering()
});

export const getEvents = createAction('GET_EVENTS', eventService.getEvents);
export const submitEvent = createAction('SUBMIT_EVENT', eventService.create);
export const setFilterByNeighborhood = createAction('SET_EVENT_FILTER');
export const setOrderBy = createAction('SET_EVENT_ORDER_BY');

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
    case 'SET_EVENT_ORDER_BY':
      return state
        .setIn(['ordering', 'key'], payload.key)
        .setIn(['ordering', 'order'], payload.order);
    default:
      return state;
  }
};
