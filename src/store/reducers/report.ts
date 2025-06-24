import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import reportService from '../services/reportService';
import ordering, { Ordering } from '../../utils/entities/ordering';
import { Report } from '../types';

interface ReportState {
  count: number;
  next: string | null;
  previous: string | null;
  reports: Record<string, Report>;
  ordering: Ordering;
}

const initialState: ReportState = {
  count: 0,
  next: null,
  previous: null,
  reports: {},
  ordering,
};

export const getReport = createAsyncThunk(
  'GET_REPORT',
  async (
    {
      year,
      apiAccessToken,
    }: { year: string; apiAccessToken: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const response = await reportService.getReport(year, apiAccessToken);

      const reports = response.results.reduce(
        (acc: Record<string, Report>, report: Report) => {
          acc[report.id] = report;

          return acc;
        },
        {}
      );

      return {
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: reports,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<Ordering>) => {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getReport.fulfilled,
      (
        state,
        action: PayloadAction<{
          count: number;
          next: string | null;
          previous: string | null;
          results: Record<string, Report>;
        }>
      ) => {
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.reports = action.payload.results;
      }
    );
  },
  selectors: {
    reportsSelector: (state) => state.reports,
    orderingSelector: (state) => state.ordering,
  },
});

export const { setOrderBy } = reportSlice.actions;
export const { reportsSelector, orderingSelector } = reportSlice.selectors;

export default reportSlice.reducer;
