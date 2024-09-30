import { createSlice } from "@reduxjs/toolkit";

const tableroSlice = createSlice({
  name: "tablero",
  initialState: {
    tableros: ["aa", "bb", "cc"],
    tablerosLoading: false,
  },
  reducers: {
    getTableros: (state, payload = {}) => {
      state.tablerosLoading = true;
    },
  },
});

export const tableroActions = tableroSlice.actions;
export const tableroReducer = tableroSlice.reducer;
