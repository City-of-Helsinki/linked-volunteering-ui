import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const instance = axios.create({
  baseURL: `${REACT_APP_API_URL || '/'}v1/`,
  timeout: 3000
});

const securityHeader = apiAccessToken =>
  apiAccessToken ? { Authorization: `Bearer ${apiAccessToken}` } : null;

export const get = (endPoint, params = {}, apiAccessToken) =>
  instance.get(endPoint, { params, headers: securityHeader(apiAccessToken) }).then(r => r.data);

export const post = (endPoint, data = {}, apiAccessToken) =>
  instance.post(endPoint, data, { headers: securityHeader(apiAccessToken) }).then(r => r.data);

export const put = (endPoint, data = {}, apiAccessToken) =>
  instance.put(endPoint, data, { headers: securityHeader(apiAccessToken) }).then(r => r.data);

export const patch = (endPoint, data = {}, apiAccessToken) =>
  instance.patch(endPoint, data, { headers: securityHeader(apiAccessToken) }).then(r => r.data);

export const remove = (endPoint, apiAccessToken) =>
  instance.delete(endPoint, { headers: securityHeader(apiAccessToken) }).then(r => r.data);
