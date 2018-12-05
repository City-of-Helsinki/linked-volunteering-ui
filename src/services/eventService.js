// @flow
import type { Event } from '../types/event';
import eventsData from '../../api/events.json';

export default {
  submit: async (event: Event): Promise<void> => {
    console.debug(event);
  },
  getEvents: async (): Promise<Event> => eventsData
};
