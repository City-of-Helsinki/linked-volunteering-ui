import { thunk } from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import contractZones from './reducers/contractZones';
import event from './reducers/event';
import notifications from './reducers/notifications';
import modal from './reducers/modal';
import geo from './reducers/geo';
import report from './reducers/report';

const middlewares = [thunk, promiseMiddleware];
const rootReducer = combineReducers({
  auth,
  contractZones,
  event,
  geo,
  modal,
  notifications,
  report,
});

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({ serializableCheck: false }).concat(...middlewares),
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
