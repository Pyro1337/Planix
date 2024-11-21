import { createSlice } from "@reduxjs/toolkit";

const espacioTrabajoSlice = createSlice({
  name: "espacioTrabajo",
  initialState: {
    espaciosTrabajos: [],
    //
    espacioTrabajo: null,
  },
  reducers: {
    setEspaciosTrabajos: (state, { payload = [] }) => {
      state.espaciosTrabajos = payload;
    },
    addEspacioTrabajo: (state, { payload }) => {
      state.espaciosTrabajos.push(payload);
    },
    //
    setEspacioTrabajo: (state, { payload }) => {
      state.espacioTrabajo = payload;
    },
    addTablero: (state, { payload }) => {
      state.espacioTrabajo.tableros.push(payload);
      state.espaciosTrabajos.map((espacioTrabajo) => {
        if (espacioTrabajo.id === state.espacioTrabajo.id) {
          espacioTrabajo.tableros = state.espacioTrabajo.tableros;
        }
      });
    },
  },
});

export const espacioTrabajoActions = espacioTrabajoSlice.actions;
export const espacioTrabajoReducer = espacioTrabajoSlice.reducer;
