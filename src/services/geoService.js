import { get } from '../utils/api';
import { get as geocodingGet } from '../utils/geocodingApi';

export default {
  getCoordinatesByAddress: async (text, lang) => {
    const payload = await geocodingGet(
      `search?text=${text}&lang=${lang}&size=5&layers=address&boundary.rect.min_lat=60.1&boundary.rect.max_lat=60.33&boundary.rect.min_lon=24.73&boundary.rect.max_lon=25.33`,
      null
    );
    return payload;
  },
  getGeoData: async (lat, lon, apiAccessToken) => {
    const payload = await get(`geo_query/?lat=${lat}&lon=${lon}`, null, apiAccessToken);
    return payload;
  }
};
