// slices/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  address: null
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.address = action.payload.address;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
