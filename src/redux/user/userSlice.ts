import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  currentUser: null;
  error: null;
  loading: boolean;
}

const initialState: userState = {
  currentUser: null,
  error: null,
  loading: false, //Pending
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<null>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action: PayloadAction<null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutStart: (state) => {
      state.loading = true

    },
    logOutEnd: (state) => {
      state.currentUser = null;
      state.loading = false
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action: PayloadAction<null>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    userUpdateFailure: (state, action: PayloadAction<null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logOutStart,
  logOutEnd,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
} = userSlice.actions;

export default userSlice.reducer;
