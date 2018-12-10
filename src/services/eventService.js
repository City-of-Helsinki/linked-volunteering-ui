// @flow
import type { Event } from '../types/event';
import eventsData from './mockEvents.json';

export default {
  submit: async (event: Event): Promise<void> => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  getEvents: async (): Promise<Event> => eventsData
};
