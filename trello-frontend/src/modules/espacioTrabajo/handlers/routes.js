import React from "react";
import { EspacioTrabajoPage } from "../pages/EspacioTrabajoPage";
import {CrearEspacioTrabajoPage} from "../pages/CrearEspacioTrabajoPage"

export const espacioTrabajoRoutes = [
  {
    path: "/espacio-trabajo",
    element: <EspacioTrabajoPage />,
  },
  {
    path: "/crear-espacio-trabajo",
    element: <CrearEspacioTrabajoPage />,
  },
];
