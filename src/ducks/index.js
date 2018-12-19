import { immutableReducer } from 'redux-oidc';

export const oidc = immutableReducer;
export { default as event } from './event';
export { default as report } from './report';
export { default as notification } from './notification';
export { default as modal } from './modal';
