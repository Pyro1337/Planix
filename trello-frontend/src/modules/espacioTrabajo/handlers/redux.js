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
      state.espacioTrabajo.tableros.push({
        id:
          state.espacioTrabajo.id + "_" + state.espacioTrabajo.tableros.length,
        nombre: payload,
      });
      state.espaciosTrabajos.map((espacioTrabajo) => {
        if (espacioTrabajo.id === state.espacioTrabajo.id) {
          espacioTrabajo.tableros = state.espacioTrabajo.tableros;
        }
      });
    },
    addMiembro: (state, { payload }) => {
      const miembroCopy = state.espacioTrabajo.miembros.find(
        (m) => m.username === payload.username
      );
      if (miembroCopy) return;
      state.espacioTrabajo.miembros.push(payload);
      state.espaciosTrabajos.map((espacioTrabajo) => {
        if (espacioTrabajo.id === state.espacioTrabajo.id) {
          espacioTrabajo.miembros = state.espacioTrabajo.miembros;
        }
      });
    },
  },
});

export const espacioTrabajoActions = espacioTrabajoSlice.actions;
export const espacioTrabajoReducer = espacioTrabajoSlice.reducer;
