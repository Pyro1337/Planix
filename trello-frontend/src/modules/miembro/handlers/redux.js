import { createSlice } from "@reduxjs/toolkit";

const miembroSlice = createSlice({
  name: "miembro",
  initialState: {
    miembros: [
      {
        nombre: "Lucas Goncalvez",
        username: "@lucasgoncalvez",
        actividad: "Última actividad: August 2024",
        tableros: 2,
        estado: "Administrador",
      },
      {
        nombre: "Ivan Sánchez",
        username: "@ivansanlafuria",
        actividad: "No hay actividad reciente",
        tableros: 0,
        estado: "Pendiente",
      },
      {
        nombre: "Eric Amarilla",
        username: "@ericamarilla",
        actividad: "No hay actividad reciente",
        tableros: 1,
        estado: "Colaborador",
      },
      {
        nombre: "María Estefanía Aranda",
        username: "@mariaaranda",
        actividad: "No hay actividad reciente",
        tableros: 1,
        estado: "Colaborador",
      },
      {
        nombre: "Julián Esteban Cerdá",
        username: "@juliancerda",
        actividad: "No hay actividad reciente",
        tableros: 0,
        estado: "Colaborador",
      },
      {
        nombre: "Delfina Mora",
        username: "@delfinamora",
        actividad: "No hay actividad reciente",
        tableros: 0,
        estado: "Colaborador",
      },
      {
        nombre: "Juan Ignacio Mora",
        username: "@juanignaciomora",
        actividad: "No hay actividad reciente",
        tableros: 0,
        estado: "Colaborador",
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
