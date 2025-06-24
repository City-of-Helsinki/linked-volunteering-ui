import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import authService from '../services/authService';

interface UserData {
  uuid: string;
  first_name: string;
  last_name: string;
  is_official: boolean;
  is_contractor: boolean;
}

interface AuthState {
  currentUserData: UserData | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  currentUserData: null,
  isLoading: false,
};

export const getCurrentUserData = createAsyncThunk(
  'GET_CURRENT_USER_DATA',
  async (apiAccessToken: string | undefined, { rejectWithValue }) => {
    try {
      return await authService.getCurrentUserData(apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.currentUserData = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getCurrentUserData.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    currentUserDataSelector: (state) => state.currentUserData,
    userLoadingSelector: (state) =>
      isEmpty(state.currentUserData) || state.isLoading,
    isOfficialSelector: (state) => state.currentUserData?.is_official,
    isContractorSelector: (state) => state.currentUserData?.is_contractor,
  },
});

export const {
  currentUserDataSelector,
  userLoadingSelector,
  isOfficialSelector,
  isContractorSelector,
} = authSlice.selectors;

export default authSlice.reducer;
