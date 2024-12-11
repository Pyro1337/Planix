import { createSlice } from "@reduxjs/toolkit";

const miembroSlice = createSlice({
  name: "miembro",
  initialState: {
    miembros: [],
    //
    miembro_logueado: null,
  },
  reducers: {
    setMiembros: (state, { payload = [] }) => {
      state.miembros = payload;
    },
    addMiembro: (state, { payload }) => {
      const miembroCopy = state.miembros.find(
        (m) => m.username === payload.username
      );
      if (miembroCopy) return;
      state.miembros.push(payload);
    },
    //
    setMiembroLogueado: (state, { payload }) => {
      state.miembro_logueado = payload;
    },
  },
});

export const miembroActions = miembroSlice.actions;
export const miembroReducer = miembroSlice.reducer;
