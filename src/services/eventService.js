import eventsData from './events.json';

export default {
  create: async event => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  modify: async event => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  getEvents: async () => eventsData
};
