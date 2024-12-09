import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import contractZonesService from '../services/contractZonesService';
import { ContractZone } from '../types';

interface ContractZonesState {
  contractZones: Record<string, ContractZone>;
}

const initialState: ContractZonesState = {
  contractZones: {},
};

export const getContractZones = createAsyncThunk(
  'GET_CONTRACT_ZONES',
  async (apiAccessToken: string | undefined, { rejectWithValue }) => {
    try {
      const response = await contractZonesService.getContractZones(apiAccessToken);

      const contractZones = response.results.reduce(
        (acc: Record<string, ContractZone>, zone: ContractZone) => {
          acc[zone.id] = zone;
          return acc;
        },
        {},
      );

      return { results: contractZones };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const contractZonesSlice = createSlice({
  name: 'contractZones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getContractZones.fulfilled,
      (state, action: PayloadAction<{ results: Record<string, ContractZone> }>) => {
        state.contractZones = action.payload.results;
      },
    );
  },
  selectors: {
    contractZonesSelector: (state) => state.contractZones,
  },
});

export const { contractZonesSelector } = contractZonesSlice.selectors;

export default contractZonesSlice.reducer;
