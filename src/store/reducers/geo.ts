import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import geoService from '../services/geoService';

interface AddressCoordinates {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      name: string;
    };
  }[];
  properties: {};
}

interface GeoData {
  closest_address: {
    street: {
      name: {
        [key: string]: string;
      };
    };
    distance: number;
    number: string;
    number_end: string;
    letter: string;
    location: {
      type: string;
      coordinates: number[];
    };
  };
  contract_zone: {
    id: number;
    name: string;
    unavailable_dates?: string[] | null;
  };
}

interface GeoState {
  addressCoordinates: AddressCoordinates | null;
  geoData: GeoData | null;
}

const initialState: GeoState = {
  addressCoordinates: null,
  geoData: null,
};

export const getGeoData = createAsyncThunk(
  'GET_GEODATA_FROM_COORDINATES',
  async (
    { lat, long, apiAccessToken }: { lat: number; long: number; apiAccessToken: string | undefined },
    { rejectWithValue },
  ) => {
    try {
      return await geoService.getGeoData(lat, long, apiAccessToken);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getCoordinatesByAddress = createAsyncThunk(
  'GET_COORDINATES_BY_ADDRESS',
  async ({ text, lang }: { text: string; lang: string }, { rejectWithValue }) => {
    try {
      return await geoService.getCoordinatesByAddress(text, lang);
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
    builder.addCase(getCoordinatesByAddress.fulfilled, (state, action: PayloadAction<AddressCoordinates>) => {
      state.addressCoordinates = action.payload;
    });
    builder.addCase(getGeoData.fulfilled, (state, action: PayloadAction<GeoData>) => {
      state.geoData = action.payload;
    });
  },
  selectors: {
    addressCoordinatesSelector: (state) => state.addressCoordinates,
    selectedAddressSelector: (state) => state.geoData?.closest_address,
    selectedContractZoneSelector: (state) => state.geoData?.contract_zone,
    unavailableDatesSelector: (state) => state.geoData?.contract_zone?.unavailable_dates,
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
