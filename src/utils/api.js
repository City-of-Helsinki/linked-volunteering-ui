import * as Sentry from '@sentry/browser';

import { REACT_APP_API_URL } from './environment';

const BASE_URL = `${REACT_APP_API_URL || '/'}/v1/`;
const TIMEOUT = 15000;

const fetchWithTimeout = async (resource, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

const securityHeader = (apiAccessToken) =>
  apiAccessToken ? { Authorization: `Bearer ${apiAccessToken}` } : {};

const createUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  return url;
};

const request = async (
  method,
  endpoint,
  { params = {}, data = null, apiAccessToken } = {}
) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...securityHeader(apiAccessToken),
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  return fetchWithTimeout(createUrl(endpoint, params), options);
};

export const get = (endpoint, params, apiAccessToken) =>
  request('GET', endpoint, { params, apiAccessToken });
export const post = (endpoint, data, apiAccessToken) =>
  request('POST', endpoint, { data, apiAccessToken });
export const put = (endpoint, data, apiAccessToken) =>
  request('PUT', endpoint, { data, apiAccessToken });
export const patch = (endpoint, data, apiAccessToken) =>
  request('PATCH', endpoint, { data, apiAccessToken });
export const remove = (endpoint, apiAccessToken) =>
  request('DELETE', endpoint, { apiAccessToken });
