import { Map } from 'immutable';
import { get, post } from '../utils/api';

export default {
  create: async event => post('event/', event),
  modify: async event => {
    // eslint-disable-next-line no-console
    console.debug(event);
  },
  getEvents: async () => {
    const payload = await get('event/');
    return {
      payload,
      results: Map(
        payload.results.map(event => {
          const {
            id,
            start_time: startTime,
            end_time: endTime,
            created_at: createdAt,
            modified_at: modifiedAt
          } = event;
          return [
            id,
            {
              ...event,
              start_time: new Date(startTime),
              end_time: new Date(endTime),
              created_at: new Date(createdAt),
              modified_at: new Date(modifiedAt)
            }
          ];
        })
      )
    };
  }
};
