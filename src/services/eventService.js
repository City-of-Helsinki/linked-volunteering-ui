// @flow
import type { Event } from '../types/event';

export default {
  submit: async (event: Event): Promise<void> => {
    console.debug(event);
  }
};
