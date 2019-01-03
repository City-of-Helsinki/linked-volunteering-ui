import { Map } from 'immutable';
import { get, post, put, patch } from '../utils/api';

const publishedState = 'approved';

const constructEvent = event => {
  const {
    start_time: startTime,
    end_time: endTime,
    created_at: createdAt,
    modified_at: modifiedAt
  } = event;
  return {
    ...event,
    start_time: new Date(startTime),
    end_time: new Date(endTime),
    created_at: new Date(createdAt),
    modified_at: new Date(modifiedAt)
  };
};

export default {
  create: async event => {
    const e = await post('event/', event);
    return constructEvent(e);
  },
  modify: async event => {
    const e = await put(`event/${event.id}/`, event);
    return constructEvent(e);
  },
  publish: async event => {
    const e = await patch(`event/${event.id}/`, {
      state: publishedState
    });
    return constructEvent(e);
  },
  getEvents: async () => {
    const payload = await get('event/');
    return {
      payload,
      results: Map(payload.results.map(event => [event.id, constructEvent(event)]))
    };
  }
};
