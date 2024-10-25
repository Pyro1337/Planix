import { createSlice } from "@reduxjs/toolkit";

const initialColumns = {
  backlog: {
    name: "Backlog",
    items: [
      {
        name: "Investigar bibliotecas de gráficos",
        description:
          "Explorar opciones como Chart.js y D3.js para el dashboard",
        fechaInicio: null,
        fechaFin: null,
        user: "Lucas Goncalvez",
      },
      {
        name: "Reunión de planificación semanal",
        description: "Coordinar con el equipo los próximos pasos del sprint",
        fechaInicio: null,
        fechaFin: null,
        user: "Ivan Sánchez",
      },
      {
        name: "Crear mockups de la nueva funcionalidad",
        description: "Diseñar los wireframes para el nuevo módulo de reportes",
        fechaInicio: null,
        fechaFin: null,
        user: "Eric Amarilla",
      },
    ],
  },
  pendiente: {
    name: "Pendiente",
    items: [
      {
        name: "Diseñar el modelo de base de datos",
        description:
          "Crear las entidades y relaciones para el módulo de inventario",
        fechaInicio: null,
        fechaFin: null,
        user: "Lucas Goncalvez",
      },
      {
        name: "Redactar documentación del API",
        description: "Escribir la documentación de las rutas y endpoints",
        fechaInicio: null,
        fechaFin: null,
        user: "Ivan Sánchez",
      },
      {
        name: "Escribir casos de prueba unitarios",
        description:
          "Desarrollar pruebas unitarias para el módulo de autenticación",
        fechaInicio: null,
        fechaFin: null,
        user: "Eric Amarilla",
      },
    ],
  },
  enProgreso: {
    name: "En Progreso",
    items: [
      {
        name: "Integración del frontend con el backend",
        description: "Conectar la API REST con el frontend en React",
        fechaInicio: "2024-10-20",
        fechaFin: null,
        user: "Lucas Goncalvez",
      },
      {
        name: "Refactorización del código del módulo de usuarios",
        description: "Optimizar el código para una mejor mantenibilidad",
        fechaInicio: "2024-10-18",
        fechaFin: null,
        user: "Juan Baez",
      },
      {
        name: "Revisión de PR (Pull Request) #45",
        description:
          "Revisar el PR enviado por Eric Amarilla sobre la funcionalidad de cobros",
        fechaInicio: "2024-10-22",
        fechaFin: null,
        user: "Lucas Goncalvez",
      },
    ],
  },
  completado: {
    name: "Completado",
    items: [
      {
        name: "Implementación del sistema de roles",
        description:
          "Desarrollar la funcionalidad para asignar roles a los usuarios",
        fechaInicio: "2024-10-10",
        fechaFin: "2024-10-15",
        user: "Juan Baez",
      },
      {
        name: "Corrección de bugs críticos",
        description: "Solucionar los errores reportados en producción",
        fechaInicio: "2024-10-05",
        fechaFin: "2024-10-12",
        user: "Juan Baez",
      },
      {
        name: "Optimización del tiempo de carga",
        description: "Reducir el tiempo de carga inicial del sitio en un 30%",
        fechaInicio: "2024-09-28",
        fechaFin: "2024-10-08",
        user: "Eric Amarilla",
      },
    ],
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
