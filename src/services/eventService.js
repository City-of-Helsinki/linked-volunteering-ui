import { get, post } from '../utils/api';

export default {
  create: async event => {
    post('event/', event);
  },
  modify: async event => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  getEvents: async () => get('event/')
};
