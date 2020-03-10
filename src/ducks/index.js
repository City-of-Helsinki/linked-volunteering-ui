import immutable from 'immutable';
import { createImmutableReducer } from 'redux-oidc';

export const oidc = createImmutableReducer(immutable);
export { default as auth } from './auth';
export { default as event } from './event';
export { default as geo } from './geo';
export { default as contractZones } from './contractZones';
export { default as report } from './report';
export { default as notification } from './notification';
export { default as modal } from './modal';
