import { get } from '../utils/api';

export default {
  getGeoData: async (lat, lon, apiAccessToken) => {
    const payload = await get(`geo_query/?lat=${lat}&lon=${lon}`, null, apiAccessToken);
    return payload;
  }
};
