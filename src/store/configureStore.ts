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

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(...middlewares),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
