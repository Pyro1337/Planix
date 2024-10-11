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
      {
        id: 4,
        nombre: "Espacio de trabajo 4",
        colorIni: "from-purple-500",
        colorFin: "to-teal-500",
      },
      {
        id: 5,
        nombre: "Espacio de trabajo 5",
        colorIni: "from-gray-500",
        colorFin: "to-gray-700",
      },
    ],
  },
  reducers: {},
});

export const espacioTrabajoActions = espacioTrabajoSlice.actions;
export const espacioTrabajoReducer = espacioTrabajoSlice.reducer;
