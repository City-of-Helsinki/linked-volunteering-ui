import axios from 'axios';

const { REACT_APP_GEOCODER_API_URL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_GEOCODER_API_URL,
  timeout: 15000
});

// eslint-disable-next-line import/prefer-default-export
export const get = (endPoint, params = {}) => instance.get(endPoint, { params }).then(r => r.data);
