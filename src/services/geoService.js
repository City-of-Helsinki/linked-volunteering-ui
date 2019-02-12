import { get } from '../utils/api';

export default {
  getAddress: async (lat, lon, apiAccessToken) => {
    const payload = await get(`geo_query/?lat=${lat}&lon=${lon}`, null, apiAccessToken);
    return payload.closest_address;
  }
};
