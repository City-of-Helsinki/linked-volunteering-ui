import { get } from '../../utils/api';

export default {
  getCoordinatesByAddress: async (text: string, lang: string) => {
    return get(`address_search/?text=${text}&lang=${lang}`, {});
  },
  getGeoData: async (lat: number, lon: number, apiAccessToken: string | undefined) => {
    return get(`geo_query/?lat=${lat}&lon=${lon}`, {}, apiAccessToken);
  },
};
