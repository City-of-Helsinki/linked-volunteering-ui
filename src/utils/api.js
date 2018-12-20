// @flow
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const instance = axios.create({
  // flowlint-next-line sketchy-null-string:off
  baseURL: `${REACT_APP_API_URL || '/'}v1/`,
  timeout: 3000
});

// flowlint-next-line unclear-type:off
export const get = (endPoint: string, params: Object = {}): Promise<any> =>
  instance.get(endPoint, { params }).then(r => r.data);

// flowlint-next-line unclear-type:off
export const post = (endPoint: string, data: Object = {}): Promise<any> =>
  instance.post(endPoint, data).then(r => r.data);
