import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: false,
  },
  reducers: {
    setToken: (state, payload = {}) => {
      state.token = payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
