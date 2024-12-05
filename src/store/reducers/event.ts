import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import urlParse from 'url-parse';
import eventService from '../../services/eventService';
import ordering, { Ordering } from '../../utils/entities/ordering';

export interface Event {
  [key: string]: any;
  id: number;
  state: string;
  name: string;
  description: string;
  start_time?: string;
  created_at?: string;
  end_time?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  organizer_first_name: string;
  organizer_last_name: string;
  organizer_email: string;
  organizer_phone: string;
  estimated_attendee_count?: number;
  targets: string;
  maintenance_location: string;
  additional_information: string;
  large_trash_bag_count?: number;
  small_trash_bag_count?: number;
  trash_picker_count?: number;
  contract_zone?: number;
}

interface EventState {
  count: number;
  next: { limit: number };
  events: Record<string, Event>;
  filterByContractZone: number | null;
  ordering: Ordering;
  submittedEvent: Event | null;
}

const initialState: EventState = {
  count: 0,
  next: { limit: 10 },
  events: {},
  filterByContractZone: null,
  ordering,
  submittedEvent: null,
};

export const getEvents = createAsyncThunk(
  'GET_EVENTS',
  async (
    { params, apiAccessToken }: { params: any; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      const response = await eventService.getEvents(params, apiAccessToken);
      const events = response.events.reduce((acc: Record<string, Event>, event: Event) => {
        acc[event.id] = event;
        return acc;
      }, {});
      return { data: response.data, events };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createEvent = createAsyncThunk(
  'SUBMIT_EVENT',
  async (
    { event, apiAccessToken }: { event: Event; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      return await eventService.create(event, apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const modifyEvent = createAsyncThunk(
  'MODIFY_EVENT',
  async (
    { event, apiAccessToken }: { event: Event; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      return await eventService.modify(event, apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const publishEvent = createAsyncThunk(
  'PUBLISH_EVENT',
  async (
    { event, apiAccessToken }: { event: Event; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      return await eventService.publish(event, apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeEvent = createAsyncThunk(
  'REMOVE_EVENT',
  async (
    { event, apiAccessToken }: { event: Event; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      return await eventService.remove(event, apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const filterEvents = (eventState: EventState) => {
  if (eventState.filterByContractZone) {
    const filtered: Record<string, Event> = {};

    Object.keys(eventState.events).forEach((id) => {
      if (eventState.events[id].contract_zone === eventState.filterByContractZone) {
        filtered[id] = eventState.events[id];
      }
    });

    return filtered;
  }

  return eventState.events;
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getEventsFulfilled: (
      state,
      action: PayloadAction<{ data: any; events: Record<string, Event> }>,
    ) => {
      const next = urlParse(action.payload.data.next, true).query;
      state.count = action.payload.data.count;
      state.next = {
        limit: parseInt(next.limit as string, 10) || 10,
      };
      state.ordering = ordering;

      state.events = action.payload.events;
    },
    submitEventFulfilled: (state, action: PayloadAction<Event>) => {
      state.submittedEvent = action.payload;
      state.count += 1;

      state.events[action.payload.id] = action.payload;
    },
    modifyEventFulfilled: (state, action: PayloadAction<Event>) => {
      state.events[action.payload.id] = action.payload;
    },
    publishEventFulfilled: (state, action: PayloadAction<Event>) => {
      state.events[action.payload.id] = action.payload;
    },
    removeEventFulfilled: (state, action: PayloadAction<string>) => {
      delete state.events[action.payload];
    },
    setFilterByContractZone: (state, action: PayloadAction<number>) => {
      state.filterByContractZone = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<Ordering>) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        eventSlice.caseReducers.getEventsFulfilled(state, action);
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        eventSlice.caseReducers.submitEventFulfilled(state, action);
      })
      .addCase(modifyEvent.fulfilled, (state, action) => {
        eventSlice.caseReducers.modifyEventFulfilled(state, action);
      })
      .addCase(publishEvent.fulfilled, (state, action) => {
        eventSlice.caseReducers.publishEventFulfilled(state, action);
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        eventSlice.caseReducers.removeEventFulfilled(state, action);
      });
  },
  selectors: {
    eventsSelector: (state) => filterEvents(state),
    eventByIdSelector: (state, id) => state.events[id],
    nextParamsSelector: (state) => state.next,
    orderingSelector: (state) => state.ordering,
  },
});

export const {
  getEventsFulfilled,
  submitEventFulfilled,
  modifyEventFulfilled,
  publishEventFulfilled,
  removeEventFulfilled,
  setFilterByContractZone,
  setOrderBy,
} = eventSlice.actions;

export const { eventsSelector, eventByIdSelector, nextParamsSelector, orderingSelector } =
  eventSlice.selectors;

export default eventSlice.reducer;
