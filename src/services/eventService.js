// @flow
import type { Event } from '../types/event';
import eventsData from './mockEvents.json';

export default {
  submit: async (event: Event): Promise<void> => {
    console.debug(event);
  },
  getEvents: async (): Promise<Event> => eventsData
};
