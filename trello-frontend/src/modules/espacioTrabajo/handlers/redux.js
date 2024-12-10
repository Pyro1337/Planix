import { createSlice } from "@reduxjs/toolkit";

const espacioTrabajoSlice = createSlice({
  name: "espacioTrabajo",
  initialState: {
    espaciosTrabajos: [],
    espacioTrabajo: null,
  },
  reducers: {
    setEspaciosTrabajos: (state, { payload = [] }) => {
      state.espaciosTrabajos = payload;
    },
    addEspacioTrabajo: (state, { payload }) => {
      state.espaciosTrabajos.push(payload);
    },
    setEspacioTrabajo: (state, { payload }) => {
      state.espacioTrabajo = payload;
    },
    addTablero: (state, { payload }) => {
      state.espacioTrabajo.tableros.push({
        id:
          state.espacioTrabajo.id + "_" + state.espacioTrabajo.tableros.length,
        nombre: payload,
      });
      state.espaciosTrabajos = state.espaciosTrabajos.map((espacioTrabajo) => {
        if (espacioTrabajo.id === state.espacioTrabajo.id) {
          return { ...espacioTrabajo, tableros: state.espacioTrabajo.tableros };
        }
        return espacioTrabajo;
      });
    },
    addMiembro: (state, { payload }) => {
      const miembroCopy = state.espacioTrabajo.miembros.find(
        (m) => m.username === payload.username
      );
      if (miembroCopy) return;
      state.espacioTrabajo.miembros.push(payload);
      state.espaciosTrabajos = state.espaciosTrabajos.map((espacioTrabajo) => {
        if (espacioTrabajo.id === state.espacioTrabajo.id) {
          return { ...espacioTrabajo, miembros: state.espacioTrabajo.miembros };
        }
        return espacioTrabajo;
      });
    },
    updateWorkspaceName: (state, { payload }) => {
      state.espacioTrabajo.nombre = payload;
      state.espaciosTrabajos = state.espaciosTrabajos.map((espacio) => {
        if (espacio.id === state.espacioTrabajo.id) {
          return { ...espacio, nombre: payload };
        }
        return espacio;
      });
    },
    updateTableroName: (state, { payload }) => {
      const { id, nombre } = payload;
      state.espacioTrabajo.tableros = state.espacioTrabajo.tableros.map((tablero) => {
        if (tablero.id === id) {
          return { ...tablero, nombre };
        }
        return tablero;
      });
      state.espaciosTrabajos = state.espaciosTrabajos.map((espacio) => {
        if (espacio.id === state.espacioTrabajo.id) {
          return { ...espacio, tableros: state.espacioTrabajo.tableros };
        }
        return espacio;
      });
    },
    updateTableroName: (state, { payload }) => {
      const { id, nombre } = payload;
      const tablero = state.espacioTrabajo.tableros.find((t) => t.id === id);
    
      if (tablero) {
        tablero.nombre = nombre;
    
        // Actualiza también en espaciosTrabajos para reflejar el cambio en ambos lugares
        const espacioTrabajoIndex = state.espaciosTrabajos.findIndex(
          (et) => et.id === state.espacioTrabajo.id
        );
    
        if (espacioTrabajoIndex !== -1) {
          state.espaciosTrabajos[espacioTrabajoIndex].tableros = [
            ...state.espaciosTrabajos[espacioTrabajoIndex].tableros.map((t) =>
              t.id === id ? { ...t, nombre } : t
            ),
          ];
        }
      }
    },    
  },
});



export const espacioTrabajoActions = espacioTrabajoSlice.actions;
export const espacioTrabajoReducer = espacioTrabajoSlice.reducer;
