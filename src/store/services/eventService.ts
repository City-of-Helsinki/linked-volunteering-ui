import { Map } from 'immutable';
import { get, post, put, patch, remove } from '../../utils/api';
import { Event } from '../types';

const publishedState = 'approved';

const constructEvent = (event: Event) => {
  const {
    start_time: startTime,
    end_time: endTime,
    created_at: createdAt,
    modified_at: modifiedAt,
  } = event;
  return {
    ...event,
    start_time: new Date(`${startTime}`),
    end_time: new Date(`${endTime}`),
    created_at: new Date(`${createdAt}`),
    modified_at: new Date(`${modifiedAt}`),
  };
};

export default {
  create: async (event: Event, apiAccessToken: string | undefined) => {
    const e = await post(
      'event/',
      {
        ...event,
        location: {
          type: 'Point',
          coordinates: [event.location?.coordinates[0], event.location?.coordinates[1]],
        },
      },
      apiAccessToken,
    );
    return constructEvent(e);
  },
  modify: async (event: Event, apiAccessToken: string | undefined) => {
    const e = await put(`event/${event.id}/`, event, apiAccessToken);
    return constructEvent(e);
  },
  publish: async (event: Event, apiAccessToken: string | undefined) => {
    const e = await patch(
      `event/${event.id}/`,
      {
        state: publishedState,
      },
      apiAccessToken,
    );
    return constructEvent(e);
  },
  remove: async (event: Event, apiAccessToken: string | undefined) => {
    await remove(`event/${event.id}/`, apiAccessToken);
    return event.id;
  },
  getEvents: async (params: object, apiAccessToken: string | undefined) => {
    const data = await get('event/', params, apiAccessToken);
    return {
      data,
      events: Map<string, Event>(
        data.results.map((event: Event) => [event.id, constructEvent(event)]),
      ),
    };
  },
};
