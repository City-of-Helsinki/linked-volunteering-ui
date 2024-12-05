import { get } from '../utils/api';

export default {
  getCoordinatesByAddress: async (text, lang) => {
    return get(`address_search/?text=${text}&lang=${lang}`, null);
  },
  getGeoData: async (lat, lon, apiAccessToken) => {
    return get(`geo_query/?lat=${lat}&lon=${lon}`, null, apiAccessToken);
  },
};
