import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface listingState {
  error: null;
  loading: boolean;
}

const initialState: listingState = {
  error: null,
  loading: false, //Pending
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    startGetListing: (state) => {
      state.loading = true;
    },
    getListingSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    getListingFailure: (state, action: PayloadAction<null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  startGetListing,
  getListingSuccess,
  getListingFailure
} = listingSlice.actions;

export default listingSlice.reducer;
