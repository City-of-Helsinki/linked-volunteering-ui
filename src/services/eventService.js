// @flow
import type { Event } from '../types/event';
import { get, post } from '../utils/api';

export default {
  create: async (event: Event): Promise<void> => {
    post('event', event);
  },
  modify: async (event: Event): Promise<void> => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  getEvents: async (): Promise<Event> => get('event')
};
