import { createSlice } from "@reduxjs/toolkit";

const initialColumns = {
  backlog: {
    name: "Backlog",
    items: [],
  },
  enProgreso: {
    name: "En Progreso",
    items: [],
  },
  completado: {
    name: "Completado",
    items: [],
  },
};

const tableroSlice = createSlice({
  name: "tablero",
  initialState: {
    tableros: initialColumns,
  },
  reducers: {
    setTableros: (state, { payload = {} }) => {
      state.tableros = payload;
    },
  },
});

export const tableroActions = tableroSlice.actions;
export const tableroReducer = tableroSlice.reducer;
