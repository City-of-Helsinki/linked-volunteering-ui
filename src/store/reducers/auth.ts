import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import authService from '../../services/authService';

interface CurrentUserData {
  is_official: boolean;
  is_contractor: boolean;
}

interface AuthState {
  currentUserData: CurrentUserData | null;
}

const initialState: AuthState = {
  currentUserData: null,
};

export const getCurrentUserData = createAsyncThunk(
  'GET_CURRENT_USER_DATA',
  async (apiAccessToken: string | undefined, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_MOCK_USER === 'true') {
        return {
          uuid: uuid(),
          first_name: 'Gaylord',
          last_name: 'Lohiposki',
          is_official: true,
          is_contractor: false,
        };
      }

      const response = await authService.getCurrentUserData(apiAccessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCurrentUserData.fulfilled,
      (state, action: PayloadAction<CurrentUserData>) => {
        state.currentUserData = action.payload;
      },
    );
  },
  selectors: {
    currentUserDataSelector: (state) => state.currentUserData,
    isOfficialSelector: (state) => state.currentUserData?.is_official,
    isContractorSelector: (state) => state.currentUserData?.is_contractor,
  },
});

export const { currentUserDataSelector, isOfficialSelector, isContractorSelector } =
  authSlice.selectors;

export default authSlice.reducer;
