import React from "react";
import { TableroPage } from "../pages/TableroPage";

export const tableroRoutes = [
  {
    path: "/tableros/:tableroId",
    element: <TableroPage />,
  },
];
