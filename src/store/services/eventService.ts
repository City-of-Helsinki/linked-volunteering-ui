import { Map } from 'immutable';
import { get, post, put, patch, remove } from '../../utils/api';
import { Event } from '../types';

const publishedState = 'approved';

export default {
  create: async (event: Event, apiAccessToken: string | undefined) => {
    const newEvent = await post(
      'event/',
      {
        ...event,
        location: {
          type: 'Point',
          coordinates: [
            event.location?.coordinates[0],
            event.location?.coordinates[1],
          ],
        },
      },
      apiAccessToken
    );
    return newEvent;
  },
  modify: async (event: Event, apiAccessToken: string | undefined) => {
    const modifiedEvent = await put(
      `event/${event.id}/`,
      event,
      apiAccessToken
    );
    return modifiedEvent;
  },
  publish: async (event: Event, apiAccessToken: string | undefined) => {
    const publishedEvent = await patch(
      `event/${event.id}/`,
      {
        state: publishedState,
      },
      apiAccessToken
    );
    return publishedEvent;
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
        data.results.map((event: Event) => [event.id, event])
      ),
    };
  },
};
