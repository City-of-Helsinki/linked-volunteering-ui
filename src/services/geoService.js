import { get } from '../utils/api';

export default {
  getAddress: async (lat, lon) => {
    const payload = await get(`geo_query/?lat=${lat}&lon=${lon}`);
    return payload.closest_address;
  }
};
