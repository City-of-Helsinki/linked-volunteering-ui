import { Map } from 'immutable';
import { get, post, put, patch, remove } from '../utils/api';

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
  create: async (event, apiAccessToken) => {
    const e = await post('event/', event, apiAccessToken);
    return constructEvent(e);
  },
  modify: async (event, apiAccessToken) => {
    const e = await put(`event/${event.id}/`, event, apiAccessToken);
    return constructEvent(e);
  },
  publish: async (event, apiAccessToken) => {
    const e = await patch(
      `event/${event.id}/`,
      {
        state: publishedState
      },
      apiAccessToken
    );
    return constructEvent(e);
  },
  remove: async (event, apiAccessToken) => {
    await remove(`event/${event.id}/`, apiAccessToken);
    return event.id;
  },
  getEvents: async (params, apiAccessToken) => {
    const data = await get('event/', params, apiAccessToken);
    return {
      data,
      events: Map(data.results.map(event => [event.id, constructEvent(event)]))
    };
  }
};
