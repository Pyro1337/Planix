import { createSlice } from "@reduxjs/toolkit";

const miembroSlice = createSlice({
  name: "miembro",
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
  reducers: {
    setEspaciosTrabajos: (state, { payload = [] }) => {
      state.espaciosTrabajos = payload;
    },
  },
});

export const miembroActions = miembroSlice.actions;
export const miembroReducer = miembroSlice.reducer;
