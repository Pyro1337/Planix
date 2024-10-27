import { createSlice } from "@reduxjs/toolkit";

const espacioTrabajoSlice = createSlice({
  name: "espacioTrabajo",
  initialState: {
    espaciosTrabajos: [
      {
        id: 1,
        nombre: "Espacio de trabajo 1",
        colorIni: "from-red-500",
        colorFin: "to-orange-500",
      },
      {
        id: 2,
        nombre: "Espacio de trabajo 2",
        colorIni: "from-green-500",
        colorFin: "to-blue-500",
      },
      {
        id: 3,
        nombre: "Espacio de trabajo 3",
        colorIni: "from-yellow-500",
        colorFin: "to-pink-500",
      },
    ],
  },
  reducers: {
    setEspaciosTrabajos: (state, { payload = [] }) => {
      state.espaciosTrabajos = payload;
    },
    addEspacioTrabajo: (state, { payload }) => {
      state.espaciosTrabajos.push(payload);
    },
  },
});

export const espacioTrabajoActions = espacioTrabajoSlice.actions;
export const espacioTrabajoReducer = espacioTrabajoSlice.reducer;
