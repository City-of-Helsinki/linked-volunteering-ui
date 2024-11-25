import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

interface Notification {
  color: string;
  message: string;
  values?: any;
}

interface NotificationsState {
  notifications: Record<string, Notification>;
}

const initialState: NotificationsState = {
  notifications: {},
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications[uuid()] = action.payload;
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      delete state.notifications[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.error,
      (state) => {
        state.notifications[uuid()] = {
          color: 'danger',
          message: 'notification.generic.error',
        };
      },
    );
  },
  selectors: {
    notificationsSelector: (state) => state.notifications,
  },
});

export const { notificationsSelector } = notificationsSlice.selectors;
export const { addNotification, dismissNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
