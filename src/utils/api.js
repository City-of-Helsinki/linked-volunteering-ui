import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const instance = axios.create({
  baseURL: `${REACT_APP_API_URL || '/'}v1/`,
  timeout: 3000
});

export const get = (endPoint, params = {}) => instance.get(endPoint, { params }).then(r => r.data);
export const post = (endPoint, data = {}) => instance.post(endPoint, data).then(r => r.data);
export const put = (endPoint, data = {}) => instance.put(endPoint, data).then(r => r.data);
export const patch = (endPoint, data = {}) => instance.patch(endPoint, data).then(r => r.data);
export const remove = (endPoint, data = {}) => instance.delete(endPoint, data).then(r => r.data);
