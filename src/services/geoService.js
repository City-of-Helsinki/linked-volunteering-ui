import { get } from '../utils/api';

export default {
  getCoordinatesByAddress: async (text, lang) => {
    const payload = await get(`address_search/?text=${text}&lang=${lang}`, null);
    return payload;
  },
  getGeoData: async (lat, lon, apiAccessToken) => {
    const payload = await get(`geo_query/?lat=${lat}&lon=${lon}`, null, apiAccessToken);
    return payload;
  },
};
