import React from "react";
import { EspacioTrabajoPage } from "../pages/EspacioTrabajoPage";
import { CrearEspacioTrabajoPage } from "../pages/CrearEspacioTrabajoPage";
import { ListaEspaciosTrabajosPage } from "../pages/ListaEspaciosTrabajosPage";

export const espacioTrabajoRoutes = [
  {
    path: "/mis-espacios-trabajo/:espacioTrabajoId",
    element: <EspacioTrabajoPage />,
  },
  {
    path: "/crear-espacio-trabajo",
    element: <CrearEspacioTrabajoPage />,
  },
  {
    path: "/mis-espacios-trabajo",
    element: <ListaEspaciosTrabajosPage />,
  },
];
