import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import geoService from '../../services/geoService';

interface GeoState {
  addressCoordinates: any | null;
  geoData: {
    closest_address: {
      street: any;
      distance: number;
      number: string;
      number_end: string;
      letter: string;
      location: any;
    };
    contract_zone: {
      id: number;
      name: string;
      unavailable_dates?: string[] | null;
    };
  } | null;
}

const initialState: GeoState = {
  addressCoordinates: null,
  geoData: null,
};

export const getGeoData = createAsyncThunk(
  'GET_GEODATA_FROM_COORDINATES',
  async (
    {
      lat,
      long,
      apiAccessToken,
    }: { lat: number; long: number; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      const response = await geoService.getGeoData(lat, long, apiAccessToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCoordinatesByAddress = createAsyncThunk(
  'GET_COORDINATES_BY_ADDRESS',
  async ({ text, lang }: { text: string; lang: string }, { rejectWithValue }) => {
    try {
      const response = await geoService.getCoordinatesByAddress(text, lang);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    clearCoordinatesByAddress: (state) => {
      state.addressCoordinates = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoordinatesByAddress.fulfilled, (state, action: PayloadAction<any>) => {
      state.addressCoordinates = action.payload;
    });
    builder.addCase(getGeoData.fulfilled, (state, action: PayloadAction<any>) => {
      state.geoData = action.payload;
    });
  },
  selectors: {
    addressCoordinatesSelector: (state) => state.addressCoordinates,
    selectedAddressSelector: (state) => state.geoData?.closest_address,
    selectedContractZoneSelector: (state) => state.geoData?.contract_zone,
    unavailableDatesSelector: (state) => state.geoData?.contract_zone.unavailable_dates,
  },
});

export const { clearCoordinatesByAddress } = geoSlice.actions;
export const {
  addressCoordinatesSelector,
  selectedAddressSelector,
  selectedContractZoneSelector,
  unavailableDatesSelector,
} = geoSlice.selectors;

export default geoSlice.reducer;
